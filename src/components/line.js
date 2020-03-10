import React from "react"
import ReactEcharts from "echarts-for-react"
import Numeral from "numeral"

const Line = ({ date, data }) => {
  const getOption = () => ({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },

      textStyle: {
        color: "#fff",
        fontFamily: "Kanit",
      },
    },
    legend: {
      data: date,
      textStyle: {
        color: "#fff",
        fontFamily: "Kanit",
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
            fontFamily: "Kanit",
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
            fontFamily: "Kanit",
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

  return <ReactEcharts option={getOption()} style={{ height: 300 }} />
}

export default Line
