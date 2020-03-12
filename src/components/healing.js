import React from "react"
import Percentage from "./percentage"
import { Styled } from "../styles/styled"

const {
  BadgeTopRight,
  CardHeader,
  CardSummaryNumber,
  PercentageTextWrap,
} = Styled

const Healing = ({ healing, healingCompare, confirmed }) => {
  return (
    <>
      <BadgeTopRight>{`+${healingCompare.toLocaleString()}`}</BadgeTopRight>
      <br />
      <CardHeader>กำลังรักษา</CardHeader>
      <CardSummaryNumber className="text-orange-400">
        {healing.toLocaleString()} คน
      </CardSummaryNumber>
      <PercentageTextWrap>
        <Percentage data={healing} type={confirmed.sum} />
      </PercentageTextWrap>
    </>
  )
}

export default Healing
