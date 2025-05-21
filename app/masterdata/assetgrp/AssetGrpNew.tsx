"use client";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const AssetGrpNew = () => {
  return (
    <Card color="transparent" shadow={false}>
      <Typography className="text-3xl">New Group</Typography>

      <Typography color="gray" className="mt-1 font-normal">
        Enter Group details:
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Short Name
          </Typography>
          <Input
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Long Name
          </Typography>
          <Input
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Description
          </Typography>
          <Input
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Button className="mt-6" fullWidth>
          <a href="#" className="font-medium text-gray-900">
            SAVE
          </a>
        </Button>
      </form>
    </Card>
  );
};

export default AssetGrpNew;
