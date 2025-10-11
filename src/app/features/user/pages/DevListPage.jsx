import React, { useState, useEffect } from "react";
import DevCard from "../components/DevCard";
import SearchIcon from "@/assets/icons/search.png";
import FilterIcon from "@/assets/icons/filter.png";
import GitHubIcon from "@/assets/icons/GitHub.png";
import LinkedinIcon from "@/assets/icons/Linkedin.png";
import FacebookIcon from "@/assets/icons/Facebook.png";
import CopyIcon from "@/assets/icons/Copy.png";
import { getDevProfiles } from "@/services/devProfileService";
import Background from "@/components/ui/Background";
import Pagination from "../../../components/ui/Pagination";

// Sample mock data
const teamMembers = [
    {
        name: "Ma Yoon Shwe Yee",
        role: "Senior Backend Developer",
        telegram: "@Yoon_SY",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        socials: [
            { name: "GitHub", icon: GitHubIcon, url: "https://github.com/" },
            { name: "LinkedIn", icon: LinkedinIcon, url: "https://linkedin.com/" },
            { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com/" },
        ],
    },
    {
        name: "Ko Myo Thiha",
        role: "Junior Flutter Developer",
        telegram: "@Myo_TH",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        socials: [
            { name: "GitHub", icon: GitHubIcon, url: "https://github.com/" },
            { name: "LinkedIn", icon: LinkedinIcon, url: "https://linkedin.com/" },
            { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com/" },
        ],
    },
    // ... (ကျန်တဲ့ member data များ)
    {
        name: "Ko Thura Aung",
        role: "Mid-level Java Developer",
        telegram: "@Thura_AG",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        socials: [
            { name: "GitHub", icon: GitHubIcon, url: "https://github.com/" },
            { name: "LinkedIn", icon: LinkedinIcon, url: "https://linkedin.com/" },
            { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com/" },
        ],
    },
    {
        name: "Ma Win Sandar",
        role: "QA Tester",
        telegram: "@Win_SD",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        socials: [
            { name: "GitHub", icon: GitHubIcon, url: "https://github.com/" },
            { name: "LinkedIn", icon: LinkedinIcon, url: "https://linkedin.com/" },
            { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com/" },
        ],
    },
    {
        name: "Ko Naing Aung",
        role: "Python Developer",
        telegram: "@Naing_AG",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        socials: [
            { name: "GitHub", icon: GitHubIcon, url: "https://github.com/" },
            { name: "LinkedIn", icon: LinkedinIcon, url: "https://linkedin.com/" },
            { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com/" },
        ],
    },
    {
        name: "Ma Win Sandar",
        role: "QA Tester",
        telegram: "@Win_SD",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        socials: [
            { name: "GitHub", icon: GitHubIcon, url: "https://github.com/" },
            { name: "LinkedIn", icon: LinkedinIcon, url: "https://linkedin.com/" },
            { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com/" },
        ],
    },
    {
        name: "Ko Naing Aung",
        role: "Python Developer",
        telegram: "@Naing_AG",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        socials: [
            { name: "GitHub", icon: GitHubIcon, url: "https://github.com/" },
            { name: "LinkedIn", icon: LinkedinIcon, url: "https://linkedin.com/" },
            { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com/" },
        ],
    },
];

export default function DevListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [devProfiles, setDevProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 6;

    useEffect(() => {
        async function fetchProfiles() {
            try {
                const data = await getDevProfiles();
                console.log("✅ API Response Data:", data);
                setDevProfiles(data);
            } catch (error) {
                console.error("Error fetching profiles", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProfiles();
    }, []);

    const copyToClipboard = (text) => navigator.clipboard.writeText(text);

    const filteredMembers = teamMembers.filter(
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
                <div className="max-w-[1400px] mx-auto flex-grow w-full">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h1 className="text-5xl font-bold text-[#FFFFFF]">Profiles</h1>
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

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-1 px-2 py-3.5 bg-transparent border border-[#F3F4F6] w-[99px] h-[40px] text-[#FAFAFA] rounded-full hover:bg-slate-800/50 hover:border-slate-500 transition-all"
                        >
                            <img
                                src={FilterIcon}
                                alt="filter"
                                className="w-[26px] h-[26px] cursor-pointer p-1"
                            />
                            <span className="font-medium">Filters</span>
                        </button>
                    </div>

                    {/* Cards Grid */}
                    <div className="w-full py-3">
                        <div className="max-w-[1400px] mx-auto">
                            {/* Cards Grid */}
                            <div className="grid grid-cols-3 gap-6">
                                {currentMembers.map((member, index) => (
                                    <DevCard key={index} member={member} copyToClipboard={copyToClipboard} />
                                ))}
                            </div>
                        </div>
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