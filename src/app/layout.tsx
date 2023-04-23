import { Nunito } from 'next/font/google'

import RegisterModal from './components/modal/RegisterModal'
import LoginModal from './components/modal/LoginModal'
import RentModal from './components/modal/RentModal'
import Navbar from './components/navbar/Navbar'
import SearchModal from './components/modal/SearchModal'

import ToasterProvider from './providers/ToastProvider'
import getCurrentUser from './actions/getCurrentUser'
import './globals.css'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb app clone',
}

const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <SearchModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
