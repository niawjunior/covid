import React from "react"
import Numeral from "numeral"
import ReactEcharts from "echarts-for-react"

import { color } from "../config/colors"
const Bar = ({ date, confirmed, recovered, healing, deaths }) => {
  const option = () => ({
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
      itemWidth: 10,
      itemHeight: 10,
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
          formatter: value => `${Numeral(value).format("0a")}`,
        },
      },
    ],
    series: [
      {
        name: "ติดเชื้อ",
        type: "bar",
        data: confirmed,
        itemStyle: { color: color.colorTemplate.confirmed },
      },
      {
        name: "กำลังรักษา",
        type: "bar",
        data: healing,
        itemStyle: { color: color.colorTemplate.healing },
      },
      {
        name: "รักษาหายแล้ว",
        type: "bar",
        data: recovered,

        itemStyle: { color: color.colorTemplate.recovered },
      },
      {
        name: "เสียชีวิตแล้ว",
        type: "bar",
        data: deaths,
        itemStyle: { color: color.colorTemplate.deaths },
      },
    ],
  })

  return <ReactEcharts option={option()} />
}

export default Bar
