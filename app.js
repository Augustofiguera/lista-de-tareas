document.addEventListener("DOMContentLoaded", function() {
  const input = document.querySelector('.input');
  const button = document.querySelector('.boton_mas');
  const list = document.querySelector('#lista');
  const form = document.querySelector('#form');
  const totalElement = document.querySelector('.totales');
  const incompletasElement = document.querySelector('.incompleta');
  const completasElement = document.querySelector('.completas');

  let taskCompleted = 0;
  let taskIncompleted = 0;

  function actualizarContador() {
      totalElement.innerHTML = taskCompleted + taskIncompleted;
      incompletasElement.innerHTML = taskIncompleted;
      completasElement.innerHTML = taskCompleted;
  }

  form.addEventListener('submit', e =>{
      e.preventDefault();
      if (input.value != '') {
          const li = document.createElement('li');
          li.classList.add('task');
          list.appendChild(li);
          li.innerHTML = `
              <button class="botonx1" >&#10006</button>
              <p class="text">${input.value}</p>
              <button class="botonsi1 check-edit ">&#10003</button>
          `;
          input.value = '';
          localStorage.setItem('listaTareas', list.innerHTML);
          taskIncompleted++;
          actualizarContador();
      };
  });

  list.addEventListener('click', e =>{
      if (e.target.closest('.botonx1')) {
          const li = e.target.closest('li');
          if (li.classList.contains('selected')){
              taskCompleted--;
          }else{
              taskIncompleted--;
          }
          li.remove();
          actualizarContador();
          localStorage.setItem('listaTareas', list.innerHTML);
      }
      if (e.target.closest('.botonsi1')) {
          const checkEdit = e.target.closest('.botonsi1')
          const li = e.target.closest('li');
          const editText = li.children[1];
          if (checkEdit.classList.contains('checked')) {
              checkEdit.classList.remove('checked');
              checkEdit.classList.add('check-edit');
              li.classList.remove('selected');
              li.classList.add('task');
              editText.classList.add('text');
              editText.classList.remove('text-checked');
              taskIncompleted++;
              taskCompleted--;
              localStorage.setItem('listaTareas', list.innerHTML);
          }else{
              checkEdit.classList.add('checked');
              checkEdit.classList.remove('check-edit');
              li.classList.add('selected');
              li.classList.remove('task');
              editText.classList.remove('text');
              editText.classList.add('text-checked');
              taskCompleted++;
              taskIncompleted--;
              localStorage.setItem('listaTareas', list.innerHTML);
          };
          actualizarContador();
      };
  });

  // Cargar tareas almacenadas
  (()=>{
      if (localStorage.length !== 0) {
          const localList = localStorage.getItem('listaTareas');
          list.innerHTML = localList;

          const splitted = localList.split("<li");
          const selected = splitted.filter(part => part.includes("selected"));
          const notSelected = splitted.filter(part => part.includes("task"));
          taskCompleted = selected.length;
          taskIncompleted = notSelected.length;
          actualizarContador();
      }
  })();
});