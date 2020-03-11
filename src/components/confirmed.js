import React from "react"
import styled from "styled-components"

const StyledText = styled.div`
  font-size: 50px;
`
const Confirmed = props => {
  const confirmedResult = props.confirmedCompare.toLocaleString()

  return (
    <div>
      <span className="float-right text-base text-white  bg-red-500 px-2">
        {`+${confirmedResult}`}
      </span>
      <br />
      <div className="font-bold text-lg mb-2 text-center text-white mt-4">
        ผู้ติดเชื้อ
      </div>
      <StyledText className="font-bold text-center text-green-400 mt-3">
        {props.confirmed.sum.toLocaleString()}
      </StyledText>
      <div className="font-bold text-center text-white mt-3 text-sm">คน</div>
    </div>
  )
}

export default Confirmed
