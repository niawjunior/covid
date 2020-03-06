import React from "react"
import _ from "lodash"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import Footer from "../components/footer"
import Confirmed from "../components/confirmed"
import Deaths from "../components/deaths"
import Recovered from "../components/recovered"
import Healing from "../components/healing"
import Pie from "../components/pie"
import Table from "../components/table"

const StyledPie = styled.div`
  height: 18rem;
`
const mapByCountry = data => {
  const result = _.chain(data)
    .groupBy("country_region")
    .map((value, key) => ({ country_region: key, data: value }))
    .value()
  return result
}

const mapLastData = data => {
  const result = data.map(item => {
    const state = item.data.map(state => {
      const province_stateDate = _.last(state.data).date
      const province_stateValue = Number(_.last(state.data).value)
      return {
        ...state,
        province_stateDate,
        province_stateValue,
      }
    })

    return {
      ...item,
      sum: state.reduce((a, b) => (a += b.province_stateValue), 0),
    }
  })

  return {
    ...result,
    sum: result.reduce((a, b) => (a += b.sum), 0),
  }
}
const IndexPage = props => {
  const getConfirmed = mapLastData(mapByCountry(props.data.confirmed.data))
  const getRecovered = mapLastData(mapByCountry(props.data.recovered.data))
  const getDeaths = mapLastData(mapByCountry(props.data.deaths.data))

  return (
    <>
      <Layout>
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-4"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">
                ข้อมูลในเว็บไซต์ จะ update ทุกๆ 1 ชั่วโมง โดยโช้ข้อมูลจาก{" "}
                <a
                  href="https://systems.jhu.edu/research/public-health/ncov/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  CSSEGISandData
                </a>
              </p>
              <p className="text-sm">
                ขอบคุณข้อมูลจาก{" "}
                <a
                  href="https://github.com/CSSEGISandData/COVID-19"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Johns Hopkins CSSE
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg h-48">
            <Confirmed
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
            />
          </div>
          <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg h-48">
            <Healing
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
            />
          </div>
          <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg h-48">
            <Recovered
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
            />
          </div>
          <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg h-48">
            <Deaths
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
            />
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <StyledPie className="text-center bg-gray-800 rounded overflow-hidden shadow-lg">
            <h1 className="text-white mt-4">เปรียบเทียบอัตราส่วน</h1>
            <Pie
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
            />
          </StyledPie>
        </div>
        <div className="grid grid-cols-12 mt-5 ">
          <div className="bg-gray-800 col-span-12 text-center px-4 py-4 rounded overflow-hidden shadow-lg">
            <Table
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
            />
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  )
}

export default IndexPage

export const query = graphql`
  query MyQuery {
    confirmed {
      data {
        lat
        long
        province_state
        country_region
        data {
          date
          value
        }
      }
    }
    recovered {
      data {
        lat
        long
        province_state
        country_region
        data {
          date
          value
        }
      }
    }
    deaths {
      data {
        lat
        long
        province_state
        country_region
        data {
          date
          value
        }
      }
    }
  }
`
