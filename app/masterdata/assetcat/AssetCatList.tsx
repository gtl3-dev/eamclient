import { AssetCatType } from "@/@types/interfaces";
import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";
import { query_api, getQBdata } from "@/lib/qbapis";

async function getData(): Promise<AssetCatType[]> {
  const qry =
    "select Id, FullyQualifiedName, Name, Type from Item where Type='Category'";
  const qburl = query_api(qry);
  console.log("AssetCatList url: ", qburl);
  const response = await getQBdata(qburl, "GET");
  if (response.success) {
    const data = response.res.QueryResponse.Item;
    console.log("data in AssetCatList: ", data);
    return data;
  }
  return [];
}

export default async function AssetCatList() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <p className="text-2xl">Asset Category</p>
      <br />
      <p className="mt-1 font-normal">Intuit data source synced with EAMlite</p>
      <br />
      {data && <DataTable columns={columns} data={data} showbuttons={true} />}
    </div>
  );
}
