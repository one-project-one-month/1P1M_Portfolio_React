import React from "react";
import HeartIcon from "@/assets/icons/Heart.png";
import EyeIcon from "@/assets/icons/eye.png";
import EditIcon from "@/assets/icons/edit.png";
import DeleteIcon from "@/assets/icons/delete.png";

const ApprovedProjects = ({ projects }) => {
    if (!projects || projects.length === 0) return <p className="text-gray-400">No approved projects yet.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
            {projects.map((project, index) => (
                <div
                    key={index}
                    className="bg-[#000000] rounded-xl shadow-lg p-5 hover:-translate-y-1 transition-transform"
                >
                    <img
                        src={project.projectPicUrl || "https://cdn.dribbble.com/userupload/12857159/file/original-c06e5e18f2.png"}
                        alt={project.projectName}
                        className="rounded-lg mb-4 w-full h-48 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-white mb-2 text-center">
                        {project.projectName}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 text-center">{project.description}</p>

                    <div className="flex justify-center gap-6 text-gray-400 text-sm mt-3 border-t border-gray-700 pt-3">
                        <div className="flex items-center gap-1">
                            <img src={HeartIcon} alt="likes" className="w-5 h-5" />
                            <span>{project.reactionCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={EyeIcon} alt="views" className="w-5 h-5" />
                            <span>{project.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="hover:text-white">
                                <img src={EditIcon} alt="edit" className="w-5 h-5" />
                            </button>
                            <button className="hover:text-red-400">
                                <img src={DeleteIcon} alt="delete" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApprovedProjects;
