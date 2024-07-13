import { UserButton } from '@clerk/nextjs'
import { Link } from '@nextui-org/react'
import React from 'react'

export default function Navbar() {
  return (
   <div className="flex text-md flex-row gap-3 px-5 py-2 fixed bottom-0 w-full bg-black text-white justify-between">
    <Link href='/'>Home</Link>
    <UserButton/>
    <Link href='/sos'>SOS</Link>
   </div>
  )
}
