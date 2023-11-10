// // import { queryService } from "@/workers/amps-query";
//
// // export const getQueryService = async () => {
// //   const queryWorker = new ComlinkWorker<typeof queryService>(new URL("./workers/amps-query"), {
// //     name: "amps-query-worker",
// //     type: "module",
// //   });
// //   await queryWorker.init();
// //   await queryWorker.query();
// // };
//
// // worker instance
// export const workerInstance = new ComlinkWorker<typeof import("../../workers/amps-query.ts")>(
//     new URL("../../../../workers/amps-query.ts", import.meta.url)
// );
