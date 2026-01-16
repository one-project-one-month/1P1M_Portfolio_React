import React from 'react'
import { EllipseColon } from '@/styles/elipse-colon'

export type CountdownItem = {
  value: string
  label: string
}

type CountdownTimerProps = {
  items: CountdownItem[]
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ items }) => {
  return (
    <div className="flex items-center gap-[19px]">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          
          <div className="flex flex-col h-[150.76px] w-[97.76px] items-center">
            <div className="w-[97.76px] h-[97.76px] flex items-center justify-center rounded-xl bg-black text-white text-[48px] font-semibold border border-[#9C39FC] shadow-[1px_4px_4px_0px_rgba(156,57,252,1)]">
              {item.value}
            </div>

            <span className="mt-4 font-[Actor] text-xl h-[32px] text-[#B4BCD0]">
              {item.label}
            </span>
          </div>

          {index !== items.length - 1 && <EllipseColon />}
        </React.Fragment>
      ))}
    </div>
  )
}

export default CountdownTimer
