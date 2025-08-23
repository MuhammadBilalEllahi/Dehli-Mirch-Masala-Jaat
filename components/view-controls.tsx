"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SortDropdown } from "./sort-dropdown"
import { List, Grid2X2, Grid3X3, Grid } from 'lucide-react'

interface ViewControlsProps {
  view: "list" | "grid-2" | "grid-3" | "grid-4"
  onViewChange: (view: "list" | "grid-2" | "grid-3" | "grid-4") => void
  itemsPerPage: number
  onItemsPerPageChange: (items: number) => void
  sortValue: string
  onSortChange: (sort: string) => void
}

export function ViewControls({
  view,
  onViewChange,
  itemsPerPage,
  onItemsPerPageChange,
  sortValue,
  onSortChange,
}: ViewControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg border">
      {/* VIEW AS */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">VIEW AS</span>
        <div className="flex items-center gap-1">
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onViewChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "grid-2" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onViewChange("grid-2")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "grid-3" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onViewChange("grid-3")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "grid-4" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onViewChange("grid-4")}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ITEMS PER PAGE */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">ITEMS PER PAGE</span>
        <Select value={String(itemsPerPage)} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
          <SelectTrigger className="w-20 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="36">36</SelectItem>
            <SelectItem value="48">48</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* SORT BY */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">SORT BY</span>
        <SortDropdown value={sortValue} onChange={onSortChange} />
      </div>
    </div>
  )
}
