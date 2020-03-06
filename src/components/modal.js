import React from "react"
import { Modal, Button } from "antd"
import Bar from "./bar"

const ModalView = ({ visible, modalClick }) => {
  return (
    <Modal
      key={1}
      title="สถิติ 5 วัน ย้อนหลัง"
      visible={visible}
      onCancel={modalClick}
      footer={[<Button onClick={modalClick}>ปิด</Button>]}
    >
      <div className="h-auto w-auto">
        <Bar />
      </div>
    </Modal>
  )
}

export default ModalView
