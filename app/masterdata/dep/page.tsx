"use client";

import { TabPanel } from "@material-tailwind/react";
import AssetDepList from "./AssetDepList";
import AssetDepNew from "./AssetDepNew";

const page = () => {
  return (
    <>
      <TabPanel key="list" value="list">
        <AssetDepList />
      </TabPanel>
      <TabPanel key="new" value="new">
        <AssetDepNew />
      </TabPanel>
    </>
  );
};

export default page;
