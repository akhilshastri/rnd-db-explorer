/// <reference lib="webworker" />
declare const self: DedicatedWorkerGlobalScope;


export const blockingFunc = () => {
    new Array(100_000_000)
        .map((elm, index) => elm + index)
        .reduce((acc, cur) => acc + cur, 0);
};


export const someRPCFunc = () => {
    blockingFunc();
    console.log("worker executed")
};
