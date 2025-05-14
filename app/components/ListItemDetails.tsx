import React from "react";
import Link from "next/link";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface ListItemDetailsProps {
  link: string;
  title: string;
}

export function ListItemDetail({ link, title }: ListItemDetailsProps) {
  return (
    <ListItem>
      <ListItemPrefix>
        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
      </ListItemPrefix>
      <Link href={link}>{title}</Link>
    </ListItem>
  );
}
