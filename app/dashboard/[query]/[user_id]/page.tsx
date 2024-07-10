"use client";
import { useEffect } from "react";
import { Input } from "@material-tailwind/react";
import Quill from "quill";
import { Progress } from "@material-tailwind/react";

import "quill/dist/quill.snow.css";

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";

Quill.register({
  "modules/toolbar": Toolbar,
  "themes/snow": Snow,
  "formats/bold": Bold,
  "formats/italic": Italic,
  "formats/header": Header,
});
function Divider() {
  return <div className="mx-1 h-[100] w-px bg-gray-400" />;
}
const Editor = () => {
  useEffect(() => {
    const quill = new Quill("#editor", {
      theme: "snow",
    });

    // Cleanup function
    return () => {
      quill.off();
      quill.root.innerHTML = ""; // Clear the editor content
    };
  }, []);

  return (
    <div className="flex my-10">
      <div className="w-[65%]">
        <div className="flex items-center gap-2 p-5">
          <h3 className="text-bold">Title</h3>
          <div className="w-full">
            <Input
              type="text"
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
          </div>
        </div>
        <div id="editor" className="mt-4" style={{ height: "90vh" }}></div>
      </div>
      <div className="w-[35%] pl-5">
        <div className="flex mb-8 justify-end">
          <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save
          </button>
        </div>
        <div className="flex">
          {" "}
          <div className="w-1/2">Child 1</div>
          <Divider />
          <div className="w-1/2 flex justify-center align-middle flex-wrap">
            <div className="flex flex-col w-1/2 p-3">
              <div className="text-bold">title:0%</div>
              <div className="progress h-2">
                <Progress value={20} size="sm" />
              </div>
            </div>
            <div className="flex flex-col w-1/2 p-3">
              <div className="text-bold">Headings:0%</div>
              <div className="progress h-2">
                <Progress value={40} size="sm" />
              </div>
            </div>
            <div className="flex flex-col w-1/2 p-3">
              <div className="text-bold">Terms:0%</div>
              <div className="progress h-2">
                <Progress value={10} size="sm" />
              </div>
            </div>
            <div className="flex flex-col w-1/2 p-5">
              <div className="text-bold">Words:0%</div>
              <div className="progress h-2">
                <Progress value={10} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
