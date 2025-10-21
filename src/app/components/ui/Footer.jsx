import { opomIconUrl } from '@/assets/icons/iconUrls'
import React from 'react'

const Footer = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="">
            <div className="text-2xl text-white">
                <img src={opomIconUrl}/>
             </div>
        </div>
      </div>
  )
}

export default Footer
