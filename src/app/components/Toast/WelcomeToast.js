"use client";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const notify = () =>
  toast(
    '🚀⌨️ "Skilled Typing:Master your typing Skills in Seconds! 💨🎯" ⏰💻 Accelerate your typing prowess with lightning-fast accuracy and conquer the keyboard like a pro! 🏆👩‍💻'
  );
const notify2 = () => toast(`Let's Start Typing...`);
export const WelcomeToast = () => {
  useEffect(() => {
    setTimeout(() => {
      notify();
      setTimeout(() => {
        notify2();
      }, 1000 * 2);
    }, 1000 * 1);
  });
  return <Toaster position="bottam-left" />;
};
