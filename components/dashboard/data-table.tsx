"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { GripVertical } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Create a separate component for the drag handle
export function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      className="h-7 w-7 cursor-grab text-muted-foreground hover:bg-transparent active:cursor-grabbing"
      size="icon"
      variant="ghost"
    >
      <GripVertical className="h-4 w-4 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

function DraggableRow<TData>({
  row,
  onRowClick,
}: {
  row: Row<TData>;
  onRowClick?: (row: Row<TData>) => void;
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: (row.original as any).id,
  });

  const handleRowClick = () => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <TableRow
      className={`relative z-0 cursor-pointer ${isDragging ? "z-10 opacity-80" : ""} ${
        row.getIsSelected() ? "bg-primary/5 dark:bg-primary/10" : ""
      }`}
      data-dragging={isDragging}
      data-state={row.getIsSelected() && "selected"}
      onClick={handleRowClick}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: Row<TData>) => void;
  updateStatus?: (id: string, status: string) => void;
  updateRating?: (id: string, rating: number) => void;
  columnVisibility?: VisibilityState;
  setColumnVisibility?: (state: VisibilityState) => void;
  rowSelection?: Record<string, boolean>;
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;
  onTableChange?: (table: any) => void;
};

export function DataTable<TData, TValue>({
  columns,
  data: initialData,
  onRowClick,
  updateStatus,
  updateRating,
  columnVisibility,
  setColumnVisibility,
  rowSelection: parentRowSelection,
  onRowSelectionChange,
  onTableChange,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState(
    parentRowSelection || {}
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  // Update data when initialData changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map((item: any) => item.id) || [],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility: columnVisibility || {},
      rowSelection,
      columnFilters,
    },
    meta: {
      updateStatus,
      updateRating,
    },
    enableRowSelection: true,
    onRowSelectionChange: (updaterOrValue) => {
      setRowSelection(updaterOrValue);
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility
      ? (updaterOrValue) =>
          setColumnVisibility(
            typeof updaterOrValue === "function"
              ? updaterOrValue(columnVisibility || {})
              : updaterOrValue
          )
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Pass table's row selection state back to parent
  useEffect(() => {
    if (table.getState().rowSelection !== rowSelection) {
      setRowSelection(table.getState().rowSelection);
    }
  }, [rowSelection, table.getState]);

  // Share rowSelection state with parent component if provided
  useEffect(() => {
    if (parentRowSelection !== undefined && onRowSelectionChange) {
      setRowSelection(parentRowSelection);
    }
  }, [parentRowSelection, onRowSelectionChange]);

  // Notify parent component of row selection changes
  useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(rowSelection);
    }
  }, [rowSelection, onRowSelectionChange]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((prevData) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove([...prevData], oldIndex, newIndex);
      });
    }
  }

  // Expose table instance to parent
  useEffect(() => {
    if (onTableChange) {
      onTableChange(table);
    }
  }, [table, onTableChange]);

  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        id={sortableId}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead colSpan={header.colSpan} key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow
                    key={row.id}
                    onRowClick={onRowClick}
                    row={row}
                  />
                ))}
              </SortableContext>
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DndContext>
    </div>
  );
}
