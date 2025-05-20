// "use client";

// import { Input } from "components/ui/input";
// import { Search } from "lucide-react";

// interface ProductSearchProps {
//   onSearch: (query: string) => void;
// }

// export function ProductSearch({ onSearch }: ProductSearchProps) {
//   return (
//     <div className="relative w-1/2">
//       <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500 dark:text-gray-400" />
//       <Input
//         placeholder="Search"
//         className="pl-8"
//         onChange={(e) => onSearch(e.target.value)}
//       />
//     </div>
//   );
// }
"use client";

import { Input } from "components/ui/input";
import { Search } from "lucide-react";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function ProductSearch({
  onSearch,
  searchTerm,
  setSearchTerm,
}: ProductSearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full md:w-1/2">
      <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500 dark:text-gray-400" />
      <Input
        placeholder="Search products by name, brand, or category..."
        className="pl-8"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}