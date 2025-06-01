"use client";

import React from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { tw_dialog, tw_dialog_body, tw_dialog_header, tw_grey_button, tw_purple_button, tw_dialog_bg_opaque } from "../lib/tw-constants";

export default function ConfirmDialog(props) {
  const { title, body, isopen, callbackfunction } = props;
  // /////////////////////////////////////
  // Handle State of PopUp
  const [open, setOpen] = useState(isopen);
  console.log("OPEN status in dialog: ", open)
  const handleOpen = () => setOpen(!open);

  // /////////////////////////////////////
  //
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className={tw_dialog}
      >
        <DialogHeader className={tw_dialog_header}>
          {title}
        </DialogHeader>
        <DialogBody className={tw_dialog_body}>
          {body}
        </DialogBody>
        <DialogFooter className="flex-row-reverse p-4 space-x-4">

          <Button 
            variant="text" 
            className={tw_purple_button} 
            onClick={() => {
              setOpen(!open);
              // Confirm action
              callbackfunction();
            }}>
            <span>Confirm</span>
          </Button>

          <Button
            variant="text"
            className={tw_grey_button}
            onClick={() => {setOpen(!open)}}
          >
            <span>Cancel</span>
          </Button>
           

        </DialogFooter>
      </Dialog>
    </>
  );
}
