import React from "react";
import Box from "../components/Box";
import box from "../styles/Box.module.css";
import Close from "../components/Close";
import Form from "../components/Form";

const Page = () => {
  return (
    <div>
      <Box>
        <Close />
        <div className="j-center flex-col gap-10  ">
          <h6 className={box.h6}>Welcome to Skilled Typing Expert</h6>
          <h1 className={box.title}>Skilled Typing Expert</h1>
          <Form />
        </div>
      </Box>
    </div>
  );
};

export default Page;
