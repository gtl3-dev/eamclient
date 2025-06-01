import React from "react";
import { getQBdata, readcompanyinfo_api } from "@/app/lib/qbapis";
// import { Typography } from "@material-tailwind/react";
import { tw_blue_button, tw_purple_button } from "@/app/lib/tw-constants";
import { CompanyInfo } from "@/@types/interfaces";
import ErrorModal from "@/app/components/ErrorModal";

export default async function RowReport() {
  const response = await getQBdata(readcompanyinfo_api);
  console.log(response.success);
  console.log(response.res);

  return (
    <>
      {response.success && (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th>Head 1</th>
              <th>Head 2</th>
            </tr>
          </thead>

          <tbody></tbody>
        </table>
      )}

      {!response.success && (
        <ErrorModal
          title="An Error has occured"
          body="No data returned.  Refresh browser or login again."
        />
      )}
    </>
  );
}
