import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "./grid-theme.css";
import {WorkerTest} from "@/components/grid/WrokerTest.tsx";

export const Grid = () => {
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  return (
    <div
      className="ag-theme-alpine-dark ag-theme-citi-overrides"
      style={{ height: "calc(100vh - 70px)", width: "100%" }}
    >
      {/*<AgGridReact*/}
      {/*    rowData={rowData}*/}
      {/*    columnDefs={columnDefs}>*/}

      {/*</AgGridReact>*/}
      <WorkerTest/>
    </div>
  );
};
