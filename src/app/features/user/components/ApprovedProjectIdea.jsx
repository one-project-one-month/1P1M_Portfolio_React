import React from "react";
import Button from "@/components/ui/Button";
import HeartIcon from "@/assets/icons/Heart.png";
import EyeIcon from "@/assets/icons/eye.png";
import EditIcon from "@/assets/icons/edit.png";

const ProjectIdeas = ({ ideas, profile }) => {
    if (!ideas || ideas.length === 0) return <p className="text-gray-400">No project ideas yet.</p>;

    return (
        <div className="flex flex-wrap gap-[14px] w-full">
            {ideas.map((idea) => (
                <div
                    key={idea.id}
                    className="bg-[#000000] rounded-xl p-6 w-[406px] h-[298px] flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-xl"
                >
                    <h3 className="text-2xl text-center font-semibold mb-2 text-[#F9FAFB]">
                        {idea.projectName}
                    </h3>
                    <p className="text-[#99A1AF] text-sm mb-4">{idea.description}</p>

                    <div className="flex gap-2 mb-4 justify-center">
                        {idea.projectTypes?.map((type, i) => (
                            <Button
                                key={i}
                                variant="yellow_small_button"
                                size="yellow_small_button"
                                className="hover:bg-[#B58400] transition-colors"
                            >
                                {type}
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center justify-center text-gray-400 text-sm">
                        <p className="flex items-center gap-2">
                            <span>Submitted by:</span>
                            <img
                                src={profile.profileImage || "https://i.pravatar.cc/40"}
                                alt={profile.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-white">{profile.name}</span>
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 border-t border-gray-700 pt-3">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <img src={HeartIcon} alt="heart" className="w-5 h-5" />
                                {idea.reaction_count || 0}
                            </div>
                            <div className="flex items-center gap-1">
                                <img src={EyeIcon} alt="views" className="w-5 h-5" />
                                {idea.views || 0}
                            </div>
                        </div>
                        <button className="p-2 hover:bg-[#1E223C] rounded-lg">
                            <img src={EditIcon} alt="edit" className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectIdeas;
