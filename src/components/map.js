import React from "react"
import * as am4core from "@amcharts/amcharts4/core"

import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldUltra"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

am4core.useTheme(am4themes_animated)

class Map extends React.Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4maps.MapChart)

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

    imageSeries.data = [
      {
        title: "Vienna",
        latitude: 48.2092,
        longitude: 16.3728,
      },
      {
        title: "Minsk",
        latitude: 53.9678,
        longitude: 27.5766,
      },
      {
        title: "Brussels",
        latitude: 50.8371,
        longitude: 4.3676,
      },
      {
        title: "Sarajevo",
        latitude: 43.8608,
        longitude: 18.4214,
      },
      {
        title: "Sofia",
        latitude: 42.7105,
        longitude: 23.3238,
      },
      {
        title: "Zagreb",
        latitude: 45.815,
        longitude: 15.9785,
      },
      {
        title: "Pristina",
        latitude: 42.666667,
        longitude: 21.166667,
      },
      {
        title: "Prague",
        latitude: 50.0878,
        longitude: 14.4205,
      },
      {
        title: "Copenhagen",
        latitude: 55.6763,
        longitude: 12.5681,
      },
      {
        title: "Tallinn",
        latitude: 59.4389,
        longitude: 24.7545,
      },
      {
        title: "Helsinki",
        latitude: 60.1699,
        longitude: 24.9384,
      },
      {
        title: "Paris",
        latitude: 48.8567,
        longitude: 2.351,
      },
      {
        title: "Berlin",
        latitude: 52.5235,
        longitude: 13.4115,
      },
      {
        title: "Athens",
        latitude: 37.9792,
        longitude: 23.7166,
      },
      {
        title: "Budapest",
        latitude: 47.4984,
        longitude: 19.0408,
      },
      {
        title: "Reykjavik",
        latitude: 64.1353,
        longitude: -21.8952,
      },
      {
        title: "Dublin",
        latitude: 53.3441,
        longitude: -6.2675,
      },
      {
        title: "Rome",
        latitude: 41.8955,
        longitude: 12.4823,
      },
      {
        title: "Riga",
        latitude: 56.9465,
        longitude: 24.1049,
      },
      {
        title: "Vaduz",
        latitude: 47.1411,
        longitude: 9.5215,
      },
      {
        title: "Vilnius",
        latitude: 54.6896,
        longitude: 25.2799,
      },
      {
        title: "Luxembourg",
        latitude: 49.61,
        longitude: 6.1296,
      },
      {
        title: "Skopje",
        latitude: 42.0024,
        longitude: 21.4361,
      },
      {
        title: "Valletta",
        latitude: 35.9042,
        longitude: 14.5189,
      },
      {
        title: "Chisinau",
        latitude: 47.0167,
        longitude: 28.8497,
      },
      {
        title: "Monaco",
        latitude: 43.7325,
        longitude: 7.4189,
      },
      {
        title: "Podgorica",
        latitude: 42.4602,
        longitude: 19.2595,
      },
      {
        title: "Amsterdam",
        latitude: 52.3738,
        longitude: 4.891,
      },
      {
        title: "Oslo",
        latitude: 59.9138,
        longitude: 10.7387,
      },
      {
        title: "Warsaw",
        latitude: 52.2297,
        longitude: 21.0122,
      },
      {
        title: "Lisbon",
        latitude: 38.7072,
        longitude: -9.1355,
      },
      {
        title: "Bucharest",
        latitude: 44.4479,
        longitude: 26.0979,
      },
      {
        title: "Moscow",
        latitude: 55.7558,
        longitude: 37.6176,
      },
      {
        title: "San Marino",
        latitude: 43.9424,
        longitude: 12.4578,
      },
      {
        title: "Belgrade",
        latitude: 44.8048,
        longitude: 20.4781,
      },
      {
        title: "Bratislava",
        latitude: 48.2116,
        longitude: 17.1547,
      },
      {
        title: "Ljubljana",
        latitude: 46.0514,
        longitude: 14.506,
      },
      {
        title: "Madrid",
        latitude: 40.4167,
        longitude: -3.7033,
      },
      {
        title: "Stockholm",
        latitude: 59.3328,
        longitude: 18.0645,
      },
      {
        title: "Bern",
        latitude: 46.948,
        longitude: 7.4481,
      },
      {
        title: "Kiev",
        latitude: 50.4422,
        longitude: 30.5367,
      },
      {
        title: "London",
        latitude: 51.5002,
        longitude: -0.1262,
      },
      {
        title: "Gibraltar",
        latitude: 36.1377,
        longitude: -5.3453,
      },
      {
        title: "Saint Peter Port",
        latitude: 49.466,
        longitude: -2.5522,
      },
      {
        title: "Douglas",
        latitude: 54.167,
        longitude: -4.4821,
      },
      {
        title: "Saint Helier",
        latitude: 49.1919,
        longitude: -2.1071,
      },
      {
        title: "Longyearbyen",
        latitude: 78.2186,
        longitude: 15.6488,
      },
      {
        title: "Kabul",
        latitude: 34.5155,
        longitude: 69.1952,
      },
      {
        title: "Yerevan",
        latitude: 40.1596,
        longitude: 44.509,
      },
      {
        title: "Baku",
        latitude: 40.3834,
        longitude: 49.8932,
      },
      {
        title: "Manama",
        latitude: 26.1921,
        longitude: 50.5354,
      },
      {
        title: "Dhaka",
        latitude: 23.7106,
        longitude: 90.3978,
      },
      {
        title: "Thimphu",
        latitude: 27.4405,
        longitude: 89.673,
      },
      {
        title: "Bandar Seri Begawan",
        latitude: 4.9431,
        longitude: 114.9425,
      },
      {
        title: "Phnom Penh",
        latitude: 11.5434,
        longitude: 104.8984,
      },
      {
        title: "Peking",
        latitude: 39.9056,
        longitude: 116.3958,
      },
      {
        title: "Nicosia",
        latitude: 35.1676,
        longitude: 33.3736,
      },
      {
        title: "T'bilisi",
        latitude: 41.701,
        longitude: 44.793,
      },
      {
        title: "New Delhi",
        latitude: 28.6353,
        longitude: 77.225,
      },
      {
        title: "Jakarta",
        latitude: -6.1862,
        longitude: 106.8063,
      },
      {
        title: "Teheran",
        latitude: 35.7061,
        longitude: 51.4358,
      },
      {
        title: "Baghdad",
        latitude: 33.3157,
        longitude: 44.3922,
      },
      {
        title: "Jerusalem",
        latitude: 31.76,
        longitude: 35.17,
      },
      {
        title: "Tokyo",
        latitude: 35.6785,
        longitude: 139.6823,
      },
      {
        title: "Amman",
        latitude: 31.9394,
        longitude: 35.9349,
      },
      {
        title: "Astana",
        latitude: 51.1796,
        longitude: 71.4475,
      },
      {
        title: "Kuwait",
        latitude: 29.3721,
        longitude: 47.9824,
      },
      {
        title: "Bishkek",
        latitude: 42.8679,
        longitude: 74.5984,
      },
      {
        title: "Vientiane",
        latitude: 17.9689,
        longitude: 102.6137,
      },
      {
        title: "Beyrouth / Beirut",
        latitude: 33.8872,
        longitude: 35.5134,
      },
      {
        title: "Kuala Lumpur",
        latitude: 3.1502,
        longitude: 101.7077,
      },
      {
        title: "Ulan Bator",
        latitude: 47.9138,
        longitude: 106.922,
      },
      {
        title: "Pyinmana",
        latitude: 19.7378,
        longitude: 96.2083,
      },
      {
        title: "Kathmandu",
        latitude: 27.7058,
        longitude: 85.3157,
      },
      {
        title: "Muscat",
        latitude: 23.6086,
        longitude: 58.5922,
      },
      {
        title: "Islamabad",
        latitude: 33.6751,
        longitude: 73.0946,
      },
      {
        title: "Manila",
        latitude: 14.579,
        longitude: 120.9726,
      },
      {
        title: "Doha",
        latitude: 25.2948,
        longitude: 51.5082,
      },
      {
        title: "Riyadh",
        latitude: 24.6748,
        longitude: 46.6977,
      },
      {
        title: "Singapore",
        latitude: 1.2894,
        longitude: 103.85,
      },
      {
        title: "Seoul",
        latitude: 37.5139,
        longitude: 126.9828,
      },
      {
        title: "Colombo",
        latitude: 6.9155,
        longitude: 79.8572,
      },
      {
        title: "Damascus",
        latitude: 33.5158,
        longitude: 36.2939,
      },
      {
        title: "Taipei",
        latitude: 25.0338,
        longitude: 121.5645,
      },
      {
        title: "Dushanbe",
        latitude: 38.5737,
        longitude: 68.7738,
      },
      {
        title: "Bangkok",
        latitude: 13.7573,
        longitude: 100.502,
      },
      {
        title: "Dili",
        latitude: -8.5662,
        longitude: 125.588,
      },
      {
        title: "Ankara",
        latitude: 39.9439,
        longitude: 32.856,
      },
      {
        title: "Ashgabat",
        latitude: 37.9509,
        longitude: 58.3794,
      },
      {
        title: "Abu Dhabi",
        latitude: 24.4764,
        longitude: 54.3705,
      },
      {
        title: "Tashkent",
        latitude: 41.3193,
        longitude: 69.2481,
      },
      {
        title: "Hanoi",
        latitude: 21.0341,
        longitude: 105.8372,
      },
      {
        title: "Sanaa",
        latitude: 15.3556,
        longitude: 44.2081,
      },
      {
        title: "Buenos Aires",
        latitude: -34.6118,
        longitude: -58.4173,
      },
      {
        title: "Bridgetown",
        latitude: 13.0935,
        longitude: -59.6105,
      },
      {
        title: "Belmopan",
        latitude: 17.2534,
        longitude: -88.7713,
      },
      {
        title: "Sucre",
        latitude: -19.0421,
        longitude: -65.2559,
      },
      {
        title: "Brasilia",
        latitude: -15.7801,
        longitude: -47.9292,
      },
      {
        title: "Ottawa",
        latitude: 45.4235,
        longitude: -75.6979,
      },
      {
        title: "Santiago",
        latitude: -33.4691,
        longitude: -70.642,
      },
      {
        title: "Bogota",
        latitude: 4.6473,
        longitude: -74.0962,
      },
      {
        title: "San Jose",
        latitude: 9.9402,
        longitude: -84.1002,
      },
      {
        title: "Havana",
        latitude: 23.1333,
        longitude: -82.3667,
      },
      {
        title: "Roseau",
        latitude: 15.2976,
        longitude: -61.39,
      },
      {
        title: "Santo Domingo",
        latitude: 18.479,
        longitude: -69.8908,
      },
      {
        title: "Quito",
        latitude: -0.2295,
        longitude: -78.5243,
      },
      {
        title: "San Salvador",
        latitude: 13.7034,
        longitude: -89.2073,
      },
      {
        title: "Guatemala",
        latitude: 14.6248,
        longitude: -90.5328,
      },
      {
        title: "Ciudad de Mexico",
        latitude: 19.4271,
        longitude: -99.1276,
      },
      {
        title: "Managua",
        latitude: 12.1475,
        longitude: -86.2734,
      },
      {
        title: "Panama",
        latitude: 8.9943,
        longitude: -79.5188,
      },
      {
        title: "Asuncion",
        latitude: -25.3005,
        longitude: -57.6362,
      },
      {
        title: "Lima",
        latitude: -12.0931,
        longitude: -77.0465,
      },
      {
        title: "Castries",
        latitude: 13.9972,
        longitude: -60.0018,
      },
      {
        title: "Paramaribo",
        latitude: 5.8232,
        longitude: -55.1679,
      },
      {
        title: "Washington D.C.",
        latitude: 38.8921,
        longitude: -77.0241,
      },
      {
        title: "Montevideo",
        latitude: -34.8941,
        longitude: -56.0675,
      },
      {
        title: "Caracas",
        latitude: 10.4961,
        longitude: -66.8983,
      },
      {
        title: "Oranjestad",
        latitude: 12.5246,
        longitude: -70.0265,
      },
      {
        title: "Cayenne",
        latitude: 4.9346,
        longitude: -52.3303,
      },
      {
        title: "Plymouth",
        latitude: 16.6802,
        longitude: -62.2014,
      },
      {
        title: "San Juan",
        latitude: 18.45,
        longitude: -66.0667,
      },
      {
        title: "Algiers",
        latitude: 36.7755,
        longitude: 3.0597,
      },
      {
        title: "Luanda",
        latitude: -8.8159,
        longitude: 13.2306,
      },
      {
        title: "Porto-Novo",
        latitude: 6.4779,
        longitude: 2.6323,
      },
      {
        title: "Gaborone",
        latitude: -24.657,
        longitude: 25.9089,
      },
      {
        title: "Ouagadougou",
        latitude: 12.3569,
        longitude: -1.5352,
      },
      {
        title: "Bujumbura",
        latitude: -3.3818,
        longitude: 29.3622,
      },
      {
        title: "Yaounde",
        latitude: 3.8612,
        longitude: 11.5217,
      },
      {
        title: "Bangui",
        latitude: 4.3621,
        longitude: 18.5873,
      },
      {
        title: "Brazzaville",
        latitude: -4.2767,
        longitude: 15.2662,
      },
      {
        title: "Kinshasa",
        latitude: -4.3369,
        longitude: 15.3271,
      },
      {
        title: "Yamoussoukro",
        latitude: 6.8067,
        longitude: -5.2728,
      },
      {
        title: "Djibouti",
        latitude: 11.5806,
        longitude: 43.1425,
      },
      {
        title: "Cairo",
        latitude: 30.0571,
        longitude: 31.2272,
      },
      {
        title: "Asmara",
        latitude: 15.3315,
        longitude: 38.9183,
      },
      {
        title: "Addis Abeba",
        latitude: 9.0084,
        longitude: 38.7575,
      },
      {
        title: "Libreville",
        latitude: 0.3858,
        longitude: 9.4496,
      },
      {
        title: "Banjul",
        latitude: 13.4399,
        longitude: -16.6775,
      },
      {
        title: "Accra",
        latitude: 5.5401,
        longitude: -0.2074,
      },
      {
        title: "Conakry",
        latitude: 9.537,
        longitude: -13.6785,
      },
      {
        title: "Bissau",
        latitude: 11.8598,
        longitude: -15.5875,
      },
      {
        title: "Nairobi",
        latitude: -1.2762,
        longitude: 36.7965,
      },
      {
        title: "Maseru",
        latitude: -29.2976,
        longitude: 27.4854,
      },
      {
        title: "Monrovia",
        latitude: 6.3106,
        longitude: -10.8047,
      },
      {
        title: "Tripoli",
        latitude: 32.883,
        longitude: 13.1897,
      },
      {
        title: "Antananarivo",
        latitude: -18.9201,
        longitude: 47.5237,
      },
      {
        title: "Lilongwe",
        latitude: -13.9899,
        longitude: 33.7703,
      },
      {
        title: "Bamako",
        latitude: 12.653,
        longitude: -7.9864,
      },
      {
        title: "Nouakchott",
        latitude: 18.0669,
        longitude: -15.99,
      },
      {
        title: "Port Louis",
        latitude: -20.1654,
        longitude: 57.4896,
      },
      {
        title: "Rabat",
        latitude: 33.9905,
        longitude: -6.8704,
      },
      {
        title: "Maputo",
        latitude: -25.9686,
        longitude: 32.5804,
      },
      {
        title: "Windhoek",
        latitude: -22.5749,
        longitude: 17.0805,
      },
      {
        title: "Niamey",
        latitude: 13.5164,
        longitude: 2.1157,
      },
      {
        title: "Abuja",
        latitude: 9.058,
        longitude: 7.4891,
      },
      {
        title: "Kigali",
        latitude: -1.9441,
        longitude: 30.0619,
      },
      {
        title: "Dakar",
        latitude: 14.6953,
        longitude: -17.4439,
      },
      {
        title: "Freetown",
        latitude: 8.4697,
        longitude: -13.2659,
      },
      {
        title: "Mogadishu",
        latitude: 2.0411,
        longitude: 45.3426,
      },
      {
        title: "Pretoria",
        latitude: -25.7463,
        longitude: 28.1876,
      },
      {
        title: "Mbabane",
        latitude: -26.3186,
        longitude: 31.141,
      },
      {
        title: "Dodoma",
        latitude: -6.167,
        longitude: 35.7497,
      },
      {
        title: "Lome",
        latitude: 6.1228,
        longitude: 1.2255,
      },
      {
        title: "Tunis",
        latitude: 36.8117,
        longitude: 10.1761,
      },
    ]

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
