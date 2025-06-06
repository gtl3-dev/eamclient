"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { redirect } from "next/navigation";
import {
  tw_green_button,
  tw_grey_button,
  tw_tip_box,
  tw_tip_text,
  tw_input_box_focus,
  tw_input_box,
  tw_input_label,
  tw_dialog,
} from "@/app/lib/tw-constants";
import getOneRec from "@/app/components/GetOneRec";
import updateData from "@/app/components/UpdateData";

export default function AssetGrpEdit(props) {
  const {id, isopen, callbackfunction } = props
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    assetgrpid: 0,
    shortname: "",
    longname: "",
  });

  // /////////////////////////////////////
  // Handle State of PopUp
  const [open, setOpen] = useState(isopen);
  console.log("OPEN status in AssetGrpEdit dialog: ", isopen)
  const handleOpen = () => setOpen(isopen);
  const stub = `/masterdata/assetgrps/${id}`;

  // //////////////////////////////////////////////
  // Retrieve Initial Data
  useEffect(() => {
    async function getData() {
      const res = await getOneRec(stub);
      const data = await res;
      setFormData(data);
      console.log("data inside AssetGrp EDIT: ", data);
    }
    getData();
  }, []);

  const [originalData, setOriginalData] = useState({ ...formData });
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleShortNameChange(e) {
    console.log(e);
    setFormData({
      ...formData,
      shortname: e.target.value,
    });
  }

  function handleLongNameChange(e) {
    console.log(e);
    setFormData({
      ...formData,
      longname: e.target.value,
    });
  }

  const handleSave = async () => {
    // setIsLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 10));
    const res = await updateData(stub, formData);

    setOriginalData({ ...formData });
    // Show success message (you could add a toast notification here)
    console.log("Form saved successfully!", res);
    setOpen(!open);
    callbackfunction();
    redirect("/masterdata/assetgrp");
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
    setOpen(!open);
    redirect("/masterdata/assetgrp");
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className={tw_dialog}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">EDIT Asset Group Data</h1>
        <div className="flex gap-2">
          <button onClick={handleCancel} className={tw_grey_button}>
            Cancel
          </button>
          <button onClick={handleSave} className={tw_green_button}>
            Save
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className={tw_input_label}>Short Name</label>
          <div className="space-y-1">
            <input
              type="text"
              value={formData.shortname}
              onChange={handleShortNameChange}
              placeholder="Enter Short Name"
              className={tw_input_box_focus}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={tw_input_label}>Long Name</label>
          <div className="space-y-1">
            <input
              type="text"
              value={formData.longname}
              onChange={handleLongNameChange}
              placeholder="Enter Long Name"
              className={tw_input_box_focus}
            />
          </div>
        </div>
      </div>

      <div className={tw_tip_box}>
        <p className={tw_tip_text}>
          <strong>Tip:</strong> Make your changes and click "Save" to update
          your profile, or "Cancel" to discard changes.
        </p>
      </div>
    </Dialog>
  );
}
