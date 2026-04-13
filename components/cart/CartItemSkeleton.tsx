"use client";

export function CartItemSkeleton() {
  return (
    <div className="p-6 border-b border-gray-200 animate-pulse">
      <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
        <div className="md:col-span-6">
          <div className="flex gap-4">
            <div className="h-24 w-24 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-16 mt-2"></div>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:col-span-2">
          <div className="h-5 bg-gray-200 rounded w-20 mx-auto"></div>
        </div>

        <div className="mt-4 md:mt-0 md:col-span-2">
          <div className="flex justify-center">
            <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:col-span-2">
          <div className="h-5 bg-gray-200 rounded w-24 ml-auto"></div>
        </div>
      </div>
    </div>
  );
}
