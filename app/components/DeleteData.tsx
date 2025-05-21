import ConfirmDialog from "./ConfirmDialog";

async function deleteData<T>(stub: string) {
  console.log("Delete Data function:");
  const response = await fetch(`${process.env.SERVERAPI_HOST}${stub}`, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "x-api-key": `${process.env.SERVERAPI_KEY_VALUE}`,
      "x-api-secret": `${process.env.SERVERAPI_SECRET_VALUE}`,
    },
  });

  const data = await response.json();
  console.log("Data Response inside DeleteData.tsx:", data);
  return data;
}

export default deleteData;
