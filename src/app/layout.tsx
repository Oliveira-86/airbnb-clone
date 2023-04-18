import { Nunito } from 'next/font/google'
import Modal from './components/modal/Modal'
import Navbar from './components/navbar/Navbar'
import './globals.css'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb app clone',
}

const font = Nunito({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal isOpen title='Hello World' />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
