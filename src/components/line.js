import React from "react"
import ReactEcharts from "echarts-for-react"
import Numeral from "numeral"
import styled from "styled-components"

const StyledLine = styled(ReactEcharts)`
  height: 300px;
  width: 100%;
`
const Line = ({ date, data }) => {
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
          formatter: function(value, idx) {
            return `${Numeral(value).format("0a")}`
          },
        },
      },
    ],
    series: [
      {
        name: "ติดเชื้อ",
        type: "line",
        data: data,
        itemStyle: { color: "hsl(143, 55%, 62%)" },
        smooth: true,
        label: {
          normal: {
            show: true,
            position: "top",
            textStyle: {
              color: "#ffffff",
            },
            formatter: number => {
              return `${Numeral(number.value.toLocaleString()).format("0a")} คน`
            },
          },
        },
      },
    ],
  })

  return <StyledLine option={getOption()} />
}

export default Line
