const fetch = require(`node-fetch`)

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig()
  config.node = {
    fs: "empty",
  }
}

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const confirmed = await fetch(
    `https://us-central1-covid-19-9142d.cloudfunctions.net/api/covid-19-confirmed`
  )
  const recovered = await fetch(
    `https://us-central1-covid-19-9142d.cloudfunctions.net/api/covid-19-recovered`
  )
  const deaths = await fetch(
    `https://us-central1-covid-19-9142d.cloudfunctions.net/api/covid-19-deaths`
  )
  const resultConfirmed = await confirmed.json()
  const resultRecovered = await recovered.json()
  const resultDeaths = await deaths.json()
  createNode({
    data: resultConfirmed,
    id: `confirmed`,
    parent: null,
    children: [],
    internal: {
      type: `Confirmed`,
      contentDigest: createContentDigest(resultConfirmed),
    },
  })
  createNode({
    data: resultRecovered,
    id: `recovered`,
    parent: null,
    children: [],
    internal: {
      type: `Recovered`,
      contentDigest: createContentDigest(resultRecovered),
    },
  })
  createNode({
    data: resultDeaths,
    id: `deaths`,
    parent: null,
    children: [],
    internal: {
      type: `Deaths`,
      contentDigest: createContentDigest(resultDeaths),
    },
  })
}
