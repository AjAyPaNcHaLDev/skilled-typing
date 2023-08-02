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
        <Box style={{ width: "50%" }}>
          <div className="j-center flex-col gap-10 .f-dir-col">
            {/* <h1 className={box.h4}>Welcome to Skilled Typing Expert</h1>  */}
            <h1 className={box.h4}>
              <AnimantedText />
              <span
                id="cursor"
                style={{ borderLeft: ".1em solid rgb(16, 96, 233)", height: 2 }}
              ></span>
            </h1>
            <Link
              href="Login"
              style={{ margin: 10 }}
              className={"btn btn-primary "}
            >
              Let's Start
            </Link>
          </div>
        </Box>
      </div>
    </>
  );
};

export default page;
