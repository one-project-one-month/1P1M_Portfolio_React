// import ApprovedIdeaCard from '@/app/features/projects/approved/components/approved-idea-card';
// import { useApproveIdeasQuery } from '@/app/features/projects/approved/hooks/use-approved-ideas';
// import { useNavigate } from 'react-router-dom';

// export function ApprovedIdeasSection() {
//   const navigate = useNavigate();
//   const { data, isLoading, error } = useApproveIdeasQuery();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <section className="flex flex-col justify-center text-center text-[#E5E7EB] mb-8">
//       <div className="w-full flex justify-between items-center my-8">
//         <h1 className="text-5xl">Approved Ideas</h1>
//         <button
//           className="border-b cursor-pointer"
//           onClick={() => navigate('/approved-ideas')}
//         >
//           View more
//         </button>
//       </div>

//       {data && data.data.projects.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4">
//           {data.data.projects.map((approvedProjectIdea) => (
//             <ApprovedIdeaCard
//               key={approvedProjectIdea.id}
//               project={approvedProjectIdea}
//             />
//           ))}
//         </div>
//       ) : (
//         <div>There is nothing!</div>
//       )}
//     </section>
//   );
// }
