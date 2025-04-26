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
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  MapIcon,
} from "@heroicons/react/24/solid";

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
      <List>
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
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Analytics
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Reporting
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Projects
                </ListItem>
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
                <ShoppingBagIcon className="h-5 w-5" />
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

        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Orders
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Reports
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link href="/configure">Configure</Link>
        </ListItem>
      </List>

      <CardFooter className="absolute bottom-3 grid place-items-center [grid-template-areas:'stack']">
        <Typography variant="small" color="grey" className="font-normal">
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
