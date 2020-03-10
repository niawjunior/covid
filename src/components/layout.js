import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Footer from "./footer"

import { StaticQuery, graphql } from "gatsby"
import Header from "./header"
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            image
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: "description",
              content: "ติดตามสถานการณ์ COVID-19 ในปัจจุบัน",
            },
            {
              name: "og:title",
              content: "COVID-19",
            },
            {
              name: "og:description",
              content: "ติดตามสถานการณ์ COVID-19 ในปัจจุบัน",
            },
            {
              name: "keywords",
              content:
                "covid-19, covid, โควิค, โคโรน่า, ไวรัสโคโรน่า, ไวรัสโคโรน่าสายพันธุ์ใหม่, โควิค-19",
            },
            {
              name: "og:image",
              content: `https://covid19th.com/${data.site.siteMetadata.image}`,
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="p-4 antialiased text-gray-900 items-center min-h-screen">
          <div className="shadow-2xl px-4 py-4">{children}</div>
        </div>
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
