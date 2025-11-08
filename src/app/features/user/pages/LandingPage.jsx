import Button from '@/components/ui/Button'
import Footer from '@/components/ui/Footer'
import React, { useEffect, useState } from 'react'
import ProjectIdeaCard from '@/components/ui/ProjectIdeaCard'
import { useQuery } from '@tanstack/react-query'
import { getDevProfiles } from '@/services/devProfileService'
import { fetchApprovedProjects } from '@/services/approvedProjectsService'
import { ProjectIdeaList, reactProjectIdea, unreactProjectIdea } from '@/services/projectIdeaService'
import { useNavigate } from 'react-router-dom'
import DevCard from '../components/DevCard'
import DevProfile from '@/components/ui/DevProfile'

const fetchApprovedProjectIdeas = async () => {
  const res = await fetchApprovedProjects()
  return res.data.projects || []
}


const fetchDevProfileDatas = async () => {
  const res = await getDevProfiles()
  return res.data || []
}

const handleLike = async (projectId, likeState) => {

  try {
    if (likeState) {
      await reactProjectIdea(projectId)
    } else {
      await unreactProjectIdea(projectId)
    }
  } catch (error) {
    console.error("Error updating like:", error);
    setProjects(prev =>
      prev.map(p =>
        p.id === projectId
          ? { ...p, likecount: likeState ? p.likecount + 1 : p.likecount - 1, likestate: likeState }
          : p
      )
    );
  }
};

const LandingPage = () => {
  const navigate = useNavigate();


  // Fetch Approved Project Ideas
  const {
    data: approvedProjectideas = [],
    isLoading: ideasLoading,
    isError: ideasError,
  } = useQuery({
    queryKey: ["approvedProjectideas"],
    queryFn: fetchApprovedProjectIdeas,
  });

  // Fetch Registered Developers
  const {
    data: DevProfileDatas = [],
    isLoading: devsLoading,
    isError: devsError,
  } = useQuery({
    queryKey: ["DevProfileDatas"],
    queryFn: fetchDevProfileDatas,
  });


  const handleProfileView = (devId) => {
    const devData = DevProfileDatas.find((dev) => dev.dev_id === devId);
    console.log(devData);
    
    if (!devData) return;
    const username = devData.email.split("@")[0];
    navigate(`/profile/${username}`, { state: { devData } });
  };

  return (
    <div className="">
      {/* Start Welcome Page Content */}
      <section className="flex flex-col items-center justify-center text-center text-white h-[80vh] mb-8">
        <div className="text-4xl lg:text-8xl">
          <h1>An Open Space For</h1>
          <h1>
            <span className="text-[#BD7AFD]">Tech,</span>{" "}
            <span className="text-[#FFBA00]">Creativity</span> & Beyond
          </h1>
        </div>

        <div className="mt-8">
          <div className="text-lg lg:text-2xl text-[#B4BCD0] mb-8">
            <p>Meet the new standard of modern software development</p>
            <p>Team Work, sprints, and product roadmaps.</p>
          </div>
          <button
            type="button"
            className="border border-white rounded-full text-sm lg:text-lg cursor-pointer py-4 px-10"
            onClick={() => navigate("/auth/opom-register")}
          >
            Register Now
          </button>
        </div>
      </section>
      {/* End Welcome Page Content */}

      {/* Start About Section */}
      <section className="flex flex-col items-center justify-center text-center text-[#E5E7EB] mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-auto bg-[#050612] rounded-4xl border border-white/20 p-6">
            <h1 className="text-3xl lg:text-4xl mb-8">
              What is <span className="text-[#BD7AFD]">OPOM</span>?
            </h1>
            <div className="text-sm lg:text-2xl text-left space-y-4">
              <p>
                One Project One Month is an organization which will have to
                develop one project within one month to a stage where a user can
                actually use it.
              </p>
              <p>
                We are dedicated to support great ideas and developing it into a
                usable project in just one month. Our process is simple: ideas
                are shared, the best are voted on, and a functioning product is
                presented in one month.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between items-center gap-8">
            <div className="max-w-[461px] bg-[#050612] rounded-4xl border border-white/20 p-4">
              <h3 className='text-lg md:text-2xl mb-8'>Who <span className='text-[#BD7AFD]'>We </span>are?</h3>
              <p className='text-sm'>We are  a rapid development organization dedicated to delivering a fully usable project every month. We support our community and work intensely to present a tangible, user-ready product in 30 days.</p>
            </div>
            <div className="max-w-[461px] bg-[#050612] rounded-4xl border border-white/20 p-4">
              <h3 className='text-lg md:text-2xl mb-8'>What you have to  <span className='text-[#BD7AFD]'>Do </span>?</h3>
              <p className='text-sm'>You can share the ideas you have in mind. From those, the most popular projects will be selected and you will have to work on them. You will have to present the project after one month.</p>
            </div>
          </div>

        </div>
      </section>
      {/* End About Section */}

      {/* Start Registered Section */}
      <section className="flex flex-col justify-center text-center text-[#E5E7EB] mb-8">
        <div className='w-full flex justify-between items-center my-8'>
          <h1 className='text-5xl'>Dev Profile</h1>
          <button className='border-b cursor-pointer'
           onClick={()=>navigate('/dev-list')}
          >View more</button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4'>
          {devsLoading ? (
             <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-800 rounded-xl h-[225px]" />
              ))}
            </div>
          ):
          (
            DevProfileDatas
            .slice(0,6)
            .map((devProfile,idx)=>(
              <DevProfile key={idx} devProfile={devProfile} viewProfile={()=>handleProfileView(devProfile.dev_id)} />
            )))
          }
        </div>
      </section>
      {/* End Registered Section */}

      {/* Start Approved Ideas Section */}
      <section className="flex flex-col justify-center text-center text-[#E5E7EB] mb-8">
        <div className='w-full flex justify-between items-center my-8'>
          <h1 className='text-5xl'>Approved Ideas</h1>
          <button className='border-b cursor-pointer' onClick={() => navigate('/approved-ideas')}>View more</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4">
          {
          ideasLoading ? 
          (
            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-800 rounded-xl h-[298px]" />
              ))}
            </div>
          ):  approvedProjectideas.length === 0 ? (
            <p className="text-center col-span-full text-gray-400">
              No projects found.
            </p>
          )
          : 
            approvedProjectideas
            .slice(0, 6)
            .map((approvedProjectIdea) => (
              <ProjectIdeaCard
                key={approvedProjectIdea.id}
                projectId={approvedProjectIdea.id}
                title={approvedProjectIdea.projectName}
                description={approvedProjectIdea.projectDetails}
                submittedByProfile={approvedProjectIdea.profilePictureUrl}
                postBy={approvedProjectIdea.devName}
                likeCount={approvedProjectIdea.reactionCount}
                liked={approvedProjectIdea.reactedProjects?.includes(approvedProjectIdea.id)}
                tags={approvedProjectIdea.projectTypes}
                onLike={(projectId, likestate) => handleLike(projectId, likestate)}
                status={
                  approvedProjectIdea.status.toLowerCase() === "in_progress"
                    ? 1
                    : approvedProjectIdea.status.toLowerCase() === "completed"
                    ? 2
                    : 3
                }
              />
            ))
          }
        </div>
      </section>
      {/* End Approved Ideas Section */}
    </div>
  );
};

export default LandingPage;
