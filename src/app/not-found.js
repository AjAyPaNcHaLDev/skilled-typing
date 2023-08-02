'use client'
import React from 'react'
import Box from './components/Box'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

 const NotFound = () => {
    const router=useRouter()
  return (
    <div><Box> 
        <center>This Page Not Exist. <button  onClick={()=>router.back()}>Back</button></center>
        <center>Go to <span style={{textDecoration:"underline",color:"blue",cursor:"pointer"}} onClick={()=>router.push("/")}>Home</span></center>
    </Box></div>
  )
}

export default NotFound