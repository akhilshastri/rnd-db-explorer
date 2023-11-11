import "./App.css";

import { useCallback } from "react";

import { workerInstance } from "./utils";

function App() {
  const workerCall = useCallback(async () => {
        debugger;
      console.log("main thread executed")
      await workerInstance.someRPCFunc();
      console.log("main thread executed")
  }, []);

  return (
    <section>
      <button onClick={workerCall}>Worker Call</button>
    </section>
  );
}

export default App;
