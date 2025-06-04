"use server";

import { query_api, getQBdata } from "@/app/lib/qbapis";
import { tw_table_detail, tw_table, tw_alt_rows } from "@/app/lib/tw-constants";
import ErrorModal from "@/app/components/ErrorModal";
import React from "react";
import ItemList from "./ItemList";
import { Item } from "@/@types/interfaces";

const RowReport: React.FC = async () => {
  const qry = "select * from Item";
  const qburl = query_api(qry);
  const response = await getQBdata(qburl);
  let data: Item;
  if (response.success) {
    const data = response.res.QueryResponse.Item;
    return (
      <>
        <table className={tw_table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Attribute</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <ItemList items={data} />
          </tbody>
        </table>
      </>
    );
  }
  console.log(response.success);

  return (
    <>
      {!response.success && (
        <ErrorModal
          title="An Error has occured"
          body="No data returned.  Refresh browser or login again. If there are still issues contact support."
        />
      )}
    </>
  );
};

export default RowReport;
