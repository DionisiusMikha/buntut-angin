import ApexCharts from "apexcharts";

let count = true;

const loadSubscription = function() {
var options = {
    series: [	
    {
        name: "Income",
        color: "#31C48D",
        data: ["1420", "1620", "1820"],
    },
    {
        name: "Expense",
        data: ["788", "810", "866"],
        color: "#F05252",
    }
    ],
    chart: {
    sparkline: {
        enabled: false,
    },
    type: "bar",
    width: "100%",
    height: 150,
    toolbar: {
        show: false,
    }
    },
    fill: {
    opacity: 1,
    },
    plotOptions: {
    bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
        position: "top",
        },
    },
    },
    legend: {
    show: true,
    position: "bottom",
    },
    dataLabels: {
    enabled: false,
    },
    tooltip: {
    shared: true,
    intersect: false,
    formatter: function (value) {
        return "$" + value
    }
    },
    xaxis: {
    labels: {
        show: true,
        style: {
        fontFamily: "Inter, sans-serif",
        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        },
        formatter: function(value) {
        return "$" + value
        }
    },
    categories: ["Jul", "Aug", "Sep"],
    axisTicks: {
        show: false,
    },
    axisBorder: {
        show: false,
    },
    },
    yaxis: {
    labels: {
        show: true,
        style: {
        fontFamily: "Inter, sans-serif",
        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
    }
    },
    grid: {
    show: true,
    strokeDashArray: 4,
    padding: {
        left: 2,
        right: 2,
        top: -20
    },
    },
    fill: {
    opacity: 1,
    }
}

if(document.getElementById("bar-chart") && typeof ApexCharts !== 'undefined' && count) {
    count = false;
    const chart = new ApexCharts(document.getElementById("bar-chart"), options);
    chart.render();
}
};

export default loadSubscription