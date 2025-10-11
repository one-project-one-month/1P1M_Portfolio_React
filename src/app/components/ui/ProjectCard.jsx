import React, { useState } from "react";
import Button from "./Button";

const ProjectCard = ({title, img, description, likestate, likecount}) =>{

    const [loading, setLoading] = useState(false);
    const [likes, setLikes] = useState(likecount || "5");
    const [liked, setLiked] = useState(likestate);

    const handleLike = () => {
        console.log("=== BUTTON CLICKED - CALLING API ===");
        setLiked(!liked)
        setLikes(liked ? +likes-1 : +likes+1)
    }

    return (
        <div className="w-[420px] h-[370px] bg-[#030712] flex flex-col gap-4 border border-white/20 text-white text-center rounded-[10px] p-[10px]">    
            <div className="h-full flex flex-col items-center">
                <div className="w-ful h-full">
                    <h2 className="text-2xl font-[600] mb-4">{title || "Project Name"}</h2>
                    <p className="text-wrap text-sm">{description || "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, necessitatibus!"}</p>
                </div>
                <div className="flex justify-center gap-4">
                    <Button type="submit" className='cursor-pointer bg-[#B58400] px-6' variant="primary" size="secondary" disabled={loading}
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
                </div>
                <div className="flex gap-[24px] mt-4">
                    <Button type="submit" className='w-[121px] h-[34px] cursor-pointer' variant="primary" size="secondary" disabled={loading}
                        onClick={async (e) => { 
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("=== BUTTON CLICKED - CALLING API ===");
                            await onSubmit(e);
                        }}
                    >
                        <div className="flex items-center justify-center">
                            {loading && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            )}
                            Preview
                        </div>
                    </Button>
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                        >
                        {/* Heart SVG */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={liked ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth="1.8"
                            stroke="currentColor"
                            className={`w-5 h-5 ${liked ? "text-red-500" : "text-gray-400"}`}
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.09-4.5-4.667-4.5-1.803 0-3.4.987-4.333 
                            2.457A5.002 5.002 0 0 0 3 8.25c0 5.25 9 10.5 9 
                            10.5s9-5.25 9-10.5z"
                            />
                        </svg>

                        <span className="text-sm">{likes}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;