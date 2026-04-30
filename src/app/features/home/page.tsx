import Curve from '@/styles/curve';
import { useNavigate } from 'react-router-dom';
import type { CountdownItem } from './components/countdown-component';
import CountdownTimer from './components/countdown-component';
import FeaturedDevelopersSectionContainer from './components/dev-register-container';
import IdeaListSection from './components/idea-list/idea-list-section';
import useLatestTimeline from './hooks/useLatestTimeline';
import OpomBanner from './components/opom-banner';

export default function HomePage() {
 
  const navigate = useNavigate();
  const countdownItems: CountdownItem[] = [
    { value: '03', label: 'Days' },
    { value: '05', label: 'Hours' },
    { value: '40', label: 'Minutes' },
    { value: '30', label: 'Seconds' },
  ];

  const { registerStatus, registerButtonStyle, startTime } =
    useLatestTimeline();

  return (
    <div className="mx-auto w-full">
      {/* Start Welcome Page Content */}
      <section className="flex relative flex-col items-center justify-center  text-center text-white  my-14">
        <div className="text-2xl sm:text-4xl lg:text-8xl">
          {registerStatus === 'closingSoon' && (
            <h1>
              Register <span className="text-[#FFBA00]">closing</span> soon!
            </h1>
          )}

          {registerStatus === 'closed' && (
            <h1>
              Register is <span className="text-[#FFBA00]">closed</span>!
            </h1>
          )}

          {registerStatus === 'open' && (
            <>
              <h1>An Open Space For</h1>
              <h1>
                <span className="text-[#BD7AFD]">Tech,</span>{' '}
                <span className="text-[#FFBA00]">Creativity</span> & Beyond
              </h1>
            </>
          )}
        </div>

        <div className="p-4 relative mt-2.5">
          <CountdownTimer
            deadline={startTime}
            items={countdownItems}
            onTimeEnd={() => {}}
          />
          <div className="absolute -z-10 h-60 md:h-100 overflow-hidden left-1/2 top-15 md:top-25 overflow-y-hidden -translate-x-1/2 w-screen">
            <Curve className="w-full pointer-events-none" />
          </div>
        </div>

        <div className="flex-col items-center">
          <div className="text-lg lg:text-xl text-[#B4BCD0] mb-8">
            <p>Meet the new standard of modern software development</p>
            <p>Team Work, sprints, and product roadmaps.</p>
          </div>
          <button
            type="button"
            className={`border rounded-md text-sm lg:text-lg py-4 px-10 
    ${registerButtonStyle[registerStatus]}`}
            onClick={() => {
              if (registerStatus !== 'closed') {
                navigate('/opom-register');
              }
            }}
            disabled={registerStatus === 'closed'}
          >
            Register Now
          </button>
        </div>
      </section>

    
    <OpomBanner />
      <FeaturedDevelopersSectionContainer />
      {/* <ApprovedIdeasSection /> */}
      <IdeaListSection />
    </div>
  );
}
