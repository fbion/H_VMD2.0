var defaultSeries = {
    type: 'line',
    lineWidth: 2,
    color: "#7cb5ec",
    connectNulls: false,
    xAxis: 0,
    yAxis: 0,
    dashStyle: 'Solid',
    xData: '',
    yData: '',
    marker: {
        enabled: true,
        symbol: 'circle',
        radius: 4,
        lineWidth: 0,
        lineColor: '#ffffff',
        fillColor: '#7cb5ec'
    },
    dataLabels: {
        enabled: false,
        format: '{y}',
        align: 'center',
        verticalAlign: 'top',
        x: 0,
        y: -6,
        style: {
            color: "#000",
            fontSize: "12px",
            fontFamily: 'SimSun',
            fontWeight: "bold",
            fontStyle: 'normal',
            textOutline: "1px 1px contrast"
        }
    },
    borderColor: "#ffffff",
    borderWidth: 1,
    innerSize: 0,
    borderRadius: 0,
    showCheckbox: false,
    stack: '',
    stacking: '',
    step: '',
}