"use client";

import { TabPanel } from "@material-tailwind/react";
import AssetTypeList from "./AssetTypesList";
import AssetTypeNew from "./AssetTypesNew";

const page = () => {
  return (
    <>
      <TabPanel key="list" value="list">
        <AssetTypeList />
      </TabPanel>
      <TabPanel key="new" value="new">
        <AssetTypeNew />
      </TabPanel>
    </>
  );
};

export default page;
