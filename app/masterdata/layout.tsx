"use client";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export default function MasterDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-row m-4">
      <Tabs value="list">
        <TabsHeader className="pt-2 w-100 px-2">
          <Tab key="list" value="list" className="bg-slate-100 shadow-lg px-3">
            List
          </Tab>
          <Tab key="new" value="new" className="bg-slate-100 shadow-lg px-3">
            New
          </Tab>
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {/* <TabPanel key="list" value="list">
            <div>{children}</div>
          </TabPanel>
          <TabPanel key="new" value="new">
            <div>
              newrec DATA
            </div>
          </TabPanel> */}
          {children}
        </TabsBody>
      </Tabs>
    </div>
  );
}
