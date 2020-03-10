module.exports = {
  siteMetadata: {
    title: `COVID-19`,
    description: `ติดตามสถานการณ์ COVID-19 ในปัจจุบัน`,
    author: `@niaw`,
    image: `og.png`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-antd`,
    "gatsby-plugin-offline",
    `gatsby-plugin-postcss`,
    "gatsby-plugin-resolve-src",
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        printRejected: true,
        purgeOnly: [`src/styles/globals.css`],
        // develop: true, // Enable while using `gatsby develop`
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: true,
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cache",
      options: {
        cachePublic: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Kanit`],
        display: "swap",
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "covid19",
        short_name: "covid-19",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "standalone",
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-143755483-3",
      },
    },
  ],
}
