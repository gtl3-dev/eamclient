"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import fetchData from "@/app/components/FetchData";
import deleteData from "@/app/components/DeleteData";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import { GrpListDatatype } from "@/@types/interfaces";
import AssetGrpEdit from "./AssetGrpEdit";
import {
  tw_blue_button,
  tw_purple_button,
  tw_table_detail,
  tw_table_detail2,
} from "@/app/lib/tw-constants";
import Link from "next/link";

export default function AssetGrpList() {
  const TABLE_HEAD = ["Asset Group ID", "Short Name", "Long Name", "Actions"];
  const [TABLE_ROWS, setTABLE_ROWS] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const stub = "/masterdata/assetgrps/";

  // Retrieve Initial Data and any changes thereafter (updates/dels)
  const [open, setOpen] = useState(false);
  const [keyValue, setKeyValue] = useState<number>(0); // used for re-rending dialog box
  useEffect(() => {
    async function getData() {
      const res = await fetchData(stub);
      const data = await res;
      // console.log("data inside AssetGrpList: ", data);
      setTABLE_ROWS(data);
    }
    getData();
  }, [refreshKey]);

  // //////////////////////////////////////
  // Delete data w/ confirmation dialogue
  // function w/c is called by delete button.  Calls a Popup "ConfirmDialog.tsx"
  const [confirmDelnum, setConfirmDelNumber] = useState(0);

  function calldelData() {
    console.log(
      "Call Del Data.  Because you can't call async function in a callback"
    );
    console.log("ID to delete: ", confirmDelnum);
    delData(confirmDelnum);
  }

  async function delData(id: number) {
    const delstub = `${stub}${id}`;
    const res = await deleteData(delstub);
    // You can then redirect, or refresh a state, etc...
    setRefreshKey((oldKey: number) => oldKey + 1);
  }

  // //////////////////////////////////////
  // EDIT data w/o confirmation dialogue
  const [openEdit, setOpenEdit] = useState(false);
  const [editNumber, setEditNumber] = useState(0);

  return (
    <>
      {open && (
        <ConfirmDialog
          isopen={true}
          title="Delete Asset Group Record"
          body="This cannot be undone. Are you sure?"
          callbackfunction={() => calldelData()}
          key={keyValue} // Used for re-rendering dialog
        />
      )}

      {openEdit && <AssetGrpEdit isopen={true} id={editNumber} />}

      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {TABLE_ROWS?.map((grps: GrpListDatatype) => {
              const isLast = grps.assetgrpsid === TABLE_ROWS?.length - 1;
              const classes = tw_table_detail;

              return (
                <tr key={grps.assetgrpsid}>
                  <td className={classes}>{grps.assetgrpsid}</td>
                  <td className={classes}>{grps.shortname}</td>
                  <td className={classes}>{grps.longname}</td>
                  <td className={classes}>
                    <button
                      onClick={(e) => {
                        e.preventDefault;
                        console.log("EDIT rec:", grps.assetgrpsid);
                        setEditNumber(grps.assetgrpsid);
                        setOpenEdit(true);
                      }}
                      className={tw_blue_button}
                    >
                      Edit
                    </button>
                  </td>
                  <td className={classes}>
                    <button
                      onClick={(e) => {
                        e.preventDefault;
                        setOpen(true);
                        setKeyValue((val) => val + 1); // Used for re-rendering dialog
                        setConfirmDelNumber(grps.assetgrpsid);
                        console.log("OPEN status in AssetGrp: ", open);
                      }}
                      className={tw_purple_button}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
