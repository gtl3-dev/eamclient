import React from "react";
import { getQBdata, readcompanyinfo_api } from "@/lib/qbapis";
// import { Typography } from "@material-tailwind/react";
import { tw_table_detail, tw_table, tw_alt_rows } from "@/lib/tw-constants";
import { CompanyInfo } from "@/@types/interfaces";
import ErrorModal from "@/app/components/ErrorModal";

const generateElement = (key,value) => {
  const tw_td_bold = `${tw_table_detail} font-semibold`
  return (
    <tr className={tw_alt_rows}>
      <td className={tw_td_bold}>{key}</td>
      <td className={tw_table_detail}>{value}</td>
    </tr>
  );
}

function generateData(data) {
  const newData = Object.keys(data).reduce((result, currentKey) => {
    if (typeof data[currentKey] === 'string' || data[currentKey] instanceof String) {
      const elementToPush = generateElement(currentKey, data[currentKey]);
      result.push(elementToPush);
    } else if (currentKey === 'NameValue') {
        // DO Nothing
    } else {
      const nested = generateData(data[currentKey]);
      result.push(...nested);
    }
    return result;
  }, []);
  return newData;
}

export default async function RowReport() {
  const response = await getQBdata(readcompanyinfo_api, "GET");
  // console.log(response.success);
  // console.log(response.res);
  const data = response.res;

  for (const key in data) {
  console.log(`DATA: ${key}: ${data[key]}`);
}
  return (
    <>
      {response.success && (
        <table className={tw_table}>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
              {generateData(data)}
          </tbody>
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
