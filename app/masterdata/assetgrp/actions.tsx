"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

type FormState = {
  message: string;
};

export async function createNewAssetGrp(formData: FormData) {
  // Create a new record
  // ...
  const stub = "/masterdata/assetgrps/";
  const schema = z.object({
    shortname: z.string().nonempty(),
    longname: z.string().nonempty(),
  });

  const data = schema.parse({
    shortname: formData.get("shortname"),
    longname: formData.get("longname"),
  });

  try {
    await fetch(`${process.env.SERVERAPI_HOST}${stub}`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "x-api-key": `${process.env.SERVERAPI_KEY_VALUE}`,
        "x-api-secret": `${process.env.SERVERAPI_SECRET_VALUE}`,
      },
      body: JSON.stringify({
        companyidkey: "TEST",
        shortname: data.shortname,
        longname: data.longname,
      }),
    });
    revalidatePath("/masterdata/assetgrp");
    return { message: `Success: Record added:  ${data.shortname}` };
  } catch {
    revalidatePath("/masterdata/assetgrp");
    return { message: "Error" };
  }
  // Redirect to level up
  //   redirect("/masterdata/assetgrp");
}

export async function editAssetGrp(formData: FormData) {
  const id = formData.get("assetgrpsid");
  const stub = `/masterdata/assetgrps/${id}`;
  console.log("EDIT STUB: ", stub);
  const schema = z.object({
    shortname: z.string().nonempty(),
    longname: z.string().nonempty(),
  });

  const data = schema.parse({
    shortname: formData.get("shortname"),
    longname: formData.get("longname"),
  });

  try {
    await fetch(`${process.env.SERVERAPI_HOST}${stub}`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "x-api-key": `${process.env.SERVERAPI_KEY_VALUE}`,
        "x-api-secret": `${process.env.SERVERAPI_SECRET_VALUE}`,
      },
      body: JSON.stringify({
        shortname: data.shortname,
        longname: data.longname,
      }),
    });
    revalidatePath("/masterdata/assetgrp", "layout");
    return { message: `Success: Record Updated:  ${data.shortname}` };
  } catch {
    return { message: "Error" };
  }
  // Redirect to level up
  //   redirect("/masterdata/assetgrp");
}
