import React from "react"

import Percentage from "./percentage"
const Deaths = props => {
  const deathsResult = props.deathsCompare.toLocaleString()
  const status = props.deathsToday > props.deathsYesterday ? true : false

  const text = status ? "+" + deathsResult : "-" + deathsResult

  return (
    <div>
      <span
        className={
          status
            ? "float-right text-xl text-green-500 mr-2"
            : "float-right text-xl text-red-500 mr-2"
        }
      >
        {text}
      </span>
      <br />
      <div className="font-bold text-lg mb-2 text-center text-white mt-4">
        เสียชีวิต
      </div>
      <div className="font-bold text-center text-red-400 mt-5 text-xl">
        {props.deaths.sum.toLocaleString()} คน
      </div>
      <div className="font-bold text-center flex justify-center text-white mt-5 text-sm">
        <Percentage data={props.deaths.sum} type={props.confirmed.sum} />
      </div>
    </div>
  )
}

export default Deaths
