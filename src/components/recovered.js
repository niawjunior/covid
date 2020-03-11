import React from "react"

import Percentage from "./percentage"
const Recovered = props => {
  const recoveredResult = props.recoveredCompare.toLocaleString()

  return (
    <div>
      <span className="float-right text-base text-white  bg-red-500 px-2">
        {`+${recoveredResult}`}
      </span>
      <br />
      <div className="font-bold text-lg mb-2 text-center text-white mt-4">
        รักษาหายแล้ว
      </div>
      <div className="font-bold text-center text-yellow-400 mt-5 text-xl">
        {props.recovered.sum.toLocaleString()} คน
      </div>
      <div className="font-bold text-center  flex justify-center text-white mt-5 text-sm">
        <Percentage data={props.recovered.sum} type={props.confirmed.sum} />
      </div>
    </div>
  )
}

export default Recovered
