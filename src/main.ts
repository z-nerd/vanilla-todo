import Result from './result'
import './style.css'
import Todo from './todo'


// Get app main div 
const app = document.getElementById("app") as HTMLDivElement
// Get or Create Todo
const todo = new Todo()

// New task title 
let title = ""
// New task description 
let description = ""


// Create text input for geting task title
const TaskTitleEL = document.createElement('input') as HTMLInputElement
// Set input type to text
TaskTitleEL.setAttribute('type', 'text')
// Add css class
TaskTitleEL.setAttribute('class', 'todo-input')
// Add placeholder to text input
TaskTitleEL.setAttribute('placeholder', "title")
// Add onchane event Listener to input
TaskTitleEL.addEventListener('input', (e) => {
  // Set title by input change
  title = (e.currentTarget as any).value || ""
}, false)
// Add element to app(DOM)
app.appendChild(TaskTitleEL)


// Create text input for geting task description
const TaskDescriptionEL = document.createElement('input') as HTMLInputElement
// Set input type to text
TaskDescriptionEL.setAttribute('type', 'text')
// Add css class
TaskDescriptionEL.setAttribute('class', 'todo-input')
// Add placeholder to text input
TaskDescriptionEL.setAttribute('placeholder', "description")
// Add onchane event Listener to input
TaskDescriptionEL.addEventListener('input', (e) => {
  // Set description by input change
  description = (e.currentTarget as any).value || ""
}, false)
// Add element to app(DOM)
app.appendChild(TaskDescriptionEL)


// Create add button for adding task on click
const AddEl = document.createElement('button') as HTMLInputElement
// Add css class
AddEl.setAttribute('class', 'todo-add')
// Button text
AddEl.textContent = "add"
// Add element to app(DOM)
app.appendChild(AddEl)
// Start Result component
const { ShowList } = Result(app)


// Show task on output 
ShowList(todo)


// Add click Listener to Add button
AddEl.addEventListener('click', (e) => {
  // Add task
  todo.add(title, description)
  // Update UI
  ShowList(todo)

  // Reset title
  title = ""
  // Reset title input text
  TaskTitleEL.value = ""

  // Reset description
  description = ""
  // Reset description input text
  TaskDescriptionEL.value = ""
})
