async function updateData<T>(stub: string, updata: {}) {
  console.log("fecthData function:");
  const response = await fetch(`${process.env.SERVERAPI_HOST}${stub}`, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "x-api-key": `${process.env.SERVERAPI_KEY_VALUE}`,
      "x-api-secret": `${process.env.SERVERAPI_SECRET_VALUE}`,
    },
    body: JSON.stringify(updata),
  });

  const data = await response.json();
  console.log("Data Response inside updateData.tsx:", data);
  return data;
}

export default updateData;
