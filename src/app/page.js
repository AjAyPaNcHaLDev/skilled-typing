import React from "react";
import Box from "./components/Box";
import box from "./styles/Box.module.css";
import Link from "next/link";
import { WelcomeToast } from "./components/Toast/WelcomeToast";
import { AnimantedText } from "./components/AnimantedText";

const page = () => {
  return (
    <>
      <div>
        <WelcomeToast />
        <Box>
          {/* <div className="j-center flex-col gap-10 .f-dir-col"> */}
          <div className=" ">
            <h1 className={box.h4}>
              <AnimantedText />
              <span
                id="cursor"
                style={{ borderLeft: ".1em solid rgb(16, 96, 233)", height: 2 }}
              ></span>
            </h1>
          </div>
          <Link
            href="/Login"
            className={
              " bg-blue-500 hover:bg-blue-700 text-white font-bold p-3  rounded-full "
            }
          >
            Let's Start
          </Link>
        </Box>
      </div>
    </>
  );
};

export default page;
