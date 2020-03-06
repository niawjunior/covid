import React from "react"
import { ResponsivePie } from "@nivo/pie"
const Pie = ({ confirmed, recovered, deaths }) => {
  console.log(confirmed)
  const data = [
    {
      id: "รวมทั้งหมด",
      label: "รวมทั้งหมด",
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

  const lineGraphSettings = {
    theme: {
      fontFamily: "Kanit",
    },
  }

  return (
    <ResponsivePie
      theme={lineGraphSettings.theme}
      data={data}
      margin={{ top: 40, right: 90, bottom: 60, left: 90 }}
      innerRadius={0.2}
      sortByValue={true}
      padAngle={2}
      cornerRadius={0}
      colors={d => d.color}
      borderWidth={1}
      radialLabelsTextXOffset={5}
      radialLabelsTextColor="#ffffff"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={10}
      radialLabelsLinkHorizontalLength={5}
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
