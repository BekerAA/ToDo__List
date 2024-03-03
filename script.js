const dom = {
  new: document.getElementById('new--task'),
  add: document.getElementById('add'),
  tasks: document.getElementById('tasks'),
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
    const  taskHtml = `
    <div id="${task.id}" class="${cls}">
          <label class="todo__checkbox" checked= "${task.isCoomplete}">
            <input type="checkbox">
            <div></div>
          </label>
          <div class="todo__task-text">${task.text}</div>
          <div class="todo__task-del">-</div>
        </div>
        `
        htmlList = htmlList + taskHtml
  })

  dom.tasks.innerHTML = htmlList
}