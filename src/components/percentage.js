import React from 'react'

const Percentage = ({data, type}) => {
  const {confirmed, recovered, deaths} = data
  const sum = confirmed.sum + recovered.sum + deaths.sum || 0
  const percentage = type * 100 / sum || 0
  return (
    <div className="bg-gray-700 rounded-full h-16 w-16 flex items-center justify-center">
      {percentage.toFixed(2)} %
    </div>
  ) 
}

export default Percentage