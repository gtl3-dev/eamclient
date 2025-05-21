async function fetchData<T>(stub: string) {
  console.log("fecthData function:", process.env.SERVERAPI_KEY_VALUE);
  const response = await fetch(`${process.env.SERVERAPI_HOST}${stub}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "x-api-key": `${process.env.SERVERAPI_KEY_VALUE}`,
      "x-api-secret": `${process.env.SERVERAPI_SECRET_VALUE}`,
    },
  });

  const data = await response.json();
  console.log("Data Response inside FetchData.tsx:", data);
  return data;
}

export default fetchData;
