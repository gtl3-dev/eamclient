import React from 'react';
import {
  tw_blue_button,
  tw_purple_button,
  tw_table_detail,
} from "@/lib/tw-constants";

const EditDelTableDetailButtons = (props) => {
  const { id, setEditNumber, setKeyValueEdit, setConfirmDelNumber } = props

  // //////////////////////////////////////
  // EDIT data w/o confirmation dialogue
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  // const [editNumber, setEditNumber] = useState<number>(0);
  // const [keyValueEdit, setKeyValueEdit] = useState<number>(0); // used for re-rending dialog box
  // const [confirmDelnum, setConfirmDelNumber] = useState(0);

  return (
    <>
    <td className="flex flex-row-reverse">
        <button
          onClick={(e) => {
            e.preventDefault;
            setOpenEdit(true);
            setKeyValueEdit((val) => val + 1); // Used for re-rendering dialog
            setEditNumber(id);
            console.log("EDIT rec:", id);
            console.log("openEdit status in EditDel: ", openEdit);
          }}
          className={tw_blue_button}
        >
          Edit
        </button>
        {"   "}
        <button
          onClick={(e) => {
            e.preventDefault;
            setOpen(true);
            setKeyValue((val) => val + 1); // Used for re-rendering dialog
            setConfirmDelNumber(id);
            console.log("OPEN status in EditDel: ", open);
          }}
          className={tw_purple_button}
        >
          Delete
        </button>
      </td>
    </>
  )
}

export default EditDelTableDetailButtons