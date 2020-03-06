import React from "react"
import { ResponsivePie } from "@nivo/pie"

const Pie = ({ confirmed, recovered, deaths }) => {
  const data = [
    {
      id: "ผู้ป่วยสะสม",
      label: "ผู้ป่วยสะสม",
      value: confirmed.sum,
      color: "hsl(143, 55%, 62%)",
    },
    {
      id: "กำลังรักษา",
      label: "กำลังรักษา",
      value: confirmed.sum - (recovered.sum + deaths.sum),
      color: "hsl(33, 90%, 65%)",
    },
    {
      id: "รักษาหายแล้ว",
      label: "รักษาหายแล้ว",
      value: recovered.sum,
      color: "hsl(51, 89%, 67%)",
    },
    {
      id: "เสียชีวิตแล้ว",
      label: "เสียชีวิตแล้ว",
      value: deaths.sum,
      color: "hsl(0, 97%, 85%)",
    },
  ]

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 110, bottom: 40, left: 110 }}
      innerRadius={0.5}
      sortByValue={true}
      padAngle={0.7}
      cornerRadius={3}
      colors={d => d.color}
      borderWidth={1}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#ffffff"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#000000"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  )
}

export default Pie
