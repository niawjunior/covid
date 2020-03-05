import React from 'react'

import Percentage from './percentage'
const Deaths = (props) => {
  return (
    <div>
      <div className="font-bold text-lg mb-2 text-center text-white mt-4">
        เสียชีวิต
      </div>
      <div className="font-bold text-center text-red-400 mt-5 text-xl">
          { props.deaths.sum.toLocaleString() } คน
      </div>
      <div className="font-bold text-center flex justify-center text-white mt-5 text-sm">
        <Percentage data={props} type={props.deaths.sum}/>
      </div>
   </div>
  )
}

export default Deaths