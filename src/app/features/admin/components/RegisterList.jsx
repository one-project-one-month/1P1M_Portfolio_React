import React, { useEffect, useState } from "react";
import SkeletonRow from "./SkeletonRow";

const RegisterList = ({ data, error, loading }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!loading) {
   
      const timer = setTimeout(() => setShowSkeleton(false), 700); 
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(true);
    }
  }, [loading]);

  const filterUser = Array.isArray(data) ? data : [];
  const tHead = ["No", "Name", "Email", "Phone", "Role"];



  const skeletonCount = Math.max(filterUser.length || 0, 5);

  if (error) return <div>Something went wrong</div>;

  return (
    <table
      className="text-white/90 w-full mt-4 p-2 border-separate border-spacing-y-1 table-fixed"
    >
      <thead>
        <tr>
          {tHead.map((title, index) => (
            <th key={index} className="text-lg px-4 font-normal pb-8 text-center">
              {title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {showSkeleton ? (
          Array.from({ length: skeletonCount }).map((_, i) => <SkeletonRow key={i} />)
        ) : filterUser.length > 0 ? (
          filterUser.map((user, index) => (
            <tr key={index} className="text-center text-sm font-medium">
              <td className="px-4 py-5 border-s rounded-tl-xl border-t rounded-bl-xl border-b">
                {index + 1}
              </td>
              <td className="px-4 py-5 border-t border-b">{user.name}</td>
              <td className="px-4 py-2 border-t border-b">{user.email}</td>
              <td className="px-4 py-5 border-t border-b">{user.phone}</td>
              <td className="px-4 py-5 border-e border-t rounded-tr-xl border-b rounded-br-xl">
                {user.role}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="py-6 text-center text-white/60">
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RegisterList;
