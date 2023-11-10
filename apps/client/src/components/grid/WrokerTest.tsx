import {useCallback} from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "./grid-theme.css";
import {Button} from "@mantine/core";
import {ampsQueryWorkerInstance, workerInstance} from "@/utils.ts";
import {proxy} from "comlink";


function callback(value:any) {
    alert(`Result on main thread: ${value}`);
}



export const WorkerTest = () => {


    const workerCall = useCallback(async () => {
        debugger;
        console.log("main thread executed")
        ampsQueryWorkerInstance.remoteFunction(
            proxy( callback),
        );
        await ampsQueryWorkerInstance.someRPCFunc();
        // await workerInstance.someRPCFunc();
        console.log("main thread executed")
    }, []);

    return (
        <section>
            <Button onClick={workerCall}>Worker Call</Button>
        </section>
    );
};
