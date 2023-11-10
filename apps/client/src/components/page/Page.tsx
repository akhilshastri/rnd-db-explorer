import {Box} from "@mantine/core";
import {HostSelect} from "@/components/host-select/HostSelect.tsx";
import SplitPane from 'react-split-pane';
import {Grid} from "@/components/grid/Grid.tsx";


export const Page = ()=>{
    return <Box>
        {/*@ts-ignore*/}
        <SplitPane
            split="vertical"
            minSize={100}
            defaultSize={300}
            style={{ borderLeft: '1px solid #ccc' }}>
            <div style={{ background: 'red' }} key="left-pan">
                <HostSelect/>
            </div>
            <div style={{ background: 'blue' }} key="right-pan">
                <Grid/>
            </div>
        </SplitPane>
    </Box>
}
