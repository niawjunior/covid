import React, { useState } from "react"
import { Table as DataTable } from "antd"
import Modal from "./modal"
import _ from "lodash"

const Table = ({ confirmed, recovered, deaths }) => {
  const [visible, setVisible] = useState(false)
  const [provinceData, setProvinceData] = useState(null)
  const showModal = () => {
    setVisible(false)
  }

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
          from: value.country_region,
          parent: false,
          country_region: item.province_state,
          confirmed: Number(_.last(item.data).value),
          recovered: recovered,
          deaths: deaths,
          healing: _.last(item.data).value - (recovered + deaths),
        }
      })
      .sort((a, b) => b.confirmed - a.confirmed)

    const data = {
      key: key,
      parent: true,
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
      width: "30%",
      render: text => {
        return (
          <span className="text-blue-500 cursor-pointer">
            {text === "" ? "ไม่ได้ระบุ" : text}
          </span>
        )
      },
    },
    {
      title: "ผู้ติดเชื้อ",
      dataIndex: "confirmed",
      key: "confirmed",
      render: number => number.toLocaleString(),
      sorter: (a, b) => {
        return b.confirmed - a.confirmed
      },
    },
    {
      title: "กำลังรักษา",
      dataIndex: "healing",
      key: "healing",
      render: number => number.toLocaleString(),
      sorter: (a, b) => {
        return b.healing - a.healing
      },
    },
    {
      title: "รักษาหายแล้ว",
      dataIndex: "recovered",
      key: "recovered",
      render: number => number.toLocaleString(),
      sorter: (a, b) => {
        return b.recovered - a.recovered
      },
    },
    {
      title: "เสียชีวิต",
      dataIndex: "deaths",
      key: "deaths",
      render: number => number.toLocaleString(),
      sorter: (a, b) => {
        return b.deaths - a.deaths
      },
    },
  ]

  const finalData = dataArr.sort((a, b) => b.confirmed - a.confirmed)
  const all = {
    confirmedData,
    recoveredData,
    deathsData,
  }
  return (
    <>
      {visible && (
        <Modal
          key={1}
          data={provinceData}
          all={all}
          visible={visible}
          modalClick={showModal}
        />
      )}
      <DataTable
        size="middle"
        scroll={{ x: 1200 }}
        columns={columns}
        pagination={{ pageSize: 10 }}
        dataSource={finalData}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setProvinceData(record)
              setVisible(true)
            },
          }
        }}
      />
    </>
  )
}
export default Table
