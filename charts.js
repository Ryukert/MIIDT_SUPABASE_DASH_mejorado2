function makeChart(canvasId, title) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) throw new Error(`No existe canvas #${canvasId}`);

  return new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: `${title} - X`,
          data: [],
          tension: 0.2,
          pointRadius: 0,
          borderWidth: 2,
          borderColor: '#1F3A5F',
          backgroundColor: 'rgba(31,58,95,0.10)',
          fill: false,
        },
        {
          label: `${title} - Y`,
          data: [],
          tension: 0.2,
          pointRadius: 0,
          borderWidth: 2,
          borderColor: '#8C1D18',
          backgroundColor: 'rgba(140,29,24,0.10)',
          fill: false,
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          labels: { usePointStyle: true, boxWidth: 10, color: '#334155', font: { weight: '700' } }
        },
        tooltip: { backgroundColor: 'rgba(15,23,42,0.92)' }
      },
      scales: {
        x: {
          grid: { color: 'rgba(148,163,184,0.14)' },
          ticks: { maxTicksLimit: 10, color: '#64748b' }
        },
        y: {
          grid: { color: 'rgba(148,163,184,0.14)' },
          ticks: { maxTicksLimit: 6, color: '#64748b' }
        }
      }
    }
  });
}

export function createChartsByDevice() {
  return {
    PC: {
      A: makeChart("chartPC_A", "PC • MPU9250_1"),
      B: makeChart("chartPC_B", "PC • MPU9250_2"),
      C: makeChart("chartPC_C", "PC • LSM6DSOX"),
    },
    RPI: {
      A: makeChart("chartRPI_A", "RPI • MPU9250_1"),
      B: makeChart("chartRPI_B", "RPI • MPU9250_2"),
      C: makeChart("chartRPI_C", "RPI • LSM6DSOX"),
    }
  };
}

export function pushPoint(chart, label, x, y, maxPoints) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(x);
  chart.data.datasets[1].data.push(y);

  while (chart.data.labels.length > maxPoints) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
    chart.data.datasets[1].data.shift();
  }
}

export function redraw(chart) {
  chart.update("none");
}
