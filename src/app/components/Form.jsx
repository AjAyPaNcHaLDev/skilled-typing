"use client";
import { useRouter } from "next/navigation";
import box from "../styles/Box.module.css";
import Link from "next/link";
import { useState } from "react";
import {CiCircleRemove} from "react-icons/ci"

import toast, { Toaster } from 'react-hot-toast';
const Form = () => {
  const [form, setForm] = useState({ first_name: "", last_name: "" });
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name } = form;
    if (!first_name || !last_name) {
      
      toast((t) => (<label style={{color:"red"}}> 
          Please fill first name and last name then try! 
        <CiCircleRemove  style={{marginLeft:10,fontSize:40, color:"skyblue", cursor: "pointer"}} onClick={() => toast.dismiss(t.id)}/>
        </label>
       
      ));
      return;
    }
    router.push("/Selection");
  };
  return (
    <>
      <form className=" flex-col gap-10 " onSubmit={handleSubmit}>
      <Toaster/>
        <h4 style={{ margin: 5 }}>👉 Enter Your Name</h4>
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          placeholder="First name"
        />
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          placeholder="Last name"
        />
        <div className="j-space-round flex-row gap-10 ">
          <button className={"btn btn-primary"}>Login</button>
          <Link href="/" className="btn">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
};
export default Form;
