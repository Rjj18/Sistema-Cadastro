(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_games')) ?? [];
}

function setLocalStorage(bd_games) {
  localStorage.setItem('bd_games', JSON.stringify(bd_games));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_games = getLocalStorage();
  let index = 1;
  let posicaoIndex = 0; // Alterei o index para 1 para que lista não comece no 0. Por falta de imaginação para pensar outra solução optei por criar uma nova variável para puxar a posição do item no array.
  for (game of bd_games) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${game.titulo}</td>
        <td>${game.plataforma}</td>
        <td>${game.ano}</td>
        <td>${game.genero}</td>
        <td>${game.horas}</td>
        <td>${game.multi}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${posicaoIndex})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
    posicaoIndex++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const game = {
    titulo: document.getElementById('titulo').value,
    plataforma: document.getElementById('plataforma').value,
    ano: document.getElementById('ano').value,
    genero: document.getElementById('genero').value,
    horas: document.getElementById('horas').value,
    multi: document.getElementById('multi').value
  }
  const bd_games = getLocalStorage();
  bd_games.push(game);
  setLocalStorage(bd_games);
  atualizarTabela();
}

function excluir(posicaoLista) { // Adaptação da função excluir (5 pontos)
  const bd_games = getLocalStorage();
  bd_games.splice(posicaoLista, 1);
  setLocalStorage(bd_games);
  atualizarTabela();
}

function validarTitulo() { // Adaptação da função validar (10 pontos)
  const bd_games = getLocalStorage();
  for (game of bd_games) {
    if (titulo.value == game.titulo) {
      titulo.setCustomValidity("Este game já consta na lista!");
      feedbackTitulo.innerText = "Este game já consta na lista!";
      return false;
    } else {
      titulo.setCustomValidity("");
      feedbackTitulo.innerText = "Informe o Título corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const titulo = document.getElementById("titulo");
const feedbackTitulo = document.getElementById("feedbackTitulo");
ano.addEventListener('input', validarTitulo);