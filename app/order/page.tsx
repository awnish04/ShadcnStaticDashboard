// app/order/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { useToast } from "components/ui/use-toast";
import { DateRange } from "react-day-picker";
import { OrderType, initialOrders } from "types/order";
import { OrderDialog } from "components/orders/OrderDialog";
import { OrderFilters } from "components/orders/OrderFilters";
import { OrderTable } from "components/orders/OrderTable";
import { OrderPagination } from "components/orders/OrderPagination";
import { addDays, format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "components/ui/tabs";
import { Input } from "components/ui/input";
import { Search } from "lucide-react";
import { useActivePage } from "hooks/use-active-page";

const ITEMS_PER_PAGE = 6;

export default function OrderListPage() {

  const pageTitle = useActivePage();
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    order: true,
    date: true,
    customer: true,
    payment: true,
    total: true,
    delivery: true,
    items: true,
    paymentMethod: false,
    shippingAddress: false,
  });
  const { toast } = useToast();

  const handleColumnsChange = (key: string, value: boolean) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: value }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    // Reset all filters and states
    setSearchTerm("");
    setActiveTab("all");
    setDateRange(undefined);
    setSelectedOrders([]);
    setCurrentPage(1);
    setVisibleColumns({
      order: true,
      date: true,
      customer: true,
      payment: true,
      total: true,
      delivery: true,
      items: true,
      paymentMethod: true,
      shippingAddress: true,
    });

    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Reset Complete",
        description: "All filters and settings have been reset",
      });
    }, 1000);
  };

  const exportToCSV = () => {
    const headers = Object.keys(orders[0]).filter(
      (key) =>
        visibleColumns[key as keyof typeof visibleColumns] || key === "id"
    );
    const csvContent = [
      headers.join(","),
      ...orders.map((order) =>
        headers
          .map((header) => `"${order[header as keyof typeof order]}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `orders_${format(new Date(), "yyyyMMdd")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    toast({
      title: "Export Started",
      description: "Preparing Excel file for download...",
    });
    // In a real app, you would use a library like xlsx
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Excel file downloaded successfully",
        variant: "default",
      });
    }, 1500);
  };

  const handleBulkFulfill = () => {
    if (!Array.isArray(selectedOrders)) {
      // Added missing closing parenthesis
      setSelectedOrders([]);
      return;
    }
    if (selectedOrders.length === 0) return;

    // Rest of your fulfill logic
    setOrders((prev) =>
      prev.map((order) =>
        selectedOrders.includes(order.id)
          ? { ...order, delivery: "Shipped" }
          : order
      )
    );
    setSelectedOrders([]);
    toast({
      title: "Success",
      description: `${selectedOrders.length} orders marked as shipped`,
      variant: "default",
    });
  };

  const handleBulkDelete = () => {
    if (selectedOrders.length === 0) return;

    setOrders((prev) =>
      prev.filter((order) => !selectedOrders.includes(order.id))
    );
    setSelectedOrders([]);
    toast({
      title: "Success",
      description: `${selectedOrders.length} orders deleted successfully`,
      variant: "default",
    });
  };

  // Add this helper function to parse your date strings
  const parseOrderDate = (dateString: string) => {
    // Convert "11 Feb, 2024 10:30 AM" to a format Date can parse
    const months: Record<string, number> = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    const parts = dateString.split(/[\s,]+/);
    if (parts.length < 4) return new Date();

    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    const timeParts = parts[3].split(":");
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const isPM = parts[4] === "PM";

    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;

    return new Date(year, month, day, hours, minutes);
  };

  // First, define the filter logic
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.customer.toLowerCase().includes(term) ||
          order.email.toLowerCase().includes(term) ||
          order.paymentMethod.toLowerCase().includes(term) ||
          order.shippingAddress.toLowerCase().includes(term)
      );
    }

    // Apply tab filter
    if (activeTab !== "all") {
      result = result.filter((order) => {
        if (activeTab === "unfulfilled")
          return order.delivery === "N/A" || order.delivery === "Processing";
        if (activeTab === "unpaid") return order.payment === "Pending";
        if (activeTab === "open")
          return order.payment === "Pending" || order.delivery !== "Delivered";
        if (activeTab === "closed")
          return order.payment === "Success" && order.delivery === "Delivered";
        return true;
      });
    }

    // Apply date range filter
    if (dateRange?.from && dateRange?.to) {
      result = result.filter((order) => {
        const orderDate = parseOrderDate(order.date);
        const fromDate = new Date(dateRange.from!);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(dateRange.to!);
        toDate.setHours(23, 59, 59, 999);
        return orderDate >= fromDate && orderDate <= toDate;
      });
    }

    return result;
  }, [orders, searchTerm, activeTab, dateRange]);

  // Then define pagination that depends on filteredOrders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  // Generates Invoice
  const generateInvoice = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    toast({
      title: "Invoice Generated",
      description: `Invoice for ${orderId} (${order?.customer}) has been downloaded.`,
    });
  };

  const toggleSelectOrder = (id: string) => {
    setSelectedOrders((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.includes(id)
        ? safePrev.filter((orderId) => orderId !== id)
        : [...safePrev, id];
    });
  };

  const toggleSelectAll = () => {
    setSelectedOrders((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.length === paginatedOrders.length
        ? []
        : paginatedOrders.map((order) => order.id);
    });
  };

  const handleDeleteClick = (id: string) => {
    setOrderToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!orderToDelete) return;

    try {
      setOrders((prev) => prev.filter((order) => order.id !== orderToDelete));
      setSelectedOrders((prev) => prev.filter((id) => id !== orderToDelete));
      if (paginatedOrders.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      toast({
        title: "Success",
        description: "Order deleted successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setOrderToDelete(null);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setOrders(initialOrders);
      setIsLoading(false);
    }, 300);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2>
      <OrderFilters
        searchTerm={searchTerm}
        activeTab={activeTab}
        dateRange={dateRange}
        onSearchChange={setSearchTerm}
        onTabChange={setActiveTab}
        onDateRangeChange={setDateRange}
        onRefresh={handleRefresh}
        onExportCSV={exportToCSV}
        onExportExcel={exportToExcel}
        selectedCount={selectedOrders.length || 0}
        onBulkFulfill={handleBulkFulfill}
        onBulkDelete={handleBulkDelete}
        visibleColumns={visibleColumns}
        onColumnsChange={handleColumnsChange}
        onResetDates={() => {
          setDateRange({
            from: addDays(new Date(), -30),
            to: new Date(),
          });
        }}
      />

      <Card>
        {/* Header inside the Card */}
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search orders, customers, emails..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unfulfilled">Unfulfilled</TabsTrigger>
              <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Bulk actions */}
          {selectedOrders.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedOrders.length} selected
              </span>
              <Button variant="outline" size="sm" onClick={handleBulkFulfill}>
                Mark as Shipped
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        {/* Table itself */}
        <OrderTable
          orders={paginatedOrders}
          visibleColumns={visibleColumns}
          selectedOrders={selectedOrders}
          toggleSelectOrder={toggleSelectOrder}
          toggleSelectAll={toggleSelectAll}
          allSelected={
            paginatedOrders.length > 0 &&
            (selectedOrders?.length || 0) === paginatedOrders.length
          }
          onEdit={(order) => {
            setSelectedOrder(order);
            setIsOrderDialogOpen(true);
          }}
          onDelete={handleDeleteClick}
          onGenerateInvoice={generateInvoice}
        />
      </Card>

      {filteredOrders.length > ITEMS_PER_PAGE && (
        <OrderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      )}
      

      <OrderDialog
        open={isOrderDialogOpen}
        onOpenChange={(open) => {
          setIsOrderDialogOpen(open);
          if (!open) setSelectedOrder(null);
        }}
        order={selectedOrder}
        onSuccess={() => {
          toast({
            title: "Success",
            description: `Order ${
              selectedOrder ? "updated" : "created"
            } successfully`,
          });
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
