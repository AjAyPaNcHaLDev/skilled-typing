"use client"
import { useRouter } from "next/navigation";
import React from "react";
import {RiCloseCircleLine} from "react-icons/ri"
const Close = () => {   
   const router=useRouter()
  return (
    <div className="close">      
       <span><RiCloseCircleLine onClick={()=>router.back()}/></span>
    </div>
  );
};

export default Close;
