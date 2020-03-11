import React from "react"

import Percentage from "./percentage"
const Healing = props => {
  const healing = props.confirmed.sum - (props.recovered.sum + props.deaths.sum)
  const healingResult = props.healingCompare.toLocaleString()

  return (
    <div>
      <span className="float-right text-base text-white  bg-red-500 px-2">
        {`+${healingResult}`}
      </span>
      <br />
      <div className="font-bold text-lg mb-2 text-center text-white mt-4">
        กำลังรักษา
      </div>
      <div className="font-bold text-center text-orange-400 mt-5 text-xl">
        {healing.toLocaleString()} คน
      </div>
      <div className="font-bold text-center  flex justify-center text-white mt-5 text-sm">
        <Percentage data={healing} type={props.confirmed.sum} />
      </div>
    </div>
  )
}

export default Healing
