import React from "react"
import ReactEcharts from "echarts-for-react"

const Pie = ({ confirmed, recovered, deaths }) => {
  const getOption = () => ({
    tooltip: {
      trigger: "item",
      formatter: number => {
        return `${number.data.name} ${number.data.value.toLocaleString()} คน`
      },
    },
    series: [
      {
        type: "pie",
        radius: "55%",
        data: [
          {
            value: confirmed.sum,
            name: "ผู้ติดเชื้อ",
            itemStyle: { color: "hsl(143, 55%, 62%)" },
          },
          {
            value: confirmed.sum - (recovered.sum + deaths.sum),
            name: "กำลังรักษา",
            itemStyle: { color: "hsl(33, 90%, 65%)" },
          },
          {
            value: recovered.sum,
            name: "รักษาหายแล้ว",
            itemStyle: { color: "hsl(51, 89%, 67%)" },
          },
          {
            value: deaths.sum,
            name: "เสียชีวิต",
            itemStyle: { color: "hsl(0, 97%, 85%)" },
          },
        ].sort(function(a, b) {
          return a.value - b.value
        }),
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

  return <ReactEcharts option={getOption()} style={{ height: 300 }} />
}

export default Pie
