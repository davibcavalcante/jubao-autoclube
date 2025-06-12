const imprimirFicha = async (inscricao) => {
  const formData = {
    aux1: inscricao.aux1 || {},
    aux2: inscricao.aux2 || {},
    car: inscricao.car || {},
    cup: inscricao.cup || {},
    navigator: inscricao.navigator || {},
    pilot: inscricao.pilot || {},
    team: inscricao.team || {}
  };

  try {
    const result = await fetch("/api/v1/abrir-pdf", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    if (result.ok) {
      const blob = await result.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } else {
      alert("Erro ao gerar PDF");
    }
  } catch (err) {
    console.error("Erro ao imprimir:", err);
  }
}

const carregarInscricoes = async () => {
  try {
    const res = await fetch("/api/v1/inscricoes");
    const data = await res.json();
    const inscricoes = data.inscricoes || [];
    console.log(inscricoes)

    const lista = document.getElementById("inscricoes-list");
    lista.innerHTML = "";

    inscricoes.forEach((inscricao, i) => {
      // Renderiza cada item
      const li = document.createElement("li");
      li.className = "inscricao-item";

      const titulo = document.createElement("span");
      titulo.textContent = `Ficha ${i + 1} — Equipe: ${inscricao.team.name} - ${inscricao.cup.cupName}`;

      const botao = document.createElement("button");
      botao.innerHTML = "🖨️";
      botao.className = "print-button";
      botao.onclick = () => imprimirFicha(inscricao);

      li.appendChild(titulo);
      li.appendChild(botao);
      lista.appendChild(li);
    });

  } catch (error) {
    console.error("Erro ao carregar inscrições:", error);
  }
}


carregarInscricoes();