import React from "react";
import "./Popup.css";
const Result = ({ usedTime, minute, second, onExit, onRestart, result }) => {
  const { igros, inet, iaccur } = result;
  return (
    <div className="pop-up">
      <div className="flex-col gap-10 justify-around">
        <h4 className="heading">
          <center>
            <b>Result</b>
          </center>
        </h4>
        <hr />
        <div className=" flex-row  justify-around">
          <div className="flex-col">
            <b>Time Left </b>
            <span>
              {minute > 10 ? minute : `0${minute}`}:
              {second > 10 ? second : `0${second}`} min
            </span>
          </div>
          <div className="flex-col">
            <b>Time Used </b>
            <span>
              {usedTime.minute > 10 ? usedTime.minute : `0${usedTime.minute}`}:
              {usedTime.second > 10 ? usedTime.second : `0${usedTime.second}`}{" "}
              min
            </span>
          </div>
        </div>
        <hr />
        <div className=" flex-row  justify-around ">
          <div className="flex-col">
            <b>Gross Speed</b>
            <b>{igros.current} wpm</b>
          </div>
          <div className="flex-col">
            <b>Net Speed</b>
            <b>{inet.current} wpm</b>
          </div>
          <div className="flex-col">
            <b>Accuracy</b>
            <b>{iaccur.current}%</b>
          </div>
        </div>
        <hr />
        <div className="flex-row  justify-around">
          <button
            type="button"
            onClick={() => onExit()}
            class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-700"
          >
            Exit
          </button>
          <button
            type="button"
            onClick={() => onRestart()}
            class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
