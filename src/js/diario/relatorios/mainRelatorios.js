let selects = document.querySelectorAll("select");
for(let i = 0; i < selects.length; i++){
  M.FormSelect.init(selects[i]);
}
let desc = document.querySelector('.description')
const DESCS = ["Histórico escolar por aluno e por turma",
"Certificados, se aprovado em todas as disciplinas",
"Relação de professores por seleção de cursos, listando suas respectivas disciplinas e horas de trabalho",
"Relação por seleção de aluno, listando as notas, nas respectivas disciplinas, por etapa",
"Relação de conteúdos, por disciplina e por etapa"]

let selectsDiv = document.querySelector('.selectsDiv')
let alunosDiv = document.querySelector('.alunosDiv')

selects[0].addEventListener("change", () => {
  desc.innerHTML = DESCS[selects[0].value]
  if(selects[0].value == 4){
    selectsDiv.classList.remove('oculto')
    selectDisciplinas()
    selectEtapas()
  }
  else{
    selectsDiv.classList.add('oculto')
  }
  if(selects[0].value == 3){
    alunosDiv.classList.remove('oculto')
    selectAlunos()
  }
  else{
    alunosDiv.classList.add('oculto')
  }
})

function selectDisciplinas(){
  fetch("http://localhost:8080/app/diario/disciplinas/consultar")
    .then(resposta => {
      return resposta.text();
    })
    .then(text => {
      let parser = new DOMParser();
      let xml = parser.parseFromString(text, "text/xml");
      let nomes = xml.querySelectorAll("nome");
      let opt
      if(nomes == null){
        opt = document.createElement('option')
        opt.disabled = true
        opt.selected = true
        opt.innerHTML = "Não há disciplinas"
        selects[1].appendChild(opt)
      }
      else{
        opt = document.createElement('option')
        opt.innerHTML = "Escolha uma disciplina"
        selects[1].appendChild(opt)
        for(let i = 0; i < nomes.length; i++){
          opt = document.createElement('option')
          opt.value = nomes[i].textContent
          opt.innerHTML = nomes[i].textContent
          selects[1].appendChild(opt)
        }
      }
      M.FormSelect.init(selects[1]);
    });
}

function selectEtapas(){
  fetch("http://localhost:8080/app/diario/etapas/consultar")
    .then(resposta => {
      return resposta.text();
    })
    .then(text => {
      let parser = new DOMParser();
      let xml = parser.parseFromString(text, "text/xml");
      let ids = xml.querySelectorAll("id");
      let opt
      if(ids == null){
        opt = document.createElement('option')
        opt.disabled = true
        opt.selected = true
        opt.innerHTML = "Não há etapas"
        selects[2].appendChild(opt)
      }
      else{
        opt = document.createElement('option')
        opt.innerHTML = "Escolha uma etapa"
        selects[2].appendChild(opt)
        for(let i = 0; i < ids.length; i++){
          opt = document.createElement('option')
          opt.value = ids[i].textContent
          opt.innerHTML = ids[i].textContent
          selects[2].appendChild(opt)
        }
      }
      M.FormSelect.init(selects[2]);
    });
}

function selectAlunos(){
  fetch("http://localhost:8080/app/diario/alunos/listar")
    .then(resposta => {
      return resposta.text();
    })
    .then(text => {
      let parser = new DOMParser();
      let xml = parser.parseFromString(text, "text/xml");
      let nomes = xml.querySelectorAll("nome");
      let opt
      if(nomes == null){
        opt = document.createElement('option')
        opt.disabled = true
        opt.selected = true
        opt.innerHTML = "Não há alunos"
        selects[3].appendChild(opt)
      }
      else{
        opt = document.createElement('option')
        opt.innerHTML = "Escolha um aluno"
        selects[3].appendChild(opt)
        for(let i = 0; i < nomes.length; i++){
          opt = document.createElement('option')
          opt.value = nomes[i].textContent
          opt.innerHTML = nomes[i].textContent
          selects[3].appendChild(opt)
        }
      }
      M.FormSelect.init(selects[3]);
    });
}
