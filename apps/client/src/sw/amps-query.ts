/// <reference lib="webworker" />
declare const self: DedicatedWorkerGlobalScope;
import {
  Client,
  Command,
  DefaultServerChooser,
  DefaultSubscriptionManager,
} from "amps";

export const blockingFunc = () => {
  new Array(100_000_000)
    .map((elm, index) => elm + index)
    .reduce((acc, cur) => acc + cur, 0);
};

export const someRPCFunc = () => {
  console.log("amps query worker begin");
  blockingFunc();
  console.log("amps query worker executed");
};

export async function remoteFunction(cb: any) {
  await cb("A string from a worker");
}

let client: Client;

const waitForClient = (ampsClient: Client) => {
  return new Promise<void>((resolve) => {
    if (ampsClient.isConnected()) {
      resolve();
      return;
    }
    setTimeout(() => waitForClient(ampsClient).then(resolve), 100);
  });
};

type onError = { onError: (e: Error) => void };
type InitParams = {
  gridName: string;
  ampsUrls: string[];
  onError: (e: Error) => void;
} & onError;
type QueryParams = {
  query: {
    command: "sow" | "sow_and_subscribe";
    topic: string;
    filter: string;
    topN: number;
    skip: number;
    options: string[];
    orderBy: string;
  };
  onData: (data: any) => void;
} & onError;

export const init = async ({ gridName, ampsUrls, onError }: InitParams) => {
  client = new Client(
    `sow-loader-${gridName}${new Date()}-${Math.random() * 100000000}`,
  );
  client.errorHandler(onError);
  client.subscriptionManager(new DefaultSubscriptionManager());
  client.serverChooser(new DefaultServerChooser().addAll(...ampsUrls));
  await client.connect();
};

export const query = async ({ query, onData, onError }: QueryParams) => {
  const cmd = new Command(query.command);
  if (query.topic) {
    cmd.topic(query.topic);
  }
  if (query.filter) {
    cmd.filter(query.filter);
  }
  if (query.topN) {
    cmd.topN(query.topN);
  }
  if (query.skip) {
    cmd.skip(query.skip);
  }
  if (query.orderBy) {
    cmd.orderBy(query.orderBy);
  }
  if (query.options) {
    cmd.options(query.options.join(","));
  }

  await waitForClient(client);
  //
  let nextId = 1;
  let sowKeyMap: Record<string, number>;
  let rowId;
  let data: any[] = [];

  try {
    const res = await client.execute(cmd, (message) => {
      const header = message.header.command();
      // new query
      if (header === "group_begin") {
        data = [];
        sowKeyMap = {};
      }

      // loading messages
      else if (header === "sow") {
        sowKeyMap[message.header.sowKey()] = nextId;
        message.data.rowId = nextId++;
        data.push(message.data);
      }

      // done loading, return data back to the UI process
      else if (header === "group_end") {
        onData({ sow: data });
      }

      // update or new message
      else if (header === "p") {
        // either a new message or an update to an existing one

        // Update case
        rowId = sowKeyMap[message.header.sowKey()];
        if (rowId !== undefined) {
          let index = indexByRowId(rowId);
          message.data.rowId = rowId;
          data[index] = message.data;
          onData({ u: message.data, rowIndex: index });
        }
        // new one
        else {
          sowKeyMap[message.header.sowKey()] = nextId;
          message.data.rowId = nextId++;
          data.push(message.data);
          onData({ p: message.data, rowIndex: data.length });
        }
      }
      else if (header === 'oof') {
        // deleting the message
        rowId = sowKeyMap[message.header.sowKey()];

        if (rowId) {
          var index = indexByRowId(rowId);
          delete sowKeyMap[message.header.sowKey()];
          data.splice(index, 1);
          self.postMessage({oof: message.data, rowIndex: index});
        }
      }
    });
  } catch (e: any) {
    onError(e);
  }

  // Helper function to find index of a message by rowId
  function indexByRowId(rowId: number) {
    // Simple binary search for row index
    if (!data) {
      return -1;
    }

    let start = 0;
    let end = data.length;
    let mid;

    while (start < end) {
      mid = Math.floor((start + end) / 2);

      if (data[mid].rowId < rowId) {
        start = mid + 1;
      } else if (data[mid].rowId > rowId) {
        end = mid;
      } else {
        return mid;
      }
    }

    return -1;
  }
};

export const terminate = async () => {
  if (client ) await client.disconnect();
  self.close();
};
