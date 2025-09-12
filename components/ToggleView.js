import React from 'react'

const ToggleView = ({ groupView, setGroupView }) => {
  return (
    <div>
        <div className="p-8 flex flex-col items-center">

      {/* Glass container for the toggle */}
      <div className="relative flex w-64 rounded-2xl p-1 bg-white/10 backdrop-blur-xl shadow-lg">

        {/* Sliding highlight */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-xl bg-white/20 backdrop-blur-md transition-all duration-300`}
          style={{
            left: groupView === "off" ? "0.25rem" : "50%",
          }}
        />
        <button
          onClick={() => setGroupView("off")}
          className={`relative z-10 flex-1 px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
            groupView === "off" ? "text-white" : "text-white/70"
          }`}
        >
          All channels
        </button>
        <button
          onClick={() => setGroupView("on")}
          className={`relative z-10 flex-1 px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
            groupView === "on" ? "text-white" : "text-white/70"
          }`}
        >
          Groups
        </button>
      </div>
      </div>
    </div>
  )
}

export default ToggleView