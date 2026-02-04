import { useNavigate } from 'react-router-dom';
import AboutUsCard from './components/about-us-card';
import StatsGrid from './components/stats-grid';
import TeamBar from './components/team-bar';

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Banner Section */}
      <section className="flex flex-col items-center justify-center pt-20">
        <div className="mb-8 text-2xl lg:text-6xl font-bold">
          <h1>
            <span className="text-[#6F28B3]">One Project</span>
            <span className="text-white">,</span>
            <span className="text-[#FFBA00]"> One Month</span>
          </h1>
        </div>
        <div className="mb-8 text-[#B4BCD0] opacity-55 text-center text-xl font-light">
          <p>OPOM is a space where Myanmar’s next generation of builders</p>
          <p>come together to turn learning into action by launching one</p>
          <p>meaningful project every month.</p>
        </div>
        <button
          type="button"
          className="text-white border border-white rounded-full text-sm lg:text-lg cursor-pointer py-4 px-10"
          onClick={() => navigate('/opom-register')}
        >
          Register Now
        </button>
      </section>

      {/* Mission and Vision */}
      <section className="mt-32 flex flex-col justify-center items-center w-full px-10 lg:px-20">
        <div className="flex flex-row justify-between items-end w-full">
          <div className="text-white text-4xl font-bold space-y-1">
            <h1>Mission, Vision</h1>

            <div className="flex items-center gap-4">
              <h1>
                <span>& </span>
                <span className="text-[#FFBA00]">Value</span>
              </h1>

              <div className="w-25 h-1 bg-[#6F28B3] rounded-full mt-2" />
            </div>
          </div>

          <div className="text-right text-lg text-[#B4BCD0] max-w-md">
            <p>
              We value collaboration, consistency, inclusivity, and learning by
              doing—building and growing together through real projects.
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-between w-full gap-6">
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
        </div>
      </section>

      <section className="max-w-7xl mx-auto pt-24 mb-[200px]">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20">
          <div className="max-w-md mt-14">
            <h2 className="text-4xl font-bold">
              <span className="text-white">We Don't Just </span>
              <span className="text-[#FFBA00]">Talk</span>
              <span className="text-white">.</span>
            </h2>
            <div className="w-24 h-1 bg-[#6F28B3] mb-8" />
            <p className="text-white/60">Real numbers. Real Impact.</p>
          </div>

          {/* Stats Section */}
          <div className="w-1/2">
            <StatsGrid />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center mb-[200px]">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold">
            <span className="text-white">The People Behind </span>
            <span className="text-[#FFBA00]">OPOM</span>
            <div className="w-24 h-1 bg-[#6F28B3] mb-8" />
          </h2>

          <p className="text-[#B4BCD0] opacity-55 text-center text-md font-light">
            Teams come together each month to turn ideas into real
          </p>
          <p className="text-[#B4BCD0] opacity-55 text-center text-md font-light">
            products—fast, collaborative, and hands-on.
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
