import React, { useState } from "react";
import Button from "./Button";

const ProjectIdeaCard = ({title, projectid, description, submittedByProfile, likestate, likecount, viewcount = 0, postBy, tag, status = false}) =>{

    const [likes, setLikes] = useState(Number(likecount));
    const [liked, setLiked] = useState(likestate);

    const handleLike = async() => {
        setLiked((prev) => !prev);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
        try {
            const res = await 
            
            console.log(liked ? `LIKED TO ${projectid}` : `LIKED TO ${projectid}`);
        } catch (error) {
            
        } 
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

                    <Button type="submit" className='h-[28px] text-sm cursor-pointer bg-[#B58400] hover:bg-[#B58400] px-6' variant="primary" size="secondary" 
                        onClick={async (e) => { 
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("=== BUTTON CLICKED - CALLING API ===");
                            await onSubmit(e);
                        }}
                    >
                        <div className="flex items-center justify-center">
                            Mobile
                        </div>
                    </Button>

                    <Button type="submit" className='h-[28px] text-sm cursor-pointer bg-[#B58400] hover:bg-[#B58400] px-6' variant="primary" size="secondary" 
                        onClick={async (e) => { 
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("=== BUTTON CLICKED - CALLING API ===");
                            await onSubmit(e);
                        }}
                    >
                        <div className="flex items-center justify-center">
                            Website
                        </div>
                    </Button>

                    <Button type="submit" className='h-[28px] text-sm cursor-pointer bg-[#B58400] hover:bg-[#B58400] px-6' variant="primary" size="secondary"
                        onClick={async (e) => { 
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("=== BUTTON CLICKED - CALLING API ===");
                            await onSubmit(e);
                        }}
                    >
                        <div className="flex items-center justify-center">
                            Desktop
                        </div>
                    </Button>

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
                            fill={liked ? "currentColor" : "none"}
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
                <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.8" stroke="currentColor" className="w-5 h-5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                        d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 
                        7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                    <p>{formatCount(viewcount)}</p>
                </div>
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