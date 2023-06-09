'use client'

import { SafeUser } from '@/app/types'
import { FC } from 'react'
import Container from '../Container'
import Categories from './Categories'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {

  return (
    <div className='fixed w-full shadow-sm bg-white z-40'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'> 
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} data-superjson />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar