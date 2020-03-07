import React from "react"
import { Modal, Button, Table } from "antd"

const ModalView = ({ visible, modalClick, data }) => {
  console.log(data)
  const columns = [
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "รวมทั้งหมด",
      dataIndex: "confirmed",
      key: "confirmed",
    },
    {
      title: "กำลังรักษา",
      dataIndex: "healing",
      key: "healing",
    },
    {
      title: "รักษาหายแล้ว",
      dataIndex: "recovered",
      key: "recovered",
    },
    {
      title: "เสียชีวิต",
      dataIndex: "deaths",
      key: "deaths",
    },
  ]

  const dataArr = [
    {
      key: "1",
      date: "20/02/2020",
      confirmed: 20000,
      healing: 32,
      recovered: 10000,
      deaths: 10000,
    },
  ]

  return (
    <Modal
      width="600px"
      title="สถิติ ย้อนหลัง"
      visible={visible}
      onCancel={modalClick}
      footer={[<Button onClick={modalClick}>ปิด</Button>]}
    >
      <div className="h-auto w-100">
        <Table
          size="small"
          columns={columns}
          dataSource={dataArr}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Modal>
  )
}

export default ModalView
