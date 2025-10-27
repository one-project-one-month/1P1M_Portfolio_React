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
    canEdit, 
    canDelete,
    tags = [],
    onLike,
}) => {

    const [isLiked, setIsLiked] = useState(liked);
    const [likes, setLikes] = useState(Number(likeCount));

    const handleLike = () => {
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);
        setLikes(newLikeState == true ? likes + 1 : likes - 1);
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
                    {isLiked ? 
                        (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.75 3.5C5.12665 3.5 3 5.75956 3 8.54688C3 14.125 12 20.5 12 20.5C12 20.5 21 14.125 21 8.54688C21 5.09375 18.8734 3.5 16.25 3.5C14.39 3.5 12.7796 4.63593 12 6.2905C11.2204 4.63593 9.61003 3.5 7.75 3.5Z" stroke="#99A1AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        ):(
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.75 3.5C5.12665 3.5 3 5.75956 3 8.54688C3 14.125 12 20.5 12 20.5C12 20.5 21 14.125 21 8.54688C21 5.09375 18.8734 3.5 16.25 3.5C14.39 3.5 12.7796 4.63593 12 6.2905C11.2204 4.63593 9.61003 3.5 7.75 3.5Z" fill="#F9FAFB" stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        )
                    }

                    <span className="text-sm">{formatCount(likes)}</span>
                </button>
                {canEdit && (
                    <button
                        onClick={()=>canEdit()}
                        className="flex items-center gap-2 text-gray-300 transition-colors cursor-pointer"
                    >
                        {/* Edit SVG */}     
                        <svg width="24" height="24" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 23.625H22.5" stroke="#99A1AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.37437 14.8357C5.89453 15.3162 5.625 15.9675 5.625 16.6466V20.25H9.25043C9.93016 20.25 10.582 19.9799 11.0626 19.499L21.7499 8.80554C22.75 7.80489 22.75 6.18298 21.7499 5.18233L20.6942 4.12595C19.6932 3.12441 18.0698 3.12472 17.0692 4.12664L6.37437 14.8357Z" stroke="#99A1AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                )}
                {canDelete && (
                    <button
                        onClick={()=>canDelete()}
                        className="flex items-center gap-2 text-gray-300 transition-colors cursor-pointer"
                    >
                        {/* Delete SVG */}     
                        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.07153 9.64282L8.35725 22.5H18.643L19.9287 9.64282" stroke="#82181A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.1875 17.4375V11.8125" stroke="#82181A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.8125 17.4375V11.8125" stroke="#82181A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.14282 7.07143H10.2857M10.2857 7.07143L10.7155 5.35215C10.8407 4.85133 11.2907 4.5 11.8069 4.5H15.193C15.7092 4.5 16.1592 4.85133 16.2844 5.35215L16.7143 7.07143M10.2857 7.07143H16.7143M16.7143 7.07143H21.8571" stroke="#82181A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </button>
                )}
                {status && (
                    <div className={`h-[24px] flex justify-center items-center rounded-lg text-sm px-6 ${status === "1" ? 'bg-[#9AE600] text-[#364153]' : status === "2" ? 'bg-[#155DFC] text-[#F9FAFB]' : 'bg-[#79716B] text-[#F9FAFB]'}`}>
                        {status === "1" ? 'In Progress' : status === "2" ? 'Complete' : 'Unqualified'}
                    </div>
                )}
            </div>

        </div>
    )
}

export default ProjectIdeaCard;