import AssetDepList from "./AssetDepList";
import AssetDepNew from "./AssetDepNew";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tw_tab } from "@/lib/tw-constants";

const page = () => {
  // const [refreshKey1, setRefreshKey] = useState(0);
  // const PageContext = createContext({ refreshKey1, setRefreshKey });

  return (
    // <PageContext.Provider value={{ refreshKey1, setRefreshKey }}>
    <div className={tw_tab}>
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        <TabsContent key="list" value="list">
          <AssetDepList />
        </TabsContent>
        <TabsContent key="new" value="new">
          <AssetDepNew />
        </TabsContent>
      </Tabs>
    </div>
    // </PageContext.Provider>
  );
};

export default page;
