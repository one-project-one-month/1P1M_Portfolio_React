function TableSkeletonRow() {
  return (
    <tr className="animate-pulse ">
      <td>
        <div className="h-6 w-8 bg-gray-700 rounded"></div>
      </td>
      <td>
        <div className="h-6 w-24 bg-gray-700 rounded"></div>
      </td>
      <td className=" text-center">
        <div className="h-6 w-32 bg-gray-700 rounded mx-auto"></div>
      </td>
      <td className="p-7 text-center">
        <div className="h-6 w-20 bg-gray-700 rounded mx-auto"></div>
      </td>
      <td>
        <div className="h-6 w-16 bg-gray-700 rounded"></div>
      </td>
      <td>
        <div className="h-6 w-28 bg-gray-700 rounded"></div>
      </td>
    </tr>
  );
}
export default TableSkeletonRow;
