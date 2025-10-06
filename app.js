const videosSimulados = [
  {
    id: 1,
    titulo: "Katy Perry - Roar",
    nomeCanal: "Katy Perry",
    ano: 2013,
    descricao: "Videoclipe oficial da música 'Roar' de Katy Perry.",
    url: "CevxZvSJLk8", // ID do vídeo Roar
    likes: 5,
  },
  {
    id: 2,
    titulo: "Katy Perry - Dark Horse (feat. Juicy J)",
    nomeCanal: "Katy Perry",
    ano: 2013,
    descricao: "Videoclipe oficial da música 'Dark Horse' de Katy Perry com Juicy J.",
    url: "0KSOMA3QBU0", 
    likes: 3,
  },
];

let videoAtual = null;

const comentariosSimulados = {
  1: [
    { autor: "João", texto: "Muito bom!", data: new Date().toISOString() },
  ],
  2: [],
};

document.addEventListener("DOMContentLoaded", () => {
  popularListaVideos(videosSimulados);
  selecionarVideo(videosSimulados[0]);

  document.getElementById("btnLike").addEventListener("click", curtirVideo);
  document.getElementById("commentForm").addEventListener("submit", enviarComentario);
  document.getElementById("btnEditar").addEventListener("click", abrirModalEditar);

  criarModalEditar();
});

function popularListaVideos(videos) {
  const lista = document.getElementById("videoList");
  lista.innerHTML = "";

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.style.cursor = "pointer";
    card.innerHTML = `
      <img src="https://img.youtube.com/vi/${video.url}/hqdefault.jpg" alt="Thumbnail" width="160" />
      <h3>${video.titulo}</h3>
      <small>${video.nomeCanal} • ${video.ano}</small>
    `;
    card.onclick = () => selecionarVideo(video);
    lista.appendChild(card);
  });
}

function selecionarVideo(video) {
  videoAtual = video;

  document.getElementById("videoFrame").src = `https://www.youtube.com/embed/${video.url}`;
  document.getElementById("videoTitulo").textContent = video.titulo;
  document.getElementById("videoCanal").querySelector("span").textContent = video.nomeCanal;
  document.getElementById("videoDescricao").textContent = video.descricao;
  document.getElementById("likeCount").textContent = video.likes;

  carregarComentarios(video.id);
}

function curtirVideo() {
  if (!videoAtual) return;
  videoAtual.likes++;
  document.getElementById("likeCount").textContent = videoAtual.likes;
}

function carregarComentarios(videoId) {
  const lista = document.getElementById("commentList");
  lista.innerHTML = "";

  const comentarios = comentariosSimulados[videoId] || [];

  if (comentarios.length === 0) {
    lista.innerHTML = `<p>Nenhum comentário ainda.</p>`;
    return;
  }

  comentarios.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
      <div class="meta"><strong>${c.autor}</strong> - ${new Date(c.data).toLocaleString()}</div>
      <div class="texto">${c.texto}</div>
      <hr/>
    `;
    lista.appendChild(div);
  });
}

function enviarComentario(event) {
  event.preventDefault();
  if (!videoAtual) {
    alert("Selecione um vídeo antes de comentar.");
    return;
  }

  const autor = document.getElementById("autorComentario").value.trim();
  const texto = document.getElementById("textoComentario").value.trim();

  if (!autor || !texto) {
    alert("Preencha nome e comentário.");
    return;
  }

  const novoComentario = {
    autor,
    texto,
    data: new Date().toISOString(),
  };

  if (!comentariosSimulados[videoAtual.id]) {
    comentariosSimulados[videoAtual.id] = [];
  }
  comentariosSimulados[videoAtual.id].push(novoComentario);

  document.getElementById("commentForm").reset();
  carregarComentarios(videoAtual.id);
}



function criarModalEditar() {
  const modalHTML = `
  <div id="modalEditar" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background: rgba(0,0,0,0.6); justify-content:center; align-items:center;">
    <div style="background:#fff; padding:20px; border-radius:8px; max-width:400px; width:90%;">
      <h2>Editar vídeo</h2>
      <label>
        Título:<br />
        <input type="text" id="inputEditarTitulo" style="width:100%;" />
      </label><br /><br />
      <label>
        Descrição:<br />
        <textarea id="inputEditarDescricao" style="width:100%;" rows="5"></textarea>
      </label><br /><br />
      <button id="salvarEdicao">Salvar</button>
      <button id="cancelarEdicao">Cancelar</button>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  document.getElementById("salvarEdicao").addEventListener("click", salvarEdicao);
  document.getElementById("cancelarEdicao").addEventListener("click", fecharModalEditar);
}

function abrirModalEditar() {
  if (!videoAtual) return;
  document.getElementById("inputEditarTitulo").value = videoAtual.titulo;
  document.getElementById("inputEditarDescricao").value = videoAtual.descricao;
  document.getElementById("modalEditar").style.display = "flex";
}

function fecharModalEditar() {
  document.getElementById("modalEditar").style.display = "none";
}

function salvarEdicao() {
  const novoTitulo = document.getElementById("inputEditarTitulo").value.trim();
  const novaDescricao = document.getElementById("inputEditarDescricao").value.trim();

  if (!novoTitulo) {
    alert("O título não pode ficar vazio.");
    return;
  }

  videoAtual.titulo = novoTitulo;
  videoAtual.descricao = novaDescricao;


  selecionarVideo(videoAtual);
  popularListaVideos(videosSimulados);

  fecharModalEditar();
}

