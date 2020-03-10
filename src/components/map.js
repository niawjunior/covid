import React from "react"
import * as am4core from "@amcharts/amcharts4/core"

import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldUltra"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

am4core.useTheme(am4themes_animated)

class Map extends React.Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4maps.MapChart)

    const data = Object.entries(this.props.data).map(([key, value]) => {
      const result = value.data.map(item => {
        return {
          title: `${item.province_state} (${item.country_region})`,
          latitude: Number(item.lat),
          longitude: Number(item.long),
        }
      })
      return result
    })

    const mapData = [].concat(...data)

    chart.geodata = am4geodata_worldLow

    chart.projection = new am4maps.projections.Miller()

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"]

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.strokeOpacity = 0.5
    polygonTemplate.nonScalingStroke = true

    // create capital markers
    let imageSeries = chart.series.push(new am4maps.MapImageSeries())

    // define template
    let imageSeriesTemplate = imageSeries.mapImages.template

    let circle = imageSeries.mapImages.template.createChild(am4core.Circle)
    circle.radius = 3
    circle.fill = am4core.color("red")

    let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle)
    circle2.radius = 3
    circle2.fill = am4core.color("red")

    circle2.events.on("inited", function(event) {
      animateBullet(event.target)
    })

    function animateBullet(circle) {
      let animation = circle.animate(
        [
          { property: "scale", from: 1, to: 5 },
          { property: "opacity", from: 1, to: 0 },
        ],
        1000,
        am4core.ease.circleOut
      )
      animation.events.on("animationended", function(event) {
        animateBullet(event.target.object)
      })
    }

    chart.homeZoomLevel = 2
    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl()

    let homeButton = new am4core.Button()
    homeButton.events.on("hit", function() {
      chart.goHome()
    })

    homeButton.icon = new am4core.Sprite()
    homeButton.padding(7, 5, 7, 5)
    homeButton.width = 30
    homeButton.icon.path =
      "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8"
    homeButton.marginBottom = 10
    homeButton.parent = chart.zoomControl
    homeButton.insertBefore(chart.zoomControl.plusButton)

    // set propertyfields
    imageSeriesTemplate.propertyFields.latitude = "latitude"
    imageSeriesTemplate.propertyFields.longitude = "longitude"

    imageSeriesTemplate.horizontalCenter = "middle"
    imageSeriesTemplate.verticalCenter = "middle"
    imageSeriesTemplate.align = "center"
    imageSeriesTemplate.valign = "middle"
    imageSeriesTemplate.width = 8
    imageSeriesTemplate.height = 8
    imageSeriesTemplate.nonScaling = true
    imageSeriesTemplate.tooltipText = "{title}"
    imageSeriesTemplate.fill = am4core.color("#000")
    imageSeriesTemplate.background.fillOpacity = 0
    imageSeriesTemplate.background.fill = am4core.color("#ffffff")
    imageSeriesTemplate.setStateOnChildren = true
    imageSeriesTemplate.states.create("hover")

    imageSeries.data = mapData
    this.chart = chart
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  render() {
    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  }
}

export default Map
