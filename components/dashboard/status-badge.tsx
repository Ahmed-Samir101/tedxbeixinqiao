"use client";

import type React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Status badge component with better visual design
export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "under_review":
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="font-medium text-sm">Under Review</span>
        </div>
      );
    case "shortlisted":
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-blue-400" />
          <span className="font-medium text-sm">Shortlisted</span>
        </div>
      );
    case "invited":
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="font-medium text-sm">Invited</span>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="font-medium text-sm">Rejected</span>
        </div>
      );
    case "contacted":
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-purple-400" />
          <span className="font-medium text-sm">Contacted</span>
        </div>
      );
    case "flagged":
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-orange-400" />
          <span className="font-medium text-sm">Flagged</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-gray-400" />
          <span className="font-medium text-sm">Unknown</span>
        </div>
      );
  }
};

// Create a styled item for status dropdown
const StatusItem = ({ value, label }: { value: string; label: string }) => {
  const getColor = () => {
    switch (value) {
      case "under_review":
        return "bg-yellow-400";
      case "shortlisted":
        return "bg-blue-400";
      case "invited":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "contacted":
        return "bg-purple-400";
      case "flagged":
        return "bg-orange-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${getColor()}`} />
      <span>{label}</span>
    </div>
  );
};

// Status select component for table cells - using shadcn UI styling
export const StatusSelect = ({
  status,
  onChange,
}: {
  status: string;
  onChange: (value: string) => void;
}) => {
  const handleValueChange = (value: string) => {
    onChange(value);
  };

  // To prevent opening the row detail modal when clicking on the status dropdown
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="min-w-[140px]" onClick={handleClick}>
      <Select onValueChange={handleValueChange} value={status}>
        <SelectTrigger className="h-8 min-h-8 border-none bg-transparent py-0 shadow-none focus:ring-0">
          <SelectValue>
            <StatusBadge status={status} />
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="under_review">
            <StatusItem label="Under Review" value="under_review" />
          </SelectItem>
          <SelectItem value="shortlisted">
            <StatusItem label="Shortlisted" value="shortlisted" />
          </SelectItem>
          <SelectItem value="invited">
            <StatusItem label="Invited" value="invited" />
          </SelectItem>
          <SelectItem value="contacted">
            <StatusItem label="Contacted" value="contacted" />
          </SelectItem>
          <SelectItem value="rejected">
            <StatusItem label="Rejected" value="rejected" />
          </SelectItem>
          <SelectItem value="flagged">
            <StatusItem label="Flagged" value="flagged" />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
