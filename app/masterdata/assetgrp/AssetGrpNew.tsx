import Form from "next/form";
import { createNewAssetGrp } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import {
  tw_input_box,
  tw_input_label,
  tw_blue_button,
  tw_tip_box,
  tw_tip_text,
} from "@/app/lib/tw-constants";

function SubmitButton() {
  const { pending } = useFormStatus();
  // setRefreshKey((key: number) => key + 1);

  return (
    <button type="submit" aria-disabled={pending} className={tw_blue_button}>
      Create New Asset Group
    </button>
  );
}

export default function Page() {
  return (
    <form action={createNewAssetGrp}>
      <label htmlFor="shortname" className={tw_input_label}>
        {" "}
        Enter Short Name:{" "}
      </label>
      <input
        type="text"
        id="shortname"
        name="shortname"
        className={tw_input_box}
        required
      />
      <label htmlFor="longname" className={tw_input_label}>
        {" "}
        Enter Long Name:{" "}
      </label>
      <input
        type="text"
        id="longname"
        name="longname"
        className={tw_input_box}
      />

      <SubmitButton />
      <div className={tw_tip_box}>
        <p className={tw_tip_text}>
          <strong>Tip:</strong> Create as many records as needed. Click on
          "List" tab to see your changes.
          <br /> <br />
          <strong>Tip:</strong> Short Name should be unique.
        </p>
      </div>
    </form>
  );
}
