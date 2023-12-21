import ApexCharts from 'apexcharts'

let count = true;

const loadWebAnalytics = function() {
    let options = {
        chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        },
        tooltip: {
        enabled: true,
        x: {
            show: false,
        },
        },
        fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
        },
        dataLabels: {
        enabled: false,
        },
        stroke: {
        width: 6,
        },
        grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: 0
        },
        },
        series: [
        {
            name: "New users",
            data: [180, 209, 90, 174, 102, 453],
            color: "#1A56DB",
        },
        ],
        xaxis: {
        categories: ['15 december', '16 december', '17 december', '18 december', '19 december', '20 december', '21 december'],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        },
        yaxis: {
        show: false,
        },
    }

    // const chart = new ApexCharts(document.getElementById("area-chart"), options);
    // chart.render();

    if (document.getElementById("area-chart") && typeof ApexCharts !== 'undefined' && count) {
        count = false;
        const chart = new ApexCharts(document.getElementById("area-chart"), options);
        chart.render();
    }
};

export default loadWebAnalytics;