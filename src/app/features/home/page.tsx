import Curve from '@/styles/curve';
import { useNavigate } from 'react-router-dom';
import type { CountdownItem } from './components/countdown-component';
import CountdownTimer from './components/countdown-component';
import FeaturedDevelopersSectionContainer from './components/dev-register-container';
import IdeaListSection from './components/idea-list/idea-list-section';

export default function HomePage() {
  const navigate = useNavigate();
  const countdownItems: CountdownItem[] = [
    { value: '03', label: 'Days' },
    { value: '05', label: 'Hours' },
    { value: '40', label: 'Minutes' },
    { value: '30', label: 'Seconds' },
  ];

  return (
    <div className=" max-w-6xl mx-auto  w-full">
      {/* Start Welcome Page Content */}
      <section className="flex relative flex-col items-center justify-center  text-center text-white  my-14">
        <div className="absolute -z-10 h-100 overflow-hidden left-1/2  top-1/2 overflow-y-hidden -translate-x-1/2 w-screen">
          <Curve className="w-full pointer-events-none" />
        </div>

        <div className="text-4xl lg:text-8xl">
          <h1>An Open Space For</h1>
          <h1>
            <span className="text-[#BD7AFD]">Tech,</span>{' '}
            <span className="text-[#FFBA00]">Creativity</span> & Beyond
          </h1>
        </div>

        <div className="p-4 mt-2.5">
          <CountdownTimer
            deadline={'2026-2-9'}
            items={countdownItems}
            onTimeEnd={() => {}}
          />
        </div>

        <div className="flex-col items-center">
          <div className="text-lg lg:text-xl text-[#B4BCD0] mb-8">
            <p>Meet the new standard of modern software development</p>
            <p>Team Work, sprints, and product roadmaps.</p>
          </div>
          <button
            type="button"
            className="border border-white rounded-md text-sm lg:text-lg cursor-pointer py-4 px-10"
            onClick={() => navigate('/opom-register')}
          >
            Register Now
          </button>
        </div>
      </section>
      <section className="flex flex-col w-full items-center justify-center text-center text-[#E5E7EB] mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="h-auto lg:col-span-2 bg-[#050612]/80 backdrop-blur-xs rounded-4xl border border-white/20 p-6">
            <h1 className="text-3xl text-start font-semibold lg:text-4xl mb-10">
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

          <div className="flex w-full flex-col justify-between items-center gap-4">
            <div className="w-full bg-[#050612]/80 backdrop-blur-xs rounded-4xl border border-white/20 p-4">
              <h3 className="text-lg font-bold text-start md:text-2xl mb-4">
                Who <span className="text-[#BD7AFD]">We </span>are?
              </h3>
              <p className=" text-start">
                We are a rapid development organization dedicated to delivering
                a fully usable project every month. We support our community and
                work intensely to present a tangible, user-ready product in 30
                days.
              </p>
            </div>
            <div className="w-full bg-[#050612]/80 backdrop-blur-xs rounded-4xl border border-white/20 p-4">
              <h3 className="text-lg font-bold text-start md:text-2xl mb-4">
                What you have to <span className="text-[#BD7AFD]">Do </span>?
              </h3>
              <p className=" text-start">
                You can share the ideas you have in mind. From those, the most
                popular projects will be selected and you will have to work on
                them. You will have to present the project after one month.
              </p>
            </div>
          </div>
        </div>
      </section>
      <FeaturedDevelopersSectionContainer />
      {/* <ApprovedIdeasSection /> */}
      <IdeaListSection />
    </div>
  );
}
