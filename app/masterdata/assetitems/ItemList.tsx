"use client";

import React, { useState, useEffect } from "react";
import { Item } from "@/@types/interfaces";
import {
  tw_table_detail,
  tw_table,
  tw_alt_rows,
  tw_input_label,
  tw_blue_button,
  tw_purple_button,
} from "@/lib/tw-constants";
import fetchData from "@/app/components/FetchData";
import deleteDataQB from "@/app/components/DeleteData";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import { getQBdata, query_api } from "@/lib/qbapis";

interface ItemsProps {
  items: Item[];
}

const ItemList: React.FC<ItemsProps> = ({ items }) => {
  const tw_td_bold = `${tw_table_detail} font-semibold`;
  const tw_td_buttons = `${tw_table_detail} flex flex-row-reverse`;
  const [refreshKey, setRefreshKey] = useState(0);
  const [varitems, setItems] = useState(items);
  const stub = "";

  // Update List on successful del or update
  useEffect(() => {
    async function getData() {
      const qry = "select * from Item";
      const qburl = query_api(qry);
      const response = await getQBdata(qburl, "GET");
      if (response.success) {
        const data: Item[] = response.res.QueryResponse.Item;
        // console.log("data inside ItemList: ", data);
        setItems(data);
      }
    }
    getData();
  }, [refreshKey]);

  // ////////////////////////////
  // EDIT RECORD
  const [openEdit, setOpenEdit] = useState(false);
  const [editNumber, setEditNumber] = useState<number>(0);
  const [keyValueEdit, setKeyValueEdit] = useState<number>(0); // used for re-rending dialog box

  // ////////////////////////////
  // DELETE RECORD
  const [isopen, setOpen] = useState(false);
  const [keyValue, setKeyValue] = useState<number>(0); // used for re-rending dialog box
  const [confirmDelnum, setConfirmDelNumber] = useState(0);
  // Callback function after successful del
  function calldelData() {
    // console.log("ID to delete: ", confirmDelnum);
    delData(confirmDelnum);
  }
  async function delData(id: number) {
    const delstub = `${stub}${id}`;
    const res = await getQBdata(delstub, "DELETE");
    // You can then redirect, or refresh a state, etc...
    setRefreshKey((oldKey: number) => oldKey + 1);
  }

  return (
    <>
      {isopen && (
        <ConfirmDialog
          isopen={true}
          title="Delete ITEM Record"
          body="This cannot be undone. Are you sure?"
          callbackfunction={() => calldelData()}
          key={keyValue} // Used for re-rendering dialog
        />
      )}

      {items.map((item) => (
        <tr className={tw_alt_rows} key={item.Id}>
          <td className={tw_td_bold}>{item.Id}</td>
          <td className={tw_table_detail}>{item.Name}</td>
          <td className={tw_table_detail}>{item.Description}</td>
          <td className={tw_table_detail}>{item.Type}</td>
          <td className={tw_table_detail}>{item.UnitPrice}</td>
          <td className={tw_table_detail}>{item.PurchaseCost}</td>
          <td className={tw_td_buttons}>
            <button
              onClick={(e) => {
                e.preventDefault;
                setOpenEdit(true);
                setKeyValueEdit((val) => val + 1); // Used for re-rendering dialog
                setEditNumber(parseInt(item.Id));
                console.log("EDIT rec:", item.Id);
                console.log("openEdit status in ItemList: ", openEdit);
              }}
              className={tw_blue_button}
            >
              Edit
            </button>
            {"   "}
            <button
              onClick={(e) => {
                e.preventDefault;
                setOpen(true);
                setKeyValue((val) => val + 1); // Used for re-rendering dialog
                setConfirmDelNumber(parseInt(item.Id));
                console.log("open status in ItemList: ", open);
              }}
              className={tw_purple_button}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ItemList;
