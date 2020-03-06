import React from "react"
import _ from "lodash"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import Confirmed from "../components/confirmed"
import Deaths from "../components/deaths"
import Recovered from "../components/recovered"
import Healing from "../components/healing"
import Pie from "../components/pie"

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
    <Layout>
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
      <div className="flex flex-col bg-gray-200 mt-5">
        <div className="text-center bg-gray-800 rounded overflow-hidden shadow-lg h-64">
          <Pie
            confirmed={getConfirmed}
            recovered={getRecovered}
            deaths={getDeaths}
          />
        </div>
      </div>
    </Layout>
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
