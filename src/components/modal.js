import React from "react"
import { Modal, Button, Table } from "antd"
import _ from "lodash"

const getParent = (all, country_region) => {
  const confirmed = _.find(all.confirmedData, [
    "country_region",
    country_region,
  ])
  const recovered = _.find(all.recoveredData, [
    "country_region",
    country_region,
  ])
  const deaths = _.find(all.deathsData, ["country_region", country_region])

  const result = confirmed.data.map((item, key) => {
    return item.data.map((value, index) => {
      return {
        date: value.date,
        confirmed: Number(value.value),
        recovered: Number(recovered.data[key].data[index].value),
        deaths: Number(deaths.data[key].data[index].value),
        healing:
          Number(value.value) -
          (Number(recovered.data[key].data[index].value) +
            Number(deaths.data[key].data[index].value)),
      }
    })
  })
  const output = _(result.flat(Infinity))
    .groupBy("date")
    .map((objs, key) => ({
      date: key,
      confirmed: _.sumBy(objs, "confirmed"),
      recovered: _.sumBy(objs, "recovered"),
      deaths: _.sumBy(objs, "deaths"),
      healing: _.sumBy(objs, "healing"),
    }))
    .value()
  return output
}

const getChild = (all, from, country_region) => {
  const findConfirmed = _.find(all.confirmedData, ["country_region", from])
  const confirmed = _.find(findConfirmed.data, [
    "province_state",
    country_region,
  ])

  const findRecovered = _.find(all.recoveredData, ["country_region", from])
  const recovered = _.find(findRecovered.data, [
    "province_state",
    country_region,
  ])

  const findDeaths = _.find(all.deathsData, ["country_region", from])
  const deaths = _.find(findDeaths.data, ["province_state", country_region])

  const result = confirmed.data.map((item, key) => {
    return {
      key: key,
      date: item.date,
      confirmed: Number(item.value),
      recovered: Number(recovered.data[key].value),
      deaths: Number(deaths.data[key].value),
      healing:
        Number(item.value) -
        (Number(recovered.data[key].value) + Number(deaths.data[key].value)),
    }
  })
  return result
}

const ModalView = ({ visible, modalClick, data, all }) => {
  const country_region = data.country_region

  const result = data.parent
    ? getParent(all, country_region)
    : getChild(all, data.from, country_region)

  const sortResult = result.sort((a, b) => new Date(b.date) - new Date(a.date))

  const firstData = _.last(sortResult).date
  const lastData = _.first(sortResult).date

  console.log(sortResult)
  const columns = [
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "ผู้ติดเชื้อ",
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

  return (
    <Modal
      width="600px"
      title={`สถิติ ย้อนหลัง ตั้งแต่ วันที่ ${firstData} - ${lastData}`}
      visible={visible}
      onCancel={modalClick}
      footer={[<Button onClick={modalClick}>ปิด</Button>]}
    >
      <div className="h-auto w-100">
        <Table
          size="small"
          columns={columns}
          scroll={{ x: 500 }}
          dataSource={sortResult}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Modal>
  )
}

export default ModalView
