"use client";
import { useRouter } from "next/navigation";
import box from "../styles/Box.module.css";
import Link from "next/link";
import { useState } from "react";
const Form = () => {
  const [form, setForm] = useState({ first_name: "", last_name: "" });
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name } = form;
    if (!first_name || !last_name) {
      console.log("Please fill compleate name");
      return;
    }
    router.push("/Selection");
  };
  return (
    <>
      <form className=" flex-col gap-5 " onSubmit={handleSubmit}>
        <h6 style={{ margin: 5 }}>👉 Enter Your Name</h6>
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
          <button className={box.button}>Login</button>
          <Link href="/" className="btn-cancel">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
};
export default Form;
