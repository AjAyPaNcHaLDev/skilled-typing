"use client";
import React, { useEffect, useState } from "react";

export const AnimantedText = (props) => {
  let dataText = props.text || "Welcome to Skilled Typing Expert";

  const TYPING_SPEED = 150;
  const DELETING_SPEED = 30;

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [count, setCount] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(TYPING_SPEED);

  let interval;
  const handleTyping = () => {
    if (text != dataText && !isDeleting) {
      setText(text + dataText[count]);
      setCount(count + 1);
      return;
    } else {
      setIsDeleting(true);
    }
    if (isDeleting) {
      setText(text.substring(0, text.length - 1));
      setCount(count - 1);
      if (text == "") {
        setIsDeleting(false);
        setCount(0);
      }
    }
  };
  useEffect(() => {
    setTypingSpeed(isDeleting == true ? DELETING_SPEED : TYPING_SPEED);
    interval = setInterval(handleTyping, typingSpeed);
    return () => clearInterval(interval);
  });

  return <>{text}</>;
};
