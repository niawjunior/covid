import React from "react"
import Percentage from "./percentage"
import { Styled } from "../styles/styled"

const { BadgeTopRight, CardHeader, CardSummaryNumber } = Styled

const Deaths = ({ deathsCompare, deaths, confirmed }) => {
  return (
    <div>
      <BadgeTopRight>{`+${deathsCompare.toLocaleString()}`}</BadgeTopRight>
      <br />
      <CardHeader>เสียชีวิต</CardHeader>
      <CardSummaryNumber className="text-red-400">
        {deaths.sum.toLocaleString()} คน
      </CardSummaryNumber>
      <div className="font-bold text-center flex justify-center text-white mt-5 text-sm">
        <Percentage data={deaths.sum} type={confirmed.sum} />
      </div>
    </div>
  )
}

export default Deaths
