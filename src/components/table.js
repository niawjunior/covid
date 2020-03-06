import React from "react"
import { Table as DataTable } from "antd"
import _ from "lodash"

const Table = ({ confirmed, recovered, deaths }) => {
  const { sum: confirmedSum, ...confirmedData } = confirmed
  const { sum: recoveredSum, ...recoveredData } = recovered
  const { sum: deathsSum, ...deathsData } = deaths

  const dataArr = Object.entries(confirmedData).map(([key, value]) => {
    const children = value.data
      .map((item, index) => {
        const recovered = Number(
          recoveredData[key].data.map(value => _.last(value.data).value)[index]
        )
        const deaths = Number(
          deathsData[key].data.map(value => _.last(value.data).value)[index]
        )
        return {
          key: Number(index),
          country_region: item.province_state,
          confirmed: _.last(item.data).value,
          recovered: recovered,
          deaths: deaths,
          healing: _.last(item.data).value - (recovered + deaths),
        }
      })
      .sort((a, b) => b.confirmed - a.confirmed)

    const data = {
      key: key,
      country_region: value.country_region,
      confirmed: value.sum,
      recovered: recoveredData[key].sum,
      deaths: deathsData[key].sum,
      healing: value.sum - (recoveredData[key].sum + deathsData[key].sum),
      ...(value.data.length > 1 && { children: children }),
    }
    return data
  })

  const columns = [
    {
      title: "ประเทศ / ภูมิภาค",
      dataIndex: "country_region",
      key: "country_region",
      render: text => (text ? text : "ไม่ได้ระบุ"),
    },
    {
      title: "ยอดที่ได้รับการยืนยัน",
      dataIndex: "confirmed",
      key: "confirmed",
      render: number => number.toLocaleString(),
    },
    {
      title: "กำลังรักษา",
      dataIndex: "healing",
      key: "healing",
      render: number => number.toLocaleString(),
    },
    {
      title: "รักษาหายแล้ว",
      dataIndex: "recovered",
      key: "recovered",
      render: number => number.toLocaleString(),
    },
    {
      title: "เสียชีวิต",
      dataIndex: "deaths",
      key: "deaths",
      render: number => number.toLocaleString(),
    },
  ]

  const finalData = dataArr.sort((a, b) => b.confirmed - a.confirmed)
  return <DataTable columns={columns} dataSource={finalData} />
}
export default Table
