// import Title from '@/components/ui/title';
// import type { Idea as IdeaType } from '@/types/project';
// import { ChevronLeft, ChevronRight } from '@mynaui/icons-react';
// import { useMemo, useState } from 'react';
// import IdeaCard from './components/idea_card';

// const mockIdeas: IdeaType[] = [
//   {
//     id: 1,
//     name: 'Smart Study Planner',
//     description:
//       'An AI-powered planner that builds weekly study schedules based on workload, energy levels, and deadlines.',
//     devName: 'Alex Kim',
//     dev_id: 101,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=1',
//     projectTypes: ['EdTech', 'AI'],
//     reactedProjects: [],
//   },
//   {
//     id: 2,
//     name: 'Local Food Rescue',
//     description:
//       'Connects restaurants with nearby shelters and volunteers to reduce food waste and feed communities.',
//     devName: 'Maria Lopez',
//     dev_id: 102,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=2',
//     projectTypes: ['Community', 'Sustainability'],
//     reactedProjects: [],
//   },
//   {
//     id: 3,
//     name: 'Budget Buddy',
//     description:
//       'A lightweight personal finance app that auto-categorizes spending and suggests monthly savings goals.',
//     devName: 'Chris Patel',
//     dev_id: 103,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=3',
//     projectTypes: ['Fintech'],
//     reactedProjects: [],
//   },
//   {
//     id: 4,
//     name: 'Neighborhood Skills Swap',
//     description:
//       'A platform where neighbors trade skills and services without money just time credits.',
//     devName: 'Jordan Lee',
//     dev_id: 104,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=4',
//     projectTypes: ['Community'],
//     reactedProjects: [],
//   },
//   {
//     id: 5,
//     name: 'Plant Care Companion',
//     description:
//       'Tracks plant health with reminders, light/water tips, and a plant library for beginners.',
//     devName: 'Sophie Nguyen',
//     dev_id: 105,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=5',
//     projectTypes: ['Lifestyle', 'IoT'],
//     reactedProjects: [],
//   },
//   {
//     id: 6,
//     name: 'Micro Mentorship',
//     description:
//       'Pairs learners with short, focused mentorship sessions to get unstuck quickly.',
//     devName: 'David Brooks',
//     dev_id: 106,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=6',
//     projectTypes: ['Career', 'Education'],
//     reactedProjects: [],
//   },
//   {
//     id: 7,
//     name: 'Quiet Hours Map',
//     description:
//       'A city map that highlights quiet cafes, libraries, and parks for focused work.',
//     devName: 'Priya Shah',
//     dev_id: 107,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=7',
//     projectTypes: ['Lifestyle', 'Travel'],
//     reactedProjects: [],
//   },
//   {
//     id: 8,
//     name: 'Volunteer Match',
//     description:
//       'Matches volunteers to local events based on skills, availability, and interests.',
//     devName: 'Ethan Carter',
//     dev_id: 108,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=8',
//     projectTypes: ['Community'],
//     reactedProjects: [],
//   },
//   {
//     id: 9,
//     name: 'Recipe Remix',
//     description:
//       'Suggests recipe variations based on what you already have in your pantry.',
//     devName: 'Lina Gomez',
//     dev_id: 109,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=9',
//     projectTypes: ['Food', 'AI'],
//     reactedProjects: [],
//   },
//   {
//     id: 10,
//     name: 'Commute Buddy',
//     description:
//       'Helps coordinate casual carpooling with neighbors heading to similar routes.',
//     devName: 'Markus Wolf',
//     dev_id: 110,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=10',
//     projectTypes: ['Mobility', 'Community'],
//     reactedProjects: [],
//   },
//   {
//     id: 11,
//     name: 'Focus Sprint',
//     description:
//       'A lightweight timer that runs team focus sprints and tracks shared progress.',
//     devName: 'Aisha Bello',
//     dev_id: 111,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=11',
//     projectTypes: ['Productivity'],
//     reactedProjects: [],
//   },
//   {
//     id: 12,
//     name: 'Language Exchange Pods',
//     description:
//       'Pairs small groups for weekly language practice with guided topics.',
//     devName: 'Kenji Mori',
//     dev_id: 112,
//     reactionCount: 0,
//     status: 'idea',
//     profilePictureUrl: 'https://i.pravatar.cc/150?img=12',
//     projectTypes: ['Education', 'Community'],
//     reactedProjects: [],
//   },
// ];

// const Idea = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeFilter, setActiveFilter] = useState('Popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const filteredProjects = useMemo(() => {
//     const term = searchTerm.trim().toLowerCase();
//     const filtered = mockIdeas.filter((idea) => {
//       if (term.length === 0) return true;
//       return (
//         idea.name.toLowerCase().includes(term) ||
//         idea.description.toLowerCase().includes(term)
//       );
//     });

//     if (activeFilter === 'Newest') {
//       return [...filtered].sort((a, b) => b.id - a.id);
//     }
//     if (activeFilter === 'Oldest') {
//       return [...filtered].sort((a, b) => a.id - b.id);
//     }
//     return [...filtered].sort((a, b) => b.reactionCount - a.reactionCount);
//   }, [activeFilter, searchTerm]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredProjects.length / itemsPerPage),
//   );

//   const currentProjects = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
//   }, [currentPage, filteredProjects]);

//   return (
//     <div>
//       <Title />
//     </div>
//   );
// };

// // export default Idea;
// //       <Title
// //         title="Project Idea List"
// //         searchPlaceholder="Search ideas..."
// //         initSelectedFilter="Popular"
// //         onSearchChange={(event) => setSearchTerm(event.target.value)}
// //         onFilterChange={(option) => {
// //           setActiveFilter(option);
// //           setCurrentPage(1);
// //         }}
// //       />
// //       {filteredProjects.length === 0 && (
// //         <div className="text-white/70">No ideas available.</div>
// //       )}

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {currentProjects.map((project) => (
// //           <IdeaCard key={project.id} project={project} />
// //         ))}
// //       </div>

// //       {filteredProjects.length > 0 && (
// //         <div className="flex justify-center items-center gap-3 mt-8 text-white">
// //           <button
// //             className="w-8 h-8 flex items-center justify-center rounded-md border border-white/20 disabled:opacity-50"
// //             onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
// //             disabled={currentPage === 1}
// //           >
// //             <ChevronLeft />
// //           </button>
// //           <div className="flex items-center gap-2">
// //             {Array.from({ length: totalPages }, (_, index) => {
// //               const pageNumber = index + 1;
// //               const isActive = pageNumber === currentPage;
// //               return (
// //                 <button
// //                   key={pageNumber}
// //                   className={`w-8 h-8 rounded-md text-sm border border-gray-500 ${
// //                     isActive ? 'bg-purple-600 text-white' : 'text-white/70'
// //                   }`}
// //                   onClick={() => setCurrentPage(pageNumber)}
// //                   aria-current={isActive ? 'page' : undefined}
// //                 >
// //                   {pageNumber}
// //                 </button>
// //               );
// //             })}
// //           </div>
// //           <button
// //             className="w-8 h-8 flex items-center justify-center rounded-md border border-white/20 disabled:opacity-50"
// //             onClick={() =>
// //               setCurrentPage((page) => Math.min(totalPages, page + 1))
// //             }
// //             disabled={currentPage === totalPages}
// //           >
// //             <ChevronRight />
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Idea;




import React from 'react'

const Idea = () => {
  return (
    <div>Idea</div>
  )
}

export default Idea