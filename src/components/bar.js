import React from "react"
import { ResponsiveBar } from "@nivo/bar"

const Bar = () => {
  const data = [
    {
      date: "1/22/20",
      confirmed: 165,
      confirmedColor: "hsl(143, 55%, 62%)",
      recovered: 83,
      recoveredColor: "hsl(51, 89%, 67%)",
      healing: 90,
      healingColor: "hsl(33, 90%, 65%)",
      deaths: 14,
      deathsColor: "hsl(0, 97%, 85%)",
    },
    {
      date: "1/23/20",
      confirmed: 197,
      confirmedColor: "hsl(143, 55%, 62%)",
      recovered: 20,
      recoveredColor: "hsl(51, 89%, 67%)",
      healing: 27,
      healingColor: "hsl(33, 90%, 65%)",
      deaths: 155,
      deathsColor: "hsl(0, 97%, 85%)",
    },
    {
      date: "1/24/20",
      confirmed: 20,
      confirmedColor: "hsl(143, 55%, 62%)",
      recovered: 35,
      recoveredColor: "hsl(51, 89%, 67%)",
      healing: 124,
      healingColor: "hsl(33, 90%, 65%)",
      deaths: 164,
      deathsColor: "hsl(0, 97%, 85%)",
    },
    {
      date: "1/25/20",
      confirmed: 46,
      confirmedColor: "hsl(143, 55%, 62%)",
      recovered: 200,
      recoveredColor: "hsl(51, 89%, 67%)",
      healing: 178,
      healingColor: "hsl(33, 90%, 65%)",
      deaths: 9,
      deathsColor: "hsl(0, 97%, 85%)",
    },
    {
      date: "1/26/20",
      confirmed: 169,
      confirmedColor: "hsl(143, 55%, 62%)",
      recovered: 183,
      recoveredColor: "hsl(51, 89%, 67%)",
      healing: 23,
      healingColor: "hsl(33, 90%, 65%)",
      deaths: 132,
      deathsColor: "hsl(0, 97%, 85%)",
    },
  ]
  return (
    <ResponsiveBar
      data={data}
      keys={["confirmed", "recovered", "healing", "deaths"]}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={[
        "hsl(143, 55%, 62%)",
        "hsl(51, 89%, 67%)",
        "hsl(33, 90%, 65%)",
        "hsl(0, 97%, 85%)",
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "healing",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "จำนวน",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: -63,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  )
}

export default Bar
