const valueCell = <value cell>
const sourceSheetName = <source sheet name>
const plotSheetName = <plot sheet name>

function getPersonalValue() {
  var value =  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Balance Sheet').getRange(valueCell).getValue()
  return parseFloat(value.toFixed(2))
}

function getDate() {
  const date = new Date()
  const timeZone = 'UTC'
  const format = "yyyy-MM-dd"
  return Utilities.formatDate(date, timeZone, format)
}

function appendHistoryData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  sheet.appendRow([getDate(), getPersonalValue(), 'Added automatically'])
  Logger.log('Adding data for %s', getDate())
}

function updateChart() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  var chart = sheet.getCharts()[0]
  var oldChartData = chart.getRanges()[0]
  var newData = sheet.getRange('A:B')
  var updatedChart = chart.modify().removeRange(oldChartData).addRange(newData).build()
  sheet.updateChart(updatedChart)
}

function main() {
  appendHistoryData()
  updateChart()
}
