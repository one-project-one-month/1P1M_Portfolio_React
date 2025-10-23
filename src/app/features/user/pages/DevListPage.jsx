import React, { useState, useEffect } from "react";
import DevCard from "../components/DevCard";
import SearchIcon from "@/assets/icons/search.png";
import { getDevProfiles } from "@/services/devProfileService";
import Background from "@/components/ui/Background";
import Pagination from "@/components/ui/Pagination";
import Navbar from "@/components/ui/Navbar";
import FilterDropdown from "@/components/ui/Filter";


export default function DevListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [devProfiles, setDevProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 6;

    useEffect(() => {
        async function fetchProfiles() {
            try {
                const data = await getDevProfiles();
                console.log("API Response Data:", data);
                const profiles = Array.isArray(data) ? data : data.profiles || [];
                setDevProfiles(profiles);
            } catch (error) {
                console.error("Error fetching profiles", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProfiles();
    }, []);

    const filteredMembers = devProfiles.filter(
        (member) =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
    const totalPages = Math.min(5, Math.ceil(filteredMembers.length / membersPerPage));


    return (
        <Background>
            <div className="w-[1296px] mx-auto py-6 min-h-screen flex flex-col">
                <Navbar />
                <div className="max-w-[1400px] mx-auto flex-grow w-full">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h1 className="text-5xl font-bold text-[#FFFFFF]">Dev Profiles</h1>
                            <div className="h-[6px] w-[53px] bg-[#FFBA00] mt-2"></div>
                        </div>

                        <div className="relative flex-1 items-center max-w-2xl mx-12">
                            <img
                                src={SearchIcon}
                                alt="search"
                                className="absolute left-3 top-3 w-[20px] h-[20px] cursor-pointer"
                            />
                            <input
                                type="text"
                                placeholder="Search your mate"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-[600px] h-[48px] bg-[#FFFFFF17] border border-[#FFFFFF26] rounded-lg py-3.5 pl-12 pr-4 text-sm text-[#6A7282] placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:bg-slate-800/70 transition-all"
                            />
                        </div>

                        {/* <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-1 px-2 py-3.5 bg-transparent border border-[#F3F4F6] w-[99px] h-[40px] text-[#FAFAFA] rounded-full hover:bg-slate-800/50 hover:border-slate-500 transition-all"
                        >
                            <img
                                src={FilterIcon}
                                alt="filter"
                                className="w-[26px] h-[26px] cursor-pointer p-1"
                            />
                            <span className="font-medium">Filters</span>
                        </button> */}
                        <FilterDropdown />
                    </div>

                    {/* Cards Grid */}
                    <div className="w-full py-3">
                        {loading ? (
                            <p className="text-center text-gray-400 py-10">Loading profiles...</p>
                        ) : filteredMembers.length === 0 ? (
                            <p className="text-center text-gray-500 py-10 text-lg">
                                No developer profiles found.
                            </p>
                        ) : (
                            <div className="grid grid-cols-3 gap-6">
                                {currentMembers.map((member) => (
                                    <DevCard key={member.id || member._id} member={member} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>


                <div className="w-full flex justify-center items-center mt-auto">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>

            </div>
        </Background>
    );
}