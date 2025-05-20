"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ProductImageProps {
  image?: string;
  title: string;
}

export function ProductImage({ image, title }: ProductImageProps) {
  return image ? (
    <Image
      src={image}
      alt={title}
      width={20}
      height={20}
      className="h-8 w-8 rounded-full object-cover"
    />
  ) : (
    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
      <ImageOff className="text-gray-500" />
    </div>
  );
}