"use client";

import { useEffect, useState } from "react";
import {
  tw_green_button,
  tw_grey_button,
  tw_tip_box,
  tw_tip_text,
  tw_input_box_focus,
  tw_input_box,
  tw_input_label,
} from "@/app/lib/tw-constants";
import { redirect } from "next/navigation";
import getOneRec from "@/app/components/GetOneRec";

interface FormData {
  assetgrpid: number;
  shortname: string;
  longname: string;
}

export default function AssetGrpEdit(id: number) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    assetgrpid: 0,
    shortname: "Short",
    longname: "Long",
  });

  // const id = 16;
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

  const [originalData, setOriginalData] = useState<FormData>({ ...formData });
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleShortNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    console.log(e);
    setFormData({
      ...formData,
      shortname: e.target.value,
    });
  }

  function handleLongNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    console.log(e);
    setFormData({
      ...formData,
      longname: e.target.value,
    });
  }

  const handleSave = async (): Promise<void> => {
    // setIsLoading(true);

    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 10));
    setOriginalData({ ...formData });

    // Show success message (you could add a toast notification here)
    console.log("Form saved successfully!", formData);
    redirect("/masterdata/assetgrp");
  };

  const handleCancel = (): void => {
    setFormData({ ...originalData });
    setIsEditing(false);
    redirect("/masterdata/assetgrp");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Asset Group Data</h1>
        <div className="flex gap-2">
          <button onClick={handleSave} className={tw_green_button}>
            Save
          </button>
          <button onClick={handleCancel} className={tw_grey_button}>
            Cancel
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
    </div>
  );
}
