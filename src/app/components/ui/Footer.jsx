import { opomIconUrl } from '@/assets/icons/iconUrls'
import React from 'react'
import { Link } from 'react-router-dom'


const features = [
  {name: "Portfolio", linkTo:"/protfolio"},
  {name: "Dev Profiles", linkTo:"/dev-profiles"},
  {name: "Ideas", linkTo:"/ideas"},
  {name: "Approved Ideas", linkTo:"/approved-ideas"},
  {name: "Teams", linkTo:"/teams"},
]

const socials = [
  {name: "Facebook", linkTo:"javascript:void(0)"},
  {name: "LinkedIn", linkTo:"javascript:void(0)"},
  {name: "Github", linkTo:"https://github.com/one-project-one-month"},
  {name: "Instagram", linkTo:"javascript:void(0)"}
]



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
                features.map((feature,idx)=>(
                  <Link key={idx} to={feature.linkTo} className='text-[#ADADAD]'>{feature.name}</Link>
                ))
              }
            </div>
          </div>

          <div className="text-white">
            <h2 className='text-lg font-bold mb-4'>Social</h2>
            <div className="flex flex-col gap-2">
              {
                socials.map((social,idx)=>(
                  <a key={idx} href={social.linkTo} className='text-[#ADADAD]' target='_blank'>{social.name}</a>
                ))
              }
            </div>
          </div>

        </div>
      </div>
  )
}

export default Footer
