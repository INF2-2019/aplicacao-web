function colocarCampi() {
    const select1 = document.querySelector('#campus-inserir');
    const select2 = document.querySelector('#campus-atualizar');
      for(let campus of campi) {
  	   const option1 = document.createElement("option");
       option1.innerHTML = campus.nome;
       const option2 = document.createElement("option");
       option2.innerHTML = campus.nome;
       option1.setAttribute("value", campus.id)
       option2.setAttribute("value", campus.id)
       select1.appendChild(option1);
       select2.appendChild(option2);
       var elems = document.querySelectorAll('select');
       var instances = M.FormSelect.init(elems, {});
     }
}
function resetarSelects() {
  const select1 = document.querySelector('#campus-inserir');
  const select2 = document.querySelector('#campus-atualizar');

  select1.value = -1;
  select2.value = -1;

  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
}
function resetarInputs() {
  const input1 = document.querySelector('#nome-inserir')
  const input2 = document.querySelector('#nome-atualizar')
  input1.value = '';
  input2.value = '';
}
