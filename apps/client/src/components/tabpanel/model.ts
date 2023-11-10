import { Model} from "flexlayout-react";

export const model = Model.fromJson( {
  global: {
    tabEnableFloat:true
  },
  borders: [
  ],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: "New",
            component: "page",
          },
        ],
      }
    ],
  },
});
