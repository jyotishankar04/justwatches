import React from "react";

const Loading = () => {
  return (
    <div className="min-h-full absolute top-0 left-0 w-full bg-gray-200 flex flex-col items-center justify-center">
      {/* Minimal watch face container */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Watch case */}
        <div className="absolute w-36 h-36 rounded-full border-4 border-black"></div>

        {/* Minimal hour markers (only at 12, 3, 6, 9) */}
        {[0, 90, 180, 270].map((rotation, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-black"
            style={{
              transform: `rotate(${rotation}deg) translateY(-15px)`,
              transformOrigin: "bottom center",
            }}
          ></div>
        ))}

        {/* Second hand (rotating) */}
        <div
          className="absolute w-0.5 h-16 bg-black origin-bottom animate-spin"
          style={{ animationDuration: "2s", animationTimingFunction: "linear" }}
        ></div>

        {/* Center dot */}
        <div className="absolute w-2 h-2 bg-black rounded-full z-10"></div>
      </div>

      {/* Simple loading text */}
      <div className="mt-4 font-mono text-black text-sm">Loading...</div>
    </div>
  );
};

export default Loading;
