"use client";

import { TabPanel } from "@material-tailwind/react";
import AssetGrpList from "./AssetGrpList";
import AssetGrpNew from "./AssetGrpNew";
import React, { createContext, useContext, useState } from "react";

const page = () => {
  const [refreshKey1, setRefreshKey] = useState(0);
  const PageContext = createContext({ refreshKey1, setRefreshKey });

  return (
    <PageContext.Provider value={{ refreshKey1, setRefreshKey }}>
      <TabPanel key="list" value="list">
        <AssetGrpList key={refreshKey1} />
      </TabPanel>
      <TabPanel key="new" value="new">
        <AssetGrpNew />
      </TabPanel>
    </PageContext.Provider>
  );
};

export default page;
