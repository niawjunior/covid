import React from "react"

import Percentage from "./percentage"
const Deaths = props => {
  const deathsResult = props.deathsCompare.toLocaleString()
  return (
    <div>
      <span className="float-right text-base text-white  bg-red-500 px-2">
        {`+${deathsResult}`}
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
