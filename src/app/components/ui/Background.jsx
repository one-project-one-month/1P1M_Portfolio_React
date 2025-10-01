import React from 'react'
import bg from '../../assets/image.png'

function Background({children, className="", style={}, ...props}) {
  return (
    <div 
        className={`relative h-full w-full ${className}`}
        style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            ...style
        }}
        {...props}
    >
        <div className='relative z-10'>{children}</div>
    </div>
  )
}

export default Background