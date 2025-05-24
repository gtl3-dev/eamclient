"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useParams } from "next/navigation";
import Form from "next/form";
import { editAssetGrp } from "../../actions"; // API to update rec
import getOneRec from "@/app/components/GetOneRec";
import {
  tw_input_box,
  tw_input_label,
  tw_blue_button,
} from "@/app/lib/tw-constants";
import { useFormState, useFormStatus } from "react-dom";

interface FormdataInterface {
  assetgrpid: number;
  shortname: string;
  longname: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  // setRefreshKey((key: number) => key + 1);

  return (
    <button
      type="submit"
      // onClick={handleOpen}
      aria-disabled={pending}
      className={tw_blue_button}
    >
      Save Changes
    </button>
  );
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  // const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen((cur) => !cur);

  const stub = `/masterdata/assetgrps/${id}`;
  console.log("STUB at page.tsx: ", id);

  // //////////////////////////////////////////////
  // Retrieve Initial Data
  const formdata = await Promise.all([getOneRec<FormdataInterface>(stub)]);

  // const [formdata, getFormData] = useState<FormdataInterface>({
  //   assetgrpid: 0,
  //   shortname: "",
  //   longname: "",
  // });

  // useEffect(() => {
  //   async function getData() {
  //     const res = await getOneRec(stub);
  //     const data = await res;
  //     getFormData(data);
  //     // console.log("data inside AssetGrpList: ", data);
  //   }
  //   getData();
  // }, [refreshKey]);

  // //////////////////////////////////////////////
  // handle update to field/s
  const [updatedvals, setUpdatedvals] = useState<FormdataInterface>({
    assetgrpid: formdata?.assetgrpid,
    shortname: formdata?.shortname,
    longname: formdata?.longname,
  });
  function handleChange(e: { target: { value: any; name: any } }) {
    setUpdatedvals({
      ...updatedvals,
      [e.target.name]: e.target.value,
    });
  }

  // ////////////////////////////////////////////////
  // SEND changes to API, instead of onSubmit uses form action
  const [state, formAction] = useFormState(editAssetGrp, { message: "" });

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-2/3 max-w-2/3">
        <CardBody className="flex flex-col gap-4">
          <Typography className={tw_input_label}>
            Record: {updatedvals.assetgrpid}
          </Typography>
          <Form action={formAction}>
            <label htmlFor="shortname" className={tw_input_label}>
              {" "}
              Edit Short Name:{" "}
            </label>
            <input
              type="text"
              id="shortname"
              name="shortname"
              value={updatedvals?.shortname}
              onChange={handleChange}
              className={tw_input_box}
              required
            />
            <label htmlFor="longname" className={tw_input_label}>
              {" "}
              Edit Long Name:{" "}
            </label>
            <input
              type="text"
              id="longname"
              name="longname"
              value={updatedvals?.longname}
              onChange={handleChange}
              className={tw_input_box}
            />

            <SubmitButton />
          </Form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography
            as="a"
            href="/masterdata/assetgrp"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold mt-4 flex justify-center"
            onClick={handleOpen}
          >
            Cancel
          </Typography>
          <br />
          {state?.message}
        </CardFooter>
      </Card>
    </Dialog>
  );
}
