let chart = null;
(() => {
    window.HF = window.HF || {};
  
    window.HF.charts = {
      makeLine(ctx, labels, datasets) {
        if (!window.Chart) return null;
        return new Chart(ctx, {
          type: "line",
          data: { labels, datasets },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true, labels: { color: "black" } } },
            scales:{
                        x:{ ticks:{color:"#777"} },

                        y:{
                        type:"linear",
                        position:"left",
                        ticks:{color:"#777"}
                        },

                        y1:{
                        type:"linear",
                        position:"right",
                        ticks:{color:"#777"},
                        grid:{ drawOnChartArea:false }
                        }

                        },
            elements: { point: { radius: 0 } }
          }
        });
      }
    };
  })();
  


document.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById("trendChart");

if (!canvas) return;

const ctx = canvas.getContext("2d");

const labels = ["10m","20m","30m","40m","50m","60m"];

const datasets = [

{
label:"pH",
data:[6.0,6.1,6.2,6.1,6.0,6.1],
borderColor:"#4fc3f7",
tension:0.4
},

{
label:"EC",
data:[1.7,1.8,1.9,1.8,1.7,1.8],
borderColor:"#6adf8f",
tension:0.4
}

];



});