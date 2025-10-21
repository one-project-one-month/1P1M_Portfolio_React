import Button from '@/components/ui/Button'
import Footer from '@/components/ui/Footer'
import React from 'react'
import DevCard from '../components/DevCard'
import ProjectCard from '@/components/ui/ProjectCard'

const LandingPage = () => {
  return (
    <div className="">
        {/* Start Welcome Page Content */}
        <section className="flex flex-col items-center justify-center text-center text-white h-[80vh] mb-8">

          <div className="text-4xl lg:text-8xl">
            <h1>An Open Space For</h1>
            <h1><span className='text-[#BD7AFD]'>Tech,</span> <span className='text-[#FFBA00]'>Creativity</span> & Beyond</h1>
          </div>

          <div className="mt-8">
            <div className="text-lg lg:text-2xl text-[#B4BCD0] mb-8">
              <p>Meet the new standard of modern software development</p>
              <p>Team Work, sprints, and product roadmaps.</p>
            </div>
            <button type="button" className='border border-white rounded-full text-sm lg:text-lg cursor-pointer py-4 px-10'>Register Now</button>
          </div>

        </section>
        {/* End Welcome Page Content */}

        {/* Start About Section */}
        <section className="flex flex-col items-center justify-center text-center text-[#E5E7EB] mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="h-auto bg-[#050612] rounded-4xl border border-white/20 p-6">
              <h1 className='text-3xl lg:text-4xl mb-8'>What is <span className='text-[#BD7AFD]'>OPOM</span>?</h1>
              <div className="text-sm lg:text-2xl text-left space-y-4">
                <p>One Project One Month is an organization which  will have to develop one project within one month to a stage where a user can actually use it.</p>
                <p>We are dedicated to support great ideas and developing it into a usable project in just one month. Our process is simple: ideas are shared, the best are voted on, and a functioning product is presented in one month.</p>
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

        {/* Start About Section */}
        <section className="flex flex-col items-center justify-center text-center text-[#E5E7EB] mb-8">
          <div className='w-full flex justify-between items-center my-4'>
            <h1 className='text-5xl'>Registered</h1>
            <button className='border-b cursor-pointer'>View more</button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {/* <DevCard /> */}
          </div>
        </section>

        {/* End About Section */}

        {/* Start Registered Section */}
        {/* End Registered Section */}

        {/* Start Approved Ideas Section */}
        {/* End Approved Ideas Section */}

    </div>
  )
}

export default LandingPage
