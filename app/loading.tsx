// Using a Skeleton pattern is the "Senior" standard
export default function Loading() {
  return (
    <div className="container mx-auto p-10 animate-pulse">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="bg-gray-200 aspect-square rounded-xl" />
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-40 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
} 