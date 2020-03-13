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
import Timelapse from "../components/timelapse"
import { Styled } from "../styles/styled"

const { CardSummary } = Styled

const StyledChart = styled.div`
  ${props =>
    props.height &&
    `
  height: ${props.height}
  `}
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

  const dateTimeline = Object.entries(confirmedData)
    .map(([key, value]) => {
      return value.data
    })[0][0]
    .data.map(item => item.date)

  const getDataByDate = date => {
    const data = Object.entries(confirmedData).map(([key, value]) => {
      const confirmed = value.data
        .map((value, index) => {
          const find = (
            value.data.find(
              v => v.date === date && value.country_region !== "China"
            ) || []
          ).value
          return Number(find)
        })
        .reduce((a, b) => (a += b))
      return {
        network: value.country_region || value.province_state,
        value: confirmed,
      }
    })
    const result = [...data]
    return result
  }
  const newDateTimeline = dateTimeline.map(date => {
    const key = { [date]: getDataByDate(date) }
    return key
  })

  const objectTimeline = Object.assign(...newDateTimeline)

  // // compare
  const resultCompare = Object.entries(confirmedData).map(([key, value]) => {
    const data = value.data.map((item, index) => {
      const confirmedToday = Number(item.data[item.data.length - 1].value)
      const confirmedYesterday = Number(item.data[item.data.length - 2].value)
      const confirmedCompare = confirmedToday - confirmedYesterday

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
      const recoveredCompare = recoveredToday - recoveredYesterday

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
      const deathsCompare = deathsToday - deathsYesterday

      const healingToday = confirmedToday - (recoveredToday + deathsToday)
      const healingYesterday =
        confirmedYesterday - (recoveredYesterday + deathsYesterday)
      const healingCompare = healingToday - healingYesterday

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

  // // end compare

  // // table

  const dataTable = Object.entries(confirmedData)
    .map(([key, value]) => {
      const children = value.data
        .map((item, index) => {
          const recovered = Number(
            recoveredData[key].data.map(
              value => value.data[value.data.length - 1].value
            )[index]
          )
          const deaths = Number(
            deathsData[key].data.map(
              value => value.data[value.data.length - 1].value
            )[index]
          )
          return {
            key: index,
            from: value.country_region,
            parent: false,
            country_region: item.province_state,
            confirmed: Number(item.data[item.data.length - 1].value),
            recovered: recovered,
            deaths: deaths,
            healing:
              Number(item.data[item.data.length - 1].value) -
              (recovered + deaths),
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

  // // end table

  // // bar

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

  // // end bar

  // // line

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
        <div className="grid grid-cols-12 gap-2">
          <CardSummary className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12">
            <Confirmed
              confirmed={getConfirmed}
              confirmedCompare={confirmedCompare}
            />
          </CardSummary>
          <CardSummary className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12">
            <Healing
              healing={getConfirmed.sum - (getRecovered.sum + getDeaths.sum)}
              healingCompare={healingCompare}
              confirmed={getConfirmed}
            />
          </CardSummary>
          <CardSummary className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12">
            <Recovered
              confirmed={getConfirmed}
              recovered={getRecovered}
              recoveredCompare={recoveredCompare}
            />
          </CardSummary>
          <CardSummary className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12">
            <Deaths
              confirmed={getConfirmed}
              deaths={getDeaths}
              deathsCompare={deathsCompare}
            />
          </CardSummary>
        </div>
        <div className="grid grid-cols-12 gap-2 mt-2">
          <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg">
            <StyledChart
              height="22rem"
              className="text-center bg-gray-800 rounded overflow-hidden shadow-lg"
            >
              <h1 className="font-bold text-white mt-4 bg-blue-500 px-4 py-1 inline-block rounded-full">
                เปรียบเทียบอัตราส่วน
              </h1>
              <Pie
                confirmed={getConfirmed}
                recovered={getRecovered}
                deaths={getDeaths}
              />
            </StyledChart>
          </div>
          <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12 bg-gray-800 rounded overflow-hidden shadow-lg">
            <StyledChart
              height="22rem"
              className="text-center bg-gray-800 rounded overflow-hidden shadow-lg"
            >
              <h1 className="font-bold text-white mt-4 bg-blue-500 px-4 py-1 inline-block rounded-full">
                เหตุการณ์ ย้อนหลัง 1 อาทิตย์
              </h1>
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
        <div className="grid grid-cols-12 mt-2">
          <StyledChart
            height="22rem"
            className="bg-gray-800 col-span-12 text-center px-2 rounded overflow-hidden shadow-lg"
          >
            <h1 className="font-bold text-white mt-4 bg-blue-500 px-4 py-1 inline-block rounded-full">
              อัตราการติดเชื้อ ย้อนหลัง 1 อาทิตย์
            </h1>
            <Line data={confirmedLine} date={dateLine} />
          </StyledChart>
        </div>
        <div className="grid grid-cols-12 mt-2">
          <StyledChart
            height="27rem"
            className="bg-gray-800 col-span-12 text-center px-2 rounded overflow-hidden shadow-lg"
          >
            <h1 className="font-bold text-white mt-4 bg-blue-500 px-4 py-1 inline-block rounded-full">
              ไทม์ไลน์การติดเชื้อ ตั้งแต่ เริ่มต้น - ปัจจุบัน (ยกเว้น China)
            </h1>
            <Timelapse
              start={dateTimeline[0]}
              end={dateTimeline[dateTimeline.length - 1]}
              data={objectTimeline}
            />
          </StyledChart>
        </div>
        <div className="grid grid-cols-12 mt-2 ">
          <div className="bg-gray-800 col-span-12 text-center px-2 rounded overflow-hidden shadow-lg">
            <h1 className="font-bold text-white mt-4 mb-4 bg-blue-500 px-4 py-1 inline-block rounded-full">
              พื้นที่ได้รับผลกระทบ
            </h1>
            <Map data={confirmedData} />
          </div>
        </div>
        <div className="grid grid-cols-12 mt-2">
          <div className="bg-gray-800 col-span-12 text-center px-2 rounded overflow-hidden shadow-lg">
            <h1 className="font-bold text-white mt-4 mb-4 bg-blue-500 px-4 py-1 inline-block rounded-full">
              แบ่งตาม ประเทศ/ภูมิภาค
            </h1>
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
