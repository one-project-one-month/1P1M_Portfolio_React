import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AboutUsCard from './components/about-us-card';
import LeadImage from './components/image.png';
import SocialLink from './components/social-link-icon';
import StatsGrid from './components/stats-grid';

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

      {/* Lead Section */}
      <section className="max-w-7xl mx-auto pt-24">
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

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:justify-between">
          {/* Lead Image Piece */}
          <div className="relative w-full lg:w-1/3 group">
            <img
              src={LeadImage}
              alt="Lead Portrait"
              className="w-full h-auto  object-cover rounded-lg"
            />
          </div>

          <div className="w-1/2 p-12">
            <div className="relative inline-block mb-8">
              <h2 className="text-4xl text-white font-bold">The Lead</h2>
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#6F28B3]" />
            </div>

            <h3 className="text-xl font-semibold mb-4 text-white/90">
              Sann Lynn Htun : Senior Developer & Community Lead
            </h3>

            <p className="text-[#B4BCD0] text-lg leading-relaxed mb-8 max-w-xl">
              A seasoned Senior Developer dedicated to engineering new
              technologies. After years of navigating complex technical
              challenges, he founded OPOM to bridge the gap between theory and
              industry-grade professional standards.
            </p>

            <div className="flex gap-2">
              <SocialLink Icon={Linkedin} href="#" />
              <SocialLink Icon={Twitter} href="#" />
              <SocialLink Icon={Facebook} href="#" />
              <SocialLink Icon={Instagram} href="#" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
