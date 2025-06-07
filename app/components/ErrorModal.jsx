"use client"

import React from "react";
import { tw_red_button, tw_dialog_header, tw_dialog, tw_dialog_body, tw_dialog_bg_opaque } from '@/lib/tw-constants'
import { redirect } from 'next/navigation'

export default function ErrorModal({title, body}){
  console.log(title, body);
  return (
    <>
    <div
      data-dialog-backdrop="modal-md"
      data-dialog-backdrop-close="true"
      className={tw_dialog_bg_opaque}
    >
      <div
        data-dialog="modal-md"
        className={tw_dialog}
      >
        <div className={tw_dialog_header}>
          {title}
        </div>
        <div className={tw_dialog_body}>
        {body}
        </div>
        <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
          <button
            data-dialog-close="true"
            className={tw_red_button}
            type="button"
            onClick={()=>redirect('/')}
          >
             Go Back
          </button>
        </div>
      </div>
    </div>
    </>
  );
};


