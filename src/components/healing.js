import React from "react"
import Percentage from "./percentage"
import { Styled } from "../styles/styled"

const { BadgeTopRight, CardHeader, CardSummaryNumber } = Styled

const Healing = ({ healing, healingCompare, confirmed }) => {
  return (
    <>
      <BadgeTopRight>{`+${healingCompare.toLocaleString()}`}</BadgeTopRight>
      <br />
      <CardHeader>กำลังรักษา</CardHeader>
      <CardSummaryNumber className="text-orange-400">
        {healing.toLocaleString()} คน
      </CardSummaryNumber>
      <div className="font-bold text-center  flex justify-center text-white mt-5 text-sm">
        <Percentage data={healing} type={confirmed.sum} />
      </div>
    </>
  )
}

export default Healing
