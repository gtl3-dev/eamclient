"use client";

import { Tabs, TabsHeader, TabsBody, Tab } from "@material-tailwind/react";

export default function MasterDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-row m-4">
      <Tabs value="list">
        <TabsHeader className="pt-2 w-100 px-2 space-x-4">
          <Tab
            key="list"
            value="list"
            className="bg-slate-100 active:bg-purple-200 shadow-lg px-3"
          >
            List
          </Tab>
          <Tab
            key="new"
            value="new"
            className="bg-slate-100 active:bg-purple-200 shadow-lg px-3"
          >
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
          {children}
        </TabsBody>
      </Tabs>
    </div>
  );
}
