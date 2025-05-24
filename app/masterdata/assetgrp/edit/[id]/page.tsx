"use client";

import { useState } from "react";
import {
  tw_green_button,
  tw_grey_button,
  tw_tip_box,
  tw_tip_text,
  tw_input_box_focus,
  tw_input_box,
  tw_input_label,
} from "@/app/lib/tw-constants";

interface FormData {
  shortname: string;
  longname: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormFieldProps {
  label: string;
  field: keyof FormData;
  value: string;
  type?: string;
  placeholder: string;
}

export default function UpdatableForm(): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    shortname: "Short",
    longname: "Long",
  });

  const [originalData, setOriginalData] = useState<FormData>({ ...formData });
  const [errors, setErrors] = useState<FormErrors>({});
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    // if (errors[field]) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     [field]: "",
    //   }));
    // }
  };

  const handleEdit = (): void => {
    setOriginalData({ ...formData });
    setIsEditing(true);
    setErrors({});
  };

  const handleSave = async (): Promise<void> => {
    // setIsLoading(true);

    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 10));

    // setIsLoading(false);
    setIsEditing(false);
    setOriginalData({ ...formData });

    // Show success message (you could add a toast notification here)
    console.log("Form saved successfully!");
  };

  const handleCancel = (): void => {
    setFormData({ ...originalData });
    setIsEditing(false);
    setErrors({});
  };

  const FormField: React.FC<FormFieldProps> = ({
    label,
    field,
    value,
    type = "text",
    placeholder,
  }) => (
    <div className="space-y-2">
      <label className={tw_input_label}>{label}</label>
      <div className="space-y-1">
        <input
          type={type}
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className={tw_input_box_focus}
        />
      </div>
    </div>
  );

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
        <FormField
          label="Short Name"
          field="shortname"
          value={formData.shortname}
          placeholder="Enter Short name"
        />

        <FormField
          label="Long Name"
          field="longname"
          value={formData.longname}
          placeholder="Enter Long name"
        />
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
