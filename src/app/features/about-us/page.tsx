import { useNavigate } from 'react-router-dom';
import AboutUsCard from './components/about-us-card';
import StatsGrid from './components/stats-grid';
import TeamBar from './components/team-bar';

import IconGrowSlots from '@/assets/icons/IconGrowSlots';
import missionImg from '@/assets/mission.png';
import valueImg from '@/assets/value.png';
import vissionImg from '@/assets/vission.png';
import useLatestTimeline from '../home/hooks/useLatestTimeline';

const AboutUsPage = () => {
  const navigate = useNavigate();

  const { registerStatus, registerButtonStyle } = useLatestTimeline();

  return (
    <>
      {/* Banner Section */}
      <section className="flex flex-col items-center justify-center pt-20">
        <div className="mb-8 text-4xl lg:text-8xl font-bold">
          <h1 className="text-center text-nowrap">
            <span className="text-[#BD7AFD]">One Project</span>
            <span className="text-white">,</span>
            <span className="text-[#FFBA00]"> One Month</span>
          </h1>
        </div>
        <div className="mb-8 text-[#B4BCD0] text-center text-xl font-light">
          <p>OPOM is a space where Myanmar’s next generation of builders</p>
          <p>come together to turn learning into action by launching one</p>
          <p>meaningful project every month.</p>
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
      </section>

      {/* Mission and Vision */}
      <section className="mt-32 flex flex-col justify-center items-center w-full">
        <div className="flex flex-row justify-between items-end w-full">
          <div className="text-white text-4xl font-bold space-y-1">
            <h1>Mission, Vision</h1>

            <div className="flex items-center gap-4">
              <h1>
                <span>& </span>
                <span className="text-[#FFBA00]">Value</span>
              </h1>

              <div className="w-25 h-1 bg-[#BD7AFD] rounded-full mt-2" />
            </div>
          </div>

          <div className="text-right text-lg text-[#B4BCD0] max-w-md">
            <p>We value collaboration, consistency,</p>
            <p>inclusivity, and learning by doing—building</p>
            <p>and growing together through real projects.</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-6">
          <AboutUsCard
            title="Mission"
            description="To provide a structured, fast-paced environment where designers and devs level up by shipping actual products, not just earning certificates."
            image={missionImg}
          />
          <AboutUsCard
            title="Vision"
            description='To eliminate the "no experience" paradox and establish Myanmar’s tech talent as a global force of innovation.'
            image={vissionImg}
          />
          <AboutUsCard
            title="Value"
            description="To foster collaboration, consistency, inclusivity, and learning by growing together through real projects and shared experiences."
            image={valueImg}
          />
        </div>
      </section>

      <section className="my-30 mt-40">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold">
            <span className="text-white">How We Build </span>
            <span className="text-[#FFBA00]">Together</span>
            <div className="w-24 h-1 bg-[#BD7AFD] mb-8" />
          </h2>
          <p className="text-[#B4BCD0] max-w-100 mx-auto w-full text-center text-md font-light">
            Teams come together each month to turn ideas into real
            products—fast, collaborative, and hands-on.
          </p>
          <IconGrowSlots />
        </div>
      </section>

      <section className="max-w-7xl mx-auto pt-24 mb-[200px]">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20">
          <div className="max-w-md mt-14 lg:mb-0 mb-14">
            <h2 className="text-4xl font-bold">
              <span className="text-white">We Don't Just </span>
              <span className="text-[#FFBA00]">Talk</span>
              <span className="text-white">.</span>
            </h2>
            <div className="w-24 h-1 bg-[#BD7AFD] mb-8" />
            <p className="text-[#B4BCD0]">Real numbers. Real Impact.</p>
          </div>

          {/* Stats Section */}
          <div className="w-full lg:w-1/2">
            <StatsGrid />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center mb-[200px]">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold">
            <span className="text-white">The People Behind </span>
            <span className="text-[#FFBA00]">OPOM</span>
            <div className="w-24 h-1 bg-[#BD7AFD] mb-8" />
          </h2>

          <p className="text-[#B4BCD0] text-center text-md font-light">
            A collective of builders learning, creating,
          </p>
          <p className="text-[#B4BCD0] text-center text-md font-light">
            and growing together through real work.
          </p>
        </div>
        <div>
          <TeamBar align="left" team="Design team" />
          <TeamBar align="right" team="Frontend team" />
          <TeamBar align="left" team="Backend team" />
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
