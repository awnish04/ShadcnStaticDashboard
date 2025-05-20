// components/orders/OrderFilters.tsx
"use client";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Search, RefreshCw, Download, ChevronDown,FileText,FileSpreadsheet } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "components/ui/dropdown-menu";
import { DatePickerWithRange } from "components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

interface OrderFiltersProps {
  searchTerm: string;
  activeTab: string;
  dateRange: DateRange | undefined;
  onSearchChange: (term: string) => void;
  onTabChange: (tab: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onRefresh: () => void;
  onExportCSV: () => void;
  onExportExcel: () => void;
  selectedCount: number;
  onBulkFulfill: () => void;
  onBulkDelete: () => void;
  visibleColumns: Record<string, boolean>;
  onColumnsChange: (key: string, value: boolean) => void;
  onResetDates: () => void;
}

export function OrderFilters({
  searchTerm,
  activeTab,
  dateRange,
  onSearchChange,
  onTabChange,
  onDateRangeChange,
  onRefresh,
  onExportCSV,
  onExportExcel,
  selectedCount,
  onBulkFulfill,
  onBulkDelete,
  visibleColumns,
  onColumnsChange,
  onResetDates,
}: OrderFiltersProps) {
  return (
    <div className="p-4 flex flex-wrap md:flex-row items-center gap-2">
      <div>
        <DatePickerWithRange
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          className="mr-2"
        />
      </div>
      <div>
        <Button variant="outline" size="sm" onClick={onResetDates}>
          Last 30 Days
        </Button>
      </div>
      <div>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onExportCSV}>
              <FileText className="w-4 h-4 mr-2" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportExcel}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Columns
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(visibleColumns).map(([key, value]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={value}
                onCheckedChange={(checked) => onColumnsChange(key, checked)}
              >
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

