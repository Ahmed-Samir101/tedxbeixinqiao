"use client";

import type {
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  BarChart2,
  CalendarIcon,
  Check,
  ChevronDown,
  Clock,
  Download,
  Edit,
  Filter,
  Flag,
  LogOut,
  PhoneCall,
  PlusCircle,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { toast } from "sonner";
import { columns } from "@/components/dashboard/columns";
import { DataTable } from "@/components/dashboard/data-table";
import { Rating } from "@/components/dashboard/rating";
import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  type ApplicationEntry,
  type NominationEntry,
  type SpeakerEntry,
  statusOptions,
} from "@/components/dashboard/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { signOut } from "@/lib/auth-client";
import {
  createDashboardApplication,
  createDashboardNomination,
  toggleApplicationFlag,
  toggleNominationFlag,
  updateApplicationDetails,
  updateApplicationNotes,
  updateApplicationRating,
  updateApplicationStatus,
  updateNominationDetails,
  updateNominationNotes,
  updateNominationRating,
  updateNominationStatus,
} from "@/lib/speakers-db-service";

// Add interface for the SpeakerDashboardClient props
type SpeakerDashboardClientProps = {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string | null;
    [key: string]: any;
  };
  initialEntries: SpeakerEntry[];
};

export function SpeakerDashboardClient({
  user,
  initialEntries,
}: SpeakerDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>(["all"]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [entries, setEntries] = useState<SpeakerEntry[]>(initialEntries);
  const [selectedEntry, setSelectedEntry] = useState<SpeakerEntry | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activities, setActivities] = useState<
    Array<{
      id: string;
      entryId: string;
      text: string;
      timestamp: Date;
      status: string;
      type: "application" | "nomination";
    }>
  >([]);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  const [_selectedEntries, _setSelectedEntries] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newBulkStatus, setNewBulkStatus] = useState("");

  // Entry form states
  const [entryFormOpen, setEntryFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [entryType, setEntryType] = useState<"application" | "nomination">(
    "application"
  );
  const [formData, setFormData] = useState({
    // Common fields
    fullName: "",
    topic: "",
    priorTedTalk: "",
    status: "under_review",
    // Application specific
    mobilePhone: "",
    wechatId: "",
    gender: "Male",
    job: "",
    // Nomination specific
    contact: "",
    nominatedBy: "",
  });

  const router = useRouter();

  // TanStack Table states
  const [_sorting, _setSorting] = useState<SortingState>([]);
  const [_columnFilters, _setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Table instances for pagination control
  const [allEntriesTable, setAllEntriesTable] = useState<any>(null);
  const [applicationsTable, setApplicationsTable] = useState<any>(null);
  const [nominationsTable, setNominationsTable] = useState<any>(null);

  // Force re-render states for pagination updates
  const [, forceUpdate] = useState({});
  const triggerUpdate = () => forceUpdate({});

  // Stats - Using recent entries data to calculate changes
  const oneWeekAgo = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  }, []);

  const applicationsSinceLastWeek = useMemo(
    () =>
      entries.filter(
        (e) =>
          e.type === "application" && new Date(e.submissionDate) > oneWeekAgo
      ).length,
    [entries, oneWeekAgo]
  );

  const nominationsSinceLastWeek = useMemo(
    () =>
      entries.filter(
        (e) =>
          e.type === "nomination" && new Date(e.submissionDate) > oneWeekAgo
      ).length,
    [entries, oneWeekAgo]
  );

  const totalSlots = 10;

  // Filter entries based on current filters and search query
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      // Filter by type
      if (typeFilter !== "all" && entry.type !== typeFilter) {
        return false;
      }

      // Filter by status - only filter if we have specific statuses selected (not "all")
      if (
        !(statusFilter.includes("all") || statusFilter.includes(entry.status))
      ) {
        return false;
      }

      // Filter by search query
      if (
        searchQuery &&
        !entry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !entry.topic.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [entries, typeFilter, statusFilter, searchQuery]);

  // Calculate statistics
  const totalApplications = entries.filter(
    (e) => e.type === "application"
  ).length;
  const totalNominations = entries.filter(
    (e) => e.type === "nomination"
  ).length;
  const totalShortlisted = entries.filter(
    (e) => e.status === "shortlisted"
  ).length;
  const totalInvited = entries.filter((e) => e.status === "invited").length;
  const percentageShortlisted =
    totalApplications + totalNominations > 0
      ? Math.round(
          (totalShortlisted / (totalApplications + totalNominations)) * 100
        )
      : 0;

  // Handle opening the modal for an entry
  const openDetails = (row: Row<SpeakerEntry>) => {
    setSelectedEntry(row.original);
    setDetailsOpen(true);

    // Reset edit mode
    setEditMode(false);
  };

  // Open the edit entry form for an existing entry
  const openEditForm = (entry: SpeakerEntry) => {
    setSelectedEntry(entry);

    // Initialize form data with entry values
    if (entry.type === "application") {
      const appEntry = entry as ApplicationEntry;
      setFormData({
        fullName: appEntry.fullName,
        topic: appEntry.topic,
        priorTedTalk: appEntry.priorTedTalk || "",
        status: appEntry.status,
        mobilePhone: appEntry.mobilePhone,
        wechatId: appEntry.wechatId,
        gender: appEntry.gender ?? "Not specified",
        job: appEntry.job,
        contact: "",
        nominatedBy: "",
      });
    } else {
      const nomEntry = entry as NominationEntry;
      setFormData({
        fullName: nomEntry.fullName,
        topic: nomEntry.topic,
        priorTedTalk: nomEntry.priorTedTalk || "",
        status: nomEntry.status,
        mobilePhone: "",
        wechatId: "",
        gender: "Male",
        job: "",
        contact: nomEntry.contact,
        nominatedBy: nomEntry.nominatedBy,
      });
    }

    setEditMode(true);
    setEntryFormOpen(true);
  };

  // Add activity when status changes
  const addActivity = (entryId: string, newStatus: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry) {
      return;
    }

    let activityText = "";

    switch (newStatus) {
      case "invited":
        activityText = `${entry.fullName} invited to audition`;
        break;
      case "shortlisted":
        activityText = `${entry.fullName} shortlisted`;
        break;
      case "rejected":
        activityText = `${entry.fullName} application rejected`;
        break;
      case "flagged":
        activityText = `${entry.fullName} flagged for review`;
        break;
      case "contacted":
        activityText = `${entry.fullName} contacted for more info`;
        break;
      case "under_review":
        activityText = `${entry.fullName} set to under review`;
        break;
      default:
        activityText = `${entry.fullName} status updated to ${newStatus}`;
    }

    const newActivity = {
      id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      entryId: entry.id,
      text: activityText,
      timestamp: new Date(),
      status: newStatus,
      type: entry.type,
    };

    setActivities((prevActivities) => [
      newActivity,
      ...prevActivities.slice(0, 19),
    ]);
  };

  // Update status of an entry
  const updateStatus = async (entryId: string, newStatus: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry || entry.status === newStatus) {
      return;
    }

    setIsUpdating(true);

    try {
      // Update the database based on entry type
      const result =
        entry.type === "application"
          ? await updateApplicationStatus(entryId, newStatus)
          : await updateNominationStatus(entryId, newStatus);

      if (!result.success) {
        throw new Error(`Failed to update status for ${entry.fullName}`);
      }

      // Update the UI state after successful database update
      addActivity(entryId, newStatus);
      setEntries(
        entries.map((entry) =>
          entry.id === entryId ? { ...entry, status: newStatus } : entry
        )
      );

      toast.success("Status updated", {
        description: `${entry.fullName}'s status was updated to ${newStatus.replace("_", " ")}`,
      });
    } catch (_error) {
      toast.error("Update failed", {
        description:
          "There was an error updating the status. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Update rating of an entry
  const updateRating = async (entryId: string, newRating: number) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry || entry.rating === newRating) {
      return;
    }

    setIsUpdating(true);

    try {
      // Update the database based on entry type
      const result =
        entry.type === "application"
          ? await updateApplicationRating(entryId, newRating)
          : await updateNominationRating(entryId, newRating);

      if (!result.success) {
        throw new Error(`Failed to update rating for ${entry.fullName}`);
      }

      // Update the UI state after successful database update
      setEntries(
        entries.map((entry) =>
          entry.id === entryId ? { ...entry, rating: newRating } : entry
        )
      );

      toast.success("Rating updated", {
        description: `${entry.fullName}'s rating was updated to ${newRating}`,
      });
    } catch (_error) {
      toast.error("Update failed", {
        description:
          "There was an error updating the rating. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Update notes for an entry
  const updateNotes = async (entryId: string, newNotes: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry || entry.notes === newNotes) {
      return;
    }

    setIsUpdating(true);

    try {
      // Update the database based on entry type
      const result =
        entry.type === "application"
          ? await updateApplicationNotes(entryId, newNotes)
          : await updateNominationNotes(entryId, newNotes);

      if (!result.success) {
        throw new Error(`Failed to update notes for ${entry.fullName}`);
      }

      // Update the UI state after successful database update
      setEntries(
        entries.map((entry) =>
          entry.id === entryId ? { ...entry, notes: newNotes } : entry
        )
      );

      toast.success("Notes updated", {
        description: `Notes for ${entry.fullName} were saved successfully`,
      });
    } catch (_error) {
      toast.error("Update failed", {
        description: "There was an error updating the notes. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Toggle flag status for an entry
  const _toggleFlag = async (entryId: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry) {
      return;
    }

    setIsUpdating(true);

    try {
      // Update the database based on entry type
      const result =
        entry.type === "application"
          ? await toggleApplicationFlag(entryId)
          : await toggleNominationFlag(entryId);

      if (!result.success) {
        throw new Error(`Failed to toggle flag for ${entry.fullName}`);
      }

      // Update the UI state after successful database update
      setEntries(
        entries.map((entry) =>
          entry.id === entryId ? { ...entry, flagged: !entry.flagged } : entry
        )
      );

      const action = result.flagged ? "flagged" : "unflagged";
      toast.success(`Entry ${action}`, {
        description: `${entry.fullName} was ${action} successfully`,
      });
    } catch (_error) {
      toast.error("Update failed", {
        description:
          "There was an error updating the flag status. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Generate activity data based on current entries
  const activityData = useMemo(() => {
    // Sort entries by submission date (newest first)
    const sortedEntries = [...entries].sort(
      (a, b) =>
        new Date(b.submissionDate).getTime() -
        new Date(a.submissionDate).getTime()
    );

    return sortedEntries.slice(0, 5).map((entry) => {
      const date = new Date(entry.submissionDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - date.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let activityText = "";
      let icon;
      let bgColor = "";
      let iconColor = "";

      switch (entry.status) {
        case "invited":
          activityText = `${entry.fullName} invited to audition`;
          icon = <Check className="h-4 w-4" />;
          bgColor = "bg-green-100 dark:bg-green-900/30";
          iconColor = "text-green-600 dark:text-green-400";
          break;
        case "shortlisted":
          activityText = `${entry.fullName} shortlisted`;
          icon = <Star className="h-4 w-4" />;
          bgColor = "bg-blue-100 dark:bg-blue-900/30";
          iconColor = "text-blue-600 dark:text-blue-400";
          break;
        case "rejected":
          activityText = `${entry.fullName} application rejected`;
          icon = <X className="h-4 w-4" />;
          bgColor = "bg-red-100 dark:bg-red-900/30";
          iconColor = "text-red-600 dark:text-red-400";
          break;
        case "flagged":
          activityText = `${entry.fullName} flagged for review`;
          icon = <Flag className="h-4 w-4" />;
          bgColor = "bg-orange-100 dark:bg-orange-900/30";
          iconColor = "text-orange-600 dark:text-orange-400";
          break;
        case "contacted":
          activityText = `${entry.fullName} contacted for more info`;
          icon = <PhoneCall className="h-4 w-4" />;
          bgColor = "bg-purple-100 dark:bg-purple-900/30";
          iconColor = "text-purple-600 dark:text-purple-400";
          break;
        default:
          activityText = `New ${entry.type} from ${entry.fullName}`;
          icon = <Clock className="h-4 w-4" />;
          bgColor = "bg-yellow-100 dark:bg-yellow-900/30";
          iconColor = "text-yellow-600 dark:text-yellow-400";
      }

      let timeText;
      if (diffDays === 0) {
        timeText = "Today";
      } else if (diffDays === 1) {
        timeText = "Yesterday";
      } else if (diffDays < 7) {
        timeText = `${diffDays} days ago`;
      } else {
        timeText = date.toLocaleDateString();
      }

      return {
        id: entry.id,
        text: activityText,
        date: entry.submissionDate,
        timeText,
        icon,
        bgColor,
        iconColor,
        type: entry.type,
      };
    });
  }, [entries]);

  // Export data to CSV
  const downloadCSV = (data: SpeakerEntry[], filename: string) => {
    // Define header based on entry type
    const applicationHeaders = [
      "ID",
      "Full Name",
      "Topic",
      "Gender",
      "Job",
      "Mobile Phone",
      "WeChat ID",
      "Prior TED Talk",
      "Status",
      "Flagged",
      "Rating",
      "Notes",
      "Submission Date",
    ];

    const nominationHeaders = [
      "ID",
      "Full Name",
      "Topic",
      "Nominated By",
      "Contact",
      "Prior TED Talk",
      "Status",
      "Flagged",
      "Rating",
      "Notes",
      "Submission Date",
    ];

    // Start with the BOM to handle Unicode characters in Excel
    let csvContent = "\uFEFF";

    // Separate by entry type and export appropriate data
    if (activeTab === "all" || activeTab === "applications") {
      // Applications export
      const applicationsData = data.filter(
        (entry) => entry.type === "application"
      );

      if (applicationsData.length > 0) {
        csvContent += `${applicationHeaders.join(",")}\n`;

        applicationsData.forEach((entry) => {
          const appEntry = entry as ApplicationEntry;
          const row = [
            `"${appEntry.id}"`,
            `"${appEntry.fullName.replace(/"/g, '""')}"`,
            `"${appEntry.topic.replace(/"/g, '""')}"`,
            `"${appEntry.gender}"`,
            `"${appEntry.job.replace(/"/g, '""')}"`,
            `"${appEntry.mobilePhone}"`,
            `"${appEntry.wechatId}"`,
            `"${appEntry.priorTedTalk ? appEntry.priorTedTalk.replace(/"/g, '""') : ""}"`,
            `"${appEntry.status.replace(/_/g, " ")}"`,
            `"${appEntry.flagged ? "Yes" : "No"}"`,
            `"${appEntry.rating}"`,
            `"${appEntry.notes ? appEntry.notes.replace(/"/g, '""') : ""}"`,
            `"${new Date(appEntry.submissionDate).toLocaleDateString()}"`,
          ].join(",");
          csvContent += `${row}\n`;
        });

        // If only applications tab, download now
        if (activeTab === "applications") {
          const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.setAttribute("href", url);
          link.setAttribute("download", `${filename}_applications.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }
      }
    }

    if (activeTab === "all" || activeTab === "nominations") {
      // Nominations export
      const nominationsData = data.filter(
        (entry) => entry.type === "nomination"
      );

      if (nominationsData.length > 0) {
        // If doing both, add a separation
        if (activeTab === "all" && csvContent.length > 1) {
          csvContent += "\n\nNOMINATIONS\n";
        }

        csvContent += `${nominationHeaders.join(",")}\n`;

        nominationsData.forEach((entry) => {
          const nomEntry = entry as NominationEntry;
          const row = [
            `"${nomEntry.id}"`,
            `"${nomEntry.fullName.replace(/"/g, '""')}"`,
            `"${nomEntry.topic.replace(/"/g, '""')}"`,
            `"${nomEntry.nominatedBy.replace(/"/g, '""')}"`,
            `"${nomEntry.contact.replace(/"/g, '""')}"`,
            `"${nomEntry.priorTedTalk ? nomEntry.priorTedTalk.replace(/"/g, '""') : ""}"`,
            `"${nomEntry.status.replace(/_/g, " ")}"`,
            `"${nomEntry.flagged ? "Yes" : "No"}"`,
            `"${nomEntry.rating}"`,
            `"${nomEntry.notes ? nomEntry.notes.replace(/"/g, '""') : ""}"`,
            `"${new Date(nomEntry.submissionDate).toLocaleDateString()}"`,
          ].join(",");
          csvContent += `${row}\n`;
        });
      }
    }

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Rest of the component remains the same...

  return (
    // The rest of your component's JSX remains the same...
    <div className="container mx-auto max-w-7xl py-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Speaker Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage speaker applications and nominations
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* User dropdown with logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center gap-2 border-dashed"
                variant="outline"
              >
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary/10 text-xs">
                    {user.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden font-medium text-sm md:inline-block">
                  {user.name || user.email}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex justify-between text-muted-foreground"
                disabled
              >
                <span>Role</span>
                <span className="font-medium">Admin</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between text-muted-foreground"
                disabled
              >
                <span>Email</span>
                <span className="max-w-[180px] truncate font-medium">
                  {user.email}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-600 focus:text-red-50"
                onClick={async () => {
                  await signOut();
                  router.push("/sign-in");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => downloadCSV(entries, "speaker_entries")}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Total Applications
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalApplications}</div>
            <p className="mt-1 text-muted-foreground text-xs">
              +{applicationsSinceLastWeek} since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Total Nominations
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalNominations}</div>
            <p className="mt-1 text-muted-foreground text-xs">
              +{nominationsSinceLastWeek} since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Shortlisted</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalShortlisted}</div>
            <p className="mt-1 text-muted-foreground text-xs">
              {percentageShortlisted}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Invited to Speak
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalInvited}</div>
            <p className="mt-1 text-muted-foreground text-xs">
              {totalInvited} out of {totalSlots} slots filled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs
        className="space-y-4"
        defaultValue="all"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <div className="flex items-center justify-between">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="all">All Entries</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="nominations">Nominations</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            {/* Add Create Entry Button (moved beside Columns) */}
            <Button
              onClick={() => {
                setSelectedEntry(null);
                setEditMode(true);
                setEntryFormOpen(true);
              }}
              variant="outline"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Entry
            </Button>

            {/* Add bulk action button */}
            {Object.keys(rowSelection).length > 0 && (
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setBulkActionOpen(true)}
                variant="default"
              >
                Bulk Update ({Object.keys(rowSelection).length})
              </Button>
            )}

            {/* Column visibility dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-9" size="sm" variant="outline">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Columns
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {columns
                  .filter(
                    (column) => column.id !== "drag" && column.id !== "select"
                  )
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      checked={
                        column.id
                          ? columnVisibility[column.id] !== false
                          : false
                      }
                      className="capitalize"
                      key={column.id}
                      onCheckedChange={(checked) => {
                        if (column.id) {
                          setColumnVisibility((prev) => ({
                            ...prev,
                            [column.id as string]: checked,
                          }));
                        }
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative">
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="w-[250px] pl-8"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or topic..."
                type="search"
                value={searchQuery}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex gap-1" variant="outline">
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="p-2">
                  <p className="mb-1 font-medium text-sm">Status</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {/* Add an "All" option */}
                    <Badge
                      className={`cursor-pointer ${
                        statusFilter.includes("all")
                          ? "bg-primary/90 hover:bg-primary/70"
                          : "hover:bg-primary/10"
                      }`}
                      key="all"
                      onClick={() => {
                        // If "all" is clicked, only select "all"
                        setStatusFilter(["all"]);
                      }}
                      variant={
                        statusFilter.includes("all") ? "default" : "outline"
                      }
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-gray-400" />
                        All Statuses
                      </div>
                    </Badge>

                    {statusOptions.map((option) => (
                      <Badge
                        className={`cursor-pointer ${
                          statusFilter.includes(option.value)
                            ? "bg-primary/90 hover:bg-primary/70"
                            : "hover:bg-primary/10"
                        }`}
                        key={option.value}
                        onClick={() => {
                          if (statusFilter.includes(option.value)) {
                            // Remove this status if it's already selected
                            const newFilters = statusFilter.filter(
                              (s) => s !== option.value
                            );
                            // If removing the last specific status, revert to "all"
                            setStatusFilter(
                              newFilters.length === 0 ? ["all"] : newFilters
                            );
                          } else {
                            // Add this status and remove "all" if it's present
                            const newFilters = [
                              ...statusFilter.filter((s) => s !== "all"),
                              option.value,
                            ];
                            setStatusFilter(newFilters);
                          }
                        }}
                        variant={
                          statusFilter.includes(option.value)
                            ? "default"
                            : "outline"
                        }
                      >
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              option.value === "under_review"
                                ? "bg-yellow-400"
                                : option.value === "shortlisted"
                                  ? "bg-blue-400"
                                  : option.value === "invited"
                                    ? "bg-green-500"
                                    : option.value === "rejected"
                                      ? "bg-red-500"
                                      : option.value === "contacted"
                                        ? "bg-purple-400"
                                        : option.value === "flagged"
                                          ? "bg-orange-400"
                                          : "bg-gray-400"
                            }`}
                          />
                          {option.label}
                        </div>
                      </Badge>
                    ))}

                    {statusFilter.length > 0 &&
                      !(
                        statusFilter.length === 1 && statusFilter[0] === "all"
                      ) && (
                        <Badge
                          className="cursor-pointer border-dashed hover:bg-destructive/10"
                          onClick={() => setStatusFilter(["all"])}
                          variant="outline"
                        >
                          Clear
                        </Badge>
                      )}
                  </div>
                </div>

                <div className="p-2">
                  <p className="mb-1 font-medium text-sm">Type</p>
                  <Select onValueChange={setTypeFilter} value={typeFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="application">Applications</SelectItem>
                      <SelectItem value="nomination">Nominations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button
                    className="w-full"
                    onClick={() => {
                      setStatusFilter(["all"]);
                      setTypeFilter("all");
                      setSearchQuery("");
                    }}
                    variant="outline"
                  >
                    Reset Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent className="space-y-4" value="all">
          <Card>
            <CardContent className="p-0">
              <DataTable
                columns={columns}
                columnVisibility={columnVisibility}
                data={filteredEntries}
                onRowClick={openDetails}
                onRowSelectionChange={setRowSelection}
                onTableChange={setAllEntriesTable}
                rowSelection={rowSelection}
                setColumnVisibility={setColumnVisibility}
                updateRating={updateRating}
                updateStatus={updateStatus}
              />
            </CardContent>
            <div className="flex items-center justify-between border-t px-4 py-3">
              <div className="flex items-center space-x-4">
                <p className="text-muted-foreground text-sm">
                  Showing{" "}
                  {allEntriesTable
                    ? `${allEntriesTable.getState().pagination.pageIndex * allEntriesTable.getState().pagination.pageSize + 1}-${Math.min((allEntriesTable.getState().pagination.pageIndex + 1) * allEntriesTable.getState().pagination.pageSize, filteredEntries.length)} of ${filteredEntries.length} entries`
                    : `${filteredEntries.length} entries`}
                </p>
                {allEntriesTable && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">Rows per page</span>
                    <Select
                      onValueChange={(value) => {
                        allEntriesTable.setPageSize(Number(value));
                        triggerUpdate();
                      }}
                      value={`${allEntriesTable.getState().pagination.pageSize}`}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {allEntriesTable && (
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">
                    Page {allEntriesTable.getState().pagination.pageIndex + 1}{" "}
                    of {allEntriesTable.getPageCount()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!allEntriesTable.getCanPreviousPage()}
                      onClick={() => {
                        allEntriesTable.setPageIndex(0);
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {"<<"}
                    </Button>
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!allEntriesTable.getCanPreviousPage()}
                      onClick={() => {
                        allEntriesTable.previousPage();
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {"<"}
                    </Button>
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!allEntriesTable.getCanNextPage()}
                      onClick={() => {
                        allEntriesTable.nextPage();
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {">"}
                    </Button>
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!allEntriesTable.getCanNextPage()}
                      onClick={() => {
                        allEntriesTable.setPageIndex(
                          allEntriesTable.getPageCount() - 1
                        );
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {">>"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardContent className="p-0">
              <DataTable
                columns={columns}
                columnVisibility={columnVisibility}
                data={filteredEntries.filter((e) => e.type === "application")}
                onRowClick={openDetails}
                onRowSelectionChange={setRowSelection}
                onTableChange={setApplicationsTable}
                rowSelection={rowSelection}
                setColumnVisibility={setColumnVisibility}
                updateRating={updateRating}
                updateStatus={updateStatus}
              />
            </CardContent>
            <div className="flex items-center justify-between border-t px-4 py-3">
              <div className="flex items-center space-x-4">
                <p className="text-muted-foreground text-sm">
                  Showing{" "}
                  {applicationsTable
                    ? `${applicationsTable.getState().pagination.pageIndex * applicationsTable.getState().pagination.pageSize + 1}-${Math.min((applicationsTable.getState().pagination.pageIndex + 1) * applicationsTable.getState().pagination.pageSize, filteredEntries.filter((e) => e.type === "application").length)} of ${filteredEntries.filter((e) => e.type === "application").length} applications`
                    : `${filteredEntries.filter((e) => e.type === "application").length} applications`}
                </p>
                {applicationsTable && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">Rows per page</span>
                    <Select
                      onValueChange={(value) => {
                        applicationsTable.setPageSize(Number(value));
                        triggerUpdate();
                      }}
                      value={`${applicationsTable.getState().pagination.pageSize}`}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {applicationsTable && (
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">
                    Page {applicationsTable.getState().pagination.pageIndex + 1}{" "}
                    of {applicationsTable.getPageCount()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!applicationsTable.getCanPreviousPage()}
                      onClick={() => {
                        applicationsTable.setPageIndex(0);
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {"<<"}
                    </Button>
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!applicationsTable.getCanPreviousPage()}
                      onClick={() => {
                        applicationsTable.previousPage();
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {"<"}
                    </Button>
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!applicationsTable.getCanNextPage()}
                      onClick={() => {
                        applicationsTable.nextPage();
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {">"}
                    </Button>
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!applicationsTable.getCanNextPage()}
                      onClick={() => {
                        applicationsTable.setPageIndex(
                          applicationsTable.getPageCount() - 1
                        );
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {">>"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="nominations">
          <Card>
            <CardContent className="p-0">
              <DataTable
                columns={columns}
                columnVisibility={columnVisibility}
                data={filteredEntries.filter((e) => e.type === "nomination")}
                onRowClick={openDetails}
                onRowSelectionChange={setRowSelection}
                onTableChange={setNominationsTable}
                rowSelection={rowSelection}
                setColumnVisibility={setColumnVisibility}
                updateRating={updateRating}
                updateStatus={updateStatus}
              />
            </CardContent>
            <div className="flex items-center justify-between border-t px-4 py-3">
              <div className="flex items-center space-x-4">
                <p className="text-muted-foreground text-sm">
                  Showing{" "}
                  {nominationsTable
                    ? `${nominationsTable.getState().pagination.pageIndex * nominationsTable.getState().pagination.pageSize + 1}-${Math.min((nominationsTable.getState().pagination.pageIndex + 1) * nominationsTable.getState().pagination.pageSize, filteredEntries.filter((e) => e.type === "nomination").length)} of ${filteredEntries.filter((e) => e.type === "nomination").length} nominations`
                    : `${filteredEntries.filter((e) => e.type === "nomination").length} nominations`}
                </p>
                {nominationsTable && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">Rows per page</span>
                    <Select
                      onValueChange={(value) => {
                        nominationsTable.setPageSize(Number(value));
                        triggerUpdate();
                      }}
                      value={`${nominationsTable.getState().pagination.pageSize}`}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {nominationsTable && (
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">
                    Page {nominationsTable.getState().pagination.pageIndex + 1}{" "}
                    of {nominationsTable.getPageCount()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!nominationsTable.getCanPreviousPage()}
                      onClick={() => {
                        nominationsTable.setPageIndex(0);
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {"<<"}
                    </Button>
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!nominationsTable.getCanPreviousPage()}
                      onClick={() => {
                        nominationsTable.previousPage();
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {"<"}
                    </Button>
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!nominationsTable.getCanNextPage()}
                      onClick={() => {
                        nominationsTable.nextPage();
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {">"}
                    </Button>
                    <Button
                      className="h-8 w-8 p-0"
                      disabled={!nominationsTable.getCanNextPage()}
                      onClick={() => {
                        nominationsTable.setPageIndex(
                          nominationsTable.getPageCount() - 1
                        );
                        triggerUpdate();
                      }}
                      variant="outline"
                    >
                      {">>"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Activity Section */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Status Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-muted-foreground" />
              <span>Entry Status Distribution</span>
            </CardTitle>
            <CardDescription>
              Current state of applications and nominations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center">
              <ResponsiveContainer height="100%" width="100%">
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={[
                      {
                        name: "Under Review",
                        value: entries.filter(
                          (e) => e.status === "under_review"
                        ).length,
                        color: "#EAB308",
                      },
                      {
                        name: "Shortlisted",
                        value: entries.filter((e) => e.status === "shortlisted")
                          .length,
                        color: "#3B82F6",
                      },
                      {
                        name: "Invited",
                        value: entries.filter((e) => e.status === "invited")
                          .length,
                        color: "#22C55E",
                      },
                      {
                        name: "Rejected",
                        value: entries.filter((e) => e.status === "rejected")
                          .length,
                        color: "#EF4444",
                      },
                      {
                        name: "Contacted",
                        value: entries.filter((e) => e.status === "contacted")
                          .length,
                        color: "#8B5CF6",
                      },
                      {
                        name: "Flagged",
                        value: entries.filter((e) => e.status === "flagged")
                          .length,
                        color: "#F97316",
                      },
                    ]}
                    dataKey="value"
                    fill="#8884d8"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={3}
                  >
                    {entries
                      .map((entry) => entry.status)
                      .filter(
                        (value, index, self) => self.indexOf(value) === index
                      )
                      .map((status, index) => (
                        <Cell
                          fill={
                            status === "under_review"
                              ? "#EAB308"
                              : status === "shortlisted"
                                ? "#3B82F6"
                                : status === "invited"
                                  ? "#22C55E"
                                  : status === "rejected"
                                    ? "#EF4444"
                                    : status === "contacted"
                                      ? "#8B5CF6"
                                      : status === "flagged"
                                        ? "#F97316"
                                        : "#94A3B8"
                          }
                          key={`cell-${index}`}
                        />
                      ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem",
                    }}
                    formatter={(value) => [`${value} entries`, "Count"]}
                  />
                  <Legend
                    align="right"
                    formatter={(value) => (
                      <span className="text-xs">{value}</span>
                    )}
                    iconSize={8}
                    iconType="circle"
                    layout="vertical"
                    verticalAlign="middle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest updates on speakers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {activities.length > 0 ? (
                activities.map((activity) => {
                  // Find the corresponding entry
                  const entry = entries.find((e) => e.id === activity.entryId);
                  if (!entry) {
                    return null;
                  }

                  // Generate visual elements based on status
                  let icon;
                  let bgColor = "";
                  let iconColor = "";

                  switch (activity.status) {
                    case "invited":
                      icon = <Check className="h-4 w-4" />;
                      bgColor = "bg-green-100 dark:bg-green-900/30";
                      iconColor = "text-green-600 dark:text-green-400";
                      break;
                    case "shortlisted":
                      icon = <Star className="h-4 w-4" />;
                      bgColor = "bg-blue-100 dark:bg-blue-900/30";
                      iconColor = "text-blue-600 dark:text-blue-400";
                      break;
                    case "rejected":
                      icon = <X className="h-4 w-4" />;
                      bgColor = "bg-red-100 dark:bg-red-900/30";
                      iconColor = "text-red-600 dark:text-red-400";
                      break;
                    case "flagged":
                      icon = <Flag className="h-4 w-4" />;
                      bgColor = "bg-orange-100 dark:bg-orange-900/30";
                      iconColor = "text-orange-600 dark:text-orange-400";
                      break;
                    case "contacted":
                      icon = <PhoneCall className="h-4 w-4" />;
                      bgColor = "bg-purple-100 dark:bg-purple-900/30";
                      iconColor = "text-purple-600 dark:text-purple-400";
                      break;
                    default:
                      icon = <Clock className="h-4 w-4" />;
                      bgColor = "bg-yellow-100 dark:bg-yellow-900/30";
                      iconColor = "text-yellow-600 dark:text-yellow-400";
                  }

                  // Format timestamp
                  const now = new Date();
                  const timestamp = activity.timestamp;
                  const diffMs = now.getTime() - timestamp.getTime();
                  const diffMins = Math.floor(diffMs / 60_000);
                  const diffHours = Math.floor(diffMins / 60);
                  const diffDays = Math.floor(diffHours / 24);

                  let timeText;
                  if (diffMins < 1) {
                    timeText = "Just now";
                  } else if (diffMins < 60) {
                    timeText = `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
                  } else if (diffHours < 24) {
                    timeText = `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
                  } else if (diffDays === 1) {
                    timeText = "Yesterday";
                  } else {
                    timeText = timestamp.toLocaleDateString();
                  }

                  return (
                    <div
                      className="group flex animate-fadeIn cursor-default items-start gap-4"
                      key={activity.id}
                    >
                      <div
                        className={`rounded-full p-2 ${bgColor} transition-transform group-hover:scale-110`}
                      >
                        <div className={iconColor}>{icon}</div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-sm">{activity.text}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-muted-foreground text-xs">
                            {timeText}
                          </p>
                          <Badge
                            className={
                              activity.type === "application"
                                ? "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                : "border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                            }
                            variant="outline"
                          >
                            {activity.type === "application"
                              ? "Application"
                              : "Nomination"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : activityData.length > 0 ? (
                // Show initial activity data if there are no status change activities yet
                activityData.map((activity) => (
                  <div
                    className="group flex cursor-default items-start gap-4"
                    key={activity.id}
                  >
                    <div
                      className={`rounded-full p-2 ${activity.bgColor} transition-transform group-hover:scale-110`}
                    >
                      <div className={activity.iconColor}>{activity.icon}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{activity.text}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-muted-foreground text-xs">
                          {activity.timeText}
                        </p>
                        <Badge
                          className={
                            activity.type === "application"
                              ? "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                              : "border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                          }
                          variant="outline"
                        >
                          {activity.type === "application"
                            ? "Application"
                            : "Nomination"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Details Modal */}
      <Dialog onOpenChange={setDetailsOpen} open={detailsOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          {selectedEntry && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10">
                      {selectedEntry.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">
                      {selectedEntry.fullName}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedEntry.type === "application"
                        ? `${(selectedEntry as ApplicationEntry).job} • ${(selectedEntry as ApplicationEntry).gender}`
                        : `Nominated by ${(selectedEntry as NominationEntry).nominatedBy}`}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-medium text-lg">Entry Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-muted-foreground text-sm">
                        Topic
                      </p>
                      <p>{selectedEntry.topic}</p>
                    </div>

                    <div>
                      <p className="font-medium text-muted-foreground text-sm">
                        Prior TED/TEDx Experience
                      </p>
                      <p>{selectedEntry.priorTedTalk}</p>
                    </div>

                    <div>
                      <p className="font-medium text-muted-foreground text-sm">
                        Submission Date
                      </p>
                      <p>
                        {new Date(
                          selectedEntry.submissionDate
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {selectedEntry.type === "application" && (
                      <>
                        <div>
                          <p className="font-medium text-muted-foreground text-sm">
                            Contact Information
                          </p>
                          <p>
                            Email: {(selectedEntry as ApplicationEntry).email}
                          </p>
                          <p>
                            Mobile:{" "}
                            {(selectedEntry as ApplicationEntry).mobilePhone}
                          </p>
                          <p>
                            WeChat:{" "}
                            {(selectedEntry as ApplicationEntry).wechatId}
                          </p>
                        </div>

                        <div>
                          <p className="font-medium text-muted-foreground text-sm">
                            Rehearsal Availability (Sep-Nov)
                          </p>
                          <p>
                            {
                              (selectedEntry as ApplicationEntry)
                                .rehearsalAvailability
                            }
                          </p>
                        </div>
                      </>
                    )}

                    {selectedEntry.type === "nomination" && (
                      <div>
                        <p className="font-medium text-muted-foreground text-sm">
                          Contact Information
                        </p>
                        <p>{(selectedEntry as NominationEntry).contact}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Structured Idea Framework - Only for applications */}
                {selectedEntry.type === "application" && (
                  <div className="col-span-1 md:col-span-2">
                    <h3 className="mb-2 font-medium text-lg">
                      Structured Idea Framework
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="mb-1 font-medium text-muted-foreground text-sm">
                          1. Common Belief/Behavior to Challenge
                        </p>
                        <p className="rounded-md bg-muted/50 p-3 text-sm">
                          {(selectedEntry as ApplicationEntry).commonBelief ||
                            "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 font-medium text-muted-foreground text-sm">
                          2. Core Idea
                        </p>
                        <p className="rounded-md bg-muted/50 p-3 text-sm">
                          {(selectedEntry as ApplicationEntry).coreIdea ||
                            "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 font-medium text-muted-foreground text-sm">
                          3. Personal Insight/Example
                        </p>
                        <p className="rounded-md bg-muted/50 p-3 text-sm">
                          {(selectedEntry as ApplicationEntry)
                            .personalInsight || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 font-medium text-muted-foreground text-sm">
                          4. Potential Impact
                        </p>
                        <p className="rounded-md bg-muted/50 p-3 text-sm">
                          {(selectedEntry as ApplicationEntry)
                            .potentialImpact || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="mb-2 font-medium text-lg">Review & Status</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-muted-foreground text-sm">
                        Current Status
                      </p>
                      <Select
                        disabled={isUpdating}
                        onValueChange={(value) =>
                          updateStatus(selectedEntry.id, value)
                        }
                        value={selectedEntry.status}
                      >
                        <SelectTrigger className="mt-1 h-10 w-full">
                          <SelectValue>
                            <StatusBadge status={selectedEntry.status} />
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={option.value}
                              value={option.value}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2 w-2 rounded-full ${
                                    option.value === "under_review"
                                      ? "bg-yellow-400"
                                      : option.value === "shortlisted"
                                        ? "bg-blue-400"
                                        : option.value === "invited"
                                          ? "bg-green-500"
                                          : option.value === "rejected"
                                            ? "bg-red-500"
                                            : option.value === "contacted"
                                              ? "bg-purple-400"
                                              : option.value === "flagged"
                                                ? "bg-orange-400"
                                                : "bg-gray-400"
                                  }`}
                                />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <p className="font-medium text-muted-foreground text-sm">
                        Rating
                      </p>
                      <div className="mt-1">
                        <Rating
                          disabled={isUpdating}
                          onChange={(newRating) =>
                            updateRating(selectedEntry.id, newRating)
                          }
                          rating={selectedEntry.rating}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-muted-foreground text-sm">
                        Notes
                      </p>
                      <Textarea
                        className="mt-1 min-h-[100px] w-full"
                        disabled={isUpdating}
                        onChange={(e) => {
                          // Update the notes in the selected entry state first for immediate feedback
                          setSelectedEntry({
                            ...selectedEntry,
                            notes: e.target.value,
                          });
                        }}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Add your notes about this speaker..."
                        value={selectedEntry.notes || ""}
                      />
                      <div className="mt-2 flex justify-end gap-2">
                        <Button
                          disabled={isUpdating}
                          onClick={() => {
                            updateNotes(
                              selectedEntry.id,
                              selectedEntry.notes || ""
                            );
                          }}
                          size="sm"
                        >
                          Save Notes
                        </Button>
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            // Close details view
                            setDetailsOpen(false);
                            // Open edit form
                            openEditForm(selectedEntry);
                          }}
                          size="sm"
                          variant="default"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Entry
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 flex gap-2 md:gap-0">
                <Button onClick={() => setDetailsOpen(false)} variant="outline">
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Bulk Action Modal */}
      <Dialog onOpenChange={setBulkActionOpen} open={bulkActionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bulk Update Status</DialogTitle>
            <DialogDescription>
              Update status for {Object.keys(rowSelection).length} selected{" "}
              {Object.keys(rowSelection).length === 1 ? "entry" : "entries"}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bulk-status">New Status</Label>
              <Select
                disabled={isUpdating}
                onValueChange={(value) => setNewBulkStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            option.value === "under_review"
                              ? "bg-yellow-400"
                              : option.value === "shortlisted"
                                ? "bg-blue-400"
                                : option.value === "invited"
                                  ? "bg-green-500"
                                  : option.value === "rejected"
                                    ? "bg-red-500"
                                    : option.value === "contacted"
                                      ? "bg-purple-400"
                                      : option.value === "flagged"
                                        ? "bg-orange-400"
                                        : "bg-gray-400"
                          }`}
                        />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              disabled={isUpdating}
              onClick={() => {
                setRowSelection({});
                setBulkActionOpen(false);
              }}
              type="button"
              variant="destructive"
            >
              Clear Selection
            </Button>
            <Button
              disabled={isUpdating}
              onClick={async () => {
                if (!newBulkStatus) {
                  toast.error("Please select a status", {
                    description: "You must select a status before confirming.",
                  });
                  return;
                }

                setIsUpdating(true);
                try {
                  // Get the current visible data based on active tab
                  let dataToUse = filteredEntries;

                  if (activeTab === "applications") {
                    dataToUse = filteredEntries.filter(
                      (e) => e.type === "application"
                    );
                  } else if (activeTab === "nominations") {
                    dataToUse = filteredEntries.filter(
                      (e) => e.type === "nomination"
                    );
                  }

                  // Convert row indices to actual entry objects
                  const selectedEntryIds = Object.keys(rowSelection)
                    .map((index) => {
                      const idx = Number.parseInt(index, 10);
                      return idx >= 0 && idx < dataToUse.length
                        ? dataToUse[idx].id
                        : null;
                    })
                    .filter(Boolean) as string[];

                  // For each selected entry
                  for (const id of selectedEntryIds) {
                    const entry = entries.find((e) => e.id === id);
                    if (!entry) {
                      continue;
                    }

                    // Update in database
                    const result =
                      entry.type === "application"
                        ? await updateApplicationStatus(id, newBulkStatus)
                        : await updateNominationStatus(id, newBulkStatus);

                    if (!result.success) {
                      throw new Error(
                        `Failed to update status for entry ${id}`
                      );
                    }

                    // Add to activity log
                    addActivity(id, newBulkStatus);
                  }

                  // Update all entries in state
                  setEntries(
                    entries.map((entry) => {
                      if (selectedEntryIds.includes(entry.id)) {
                        return { ...entry, status: newBulkStatus };
                      }
                      return entry;
                    })
                  );

                  toast.success("Bulk update complete", {
                    description: `Updated ${selectedEntryIds.length} entries to ${newBulkStatus.replace("_", " ")}`,
                  });
                } catch (_error) {
                  toast.error("Bulk update failed", {
                    description:
                      "There was an error updating some entries. Please try again.",
                  });
                } finally {
                  // Close dialog and clear selection
                  setBulkActionOpen(false);
                  setRowSelection({});
                  setNewBulkStatus("");
                  setIsUpdating(false);
                }
              }}
              type="button"
              variant="default"
            >
              {isUpdating ? "Updating..." : "Confirm Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Entry Form Modal - For Creating and Editing Entries */}
      <Dialog onOpenChange={setEntryFormOpen} open={entryFormOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode
                ? selectedEntry
                  ? "Edit Entry"
                  : "Create New Entry"
                : "View Entry"}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? selectedEntry
                  ? "Edit the details of this speaker entry"
                  : "Create a new speaker application or nomination"
                : "View speaker details"}
            </DialogDescription>
          </DialogHeader>

          {/* Entry Type Selector - Only show when creating a new entry */}
          {editMode && !selectedEntry && (
            <div className="mb-6">
              <Label className="mb-2 block">Entry Type</Label>
              <div className="flex space-x-4">
                <div
                  className={`flex-1 cursor-pointer rounded-lg border p-4 transition ${
                    entryType === "application"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setEntryType("application")}
                >
                  <div className="mb-1 font-medium">Application</div>
                  <div className="text-muted-foreground text-sm">
                    Speaker applied directly through the website
                  </div>
                </div>
                <div
                  className={`flex-1 cursor-pointer rounded-lg border p-4 transition ${
                    entryType === "nomination"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setEntryType("nomination")}
                >
                  <div className="mb-1 font-medium">Nomination</div>
                  <div className="text-muted-foreground text-sm">
                    Speaker nominated by someone else
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  className="mt-1"
                  disabled={!editMode || isUpdating}
                  id="fullName"
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Full name of the speaker"
                  value={formData.fullName}
                />
              </div>

              <div>
                <Label htmlFor="topic">Talk Topic</Label>
                <Input
                  className="mt-1"
                  disabled={!editMode || isUpdating}
                  id="topic"
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  placeholder="Main topic or title of the talk"
                  value={formData.topic}
                />
              </div>

              <div>
                <Label htmlFor="priorTedTalk">Prior TED/TEDx Experience</Label>
                <Input
                  className="mt-1"
                  disabled={!editMode || isUpdating}
                  id="priorTedTalk"
                  onChange={(e) =>
                    setFormData({ ...formData, priorTedTalk: e.target.value })
                  }
                  placeholder="Any previous TED or TEDx talks"
                  value={formData.priorTedTalk}
                />
              </div>

              {/* Application specific fields */}
              {(entryType === "application" ||
                (selectedEntry && selectedEntry.type === "application")) && (
                <>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      disabled={!editMode || isUpdating}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                      value={formData.gender}
                    >
                      <SelectTrigger className="mt-1" id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="job">Job Title</Label>
                    <Input
                      className="mt-1"
                      disabled={!editMode || isUpdating}
                      id="job"
                      onChange={(e) =>
                        setFormData({ ...formData, job: e.target.value })
                      }
                      placeholder="Current position or job title"
                      value={formData.job}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              {/* Application specific fields */}
              {(entryType === "application" ||
                (selectedEntry && selectedEntry.type === "application")) && (
                <>
                  <div>
                    <Label htmlFor="mobilePhone">Mobile Phone</Label>
                    <Input
                      className="mt-1"
                      disabled={!editMode || isUpdating}
                      id="mobilePhone"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobilePhone: e.target.value,
                        })
                      }
                      placeholder="Mobile phone number"
                      value={formData.mobilePhone}
                    />
                  </div>

                  <div>
                    <Label htmlFor="wechatId">WeChat ID</Label>
                    <Input
                      className="mt-1"
                      disabled={!editMode || isUpdating}
                      id="wechatId"
                      onChange={(e) =>
                        setFormData({ ...formData, wechatId: e.target.value })
                      }
                      placeholder="WeChat ID for contact"
                      value={formData.wechatId}
                    />
                  </div>
                </>
              )}

              {/* Nomination specific fields */}
              {(entryType === "nomination" ||
                (selectedEntry && selectedEntry.type === "nomination")) && (
                <>
                  <div>
                    <Label htmlFor="nominatedBy">Nominated By</Label>
                    <Input
                      className="mt-1"
                      disabled={!editMode || isUpdating}
                      id="nominatedBy"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nominatedBy: e.target.value,
                        })
                      }
                      placeholder="Name of the person who nominated"
                      value={formData.nominatedBy}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact">Contact Information</Label>
                    <Input
                      className="mt-1"
                      disabled={!editMode || isUpdating}
                      id="contact"
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      placeholder="Contact information for the speaker"
                      value={formData.contact}
                    />
                  </div>
                </>
              )}

              {/* Status field - shown for both types */}
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  disabled={!editMode || isUpdating}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  value={formData.status}
                >
                  <SelectTrigger className="mt-1" id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-between">
            <Button
              disabled={isUpdating}
              onClick={() => {
                setEntryFormOpen(false);
                // Reset form data
                if (!selectedEntry) {
                  setFormData({
                    fullName: "",
                    topic: "",
                    priorTedTalk: "",
                    status: "under_review",
                    mobilePhone: "",
                    wechatId: "",
                    gender: "Male",
                    job: "",
                    contact: "",
                    nominatedBy: "",
                  });
                }
              }}
              variant="outline"
            >
              Cancel
            </Button>

            {editMode ? (
              <Button
                disabled={isUpdating}
                onClick={async () => {
                  setIsUpdating(true);

                  try {
                    // Validate form data
                    if (!formData.fullName) {
                      throw new Error("Full name is required");
                    }
                    if (!formData.topic) {
                      throw new Error("Topic is required");
                    }

                    // Special validation for specific types
                    if (
                      entryType === "application" ||
                      (selectedEntry && selectedEntry.type === "application")
                    ) {
                      if (!formData.mobilePhone) {
                        throw new Error("Mobile phone is required");
                      }
                      if (!formData.job) {
                        throw new Error("Job title is required");
                      }
                    }

                    if (
                      entryType === "nomination" ||
                      (selectedEntry && selectedEntry.type === "nomination")
                    ) {
                      if (!formData.nominatedBy) {
                        throw new Error("Nominator name is required");
                      }
                      if (!formData.contact) {
                        throw new Error("Contact information is required");
                      }
                    }

                    let result;

                    // If we're editing an existing entry
                    if (selectedEntry) {
                      if (selectedEntry.type === "application") {
                        result = await updateApplicationDetails(
                          selectedEntry.id,
                          {
                            fullName: formData.fullName,
                            topic: formData.topic,
                            mobilePhone: formData.mobilePhone,
                            wechatId: formData.wechatId,
                            gender: formData.gender,
                            job: formData.job,
                            priorTedTalk: formData.priorTedTalk,
                          }
                        );

                        // Update status if it changed
                        if (selectedEntry.status !== formData.status) {
                          await updateApplicationStatus(
                            selectedEntry.id,
                            formData.status
                          );
                        }
                      } else {
                        result = await updateNominationDetails(
                          selectedEntry.id,
                          {
                            fullName: formData.fullName,
                            topic: formData.topic,
                            contact: formData.contact,
                            nominatedBy: formData.nominatedBy,
                            priorTedTalk: formData.priorTedTalk,
                          }
                        );

                        // Update status if it changed
                        if (selectedEntry.status !== formData.status) {
                          await updateNominationStatus(
                            selectedEntry.id,
                            formData.status
                          );
                        }
                      }

                      if (!result.success) {
                        throw new Error(
                          `Failed to update ${selectedEntry.type}`
                        );
                      }

                      // Update the entry in state
                      setEntries(
                        entries.map((entry) => {
                          if (entry.id === selectedEntry.id) {
                            if (entry.type === "application") {
                              const updatedEntry = {
                                ...entry,
                                fullName: formData.fullName,
                                topic: formData.topic,
                                mobilePhone: formData.mobilePhone,
                                wechatId: formData.wechatId,
                                gender: formData.gender,
                                job: formData.job,
                                priorTedTalk: formData.priorTedTalk,
                                status: formData.status,
                              };
                              return updatedEntry;
                            }
                            const updatedEntry = {
                              ...entry,
                              fullName: formData.fullName,
                              topic: formData.topic,
                              contact: formData.contact,
                              nominatedBy: formData.nominatedBy,
                              priorTedTalk: formData.priorTedTalk,
                              status: formData.status,
                            };
                            return updatedEntry;
                          }
                          return entry;
                        })
                      );

                      toast.success("Entry updated", {
                        description: `${formData.fullName}'s information was updated successfully`,
                      });
                    }
                    // Creating a new entry
                    else {
                      if (entryType === "application") {
                        result = await createDashboardApplication({
                          fullName: formData.fullName,
                          topic: formData.topic,
                          mobilePhone: formData.mobilePhone,
                          wechatId: formData.wechatId,
                          gender: formData.gender,
                          job: formData.job,
                          priorTedTalk: formData.priorTedTalk,
                          status: formData.status,
                        });
                      } else {
                        result = await createDashboardNomination({
                          fullName: formData.fullName,
                          topic: formData.topic,
                          contact: formData.contact,
                          nominatedBy: formData.nominatedBy,
                          priorTedTalk: formData.priorTedTalk,
                          status: formData.status,
                        });
                      }

                      if (!result.success) {
                        throw new Error(`Failed to create ${entryType}`);
                      }

                      // Add the new entry to state
                      if (result.success && result.data) {
                        // Need to properly type the new entry based on entry type
                        let newEntry: SpeakerEntry;

                        if (entryType === "application") {
                          newEntry = {
                            ...result.data,
                            type: "application",
                            submissionDate:
                              result.data.submissionDate.toISOString(),
                          } as ApplicationEntry;
                        } else {
                          newEntry = {
                            ...result.data,
                            type: "nomination",
                            submissionDate:
                              result.data.submissionDate.toISOString(),
                          } as NominationEntry;
                        }

                        setEntries([newEntry, ...entries]);

                        toast.success("Entry created", {
                          description: `New ${entryType} for ${formData.fullName} created successfully`,
                        });
                      }
                    }

                    // Close the modal
                    setEntryFormOpen(false);

                    // Reset form data
                    setFormData({
                      fullName: "",
                      topic: "",
                      priorTedTalk: "",
                      status: "under_review",
                      mobilePhone: "",
                      wechatId: "",
                      gender: "Male",
                      job: "",
                      contact: "",
                      nominatedBy: "",
                    });
                  } catch (error) {
                    toast.error("Operation failed", {
                      description:
                        error instanceof Error
                          ? error.message
                          : "An unexpected error occurred",
                    });
                  } finally {
                    setIsUpdating(false);
                  }
                }}
              >
                {isUpdating
                  ? "Saving..."
                  : selectedEntry
                    ? "Save Changes"
                    : "Create Entry"}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  // Switch to edit mode
                  setEditMode(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Entry
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
