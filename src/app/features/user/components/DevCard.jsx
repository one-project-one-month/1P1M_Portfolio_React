import React from "react";
//import CopyIcon from "@/assets/icons/Copy.png";
import Button from "../../../components/ui/Button";
import GitHubIcon from "@/assets/icons/GitHub.png";
import LinkedinIcon from "@/assets/icons/Linkedin.png";

export default function DevCard({ member }) {

    const handleVisitProfile = () => {
        const profileLink = member.github || member.linkedIn || "#";
        window.open(profileLink, "_blank");
    };
    const handleInvite = () => {
        const inviteLink = member.inviteUrl || `/invite?dev=${member.telegram.replace('@', '')}`;
        window.open(inviteLink, "_blank");
    };

    return (
        <div className="bg-[#030712] rounded-2xl p-5 w-[420px] h-[225px]">
            <div className="flex items-start gap-4 mb-6">
                <img
                    src={member.profilePictureUrl || "https://via.placeholder.com/100"}
                    alt={member.name}
                    className="w-[104px] h-[106px] rounded-full object-cover"
                />
                <div className="flex-1">
                    <h3 className="text-[#F9FAFB] text-2xl font-normal mb-2 leading-8">
                        {member.name || "Unknown Developer"}
                    </h3>
                    <div className="inline-block bg-white/10 border border-white/15 text-[#F9FAFB] text-sm rounded-md py-2.5 px-[10px]">
                        {member.techStacks?.length ? (
                            member.techStacks.map((tech, i) => (
                                <span
                                    key={i}
                                    className="bg-white/10 border border-white/15 text-[#F9FAFB] text-sm rounded-md py-1 px-2"
                                >
                                    {tech}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400 text-sm">No tech stacks</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 leading-6 pt-[5px]">
                        <span className="text-[#6A7282] text-[16px]">
                            {member.role || "Developer"}
                        </span>

                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-10 ml-auto w-full">
                <div className="flex gap-3 pl-0.5">
                    {member.socials?.length ? (

                        member.socials.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-[17px] h-[16px] flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors"
                            >
                                <img
                                    src={social.icon || GitHubIcon}
                                    alt={social.name}
                                    className="w-5 h-5 object-contain"
                                />
                            </a>
                        ))
                    ) : (
                        <>
                            {member.github && (
                                <a href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={GitHubIcon} alt="GitHub" className="w-5 h-5" />
                                </a>
                            )}
                            {member.linkedIn && (
                                <a
                                    href={member.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={LinkedinIcon} alt="LinkedIn" className="w-5 h-5" />
                                </a>
                            )}
                        </>
                    )
                    }
                </div>

                <div className="flex flex-1 justify-center gap-3 max-w-sm">
                    <Button
                        variant="black_button"
                        size="primary"
                        type="button"
                        className="flex-1 py-2 hover:bg-[#fffff4] transition-colors"
                        onClick={handleVisitProfile}
                    >
                        Visit Profile
                    </Button>
                    <Button
                        variant="primary"
                        size="primary"
                        className="lex-1 py-2  hover:bg-[#8A2BE2] transition-colors"
                        onClick={handleInvite}
                    >
                        Invite
                    </Button>
                </div>
            </div>
        </div>
    );
}
