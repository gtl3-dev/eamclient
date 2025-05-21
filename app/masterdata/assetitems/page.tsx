"use client";

import { TabPanel } from "@material-tailwind/react";
import AssetItemList from "./AssetItemList";
import AssetItemNew from "./AssetItemNew";

const page = () => {
  return (
    <>
      <TabPanel key="list" value="list">
        <AssetItemList />
      </TabPanel>
      <TabPanel key="new" value="new">
        <AssetItemNew />
      </TabPanel>
    </>
  );
};

export default page;
