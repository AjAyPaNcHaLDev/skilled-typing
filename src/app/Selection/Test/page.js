"use client";
import React, { useEffect, useRef } from "react";
import Box from "@/app/components/Box";
import Close from "@/app/components/Close";
import paragraphs from "@/data/paragraph";
import { useState } from "react";
import { useRouter } from "next/navigation";
const page = (props) => {
  // words or content
  // p is id of paragraph default id 1 is set
  // t is time defalut 2 minutes set.
  // l is lang choose defalut english
  let { p = 1, t = 2, l = "English" } = props.searchParams;

  const test = useRef("");
  const router = useRouter();
  const textArea = "textArea";
  /**
   * in latter variable selecting the paragraph by id
   */
  let latter =
    paragraphs.filter((para) => {
      if (para.id == p) return para;
    })[0]?.text || paragraphs[0].text;

  const wordsArray = latter.split(" ") || paragraphs[0].text;

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
  let testCompleted = false;
  var temp;
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
    console.log("correctWords", correctWords, "incorrectWords", inCorrectWords);
    /* A. Gross WPM : Total Words Typed / Total Time Taken (in minutes)
           Example :  Suppose a candidate A Typed total 350 Words in 10 Minutes:
           Gross Speed in WPM : 350/10 = 35 WPM */
    const grossSpeed =
      stream.length / usedTime.minute == 0
        ? usedTime.second / 60
        : usedTime.minute;
    /* B. Net Speed : (Total Words Typed - Word Error ) / Total Time Taken (in minutes)
                 Example : Suppose the A candidate typed total 350 words in 10 Minutes in which he typed 20 words wrong:
                 Net Speed in WPM = (350 -20) / 10 = 33 WPM 
             */
    const netSpeed =
      stream.length - inCorrectWords.length / usedTime.minute == 0
        ? usedTime.second / 60
        : usedTime.minute;

    /* C.  Accuracy : (Net WPM/ Gross WPM ) * 100
                  Accuracy = 33/35 * 100 = 94.28 %   */
    const accuracy =
      (netSpeed == 0 ? 1 : netSpeed / grossSpeed == 0 ? 1 : grossSpeed) * 100;

    if (minute == 0 && second == 0) {
      alert("Time up");
      testCompleted = true;
      setTestSpeed({ grossSpeed, netSpeed, accuracy });
      e.target.disabled = true;
      return () => setTimeState(false);
    }
    test.current = e.target.value;
    setTimeState(true);

    if (stream.length >= wordsArray.length) {
      testCompleted = true;
      setTestSpeed({ grossSpeed, netSpeed, accuracy });
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

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        if (timeState) {
          const res = confirm("Do You went to restart test.");
          if (res) {
            test.current = "";
            setMinute(t);
            setSecond(0);
            setUsedTime({ minute: 0, second: 0 });
            setTimeState(false);
            setTestSpeed({ grossSpeed: 0, netSpeed: 0, accuracy: 0 });
            document.getElementById(textArea).value = "";
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
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  });
  return (
    <div>
      <Box style={{ marginTop: "1%" }}>
        <div className="testbox ">
          <div className="test-area">
            <div className="test-content" style={{ userSelect: "text" }}>
              {latter}
            </div>
            <div className="middleText">Please type above texts below</div>
            <center>
              <hr style={{ width: "70%", marginTop: -17, zIndex: -1 }} />
            </center>
            <div className="test-sheet">
              <textarea
                id={textArea}
                // onCopy={(e) => {
                //   e.preventDefault();
                //   return false;
                // }}
                // onPaste={(e) => {
                //   e.preventDefault();
                //   return false;
                // }}
                // onCut={(e) => {
                //   e.preventDefault();
                //   return false;
                // }}
                onChange={(e) => testInputHandler(e)()}
                defaultValue={test.current}
                autoFocus={true}
              ></textarea>
            </div>
          </div>
          <div className="testSiderBox">
            <Close />
            <div className="testClock">
              {minute > 10 ? minute : `0${minute}`}:
              {second > 10 ? second : `0${second}`}
            </div>
            <div className="testClock">
              {usedTime.minute > 10 ? usedTime.minute : `0${usedTime.minute}`}:
              {usedTime.second > 10 ? usedTime.second : `0${usedTime.second}`}
            </div>
            <div> GrossSpeed:{testSpeed.grossSpeed} WPM</div>
            <div> NetSpeed:{testSpeed.netSpeed} WPM</div>
            <div> Accuracy:{testSpeed.accuracy} %</div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default page;
