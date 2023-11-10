import {
    BorderNode,
    ITabSetRenderValues,
    Layout, TabNode,
    TabSetNode,
} from "flexlayout-react";
import { model } from "./model.ts";
import { ActionIcon, Box, Tooltip } from "@mantine/core";

import "flexlayout-react/style/dark.css";
import { Grid } from "../grid/Grid.tsx";
import { useRef } from "react";
import { IconPlus } from "@tabler/icons-react";
import {Page} from "../page/Page.tsx";


const titleFactory = (node: TabNode) => {
    // if (node.getId() === "custom-tab") {
        // return "(Added by titleFactory) " + node.getName();
        return {
            titleContent: <div> :: {node.getName()}</div>,
            name: "the name for custom tab"
        };
    // }
    // return;
}

const layoutFactory = (node: any) => {
    var component = node.getComponent();

    if (component === "grid") {
        return <Grid />;
    }
    if (component === "page") {
        return <Page />;
    }
};

export const TabPanel = () => {
  const layoutRef = useRef<Layout | null>(null);

  console.count("tab panel render");
  return (
    <Box>
      <Layout
        ref={layoutRef}
        model={model}
        factory={layoutFactory}
        popoutURL="popout.html"
        titleFactory = {titleFactory}
        onRenderTabSet={(
          node: TabSetNode | BorderNode,
          renderValues: ITabSetRenderValues,
        ) => {
          if (node instanceof TabSetNode) {
            // don't show + button on border tabsets
            renderValues.stickyButtons.push(
              <Tooltip label="Insert new tab" key="new-tabs">
                <ActionIcon
                  size={24}
                  variant="filled"
                  aria-label="Settings"
                  onClick={() => {
                    const layout = layoutRef.current!;
                    layout.addTabToTabSet(node.getId(), {
                      component: "grid",
                      name: "Grid ",
                    });
                  }}
                >
                  <IconPlus
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Tooltip>,
            );
          }
        }}
      />
    </Box>
  );
};
