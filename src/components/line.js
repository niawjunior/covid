import React from "react"
import ReactEcharts from "echarts-for-react"
import Numeral from "numeral"
import { color } from "../config/colors"

const Line = ({ date, data }) => {
  const option = () => ({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: item =>
        `${item[0].seriesName} ${item[0].value.toLocaleString()} คน`,
      textStyle: {
        color: "#fff",
        fontFamily: "Prompt",
      },
    },
    legend: {
      data: date,
      textStyle: {
        color: "#fff",
        fontFamily: "Prompt",
      },
    },
    grid: {
      left: "3%",
      right: "3%",
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
        type: "line",
        data: data,
        itemStyle: { color: color.colorTemplate.confirmed },
        smooth: true,
        label: {
          normal: {
            show: true,
            position: "top",
            textStyle: {
              color: "#ffffff",
            },
            formatter: item =>
              `${Numeral(item.value.toLocaleString()).format("0a")}`,
          },
        },
      },
    ],
  })

  return <ReactEcharts option={option()} />
}

export default Line
