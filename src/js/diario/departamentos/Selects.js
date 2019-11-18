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

function resetarSelectsAdd() {
  const select = document.querySelector('#campus-inserir');
  select.value = -1;

  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
}

function resetarInputsAdd() {
  const input = document.querySelector('#nome-inserir')
  input.value = '';
}

function resetarSelectsEdit(value = '') {

  const select = document.querySelector('#campus-atualizar');
  select.value = value;

  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
}

function resetarInputsEdit(value = '') {
  const input = document.querySelector('#nome-atualizar')
  input.value = value
  M.updateTextFields();;
}
