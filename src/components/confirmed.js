import React from "react"
import styled from "styled-components"

const StyledText = styled.div`
  font-size: 50px;
`
const Confirmed = props => {
  const confirmedResult = (
    props.confirmedToday - props.confirmedYesterday
  ).toLocaleString()
  const status = props.confirmedToday > props.confirmedYesterday ? true : false

  const text = status ? "+" + confirmedResult : "-" + confirmedResult

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
