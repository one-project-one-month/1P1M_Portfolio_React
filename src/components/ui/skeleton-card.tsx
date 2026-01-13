const SkeletonCard = () => {
  return (
    <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-800 rounded-xl h-[298px]"
        />
      ))}
    </div>
  );
};

export default SkeletonCard;
