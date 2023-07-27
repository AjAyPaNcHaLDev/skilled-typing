"use client";
import Box from "../components/Box";
import Close from "../components/Close";
import paragraphs from "@/data/paragraph";
import box from "../styles/Box.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Selection = () => {
  // useClient();
  // const [realTime, setRealTime] = useState(0);
  const [paraId, setParaId] = useState(null);
  const [leng, setleng] = useState(null);
  const [time, setTime] = useState(10);
  const router = useRouter();
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
                  value="Hindi"
                  onChange={(e) => setleng(e.target.value)}
                  id="langHindi"
                />
              </div>
              <b>Time:- 12:12:22</b>
            </div>
          </div>
          <div className="box-selection">
            <div className="box-list">
              {paragraphs.map((p, i) => {
                return (
                  <div
                    key={p.id}
                    style={{
                      backgroundColor: paraId == p.id ? "green" : null,
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
          <div className="flex-row gap-10 align-baseline">
            <h1>2</h1>
            <div>
              <b>Duration: </b>
              <select
                style={{ minWidth: 70 }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
              </select>
              <small style={{ marginLeft: -45 }}>: Min</small>
            </div>
            <div className="flex-row gap-10" style={{ margin: 10 }}>
              <h1>3</h1>
              <button
                className={box.button}
                onClick={() =>
                  router.push(`/Selection/Test?p=${paraId}&t=${time}&l=${leng}`)
                }
              >
                Start Test
              </button>

              <label
                htmlFor="file-upload"
                style={{
                  border: "1px solid blue",
                  color: "blue",
                  height: "min-content",
                  padding: 12,
                  cursor: "pointer",
                }}
                className={box.button}
              >
                Custom File
              </label>
              <input id="file-upload" type="file" hidden />
            </div>
          </div>

          <div>
            <hr />
            <h6 style={{ textAlign: "center" }}>
              Low speed but correct Typeing test gives better result then wrong
              increased speed.
            </h6>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Selection;
