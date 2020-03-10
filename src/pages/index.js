import React from "react"
import _ from "lodash"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import Confirmed from "../components/confirmed"
import Deaths from "../components/deaths"
import Recovered from "../components/recovered"
import Healing from "../components/healing"
import Pie from "../components/pie"
import Bar from "../components/bar"
import Table from "../components/table"
import Line from "../components/line"
import Map from "../components/map"

const StyledChart = styled.div`
  height: 22rem;
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

  const { sum: confirmedSum, ...confirmedData } = getConfirmed
  const { sum: recoveredSum, ...recoveredData } = getRecovered
  const { sum: deathsSum, ...deathsData } = getDeaths

  // compare
  const resultCompare = Object.entries(confirmedData).map(([key, value]) => {
    const data = value.data.map((item, index) => {
      const confirmedToday = Number(item.data[item.data.length - 1].value)
      const confirmedYesterday = Number(item.data[item.data.length - 2].value)
      const confirmedCompare = Number(confirmedToday - confirmedYesterday)

      const recoveredToday = Number(
        recoveredData[key].data[index].data[
          recoveredData[key].data[index].data.length - 1
        ].value
      )
      const recoveredYesterday = Number(
        recoveredData[key].data[index].data[
          recoveredData[key].data[index].data.length - 2
        ].value
      )
      const recoveredCompare = Number(recoveredToday - recoveredYesterday)

      const deathsToday = Number(
        deathsData[key].data[index].data[
          deathsData[key].data[index].data.length - 1
        ].value
      )
      const deathsYesterday = Number(
        deathsData[key].data[index].data[
          deathsData[key].data[index].data.length - 2
        ].value
      )
      const deathsCompare = Number(deathsToday - deathsYesterday)

      const healingToday = Number(
        confirmedToday - (recoveredToday + deathsToday)
      )
      const healingYesterday = Number(
        confirmedYesterday - (recoveredYesterday + deathsYesterday)
      )
      const healingCompare = Number(healingToday - healingYesterday)

      return {
        confirmedToday,
        confirmedYesterday,
        confirmedCompare,
        recoveredToday,
        recoveredYesterday,
        recoveredCompare,
        deathsToday,
        deathsYesterday,
        deathsCompare,
        healingToday,
        healingYesterday,
        healingCompare,
      }
    })
    return data
  })

  const flatCompare = [].concat(...resultCompare)

  const confirmedToday = flatCompare
    .map(item => item.confirmedToday)
    .reduce((a, b) => (a += b))
  const confirmedYesterday = flatCompare
    .map(item => item.confirmedYesterday)
    .reduce((a, b) => (a += b))
  const confirmedCompare = confirmedToday - confirmedYesterday

  const recoveredToday = flatCompare
    .map(item => item.recoveredToday)
    .reduce((a, b) => (a += b))
  const recoveredYesterday = flatCompare
    .map(item => item.recoveredYesterday)
    .reduce((a, b) => (a += b))
  const recoveredCompare = recoveredToday - recoveredYesterday

  const deathsToday = flatCompare
    .map(item => item.deathsToday)
    .reduce((a, b) => (a += b))
  const deathsYesterday = flatCompare
    .map(item => item.deathsYesterday)
    .reduce((a, b) => (a += b))
  const deathsCompare = deathsToday - deathsYesterday

  const healingToday = confirmedToday - (recoveredToday + deathsToday)
  const healingYesterday =
    confirmedYesterday - (recoveredYesterday + deathsYesterday)
  const healingCompare = healingToday - healingYesterday

  // end compare

  // table

  const dataTable = Object.entries(confirmedData)
    .map(([key, value]) => {
      const children = value.data
        .map((item, index) => {
          const recovered = Number(
            recoveredData[key].data.map(value => _.last(value.data).value)[
              index
            ]
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
    .sort((a, b) => b.confirmed - a.confirmed)

  // end table

  // bar

  const resultBar = Object.entries(confirmedData).map(([key, value]) => {
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

  const barMap = _([].concat(...resultBar))
    .groupBy("date")
    .map((item, id) => ({
      date: id,
      confirmed: _.sumBy(item, "confirmed"),
      healing: _.sumBy(item, "healing"),
      recovered: _.sumBy(item, "recovered"),
      deaths: _.sumBy(item, "deaths"),
    }))
    .value()

  const dateBar = barMap.map(item => item.date)

  const confirmedBar = barMap.map(item => item.confirmed)
  const healingBar = barMap.map(item => item.healing)
  const recoveredBar = barMap.map(item => item.recovered)
  const deathsBar = barMap.map(item => item.deaths)

  // end bar

  // line

  const lineMap = _([].concat(...resultBar))
    .groupBy("date")
    .map((item, id) => ({
      date: id,
      confirmed: _.sumBy(item, "confirmed"),
    }))
    .value()

  const dateLine = lineMap.map(item => item.date)

  const confirmedLine = lineMap.map(item => item.confirmed)

  return (
    <>
      <Layout>
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-4"
          role="alert"
        >
          <div className="flex">
            <div>
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
                เว็บไซต์นี้ ใช้ข้อมูลจาก{" "}
                <a
                  href="https://github.com/CSSEGISandData/COVID-19"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  CSSEGISandData{" "}
                </a>
                ขอบคุณ{" "}
                <a
                  href="https://systems.jhu.edu/research/public-health/ncov/"
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
          <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg h-56">
            <Confirmed
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
              confirmedToday={confirmedToday}
              confirmedYesterday={confirmedYesterday}
              confirmedCompare={confirmedCompare}
            />
          </div>
          <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg h-56">
            <Healing
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
              healingToday={healingToday}
              healingYesterday={healingYesterday}
              healingCompare={healingCompare}
            />
          </div>
          <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg h-56">
            <Recovered
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
              recoveredToday={recoveredToday}
              recoveredYesterday={recoveredYesterday}
              recoveredCompare={recoveredCompare}
            />
          </div>
          <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg h-56">
            <Deaths
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
              deathsToday={deathsToday}
              deathsYesterday={deathsYesterday}
              deathsCompare={deathsCompare}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg">
            <StyledChart className="text-center bg-gray-800 rounded overflow-hidden shadow-lg">
              <h1 className="text-white mt-4">เปรียบเทียบอัตราส่วน</h1>
              <Pie
                confirmed={getConfirmed}
                recovered={getRecovered}
                deaths={getDeaths}
              />
            </StyledChart>
          </div>

          <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg">
            <StyledChart className="text-center bg-gray-800 rounded overflow-hidden shadow-lg">
              <h1 className="text-white mt-4">เหตุการณ์ ย้อนหลัง 1 อาทิตย์</h1>
              <Bar
                date={dateBar}
                confirmed={confirmedBar}
                recovered={recoveredBar}
                healing={healingBar}
                deaths={deathsBar}
              />
            </StyledChart>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-5 ">
          <StyledChart className="bg-gray-800 col-span-12 text-center px-4 rounded overflow-hidden shadow-lg">
            <h1 className="text-white mt-4">
              อัตราการติดเชื้อ ย้อนหลัง 1 อาทิตย์
            </h1>
            <Line data={confirmedLine} date={dateLine} />
          </StyledChart>
        </div>
        <div className="grid grid-cols-12 mt-5 ">
          <div className="bg-gray-800 col-span-12 text-center px-4 py-2 rounded overflow-hidden shadow-lg">
            <h1 className="text-white mt-4">พื้นที่ได้รับผลกระทบ</h1>
            <Map data={confirmedData} />
          </div>
        </div>
        <div className="grid grid-cols-12 mt-5 ">
          <div className="bg-gray-800 col-span-12 text-center px-4 rounded overflow-hidden shadow-lg">
            <h1 className="text-white mt-4">แบ่งตาม ประเทศ/ภูมิภาค</h1>
            <Table
              confirmed={getConfirmed}
              recovered={getRecovered}
              deaths={getDeaths}
              data={dataTable}
            />
          </div>
        </div>
      </Layout>
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
