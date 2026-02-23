import React from 'react'

const ContactUs = () => {
  return (
    <div className="bg-[#1c1c1c] py-8 flex flex-col items-center lg:justify-evenly md:justify-between justify-center space-y-6 md:flex-row">
      {/* Main title */}
      <div className='flex font-serif text-white text-3xl md:text-3xl md:mr-6 md:mx-5  justify-center '>
        Contact Us
      </div>

     {/*for contacts and number */}
     <div className='flex flex-col md:mx-10 md:gap-2'>
      {/* Links */}
      <div className='flex gap-5 text-white md:gap-7 mt-1'>
        <a href="#" className="text-xs font-serif transition-transform duration-300 hover:scale-110 md:text-xl">Contact</a>
        <a href="#" className='text-xs font-serif transition-transform duration-300 hover:scale-110 md:text-xl'>Email</a>
        <a href="#" className='text-xs font-serif transition-transform duration-300 hover:scale-110 md:text-xl'>Facebook</a>
        <a href="#" className='text-xs font-serif transition-transform duration-300 hover:scale-110 md:text-xl'>Twitter</a>
        <a href="#" className='text-xs font-serif transition-transform duration-300 hover:scale-110 md:text-xl'>Instagram</a>
      </div>

      
    </div>
    </div>
  )
}

export default ContactUs
