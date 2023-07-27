import React from "react";
import Box from "./components/Box";
import box from "./styles/Box.module.css";
import Link from "next/link";
const page = () => {
  return (
    <>
      <div>
        <Box>
          <div className="j-center flex-col gap-10 .f-dir-col">
            <h6 className={box.h6}>Welcome to Skilled Typing Expert</h6>
            <h1 className={box.title}>Skilled Typing Expert</h1>
            <Link href="Login" className={box.button}>
              Enter
            </Link>
          </div>
        </Box>
      </div>
    </>
  );
};

export default page;
