import {wrap} from 'comlink';

const worker = new Worker(new URL('../../workers/amps-query.ts', import.meta.url),{
    type: 'module',
});
export const api = wrap(worker);

//https://stackblitz.com/edit/github-u56fgb?file=src%2Fmain.ts





// const workerFactory = (workerScript: URL, workerOptions: WorkerOptions) => () =>
//     new Worker(workerScript, workerOptions);
//
//
// export const ampsQueryClient=()=>{
//     const factory = workerFactory(new URL('../../workers/amps-query.ts', import.meta.url),{});
//     const worker = factory();
//     worker.onmessage = (e) => console.log(e);
//     worker.onerror = (e) => {
//         console.log(e.message);
//         console.error(e)
//     };
//     worker.postMessage('Hello world');
//     return worker;
// }
