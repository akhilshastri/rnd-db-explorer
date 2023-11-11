import { getAmpsQueryWorkerInstance } from "@/utils.ts";
import {GridApi} from "ag-grid-community";

type QueryWorker = ReturnType<typeof getAmpsQueryWorkerInstance>;

export class ViewPortDataSource {
  #params: any;
  #calculateSOWRenderTime: boolean = false;
  #worker: QueryWorker;
  #page  =  {top:0, bottom:0};

  constructor(private topic: string,
              private ampsUrls: string[],
              private gridName: string,
              private gridApi:GridApi) {

    this.#calculateSOWRenderTime = false;
    this.#worker = getAmpsQueryWorkerInstance();

  }

  async reSetQuery(){

  }

  async destroy() {
    await this.#worker.terminate();
  }

  // Called exactly once before viewPort is used. Passes methods to be used to tell viewPort of data loads/changes.
  init(params:any) {
    // methods to call
    // this.params.setRowCount: (count:number, keepRenderedRows?: boolean) => void;
    // this.params.setRowData: (rowData:{[key:number]:any}) => void;
    // this.params.getRow: (rowIndex: number) => RowNode;
    this.#params = params;

      this.init({
          ampsUrls:this.ampsUrls,
          gridName:this.gridName,
      });
  }

  // Tell the viewport what the scroll position of the grid is, so it knows what rows it has to get
  setViewportRange(firstRow:number, lastRow:number) {
      this.#page = {top:firstRow, bottom:lastRow};
    const rows = {};

    for (let i = firstRow; i <= lastRow; ++i) {
      rows[i] = this.data[i];
    }

    if (this.#calculateSOWRenderTime) {
      this.gridApi.sizeColumnsToFit();
      console.timeEnd("sow_render");
      this.#calculateSOWRenderTime = false;
    }

    this.params.setRowData(rows);
  }

  query() {
   this.#worker.query({
       query:{
           command:"sow_and_subscribe",
           topic:this.topic,
           filter: getFilters(this.gridApi);
           topN: number;
           skip: number;
           options: string[];
           orderBy: string;
       }
   })
  }
}
