import { opomIconUrl } from '@/assets/icons/iconUrls'
import { socials } from '@/constants'
import { getNavLinks } from '@/lib/use-get-nav-links'

import { Link } from 'react-router-dom'






const Footer = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <div className="">
            <div className="text-2xl text-white">
                <img src={opomIconUrl}/>
             </div>
             <p className='text-white mt-4'>One Project One Month</p>
        </div>
        <div className="flex gap-12 mx-auto md:ms-8">

          <div className="text-white">
            <h2 className='text-lg font-bold mb-4'>Features</h2>
            <div className="flex flex-col gap-2">
              {
                getNavLinks().map((feature)=>(
                  <Link key={feature.id} to={feature.path} className='text-[#ADADAD]'>{feature.name}</Link>
                ))
              }
            </div>
          </div>

          <div className="text-white">
            <h2 className='text-lg font-bold mb-4'>Social</h2>
            <div className="flex flex-col gap-2">
              {
                socials.map((social)=>(
                  <a key={social.id} href={social.path} className='text-[#ADADAD]' target='_blank'>{social.name}</a>
                ))
              }
            </div>
          </div>

        </div>
      </div>
  )
}

export default Footer