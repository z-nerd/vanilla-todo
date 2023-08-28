import Result from './result'
import './style.css'
import Todo from './todo'
// import InitDebug from './debug'


const app = document.getElementById("app") as HTMLDivElement
// const needDebug = true
// const { dLog } = InitDebug(app, needDebug)
const todo = new Todo()

let title = ""
let description = ""


const TaskTitleEL = document.createElement('input') as HTMLInputElement
TaskTitleEL.setAttribute('type', 'text')
TaskTitleEL.setAttribute('class', 'todo-input')
TaskTitleEL.setAttribute('placeholder', "title")
TaskTitleEL.addEventListener('input', (e) => {
  title = (e.currentTarget as any).value || ""
}, false)
app.appendChild(TaskTitleEL)


const TaskDescriptionEL = document.createElement('input') as HTMLInputElement
TaskDescriptionEL.setAttribute('type', 'text')
TaskDescriptionEL.setAttribute('class', 'todo-input')
TaskDescriptionEL.setAttribute('placeholder', "description")
TaskDescriptionEL.addEventListener('input', (e) => {
  description = (e.currentTarget as any).value || ""
}, false)
app.appendChild(TaskDescriptionEL)


const AddEl = document.createElement('button') as HTMLInputElement
AddEl.setAttribute('class', 'todo-add')
AddEl.textContent = "add"
app.appendChild(AddEl)
const { ShowList } = Result(app)


ShowList(todo)


AddEl.addEventListener('click', (e) => {
  todo.add(title, description)
  ShowList(todo)

  title = ""
  TaskTitleEL.value = ""

  description = ""
  TaskDescriptionEL.value = ""
})
