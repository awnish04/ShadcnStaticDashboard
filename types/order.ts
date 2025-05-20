// types/order.ts
// export type OrderType = {
//   id: string;
//   date: string;
//   customer: string;
//   email: string;
//   payment: string;
//   total: string;
//   delivery: string;
//   items: number;
//   paymentMethod: string;
//   shippingAddress: string;
// };

export interface OrderType {
  id: string;
  date: string;
  customer: string;
  email: string;
  payment: "Pending" | "Success" | "Failed";
  total: number;
  delivery: "N/A" | "Processing" | "Shipped" | "Delivered";
  items: number;
  paymentMethod: string;
  shippingAddress: string;
}

export const initialOrders: OrderType[] = [
    {
    id: "#1002",
    date: "23 Jan, 2025 10:30 AM",
    customer: "Wade Warren",
    email: "wade@example.com",
    payment: "Pending",
    total: 20.00,
    delivery: "N/A",
    items: 2,
    paymentMethod: "Visa", // Changed from "Credit Card"
    shippingAddress: "123 Main St, San Francisco, CA 94111",
  },
  {
    id: "#1004",
    date: "14 May, 2025 02:15 PM",
    customer: "Esther Howard",
    email: "esther@example.com",
    payment: "Success",
    total: 22.00,
    delivery: "N/A",
    items: 3,
    paymentMethod: "PayPal", // Kept as PayPal (has icon)
    shippingAddress: "456 Oak Ave, New York, NY 10001",
  },
  {
    id: "#1005",
    date: "7 Sep, 2025 09:45 AM",
    customer: "John Doe",
    email: "john@example.com",
    payment: "Success",
    total: 35.00,
    delivery: "Delivered",
    items: 4,
    paymentMethod: "Mastercard", // Changed from "UPI"
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
  },
  {
    id: "#1006",
    date: "28 Nov, 2025 04:20 PM",
    customer: "Jane Smith",
    email: "jane@example.com",
    payment: "Pending",
    total: 18.50,
    delivery: "Processing",
    items: 1,
    paymentMethod: "COD", // Kept as COD (will use generic icon)
    shippingAddress: "321 Elm Blvd, Austin, TX 78701",
  },
  {
    id: "#1007",
    date: "15 Aug, 2025 11:10 AM",
    customer: "Robert Johnson",
    email: "robert@example.com",
    payment: "Success",
    total: 42.75,
    delivery: "Shipped",
    items: 3,
    paymentMethod: "American Express", // Changed from "Credit Card"
    shippingAddress: "654 Maple Ln, Seattle, WA 98101",
  },
  {
    id: "#1008",
    date: "3 Apr, 2025 03:45 PM",
    customer: "Emily Davis",
    email: "emily@example.com",
    payment: "Success",
    total: 29.99,
    delivery: "Delivered",
    items: 2,
    paymentMethod: "Discover", // Changed from "Debit Card"
    shippingAddress: "987 Cedar St, Boston, MA 02108",
  },
  {
    id: "#1009",
    date: "19 Dec, 2025 01:30 PM",
    customer: "Michael Wilson",
    email: "michael@example.com",
    payment: "Pending",
    total: 15.25,
    delivery: "Processing",
    items: 1,
    paymentMethod: "COD", // Kept as COD (will use generic icon)
    shippingAddress: "147 Walnut Dr, Denver, CO 80202",
  },
  {
    id: "#1010",
    date: "8 Jul, 2025 10:00 AM",
    customer: "Sarah Brown",
    email: "sarah@example.com",
    payment: "Success",
    total: 55.00,
    delivery: "Shipped",
    items: 5,
    paymentMethod: "PayPal", // Kept as PayPal (has icon)
    shippingAddress: "258 Birch Ave, Miami, FL 33101",
  },
];
