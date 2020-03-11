import React from "react"
import ReactEcharts from "echarts-for-react"
import { color } from "../config/colors"
import Numeral from "numeral"
const Pie = ({ confirmed, recovered, deaths }) => {
  const option = () => ({
    tooltip: {
      formatter: item =>
        `${item.data.name} ${item.data.value.toLocaleString()} คน`,
      textStyle: {
        color: "#fff",
        fontFamily: "Prompt",
      },
    },
    series: [
      {
        type: "pie",
        radius: "55%",
        selectedMode: "single",
        selectedOffset: 10,
        clockwise: true,
        label: {
          fontFamily: "Prompt",
          formatter: function(item) {
            return `${item.name} (${Numeral(item.data.value).format("0a")})`
          },
        },
        labelLine: {
          length: 5,
        },
        data: [
          {
            value: confirmed.sum,
            name: "ผู้ติดเชื้อ",
            itemStyle: { color: color.colorTemplate.confirmed },
          },
          {
            value: confirmed.sum - (recovered.sum + deaths.sum),
            name: "กำลังรักษา",
            itemStyle: { color: color.colorTemplate.healing },
          },
          {
            value: recovered.sum,
            name: "รักษาหายแล้ว",
            itemStyle: { color: color.colorTemplate.recovered },
          },
          {
            value: deaths.sum,
            name: "เสียชีวิต",
            itemStyle: { color: color.colorTemplate.deaths },
          },
        ].sort((a, b) => a.value - b.value),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },

        animationType: "scale",
        animationEasing: "elasticOut",
      },
    ],
  })

  return <ReactEcharts option={option()} />
}

export default Pie
