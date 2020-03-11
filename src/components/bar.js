import React from "react"
import ReactEcharts from "echarts-for-react"
import Numeral from "numeral"

const Bar = ({ date, confirmed, recovered, healing, deaths }) => {
  const getOption = () => ({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },

      textStyle: {
        color: "#fff",
        fontFamily: "Prompt",
      },
    },
    legend: {
      top: "5",
      data: ["ติดเชื้อ", "กำลังรักษา", "รักษาหายแล้ว", "เสียชีวิตแล้ว"],
      textStyle: {
        color: "#fff",
        fontFamily: "Prompt",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: date,
        axisLabel: {
          textStyle: {
            color: "#fff",
            fontFamily: "Prompt",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "#fff",
            fontFamily: "Prompt",
          },
          formatter: function(value, idx) {
            return `${Numeral(value).format("0a")}`
          },
        },
      },
    ],
    series: [
      {
        name: "ติดเชื้อ",
        type: "bar",
        data: confirmed,
        itemStyle: { color: "hsl(143, 55%, 62%)" },
      },
      {
        name: "กำลังรักษา",
        type: "bar",
        data: healing,
        itemStyle: { color: "hsl(33, 90%, 65%)" },
      },
      {
        name: "รักษาหายแล้ว",
        type: "bar",
        data: recovered,

        itemStyle: { color: "hsl(51, 89%, 67%)" },
      },
      {
        name: "เสียชีวิตแล้ว",
        type: "bar",
        data: deaths,
        itemStyle: { color: "hsl(0, 97%, 85%)" },
      },
    ],
  })

  return <ReactEcharts option={getOption()} style={{ height: 300 }} />
}

export default Bar
