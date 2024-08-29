import React from 'react'

const Footer = () => {
  return (
    <footer className='hidden w-full min-h-[150px] bg-cyan-900 lg:flex items-center justify-around' >
        <div className="logo flex items-center cursor-default select-none">
        <span className='text-white text-5xl font-extrabold'>My-</span><span className='text-sky-200 text-4xl'>Blogs :&#41;</span>
      </div>
        <div className='text-white cursor-default'>
            It&#39;s a Social Networking Platform. <span className='italic text-orange-300 underline cursor-default bitaText'>( Beta Version )</span>
        </div>
    </footer>
  )
}

export default Footer