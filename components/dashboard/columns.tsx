"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DragHandle } from "./data-table";
import { Rating } from "./rating";
import { StatusSelect } from "./status-badge";
import type { SpeakerEntry } from "./types";

// Define the table meta type to include our custom functions
type SpeakerTableMeta = {
  updateStatus?: (id: string, status: string) => void;
  updateRating?: (id: string, rating: number) => void;
};

// Define columns for the speaker table
export const columns: ColumnDef<SpeakerEntry>[] = [
  {
    id: "drag",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="translate-y-[2px]"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        className="translate-y-[2px]"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  },
  {
    id: "name",
    accessorKey: "fullName",
    header: ({ column }) => (
      <button
        aria-label={`Sort by name ${column.getIsSorted() === "asc" ? "descending" : "ascending"}`}
        className="flex cursor-pointer items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        type="button"
      >
        Name
        <ChevronDown
          className={`ml-1 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </button>
    ),
    cell: ({ row }) => {
      const entry = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10">
              {entry.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium hover:underline">{entry.fullName}</div>
            <div className="text-muted-foreground text-xs">
              {entry.type === "application" ? entry.job : "Nominee"}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "topic",
    accessorKey: "topic",
    header: ({ column }) => (
      <button
        aria-label={`Sort by topic ${column.getIsSorted() === "asc" ? "descending" : "ascending"}`}
        className="flex cursor-pointer items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        type="button"
      >
        Topic
        <ChevronDown
          className={`ml-1 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </button>
    ),
    cell: ({ row }) => row.original.topic,
  },
  {
    id: "date",
    accessorKey: "submissionDate",
    header: ({ column }) => (
      <button
        aria-label={`Sort by date ${column.getIsSorted() === "asc" ? "descending" : "ascending"}`}
        className="flex cursor-pointer items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        type="button"
      >
        Date
        <ChevronDown
          className={`ml-1 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </button>
    ),
    cell: ({ row }) =>
      new Date(row.original.submissionDate).toLocaleDateString(),
  },
  {
    id: "type",
    accessorKey: "type",
    header: ({ column }) => (
      <button
        aria-label={`Sort by type ${column.getIsSorted() === "asc" ? "descending" : "ascending"}`}
        className="flex cursor-pointer items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        type="button"
      >
        Type
        <ChevronDown
          className={`ml-1 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </button>
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.type === "application" ? "default" : "secondary"}
      >
        {row.original.type === "application" ? "Application" : "Nomination"}
      </Badge>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <button
        aria-label={`Sort by status ${column.getIsSorted() === "asc" ? "descending" : "ascending"}`}
        className="flex cursor-pointer items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        type="button"
      >
        Status
        <ChevronDown
          className={`ml-1 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </button>
    ),
    cell: ({ row, table }) => {
      // Using the meta data to access the update function
      const updateStatus = (table.options.meta as SpeakerTableMeta)
        ?.updateStatus;

      return (
        <StatusSelect
          onChange={(value) => {
            if (updateStatus) {
              updateStatus(row.original.id, value);
            }
          }}
          status={row.original.status}
        />
      );
    },
  },
  {
    id: "rating",
    accessorKey: "rating",
    header: ({ column }) => (
      <button
        aria-label={`Sort by rating ${column.getIsSorted() === "asc" ? "descending" : "ascending"}`}
        className="flex cursor-pointer items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        type="button"
      >
        Rating
        <ChevronDown
          className={`ml-1 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </button>
    ),
    cell: ({ row, table }) => {
      // Using the meta data to access the update function
      const updateRating = (table.options.meta as SpeakerTableMeta)
        ?.updateRating;

      return (
        <Rating
          onChange={(newRating) => {
            if (updateRating) {
              updateRating(row.original.id, newRating);
            }
          }}
          rating={row.original.rating}
        />
      );
    },
  },
];
