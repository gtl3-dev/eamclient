"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardFooter,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  ClipboardIcon,
  InboxIcon,
  MapIcon,
} from "@heroicons/react/24/solid";
import { ListItemDetail } from "./ListItemDetails";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export function SideBar() {
  const [open, setOpen] = React.useState(1);
  // 0 is false or it is closed

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          <Link href="/dashboard">Dashboard</Link>
        </Typography>
      </div>

      <List className="grow">
        {/* START OF FIRST GROUP  */}
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <MapIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Master Data
              </Typography>
            </AccordionHeader>
          </ListItem>

          {open === 1 && (
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItemDetail link="/masterdata/location" title="Location" />
                <ListItemDetail
                  link="/masterdata/assetcat"
                  title="Asset Category"
                />
                <ListItemDetail
                  link="/masterdata/assetgrp"
                  title="Asset Groups"
                />
                <ListItemDetail
                  link="/masterdata/assetitems"
                  title="Assets/Items"
                />
                <ListItemDetail
                  link="/masterdata/dep"
                  title="Depreciation Types"
                />
              </List>
            </AccordionBody>
          )}
        </Accordion>
        {/* END OF FIRST GROUP  */}

        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ClipboardIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Finance
              </Typography>
            </AccordionHeader>
          </ListItem>

          {open === 2 && (
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </List>
            </AccordionBody>
          )}
        </Accordion>
        {/* END OF SECOND ACCORDION GROUP  */}

        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Orders
              </Typography>
            </AccordionHeader>
          </ListItem>

          {open === 3 && (
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItemDetail
                  link="/posting/deprun"
                  title="Post Depreciation Run"
                />
                <ListItemDetail
                  link="/posting/approvemo"
                  title="Approve Maintenance Order"
                />
                <ListItemDetail
                  link="/posting/approvepo"
                  title="Approve Purchase Order"
                />
                <ListItemDetail
                  link="/posting/approveso"
                  title="Approve Service Order"
                />
                <ListItemDetail link="/posting/order" title="Post Order" />
                <ListItemDetail
                  link="/posting/usage"
                  title="Post Mileage/Usage"
                />
              </List>
            </AccordionBody>
          )}
        </Accordion>
        {/* END OF THIRD ACCORDION GROUP  */}

        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 4 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Reports
              </Typography>
            </AccordionHeader>
          </ListItem>

          {open === 4 && (
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItemDetail
                  link="/reports/companyinfo"
                  title="Company Information"
                />
                <ListItemDetail
                  link="/reports/assetexpense"
                  title="Asset Expense Report"
                />
                <ListItemDetail
                  link="/reports/assetconsume"
                  title="Asset Consumption Report"
                />
                <ListItemDetail
                  link="/reports/assetpl"
                  title="Asset P/L Report"
                />
                <ListItemDetail
                  link="/reports/dep"
                  title="Depreciation Summary Report"
                />
              </List>
            </AccordionBody>
          )}
        </Accordion>
        {/* END OF FOURTH ACCORDION GROUP  */}

        <Accordion
          open={open === 5}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 5 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 5}>
            <AccordionHeader
              onClick={() => handleOpen(5)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Configure
              </Typography>
            </AccordionHeader>
          </ListItem>

          {open === 5 && (
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItemDetail link="/masterdata/location" title="Location" />
                <ListItemDetail
                  link="/masterdata/assettypes"
                  title="Asset Types"
                />
                <ListItemDetail
                  link="/masterdata/assetgrp"
                  title="Asset Groups"
                />
                <ListItemDetail
                  link="/masterdata/assetitems"
                  title="Assets/Items"
                />
                <ListItemDetail
                  link="/masterdata/dep"
                  title="Depreciation Types"
                />
              </List>
            </AccordionBody>
          )}
        </Accordion>
        {/* END OF FIFTH ACCORDION GROUP  */}
      </List>

      {/* <CardFooter className="bottom-3 grid place-items-center [grid-template-areas:'stack']"> */}
      <CardFooter className="sticky top-full bottom-3">
        <Typography variant="small" color="black" className="font-light">
          &copy; 2025 EAM Lite. Powered by
        </Typography>
        <div>
          <img
            src="/QB_logo_horz.png"
            alt="EAM Lite logo"
            width={200}
            height={20}
            className="dark:invert"
          />
        </div>
      </CardFooter>
    </Card>
  );
}
