import { TabPanel } from "../tabpanel/TabPanel.tsx";

import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger } from "@mantine/core";

export const Layout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 35 }} padding="sx">
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Main>
        <TabPanel />
      </AppShell.Main>

    </AppShell>
  );
};
