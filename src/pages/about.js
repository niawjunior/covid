import React from "react"
import Layout from "../components/layout"

const About = () => {
  return (
    <Layout>
      <div className="flex flex-col content-center">
        <div className="h-auto">
          <div className="px-6 py-4 text-center">
            <p>
              สวัสดีครับ ผมแอดมิน จากเพจ{" "}
              <a
                href="https://facebook.com/JSKhamKham/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-blue-500">JS ขำๆ </span>
              </a>
              ได้จัดทำเว็บไซต์นี้ขึ้นมา เพื่อเป็นอีกหนึ่งทางเลือก
              ในการติดตามสถานการณ์ COVID-19 ครับ
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
