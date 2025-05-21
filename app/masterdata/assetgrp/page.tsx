"use client";

import { TabPanel } from "@material-tailwind/react";
import AssetGrpList from "./AssetGrpList";
import AssetGrpNew from "./AssetGrpNew";

const page = () => {
  return (
    <>
      <TabPanel key="list" value="list">
        <AssetGrpList />
      </TabPanel>
      <TabPanel key="new" value="new">
        <AssetGrpNew />
      </TabPanel>
    </>
  );
};

export default page;
