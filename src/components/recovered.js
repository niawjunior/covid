import React from "react"
import Percentage from "./percentage"
import { Styled } from "../styles/styled"

const {
  BadgeTopRight,
  CardHeader,
  CardSummaryNumber,
  PercentageTextWrap,
} = Styled

const Recovered = ({ confirmed, recovered, recoveredCompare }) => {
  return (
    <div>
      <BadgeTopRight>{`+${recoveredCompare.toLocaleString()}`}</BadgeTopRight>
      <br />
      <CardHeader>รักษาหายแล้ว</CardHeader>
      <CardSummaryNumber className="text-yellow-400">
        {recovered.sum.toLocaleString()} คน
      </CardSummaryNumber>
      <PercentageTextWrap>
        <Percentage data={recovered.sum} type={confirmed.sum} />
      </PercentageTextWrap>
    </div>
  )
}

export default Recovered
