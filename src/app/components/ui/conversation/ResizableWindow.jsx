"use client"

import { useEffect, useRef, useState } from "react";

export default function ResizableWindow({ 
  children, 
  minHeight = 75, 
  minWidth = 200,
  y = true,
  x = false
}) {
  const windowRef = useRef(null);
  const parentRef = useRef(null);

  const [size, setSize] = useState({ width: "auto", height: 300 });
  const isResizing = useRef(false);

  const [parentHeight, setParentHeight] = useState(null);

  useEffect(() => {
    if (parentRef.current) {
      setParentHeight(parentRef.current.offsetHeight);
    }
  }, []);

  const handleMouseDown = (e) => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isResizing.current) {
      setSize((prevSize) => ({
        ...prevSize,
        height: Math.min(parentHeight * 0.9, Math.max(minHeight, prevSize.height - e.movementY)),
      }));
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };


  return (
    <div className="h-full absolute bottom-0 w-full lg:relative flex items-end"
    ref={parentRef}>
      <div
        ref={windowRef}
        className="relative border-2 border-green-600 rounded-3xl bg-green-50 lg:!h-full !w-full overflow-hidden"
        style={{ width: size.width, height: size.height}}
      >
        <div className="h-full w-full flex flex-col mt-3 lg:mt-0">{children}</div>

        {/* Resize handle */}
        <div
          className="lg:hidden absolute top-0 left-0 w-full user-select-none h-6 flex items-center justify-center cursor-n-resize"
          onMouseDown={handleMouseDown}
        >
          <div className="w-10 h-1 rounded-full bg-green-800 opacity-50" />
        </div>
      </div>
    </div>
  );
}
