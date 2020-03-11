import React from "react"
import Percentage from "./percentage"
import { Styled } from "../styles/styled"

const { BadgeTopRight, CardHeader, CardSummaryNumber } = Styled

const Recovered = ({ confirmed, recovered, recoveredCompare }) => {
  return (
    <div>
      <BadgeTopRight>{`+${recoveredCompare.toLocaleString()}`}</BadgeTopRight>
      <br />
      <CardHeader>รักษาหายแล้ว</CardHeader>
      <CardSummaryNumber className="text-yellow-400">
        {recovered.sum.toLocaleString()} คน
      </CardSummaryNumber>
      <div className="font-bold text-center  flex justify-center text-white mt-5 text-sm">
        <Percentage data={recovered.sum} type={confirmed.sum} />
      </div>
    </div>
  )
}

export default Recovered
