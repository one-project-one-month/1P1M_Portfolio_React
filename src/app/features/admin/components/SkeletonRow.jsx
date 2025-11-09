const SkeletonRow = () => (
    <tr className="animate-pulse text-center text-sm font-medium">
      <td className="px-4 py-5 border-s rounded-tl-xl border-t rounded-bl-xl border-b">
        <div className="h-4 w-6 bg-white/20 rounded"></div>
      </td>

      <td className="px-4 py-5 border-t border-b">
        <div className="h-4 w-24 bg-white/20 rounded"></div>
      </td>

      <td className="px-4 py-2 border-t border-b">
        <div className="h-4 w-40 bg-white/20 rounded"></div>
      </td>

      <td className="px-4 py-5 border-t border-b">
        <div className="h-4 w-28 bg-white/20 rounded"></div>
      </td>

      <td className="px-4 py-5 border-e border-t rounded-tr-xl border-b rounded-br-xl">
        <div className="h-4 w-20 bg-white/20 rounded"></div>
      </td>
    </tr>
  );

  export default SkeletonRow;