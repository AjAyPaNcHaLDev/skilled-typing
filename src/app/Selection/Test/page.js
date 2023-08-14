"use client";
import React, { useEffect, useRef } from "react";
import Box from "@/app/components/Box";
import paragraphs from "@/data/paragraph";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import style from "./style.module.css";
import Result from "@/app/components/popup/Result";
import typeHindi from "type-hindi";
/**
 *
 * This file contain 3 useEffect 2 Function
 * ------------ useEffect--------------
 * 1st useEffect init the paragraph from paragraph.json or localstorage
 * 2nd useEffect use for timer
 * 3rd useEffect use for Escape key listner for exit
 *
 *
 * -------------- functions  ---------
 *
 * function testInputHandler use for text input and result realted opration perform
 * function reStart use for restart the test
 *
 *
 * URL searchParams
 * p  for the paragraph id or file
 * t  for time its required
 * l  for lang not required and not used
 *
 */

const page = (props) => {
  const { p = null, t = null, l = "English" } = props.searchParams;
  const router = useRouter();
  if (!p || !t || p == "null" || t == "null") {
    router.push("/Selection");
    return;
  }
  const [testCompleted, setTestCompleted] = useState(false);
  let temp = useRef("");
  const test = useRef("");
  const typingFoucs = useRef();
  const textArea = "textArea";
  const [minute, setMinute] = useState(t);
  const [second, setSecond] = useState(0);
  const [usedTime, setUsedTime] = useState({ minute: 0, second: 0 });
  const [timeState, setTimeState] = useState(false);
  const [latter, setLatter] = useState("");
  let igros = useRef(0);
  let inet = useRef(0);
  let iaccur = useRef(0);
  let wordsArray = useRef([]);
  useEffect(() => {
    if (p == "testFile") {
      setLatter(localStorage.getItem(p));
      wordsArray.current = localStorage.getItem(p).split(" ");
    } else if (typeof parseInt(p) == "number") {
      setLatter(
        paragraphs.filter((para) => {
          if (para.id == p) return para;
        })[0]?.text || paragraphs[0].text
      );
      wordsArray.current =
        paragraphs
          .filter((para) => {
            if (para.id == p) return para;
          })[0]
          ?.text.split(" ") || paragraphs[0].text.split(" ");
    }
    toast.remove();
    toast("Ready");
  }, []);

  useEffect(() => {
    if (testCompleted) {
      document.getElementById(textArea).disabled = false;
    }
  }, [testCompleted]);
  useEffect(() => {
    var interval;
    if (minute == 0 && second == 0) {
      toast("Time up");
      setTestCompleted(true);
      document.getElementById(textArea).disabled = true;
    }

    if (timeState) {
      interval = setInterval(() => {
        if (testCompleted) {
          clearInterval(interval);
          return;
        }

        if (minute == 0 && second == 0) {
          clearInterval(interval);
          return;
        }

        if (second == 0) {
          setMinute(minute - 1);
          setSecond(60);
        } else {
          setSecond(second - 1);
          if (usedTime.second >= 59) {
            // console.log("jii");
            setUsedTime({
              minute: usedTime.minute + 1,
              second: 0,
            });
          } else {
            setUsedTime({ ...usedTime, second: usedTime.second + 1 });
          }
        }
      }, 1000);
    }

    return () => {
      if (timeState) {
        clearInterval(interval);
        if (minute == 0 && second == 0) {
          setTimeState(false);
        }
      }
    };
  });
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        if (timeState) {
          const res = confirm("Do You went to restart test.");
          if (res) {
            reStart();
          }
          return;
        }

        if (!testCompleted) {
          const res = confirm("Are you sure Exit");
          if (res) {
            router.push("/");
          }
          return;
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    window.onbeforeunload = function () {
      if (confirm("Do you went exit.")) return false;
      return true;
    };
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  });

  const testInputHandler = (e) => {
    let stream = e.target.value;
    stream = stream.split(" ");
    let correctWords = [];
    let inCorrectWords = [];
    stream.forEach((word, index) => {
      if (wordsArray.current[index] === word) {
        correctWords.push(word);
      } else {
        inCorrectWords.push(word);
      }
    });

    const grossSpeed = stream.length / (usedTime.minute + usedTime.second / 60);

    const netSpeed =
      correctWords.length / (usedTime.minute + usedTime.second / 60);

    const totalWords = stream.length; // Total words typed
    const incorrectWordCount = inCorrectWords.length; // Number of incorrect words

    const accuracy = ((totalWords - incorrectWordCount) / totalWords) * 100; // Accuracy percentage

    // finding gross speed
    igros.current = grossSpeed.toFixed(2);
    inet.current = netSpeed < 0 ? 0 : netSpeed.toFixed(2);
    iaccur.current = accuracy < 0 ? 0 : accuracy.toFixed(2);

    test.current = e.target.value;
    setTimeState(true);

    if (stream.length >= wordsArray.current.length + 1) {
      setTestCompleted(true);
      e.target.disabled = true;
    }
  };
  function reStart() {
    test.current = "";
    setMinute(t);
    setSecond(0);
    setUsedTime({ minute: 0, second: 0 });
    setTimeState(false);
    igros.current = 0;
    inet.current = 0;
    iaccur.current = 0;
    document.getElementById(textArea).value = "";
    document.getElementById(textArea).disabled = false;
    setTestCompleted(false);
    typingFoucs.current.focus();
    return;
  }

  const handleExit = () => {
    if (testCompleted) {
      router.push("/Selection");
      return;
    }
    if (confirm("Sure do went Exit.")) {
      router.push("/Selection");
      return;
    }
  };
  return (
    <>
      <div
        style={{
          background: `url("/images/blue-concrete-wall-with-scratches.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className={
          style["test-main"] + " flex flex-col items-center min-h-screen m-2"
        }
      >
        <div className={"flex flex-col items-center  " + style["timer-box"]}>
          {/*  className={" w-min px-5 " + style["box-stop"]} */}

          {timeState == true ? (
            <input
              type="button"
              className={" w-min px-5 " + style["box-stop"]}
              style={{
                color: "red ",
                ground: "#fffdd",
                cursor: "pointer",
              }}
              onClick={() => setTimeState(false)}
              value={"Pause"}
            />
          ) : (
            <input
              type="button"
              className={" w-min px-5 " + style["box-stop"]}
              style={{
                color: "red ",
                ground: "#fffdd",
                cursor: "pointer",
              }}
              onClick={() => {
                setTestCompleted(true);
              }}
              value={"Submit"}
            />
          )}

          <div className="flex flex-row w-full justify-between p-2 ">
            <div className={style["timer-label"]}>
              <h6>Time Left:</h6>
              <span className="minute">
                {minute > 10 ? minute : `${minute}`}
              </span>
              :
              <span className="second">
                {second > 10 ? second : `0${second}`}
              </span>
            </div>
            <div className={style["timer-label"]}>
              <h6>Time Used:</h6>
              <span className="minute">
                {usedTime.minute > 10 ? usedTime.minute : `0${usedTime.minute}`}
              </span>
              :
              <span className="second">
                {usedTime.second > 10 ? usedTime.second : `0${usedTime.second}`}
              </span>
            </div>
          </div>
        </div>
        <div
          className={style["typing-content"] + " p-5 " + style["set-height"]}
        >
          {latter}
        </div>
        <div className={style["middle-info"]} style={{ padding: "0.5rem" }}>
          <span>Please Type above text below</span>
          <div className={style.hr}></div>
        </div>
        <textarea
          className={style["typing-answer"] + " p-5 " + style["set-height"]}
          ref={typingFoucs}
          id={textArea}
          onCopy={(e) => {
            e.preventDefault();
            return false;
          }}
          onPaste={(e) => {
            e.preventDefault();
            return false;
          }}
          onCut={(e) => {
            e.preventDefault();
            return false;
          }}
          onKeyDown={(e) => (l == "Hindi" ? typeHindi(e) : null)}
          onChange={(e) => testInputHandler(e)}
          defaultValue={test.current}
          autoFocus={true}
        ></textarea>
      </div>
      {testCompleted == true ? (
        <Result
          minute={minute}
          second={second}
          usedTime={usedTime}
          onExit={handleExit}
          onRestart={reStart}
          result={{ igros, inet, iaccur }}
        />
      ) : null}
    </>
  );
};

export default page;
