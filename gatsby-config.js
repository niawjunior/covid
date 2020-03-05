module.exports = {
  siteMetadata: {
    title: `COVID-19`,
    description: `ติดตามสถานการณ์ COVID-19 ในปัจจุบัน`,
    author: `@niaw`,
  },
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")]
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Kanit`
        ],
        display: 'swap'
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'covid19',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
}
