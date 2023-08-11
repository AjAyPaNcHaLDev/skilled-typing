import React from "react";
import Box from "../components/Box";
import box from "../styles/Box.module.css";
import Close from "../components/Close";
import Form from "../components/Form";

const Page = () => {
  return (
    <div>
      <Box style={{ width: "50%" }}>
        <div className="j-center flex-col gap-10  ">
          <h1 style={{ fontFamily: "monospace", fontWeight: 200 }}>
            Welcome to Skilled Typing Expert
          </h1>
          <Form />
        </div>
      </Box>
    </div>
  );
};

export default Page;
