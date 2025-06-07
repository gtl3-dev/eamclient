import ConfirmDialog from "./ConfirmDialog";
import { getQBdata } from "@/lib/qbapis";

async function deleteDataQB<T>(stub: string) {
  console.log("Delete Data function:");

  const qburl = "";
  const response = await getQBdata(qburl, "DELETE");

  const data = response?.res;
  console.log("Data Response inside DeleteData.tsx:", data);
  return data;
}

export default deleteDataQB;
