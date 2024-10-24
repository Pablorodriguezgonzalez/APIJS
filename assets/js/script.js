async function conversionMoneda() {
  const pesos = document.getElementById("pesos").value;
  const moneda = document.getElementById("moneda").value;
  const resultadoDiv = document.getElementById("resultado");
  const url = `https://mindicador.cl/api/${moneda}`;

  if (pesos != "") {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener los datos de la API");
      const data = await response.json();
      const valorMoneda = data.serie[0].valor;
      const conversion = (pesos / valorMoneda).toFixed(2);
      resultadoDiv.innerHTML = `Resultado: $${conversion}`;
      MostrarGrafico(data.serie);
    } catch (error) {
      resultadoDiv.innerHTML = `Ocurrio un Error: ${error.message}`;
    }
  } else {
    alert("Debe ingresar un valor para poder convertir");
  }
}

function MostrarGrafico(serie) {
  const ctx = document.getElementById("historia");
  ctx.style.backgroundColor = "white";

  const etiquetas = serie.slice(0, 10).map((item) => item.fecha.split("T")[0]);
  const valores = serie.slice(0, 10).map((item) => item.valor);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: etiquetas.reverse(),
      datasets: [
        {
          label: "Historial ultimos 10 días",
          data: valores.reverse(),
          borderColor: "#ff6384",
          fill: false,
          lineTension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
    },
  });
}
