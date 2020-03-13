import React from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import addDays from "date-fns/addDays"
import format from "date-fns/format"

am4core.useTheme(am4themes_animated)

class Timelapse extends React.Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv2", am4charts.XYChart)
    // chart.padding(40, 40, 40, 40);

    chart.numberFormatter.bigNumberPrefixes = [
      { number: 1e3, suffix: "K" },
      { number: 1e6, suffix: "M" },
      { number: 1e9, suffix: "B" },
    ]

    let { start, end, data } = this.props

    var label = chart.plotContainer.createChild(am4core.Label)
    label.x = am4core.percent(97)
    label.y = am4core.percent(95)
    label.horizontalCenter = "right"
    label.verticalCenter = "middle"
    label.dx = -15
    label.fontSize = 50
    label.fontFamily = "Prompt"
    var playButton = chart.plotContainer.createChild(am4core.PlayButton)
    playButton.x = am4core.percent(97)
    playButton.y = am4core.percent(95)
    playButton.dy = -2
    playButton.verticalCenter = "middle"
    playButton.events.on("toggled", function(event) {
      if (event.target.isActive) {
        play()
      } else {
        stop()
      }
    })

    var stepDuration = 1500

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.dataFields.category = "network"
    categoryAxis.renderer.minGridDistance = 1
    categoryAxis.renderer.inversed = true
    categoryAxis.renderer.grid.template.disabled = true
    categoryAxis.renderer.labels.template.fill = am4core.color("#ffffff")

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
    valueAxis.min = 0
    valueAxis.rangeChangeEasing = am4core.ease.linear
    valueAxis.rangeChangeDuration = stepDuration
    valueAxis.extraMax = 0.1
    valueAxis.renderer.labels.template.fill = am4core.color("#ffffff")

    var series = chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.categoryY = "network"
    series.dataFields.valueX = "value"
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0
    series.columns.template.column.cornerRadiusBottomRight = 5
    series.columns.template.column.cornerRadiusTopRight = 5
    series.interpolationDuration = stepDuration
    series.interpolationEasing = am4core.ease.linear

    var labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "right"
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.a')} คน"
    labelBullet.label.textAlign = "end"
    labelBullet.label.dx = -10
    labelBullet.label.fontSize = "15px"
    labelBullet.label.fill = am4core.color("#000000")

    chart.zoomOutButton.disabled = true

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index)
    })

    var year = start
    label.text = year.toString()
    label.fill = am4core.color("#ffffff")
    label.fontSize = "20px"
    var interval

    function play() {
      interval = setInterval(function() {
        nextYear()
      }, stepDuration)
      nextYear()
    }

    function stop() {
      if (interval) {
        clearInterval(interval)
      }
    }

    function nextYear() {
      year = format(new Date(addDays(new Date(year), 1)), "M/d/yy")
      if (new Date(year) > new Date(end)) {
        year = start
      }

      var newData = data[year]
      var itemsWithNonZero = 0
      for (var i = 0; i < chart.data.length; i++) {
        chart.data[i].value = newData[i].value
        if (chart.data[i].value > 0 && i <= 10) {
          itemsWithNonZero++
        }
      }

      if (year === start) {
        series.interpolationDuration = stepDuration / 4
        valueAxis.rangeChangeDuration = stepDuration / 4
      } else {
        series.interpolationDuration = stepDuration
        valueAxis.rangeChangeDuration = stepDuration
      }

      chart.invalidateRawData()
      label.text = year.toString()

      categoryAxis.zoom({
        start: 0,
        end: itemsWithNonZero / categoryAxis.dataItems.length,
      })
    }

    categoryAxis.sortBySeries = series

    chart.data = JSON.parse(JSON.stringify(data[year]))
    categoryAxis.zoom({ start: 0, end: 1 / chart.data.length })

    series.events.on("inited", function() {
      setTimeout(function() {
        playButton.isActive = true
      }, 500)
    })
    this.chart = chart
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  render() {
    return <div id="chartdiv2" style={{ width: "100%", height: "400px" }}></div>
  }
}

export default Timelapse
