import React from "react";
import { Item } from "@/@types/interfaces";
import {
  tw_table_detail,
  tw_table,
  tw_alt_rows,
  tw_input_label,
} from "@/app/lib/tw-constants";

interface ItemsProps {
  items: Item[];
}

const ItemList: React.FC<ItemsProps> = ({ items }) => {
  const tw_td_bold = `${tw_table_detail} font-semibold`;
  return (
    <>
      {items.map((item) => (
        <tr className={tw_alt_rows}>
          <td className={tw_td_bold}>{item.Id}</td>
          <td className={tw_table_detail}>{item.Name}</td>
          <td className={tw_table_detail}>{item.Description}</td>
          <td className={tw_table_detail}>{item.UnitPrice}</td>
          <td className={tw_table_detail}>{item.Type}</td>
        </tr>
      ))}
    </>
  );
};

export default ItemList;
