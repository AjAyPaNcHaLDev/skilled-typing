"use client";
import React, { useEffect, useState } from "react";
import style from "@/app/styles/Loading.module.css"
const Loading = (props) => {
  const [dots, setDots] = useState(".");
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      dots == "."
        ? setDots("..")
        : dots == ".."
        ? setDots("...")
        : dots == "..."
        ? setDots(".")
        : null;
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <div className={style.loading}>
      {props.title == null ? "Loading" : props.title}
      {dots}
    </div>
  );
};

export default Loading;
