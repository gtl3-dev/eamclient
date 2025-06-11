import AssetCatList from "./AssetCatList";
import AssetNew from "./AssetCatNew";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tw_tab } from "@/lib/tw-constants";

export default async function Page() {
  return (
    // <PageContext.Provider value={{ refreshKey1, setRefreshKey }}>
    <div className={tw_tab}>
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        <TabsContent key="list" value="list">
          <AssetCatList />
        </TabsContent>
        <TabsContent key="new" value="new">
          <AssetNew />
        </TabsContent>
      </Tabs>
    </div>
    // </PageContext.Provider>
  );
}
