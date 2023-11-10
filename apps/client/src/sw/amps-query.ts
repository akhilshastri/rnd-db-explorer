/// <reference lib="webworker" />
declare const self: DedicatedWorkerGlobalScope;
import {expose} from "comlink";

export const blockingFunc = () => {
    new Array(100_000_000)
        .map((elm, index) => elm + index)
        .reduce((acc, cur) => acc + cur, 0);
};


export const someRPCFunc = () => {
    console.log("amps query worker begin")
    blockingFunc();
    console.log("amps query worker executed")
};


export async function remoteFunction(cb:any) {
    await cb("A string from a worker");
}


export const queryService = {
    count:0,

    init(){
        console.log("init query service", this.count++)
    },

    query(){
        console.log("query service", this.count++)
    }
}

expose(queryService);
