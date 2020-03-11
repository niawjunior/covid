import React from "react"
import { Styled } from "../styles/styled"

const { BadgeTopRight, CardHeader, CardSummaryNumber } = Styled
const Confirmed = ({ confirmedCompare, confirmed }) => {
  return (
    <>
      <BadgeTopRight>{`+${confirmedCompare.toLocaleString()}`}</BadgeTopRight>
      <br />
      <CardHeader>ผู้ติดเชื้อ</CardHeader>
      <CardSummaryNumber className="text-green-400" isBig>
        {confirmed.sum.toLocaleString()}
      </CardSummaryNumber>
      <div className="font-bold text-center text-white mt-3 text-sm">คน</div>
    </>
  )
}

export default Confirmed
