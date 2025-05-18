"use client";

import { TabPanel } from "@material-tailwind/react";
import AssetGrpList from "./AssetGrpList";

const page = () => {
  return (
    <>
      <TabPanel key="list" value="list">
        <AssetGrpList />
      </TabPanel>
      <TabPanel key="new" value="new">
        <div>newrec DATA</div>
      </TabPanel>
    </>
  );
};

export default page;
