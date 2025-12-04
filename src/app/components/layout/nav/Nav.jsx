'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { FaUserGraduate } from "react-icons/fa6";
import HamburgerMenu from 'app/components/ui/basic/HamburgerMenu';

const Nav = ({ 
  children, 
  logo = '/template/logo.png',
  links = ["About", "Menu", "Gallery", "Contact"],
  ...props 
}) => {

  const [mobileOpen, setMobileOpen] = useState(false)
  
  return (
    <div className={`mb-6 ${mobileOpen && "no-doc-scroll"}`}>
      
      {/* navigation bar */}
      <div className='flex items-center justify-between flex-1 mb-0'>

        {/* Logo */}
        <a href="/">
          <h1 className="font-primary text-4xl md:text-5xl">Analys.io</h1>
        </a>

        {children}

        <div className='flex items-center gap-8'>
          {/* Large screen navigation */}
          <div className='hidden lg:flex gap-6'>
            {links.map((title, index) => (
              <a key={index} className='text-black text-3xl font-primary-light uppercase' href={`/#${title}`}>{title}</a>
            ))}
          </div>

          <div className="h-12 border hidden md:flex items-center justify-center border-green-600 bg-green-100 aspect-square rounded-full">
            <FaUserGraduate className='text-green-800 w-6  h-auto' />
          </div>
        </div>



        {/* Mobile menu button */}
        <div className='lg:hidden flex items-center relative z-50'>
          <HamburgerMenu onClick={() => setMobileOpen(!mobileOpen)} isOpen={mobileOpen} />
        </div>
      </div>

      {/* Expanded mobile menu */}
      <motion.nav initial={false}
        animate={mobileOpen ? "open" : "closed"}
        variants={{
          open: { 
            scaleY: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.1,
              ease: [0.12, 0, 0.29, 0]
            },
          },

          closed: { 
            scaleY: 0,
            transition: {
              duration: .6,
              delay: 0.5,              
              staggerChildren: 0.1,
              staggerDirection: -1,
              ease: [0.22, 1, 0.36, 1]
            },
          },
        }}
        className={`lg:hidden bg-green-100 origin-top fixed z-40 top-0 left-0 h-screen w-full overflow-hidden`}>
          <div className='flex flex-col justify-center items-center h-full'>
            {links.map((title, index) => (
              <div key={index} className='overflow-hidden'>
                <motion.a variants={{
                  open: {
                    y: 0,
                  },
                  closed: {
                    y: 50,
                  }
                }} 
      
                className='text-black text-3xl font-primary-light uppercase w-full block mt-6' href={`/#${title}`}>{title}</motion.a>
              </div>
            ))}
          </div>
      </motion.nav>

    </div>

  )
}

export default Nav