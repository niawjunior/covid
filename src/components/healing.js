import React from 'react'

import Percentage from './percentage'
const Healing = (props) => {
  const healing = (props.confirmed.sum) - (props.recovered.sum + props.deaths.sum)
  return (
    <div>
      <div className="font-bold text-lg mb-2 text-center text-white mt-4">
        กำลังรักษา
      </div>
      <div className="font-bold text-center text-orange-400 mt-5 text-xl">
          { healing.toLocaleString() } คน
      </div>
      <div className="font-bold text-center  flex justify-center text-white mt-5 text-sm">
        <Percentage data={props} type={props.confirmed.sum}/>
      </div>
   </div>

  )
}

export default Healing