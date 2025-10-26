import React, { useState } from "react";
import Button from "./Button";

const ProjectIdeaCard = ({ 
    projectId,
    title,
    description,
    submittedByProfile,
    postBy,
    likeCount = 0,
    liked = false,
    status, 
    tags = [],
    onLike,
}) => {

    const [isLiked, setIsLiked] = useState(liked);
    const [likes, setLikes] = useState(Number(likeCount));

    const handleLike = () => {
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);
        setLikes(newLikeState == true ? likes + 1 : likes - 1);
        console.log(newLikeState)
        onLike && onLike(projectId, newLikeState);
    };

    const formatCount = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
        if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + "k";
        return num;
    };

    return (
        <div className="w-[406px] h-[298px] bg-[#030712] flex flex-col justify-center items-center gap-4 border border-white/20 text-white text-center rounded-xl p-[28px]">
            <div className="h-full flex flex-col gap-[14px] items-center">

                <div className="w-ful h-full">
                    <h2 className="text-2xl font-[600] mb-4">{title}</h2>
                    <p className="text-wrap text-sm text-[#99A1AF]">{description}</p>
                </div>

                <div className="flex justify-center gap-2">

                    {tags.map((tagName, idx) => (
                        <Button key={idx} type="submit" className='h-[28px] text-sm cursor-pointer bg-[#B58400] hover:bg-[#B58400] px-6' variant="primary" size="secondary"
                            onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log("=== BUTTON CLICKED - CALLING API ===");
                                await onSubmit(e);
                            }}
                        >
                            <div className="flex items-center justify-center">
                                {tagName}
                            </div>
                        </Button>
                    ))}




                </div>

                <div className="flex justify-center items-center gap-2">
                    <p className="text-[#6A7282]">Submitted by: </p>
                    <div className="flex items-center gap-2">
                        <img src={submittedByProfile} className="w-[32px] h-[32px] rounded-full " alt="user" />
                        <p>{postBy}</p>
                    </div>
                </div>

            </div>

            <div className="flex gap-[24px] text-[#99A1AF]">
                <button
                    onClick={handleLike}
                    className="flex items-center gap-2 text-gray-300 transition-colors cursor-pointer"
                >
                    {/* Heart SVG */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isLiked ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.8"
                        stroke="currentColor"
                        className={`w-5 h-5 text-white`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.09-4.5-4.667-4.5-1.803 0-3.4.987-4.333 
                            2.457A5.002 5.002 0 0 0 3 8.25c0 5.25 9 10.5 9 
                            10.5s9-5.25 9-10.5z"
                        />
                    </svg>

                    <span className="text-sm">{formatCount(likes)}</span>
                </button>
                {status && (
                    <div className={`h-[24px] flex justify-center items-center rounded-lg text-sm px-6 ${status === 1 ? 'bg-[#9AE600] text-[#364153]' : status === 2 ? 'bg-[#155DFC] text-[#F9FAFB]' : 'bg-[#79716B] text-[#F9FAFB]'}`}>
                        {status === 1 ? 'In Progress' : status === 2 ? 'Complete' : 'Unqualified'}
                    </div>
                )}
            </div>

        </div>
    )
}

export default ProjectIdeaCard;