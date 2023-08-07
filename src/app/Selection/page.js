"use client";
import Box from "../components/Box";
import Close from "../components/Close";
import paragraphs from "@/data/paragraph";
import box from "../styles/Box.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VscGoToFile } from "react-icons/vsc";
import { MdOutlineDraw } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
const Selection = () => {
  const [paraId, setParaId] = useState(null);
  const [leng, setleng] = useState(null);
  const [time, setTime] = useState(1);
  const router = useRouter();
  const [clock, setClock] = useState({ hh: 0, mm: 0, ss: 0 });
  const [testFile, setTestFile] = useState(false);
  let interval;
  useEffect(() => {
    const d = new Date();
    interval = setInterval(() => {
      setClock({ hh: d.getHours(), mm: d.getMinutes(), ss: d.getSeconds() });
    }, 1000);
    return () => clearInterval(interval);
  });

  const fileHandler = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast("You not Select any File.");
      localStorage.setItem("testFile", "");
      setParaId(null);
      setTestFile(false);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target.result;
      localStorage.setItem("testFile", res);
      setParaId("testFile");
      setTestFile(true);
      console.log(res);
    };
    reader.readAsText(file, "UTF-8 ");
  };
  return (
    <div>
      <Box>
        <Close />
        <div>
          <h6>Typeing Test</h6>
          <div className="flex-row gap-10 align-baseline">
            <h1>1</h1>
            <div
              className="flex-row gap-10  j-space-bw "
              style={{ fontSize: "xx-small", gap: 30 }}
            >
              <b>Select language and Test Text</b>
              <div className="flex-row gap-10 j-center">
                <label htmlFor="langEng">
                  <b>English</b>
                </label>
                <input
                  type="radio"
                  name="lang"
                  value="English"
                  checked
                  onChange={(e) => setleng(e.target.value)}
                  id="langEng"
                />
              </div>
              <div className="flex-row gap-10 j-center">
                <label htmlFor="langHindi">
                  <b>Hindi</b>
                </label>
                <input
                  type="radio"
                  name="lang"
                  disabled
                  value="Hindi"
                  onChange={(e) => setleng(e.target.value)}
                  id="langHindi"
                />
              </div>
              <b>
                Time:- {clock.hh > 9 ? clock.hh : "0" + clock.hh}:
                {clock.mm > 9 ? clock.mm : "0" + clock.mm}:
                {clock.ss > 9 ? clock.ss : "0" + clock.ss}
              </b>
            </div>
          </div>
          <div className="flex-row  j-center gap-10">
            <div className="box-selection">
              <div className="box-list">
                {paragraphs.map((p, i) => {
                  return (
                    <div
                      key={p.id}
                      style={{
                        backgroundColor: paraId == p.id ? "#0ae2ff6e" : null,
                      }}
                    >
                      {++i}:{" "}
                      <a
                        href="#"
                        onClick={() => {
                          paraId == p.id ? setParaId(null) : setParaId(p.id);
                        }}
                      >
                        {p.title}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="file-upload"
                style={{
                  border: "0.1em solid black",
                  animation: " blink 0.7s steps(1) infinite",
                }}
                className={"btn "}
              >
                <VscGoToFile />{" "}
                {testFile != false ? "File Selected" : "Choose a Text File"}
              </label>
              <input
                id="file-upload"
                onChange={(e) => fileHandler(e)}
                type="file"
                accept="text/*"
                hidden
              />
              <Image
                src={"/images/Hay Typist Welcome.gif"}
                height={300}
                width={500}
              />
            </div>
          </div>

          <div className="flex-row gap-20 align-baseline">
            <h1>2</h1>
            <div>
              <b>Duration: </b>
              <select
                style={{ minWidth: 70 }}
                value={time}
                onChange={(e) => setTime(e)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
              </select>
              <small style={{ marginLeft: -45 }}>: Min</small>
            </div>
            <div
              className="flex-row gap-20 align-baseline"
              style={{ margin: 10 }}
            >
              <h1>3</h1>
              <button
                className={"btn btn-primary"}
                onClick={() => {
                  if (!paraId) {
                    toast("Please Select Paragraph or file");
                    return;
                  }
                  router.push(
                    `/Selection/Test?p=${paraId}&t=${time}&l=${leng}`
                  );
                  toast.remove();
                  toast("Preparing...");
                }}
              >
                <MdOutlineDraw /> Start
              </button>
            </div>
          </div>
        </div>
        <div>
          <hr />
          <h6 style={{ textAlign: "center" }}>
            Low speed but correct Typeing test gives better result then wrong
            increased speed.
          </h6>
        </div>
      </Box>
      <Toaster />
    </div>
  );
};

export default Selection;
