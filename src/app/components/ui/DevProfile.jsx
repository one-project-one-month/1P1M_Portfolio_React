import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const DevProfile = ({devProfile}) => {
    
    const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center bg-[#030712] rounded-3xl px-12 py-6'>

      <div className="space-y-8">

        <div className="flex justify-start gap-4">
            <img src={devProfile.profilePictureUrl} className='w-[104px] h-[106px] rounded-full object-cover' alt="" />
            <div className="text-left space-y-2">
                <div className="px-4">
                    <h2 className='text-2xl'>{devProfile.name}</h2>
                </div>
                <div className="bg-white/9 border border-white/15 rounded-lg text-sm inline-block px-4 py-2">{devProfile.tech_stack} Developer</div>
                <div className="px-4">
                    <p className='text-sm truncate max-w-[200px]'>{devProfile.aboutDev}</p>
                </div>
            </div>
        </div>

        <div className="flex justify-start items-center gap-10">
        <div className="flex gap-3">
            {devProfile.github && (
                <a href={devProfile.github} target="_blank" rel="noopener noreferrer" className="w-[17px] h-[16px] flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors" >
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 0C7.38376 0 6.27846 0.212064 5.24719 0.624083C4.21592 1.0361 3.27889 1.64001 2.48959 2.40132C0.895533 3.93886 0 6.02421 0 8.19862C0 11.8224 2.4395 14.8969 5.814 15.9873C6.239 16.0529 6.375 15.7987 6.375 15.5774V14.1918C4.0205 14.6837 3.519 13.0932 3.519 13.0932C3.128 12.1421 2.5755 11.888 2.5755 11.888C1.802 11.3797 2.635 11.3961 2.635 11.3961C3.485 11.4535 3.9355 12.2405 3.9355 12.2405C4.675 13.4867 5.9245 13.1178 6.409 12.921C6.4855 12.3881 6.7065 12.0274 6.9445 11.8224C5.0575 11.6174 3.077 10.9124 3.077 7.78869C3.077 6.87864 3.4 6.14896 3.9525 5.56686C3.8675 5.36189 3.57 4.50924 4.0375 3.40243C4.0375 3.40243 4.7515 3.18106 6.375 4.23868C7.0465 4.05831 7.7775 3.96813 8.5 3.96813C9.2225 3.96813 9.9535 4.05831 10.625 4.23868C12.2485 3.18106 12.9625 3.40243 12.9625 3.40243C13.43 4.50924 13.1325 5.36189 13.0475 5.56686C13.6 6.14896 13.923 6.87864 13.923 7.78869C13.923 10.9206 11.934 11.6092 10.0385 11.8142C10.3445 12.0684 10.625 12.5685 10.625 13.3309V15.5774C10.625 15.7987 10.761 16.0611 11.1945 15.9873C14.569 14.8887 17 11.8224 17 8.19862C17 7.12196 16.7801 6.05584 16.353 5.06114C15.9258 4.06644 15.2997 3.16263 14.5104 2.40132C13.7211 1.64001 12.7841 1.0361 11.7528 0.624083C10.7215 0.212064 9.61624 0 8.5 0Z" fill="#F3F4F6"/>
                    </svg>
                </a>
            )}
            {devProfile.linkedIn && (
                <a href={devProfile.linkedIn} target="_blank" rel="noopener noreferrer" className="w-[17px] h-[16px] flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors" >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2222 0C14.6937 0 15.1459 0.187301 15.4793 0.520699C15.8127 0.854097 16 1.30628 16 1.77778V14.2222C16 14.6937 15.8127 15.1459 15.4793 15.4793C15.1459 15.8127 14.6937 16 14.2222 16H1.77778C1.30628 16 0.854097 15.8127 0.520699 15.4793C0.187301 15.1459 0 14.6937 0 14.2222V1.77778C0 1.30628 0.187301 0.854097 0.520699 0.520699C0.854097 0.187301 1.30628 0 1.77778 0H14.2222ZM13.7778 13.7778V9.06667C13.7778 8.29813 13.4725 7.56107 12.929 7.01763C12.3856 6.47419 11.6485 6.16889 10.88 6.16889C10.1244 6.16889 9.24444 6.63111 8.81778 7.32444V6.33778H6.33778V13.7778H8.81778V9.39556C8.81778 8.71111 9.36889 8.15111 10.0533 8.15111C10.3834 8.15111 10.6999 8.28222 10.9333 8.5156C11.1667 8.74898 11.2978 9.06551 11.2978 9.39556V13.7778H13.7778ZM3.44889 4.94222C3.84495 4.94222 4.22478 4.78489 4.50484 4.50484C4.78489 4.22478 4.94222 3.84495 4.94222 3.44889C4.94222 2.62222 4.27556 1.94667 3.44889 1.94667C3.05047 1.94667 2.66838 2.10494 2.38666 2.38666C2.10494 2.66838 1.94667 3.05047 1.94667 3.44889C1.94667 4.27556 2.62222 4.94222 3.44889 4.94222ZM4.68444 13.7778V6.33778H2.22222V13.7778H4.68444Z" fill="#F3F4F6"/>
                    </svg>
                </a>
            )}
            {devProfile.facebook && (
                <a href={devProfile.facebook} target="_blank" rel="noopener noreferrer" className="w-[17px] h-[16px] flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors" >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8.02005C16 3.59298 12.416 0 8 0C3.584 0 0 3.59298 0 8.02005C0 11.9018 2.752 15.1338 6.4 15.8797V10.4261H4.8V8.02005H6.4V6.01504C6.4 4.46717 7.656 3.20802 9.2 3.20802H11.2V5.61404H9.6C9.16 5.61404 8.8 5.97494 8.8 6.41604V8.02005H11.2V10.4261H8.8V16C12.84 15.599 16 12.1825 16 8.02005Z" fill="#F3F4F6"/>
                    </svg>
                </a>
            )}
        </div>
          <Button variant="primary" size="primary" className="hover:bg-[#8A2BE2] transition-colors py-2" onClick={()=> navigate('/dev-list')}>
            View Profile
          </Button>
        </div>

      </div>

    </div>
  )
}

export default DevProfile
