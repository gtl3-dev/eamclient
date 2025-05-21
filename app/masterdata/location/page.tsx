"use client";

import { TabPanel } from "@material-tailwind/react";
import AssetLocList from "./AssetLocList";
import AssetLocNew from "./AssetLocNew";

const page = () => {
  return (
    <>
      <TabPanel key="list" value="list">
        <AssetLocList />
      </TabPanel>
      <TabPanel key="new" value="new">
        <AssetLocNew />
      </TabPanel>
    </>
  );
};

export default page;
