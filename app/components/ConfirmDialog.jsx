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
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog
        open={open}
        handler={handleOpen}
        className="relative m-4 p-4 w-2/5 rounded-lg bg-white shadow-sm"
      >
        <DialogHeader className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
          {title}
        </DialogHeader>
        <DialogBody className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
          {body}
        </DialogBody>
        <DialogFooter className="flex-row-reverse p-4 space-x-4">

          <Button 
            variant="text" 
            className="bg-purple-300 hover:bg-red-300 text-white font-bold py-2 px-4 rounded m-2" 
            onClick={() => {
              setOpen(!open);
              // Confirm action
              callbackfunction();
            }}>
            <span>Confirm</span>
          </Button>

          <Button
            variant="text"
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => {setOpen(!open)}}
          >
            <span>Cancel</span>
          </Button>
           

        </DialogFooter>
      </Dialog>
    </>
  );
}
