"use client";
import React, { useEffect, useRef } from "react";
import Box from "@/app/components/Box";
import paragraphs from "@/data/paragraph";
import { useState } from "react";
import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";
const page = (props) => {
  var interval;
  const [minute, setMinute] = useState(t);
  const [second, setSecond] = useState(0);
  const [usedTime, setUsedTime] = useState({ minute: 0, second: 0 });
  const [timeState, setTimeState] = useState(false);
  const [testSpeed, setTestSpeed] = useState({
    grossSpeed: 0,
    netSpeed: 0,
    accuracy: 0,
  });
  const test = useRef("");
  const typingFoucs = useRef();
  const textArea = "textArea";
  var temp;
  const [testCompleted, setTestCompleted] = useState(false);
  const { p = null, t = null, l = null } = props.searchParams;
  const router = useRouter();
  if (!p || !t || p == "null" || t == "null") {
    router.push("/Selection");
    return;
  }

  let latter =
    paragraphs.filter((para) => {
      if (para.id == p) return para;
    })[0]?.text || paragraphs[0].text;

  const wordsArray = latter.split(" ") || paragraphs[0].text;
  const testInputHandler = (e) => {
    let stream = e.target.value;
    stream = stream.split(" ");
    let correctWords = [];
    let inCorrectWords = [];
    stream.forEach((word, index) => {
      if (wordsArray[index] === word) {
        correctWords.push(word);
      } else {
        inCorrectWords.push(word);
      }
    });
    const grossSpeed = stream.length / (usedTime.minute + usedTime.second / 60);
    const netSpeed =
      stream.length -
      inCorrectWords.length / (usedTime.minute + usedTime.second / 60);
    const accuracy = Math.ceil((netSpeed / grossSpeed) * 100);
    if (minute == 0 && second == 0) {
      toast("Time up");
      setTestCompleted(true);
      setTestSpeed({ grossSpeed, netSpeed, accuracy });
      e.target.disabled = true;
      return () => setTimeState(false);
    }
    test.current = e.target.value;
    setTimeState(true);

    if (stream.length >= wordsArray.length + 1) {
      setTestCompleted(true);
      setTestSpeed({
        grossSpeed: grossSpeed > 0 ? grossSpeed : 0,
        netSpeed: netSpeed > 0 ? netSpeed : 0,
        accuracy: accuracy > 0 ? accuracy : 0,
      });
      e.target.disabled = true;
      return () => setTimeState(false);
    }

    return () => {
      temp = e.target.value;
      setTimeout(() => {
        if (temp == test.current) {
          setTimeState(false);
        }
      }, 5000);
    };
  };

  useEffect(() => {
    if (timeState) {
      interval = setInterval(() => {
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

  function reStart() {
    test.current = "";
    setMinute(t);
    setSecond(0);
    setUsedTime({ minute: 0, second: 0 });
    setTimeState(false);
    setTestSpeed({ grossSpeed: 0, netSpeed: 0, accuracy: 0 });
    document.getElementById(textArea).value = "";
    document.getElementById(textArea).disabled = false;
    setTestCompleted(false);
    typingFoucs.current.focus();
    return;
  }
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
  useEffect(() => {
    toast.remove();
    toast("Ready...");
  }, []);
  return (
    <div>
      <Box style={{ marginTop: "1%", background: "transparent" }}>
        <div className="testbox ">
          <div className="test-area">
            <div className="test-header">Read & Write the Paragraph</div>

            <div className="test-content" style={{ userSelect: "text" }}>
              {latter}
            </div>
            <div className="middleText">Please type above texts below</div>

            <div className="test-sheet">
              <textarea
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
                onChange={(e) => testInputHandler(e)()}
                defaultValue={test.current}
                autoFocus={true}
              ></textarea>
            </div>
          </div>
          <div className="testSiderBox">
            <div className="side-box">
              <input
                type="button"
                className="mini-box  "
                style={{
                  color: "red ",
                  ground: "#fffdd",
                  width: "90%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (testCompleted) {
                    router.push("/Selection");
                    return;
                  }
                  if (confirm("Sure do went Exit.")) {
                    router.push("/Selection");
                    return;
                  }
                }}
                value={"Exit"}
              />
            </div>
            <div className="side-box">
              <div className={" mini-box "}>
                <h6>Time Left</h6>
                <span className="minute">
                  {minute > 10 ? minute : `${minute}`}
                </span>
                :
                <span className="second">
                  {second > 10 ? second : `0${second}`}
                </span>
              </div>
              <div className="mini-box">
                <h6>Running</h6>
                {usedTime.minute > 10 ? usedTime.minute : `0${usedTime.minute}`}
                :
                {usedTime.second > 10 ? usedTime.second : `0${usedTime.second}`}
              </div>
              {testCompleted && (
                <>
                  <div className="mini-box">
                    <b>Result</b>
                    <hr />
                    <h4>Gross Speed</h4>
                    {testSpeed.grossSpeed} <small>Wpm</small>
                    <h4> Net Speed</h4>
                    {testSpeed.netSpeed} <small>Wpm</small>
                    <h4> Accuracy</h4>
                    {testSpeed.accuracy}%
                  </div>
                </>
              )}
            </div>
            <div className="side-box">
              {testCompleted != true ? (
                <input
                  type="button"
                  className="mini-box "
                  style={{
                    color: "red ",
                    background: "#fffdd",
                    width: "90%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setTestCompleted(true);
                  }}
                  value={"Finish"}
                />
              ) : (
                <input
                  type="button"
                  className="mini-box "
                  style={{
                    color: "green ",
                    background: "#fffdd",
                    width: "90%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    reStart();
                  }}
                  value={"Start Again"}
                />
              )}
            </div>
          </div>
        </div>
      </Box>

      <Toaster position="bottam-left" />
    </div>
  );
};

export default page;
