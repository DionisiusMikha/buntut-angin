import ApexCharts from "apexcharts";

let count = true;

const WeightLose = function() {
    window.addEventListener("load", function() {
        const getChartOptions = () => {
            return {
              series: [52.8, 26.8],
              colors: ["#16BDCA", "#1C64F2"],
              chart: {
                height: 420,
                width: "100%",
                type: "pie",
              },
              stroke: {
                colors: ["white"],
                lineCap: "",
              },
              plotOptions: {
                pie: {
                  labels: {
                    show: true,
                  },
                  size: "100%",
                  dataLabels: {
                    offset: -25
                  }
                },
              },
              labels: ["Weight Lose", "Target Weight"],
              dataLabels: {
                enabled: true,
                style: {
                  fontFamily: "Inter, sans-serif",
                },
              },
              legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
              },
              yaxis: {
                labels: {
                  formatter: function (value) {
                    return value + "%"
                  },
                },
              },
              xaxis: {
                labels: {
                  formatter: function (value) {
                    return value  + "%"
                  },
                },
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
              },
            }
          }    
          if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined' && count) {
            count = false;
            const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
            chart.render();
          }
      });
}

export default WeightLose;