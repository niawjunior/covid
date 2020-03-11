import React, { useState } from "react"
import { Table as DataTable } from "antd"
import Modal from "./modal"

const Table = ({ data, confirmed, recovered, deaths }) => {
  const [visible, setVisible] = useState(false)
  const [provinceData, setProvinceData] = useState(null)
  const showModal = () => {
    setVisible(false)
  }

  const { sum: confirmedSum, ...confirmedData } = confirmed
  const { sum: recoveredSum, ...recoveredData } = recovered
  const { sum: deathsSum, ...deathsData } = deaths

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
      sorter: (a, b) => b.confirmed - a.confirmed,
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
        dataSource={data}
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
