const SkeletonLoader = () => {
  return (
    <div className="animate-pulse p-4 border border-gray-200 rounded-lg bg-gray-100 shadow-sm">
      <div className="h-32 bg-gray-300 rounded-lg"></div>
      <div className="mt-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
