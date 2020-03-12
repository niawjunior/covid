import React from "react"
import Percentage from "./percentage"
import { Styled } from "../styles/styled"

const {
  BadgeTopRight,
  CardHeader,
  CardSummaryNumber,
  PercentageTextWrap,
} = Styled

const Deaths = ({ deathsCompare, deaths, confirmed }) => {
  return (
    <div>
      <BadgeTopRight>{`+${deathsCompare.toLocaleString()}`}</BadgeTopRight>
      <br />
      <CardHeader>เสียชีวิต</CardHeader>
      <CardSummaryNumber className="text-red-400">
        {deaths.sum.toLocaleString()} คน
      </CardSummaryNumber>
      <PercentageTextWrap>
        <Percentage data={deaths.sum} type={confirmed.sum} />
      </PercentageTextWrap>
    </div>
  )
}

export default Deaths
