const dom = {
  new: document.getElementById('new--task'),
  add: document.getElementById('add'),
  tasks: document.getElementById('tasks'),
  count: document.getElementById('count')
}

const tasks =[];
//*добавляем задачу отслеживаем по кнопку Добавить задачу

dom.add.onclick = () =>{
  const newTaskText = dom.new.value
  if(newTaskText && isNotHaveTask(newTaskText, tasks)){
    addTask(newTaskText , tasks);
    dom.new.value = "";
    taskRendre(tasks)
  }
}

//Функция добавления задачи

function addTask(text, list){
  const timestamp = Date.now()
  const task = {
    id: timestamp,
    text: text,
    isCoomplete: false,
  }
  list.push(task)
}

//Функция проверка существования в массиве задач задач

function isNotHaveTask(text,list){

  let isNotHave = true
  
  list.forEach((task) => {
    if (task.text === text){
      alert('задача уже существует')
      isNotHave = false
    }
  })
  return isNotHave
}

//Функция вывода задач
function taskRendre(list){
  let htmlList = ""
  list.forEach((task) => {
    const cls = task.isCoomplete ? 'todo__task todo__task_complete': 'todo__task'
    const checked = task.isCoomplete ? 'checked' : ''
    const  taskHtml = `
    <div id="${task.id}" class="${cls}">
          <label class="todo__checkbox">
            <input type="checkbox" ${checked}>
            <div class ="todo__checkbox-div" ></div>
          </label>
          <div class="todo__task-text">${task.text}</div>
          <div class="todo__task-del">-</div>
        </div>
        `
        htmlList = htmlList + taskHtml
  })

  dom.tasks.innerHTML = htmlList;
  
}


// Отслеживаем клик по чек-боксу задачи 
dom.tasks.onclick = (event) => {
  const target =event.target
  const isCheakboxEl = target.classList.contains('todo__checkbox-div');
  const isDeleteEl = target.classList.contains('todo__task-del');
  if (isCheakboxEl){
    const task = target.parentElement.parentElement
    const taskID = task.getAttribute('id')
    changeTaskStatus(taskID, tasks)
    taskRendre(tasks)
  }
  if (isDeleteEl) {
    const task = target.parentElement
    const taskID = task.getAttribute('id')
    deleteTask(taskID, tasks)
    taskRendre(tasks)
    console.log(tasks.length, tasks)
  }
}

//Функция изменения статуса задачи
function changeTaskStatus( id, list){
  list.forEach((task) => {
    if (task.id == id) {
      task.isCoomplete = !task.isCoomplete
    }
  })
}

//Функция удаление задач
function deleteTask(id, list){
  list.forEach((task, idx) => {
    if (task.id == id){
      list.splice(idx, 1)
    }
  })
 
}

