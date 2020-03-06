import React from "react"
import { Modal, Button, Table } from "antd"

const ModalView = ({ visible, modalClick }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ]

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ]

  return (
    <Modal
      key={1}
      title="สถิติ 5 วัน ย้อนหลัง"
      visible={visible}
      onCancel={modalClick}
      footer={[<Button onClick={modalClick}>ปิด</Button>]}
    >
      <div className="h-56 w-100">
        <Table size="small" columns={columns} dataSource={data} />
      </div>
    </Modal>
  )
}

export default ModalView
