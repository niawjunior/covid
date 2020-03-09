import React from "react"
import ReactEcharts from "echarts-for-react"
import _ from "lodash"

const Bar = ({ confirmed, recovered, deaths }) => {
  const { sum: confirmedSum, ...confirmedData } = confirmed
  const { sum: recoveredSum, ...recoveredData } = recovered
  const { sum: deathsSum, ...deathsData } = deaths

  const result = Object.entries(confirmedData).map(([key, value]) => {
    const result = value.data.map((value, index) => {
      const data = value.data.slice(-7)
      const recovered = recoveredData[key].data[index].data.slice(-7)
      const deaths = deathsData[key].data[index].data.slice(-7)

      const r = data.map((item, key) => {
        return {
          date: new Date(item.date).toDateString().split(" ")[0],
          confirmed: Number(item.value),
          healing:
            Number(item.value) -
            (Number(recovered[key].value) + Number(deaths[key].value)),
          recovered: Number(recovered[key].value),
          deaths: Number(deaths[key].value),
        }
      })
      return [].concat(...r)
    })
    return [].concat(...result)
  })

  const ans = _([].concat(...result))
    .groupBy("date")
    .map((item, id) => ({
      date: id,
      confirmed: _.sumBy(item, "confirmed"),
      healing: _.sumBy(item, "healing"),
      recovered: _.sumBy(item, "recovered"),
      deaths: _.sumBy(item, "deaths"),
    }))
    .value()

  const dateBar = ans.map(item => item.date)

  const confirmedBar = ans.map(item => item.confirmed)
  const healingBar = ans.map(item => item.healing)
  const recoveredBar = ans.map(item => item.recovered)
  const deathsBar = ans.map(item => item.deaths)

  const getOption = () => ({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["ติดเชื้อ", "กำลังรักษา", "รักษาหายแล้ว", "เสียชีวิตแล้ว"],
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
        data: dateBar,
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
        },
      },
    ],
    series: [
      {
        name: "ติดเชื้อ",
        type: "bar",
        data: confirmedBar,
        itemStyle: { color: "hsl(143, 55%, 62%)" },
      },
      {
        name: "กำลังรักษา",
        type: "bar",
        data: healingBar,
        itemStyle: { color: "hsl(33, 90%, 65%)" },
      },
      {
        name: "รักษาหายแล้ว",
        type: "bar",
        data: recoveredBar,

        itemStyle: { color: "hsl(51, 89%, 67%)" },
      },
      {
        name: "เสียชีวิตแล้ว",
        type: "bar",
        data: deathsBar,
        itemStyle: { color: "hsl(0, 97%, 85%)" },
      },
    ],
  })

  return <ReactEcharts option={getOption()} style={{ height: 300 }} />
}

export default Bar
