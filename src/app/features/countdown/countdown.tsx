import Curve from '@/styles/curve'
import type { CountdownItem } from './countdown-component'
import CountdownTimer from './countdown-component'

const Countdown = () => {
  const countdownItems: CountdownItem[] = [
    { value: '03', label: 'Days' },
    { value: '05', label: 'Hours' },
    { value: '40', label: 'Minutes' },
    { value: '30', label: 'Seconds' },
  ]

  return (

    <div className="relative w-full flex justify-center">
      <Curve className="absolute top-[90px] w-screen h-[356px] z-0 pointer-events-none" />

      <div className="relative z-10 items-center font-sans text-white justify-center flex flex-col w-[1083px] h-[617.76px] mt-[120px]  gap-[48px]">

        <div className="h-[192px] font-semibold text-6xl leading-[1] text-center text-[#D9D9D9]">
          <h1>
            An Open Space for <br />
            <span className="text-[#BD7AFD]">Tech</span>{' '}
            <span className="text-[#FFBA00]">Creativity</span>{' '}
            <span className="font-[Allan]">&</span> Beyond
          </h1>
        </div>

        <CountdownTimer items={countdownItems} />

        <p className="w-[591px] h-[64px] font-[Actor] text-[#B4BCD0] text-center text-xl font-normal">
          Meet the new standard of modern software development.
          Team Work, sprints, and product roadmaps
        </p>

        <button className="w-[211px] h-[60px] border-[1.4px] border-[#FFBA00] rounded-[8px] px-[34px] py-[14px] flex items-center justify-center gap-[8px] font-semibold">
          Register
        </button>

      </div>
    </div>
  )
}

export default Countdown

