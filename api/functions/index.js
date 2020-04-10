const functions = require("firebase-functions")
const express = require("express")
const getCSV = require("get-csv")
const _ = require("lodash")
const axios = require("axios")
const cors = require("cors")
const app = express()

app.use(
  cors({
    origin: true,
  })
)

app.get("/", (_req, res) => {
  res.send("200 ok")
})

const getConfirmed = async () => {
  return await getCSV(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  )
}

const getDeaths = async () => {
  return await getCSV(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
  )
}

const getRecovered = async () => {
  return await getCSV(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"
  )
}

const mapData = data => {
  return data.map(item => {
    const result = _.omit(item, [
      "Province/State",
      "Country/Region",
      "Lat",
      "Long",
    ])
    return {
      province_state: item["Province/State"],
      country_region: item["Country/Region"],
      lat: item["Lat"],
      long: item["Long"],
      data: Object.entries(result).map(([key, value]) => {
        return {
          date: key,
          value: Number(value),
        }
      }),
    }
  })
}

app.get("/covid-19-confirmed", async (req, res) => {
  const confirmed = mapData(await getConfirmed())
  res.status(200).send(confirmed)
})

app.get("/covid-19-deaths", async (req, res) => {
  const deaths = mapData(await getDeaths())
  res.status(200).send(deaths)
})

app.get("/covid-19-recovered", async (req, res) => {
  const recovered = mapData(await getRecovered())
  res.status(200).send(recovered)
})

exports.api = functions.https.onRequest(app)

exports.scheduledFunction = functions.pubsub
  .schedule("every 6 hours")
  .timeZone("Asia/Bangkok")
  .onRun(context => {
    axios
      .post("https://api.netlify.com/build_hooks/5e61bdd311f47028877352ee")
      .catch(error => {
        throw error
      })
    return null
  })

//   app.listen(3000, () => {
//     console.log('Server Listening on http://localhost:3000/wallet');
// });
