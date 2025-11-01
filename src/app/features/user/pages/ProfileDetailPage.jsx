import React, { useState, useEffect } from "react";
import {
    getDeveloperProfile,
    getDeveloperProjectIdeas,
    getDeveloperApprovedProjects,
    getProfileData
} from "@/services/profileDetailService";
import { useParams } from "react-router-dom";

const ProfileDetailPage = () => {
    const { id } = useParams();
    const devId = id;
    const [profile, setProfile] = useState(null);
    const [projectIdeas, setProjectIdeas] = useState([]);
    const [approvedProjects, setApprovedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!devId) return;

        const fetchProfileData = async () => {

            try {
                setLoading(true);
                const [profileData, ideasData, approvedData] = await Promise.all([
                    getProfileData(devId),
                    getDeveloperProjectIdeas(devId),
                    getDeveloperApprovedProjects(devId),
                ]);

                setProfile(profileData);
                setProjectIdeas(ideasData);
                setApprovedProjects(approvedData);
            } catch (err) {
                console.error("Failed to fetch profile data:", err);
                setError('Error Fetching the Profile data ');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [devId]);


    // Loading & Error States
    if (loading) return <p className="text-white px-6 py-10">Loading profile...</p>;
    if (error) return <div className="text-red-500 text-center mt-12 px-6"> Error: {error}</div>;
    if (!profile) return <p className="text-white px-6 py-10">No developer profile found.</p>;

    return (
        <div className="min-h-screen w-full text-white px-6 py-10">
            {/* Developer About Info */}
            <AboutInfo profile={profile} />

            <div className="max-w-6xl mx-auto mt-12">
                {/* Project Ideas Section */}
                <h2 className="text-5xl text-white font-bold mb-8">My Project Ideas</h2>
                <ProjectIdeas ideas={projectIdeas} profile={profile} />
                {/* Approved My Projects Section */}
                <h2 className="text-5xl text-white font-bold mb-8 mt-16">My Approved Projects</h2>
                <ApprovedProjects projects={approvedProjects} />
            </div>
        </div>
    )
}

export default ProfileDetailPage;