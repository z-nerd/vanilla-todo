import Todo from "./todo"
import { formatDate } from "./utility"


type ShowListType = (todo: Todo) => void

interface IResultOut {
    TaskListEl: HTMLDivElement
    ShowList: ShowListType
}

/**
 * @typedef {IResultOut} ResultOut
 * @property {HTMLDivElement} TaskListEl - The component DOM reference
 * @property {ShowListType} ShowList - The function for showing Task in dom
 */


/**
 * Component for showing tasks result on dom
 * @param {HTMLElement} root - DOM reference for injecting tasks.
 * @returns {ResultOut} - The reference for component
 */
const Result = (root: HTMLElement): IResultOut => {
    // Create div container for holding tasks in dom
    const TaskListEl = document.createElement('div') as HTMLDivElement
    // Add css class for styling 
    TaskListEl.setAttribute('class', 'todo-result')
    // Add container to root DOM reference
    root.appendChild(TaskListEl)


    /**
     * Showing Task in dom.
     * @param {Todo} todo - todo for show.
     */
    const ShowList = (todo: Todo) => {
            // Remove pervious tasks from Dom
            while (TaskListEl.firstChild) TaskListEl.firstChild.remove()

            // Create ul for holding li
            const UlEl = document.createElement('ul') as HTMLUListElement
            // Add ul to task holder container
            TaskListEl.appendChild(UlEl)

            // Loop tasks for print them on DOM 
            todo.get().map(item => {
                // Choose date to show(updateDate/createDate)
                const showDate = item.updateDate ? item.updateDate : item.createDate

                // Create li for showing single task
                const LiEl = document.createElement('li') as HTMLLIElement
                // Add li to ul
                UlEl.appendChild(LiEl)

                // Create p for task detail(title, description, updateDate/createDate)
                const TextEl = document.createElement('p') as HTMLParagraphElement
                // Add text task to p
                TextEl.textContent = `${item.title}: ${item.description}, ${formatDate(new Date(showDate))}`
                // Add p to li
                LiEl.appendChild(TextEl)

                // Create a checkbox for changing todo status
                const CheckBoxEl = document.createElement('input') as HTMLInputElement
                // Set input type to checkbox
                CheckBoxEl.setAttribute('type', 'checkbox')
                // Set checkbox checked by task status(done/undone)
                CheckBoxEl.checked = item.status
                // Add change Listener
                CheckBoxEl.addEventListener('input', (e) => {
                    // Change todo status in checkbox onchange event
                    todo.changeStatus(item.id, (e.currentTarget as any).checked)
                    // Update UI
                    ShowList(todo)
                }, false)
                // Add checkbox to li
                LiEl.appendChild(CheckBoxEl)


                // Create a remove button for eliminate task
                const RemoveEl = document.createElement('div') as HTMLDivElement
                // Add css class
                RemoveEl.setAttribute('class', 'todo-result_remove')
                 // Add Icon
                RemoveEl.textContent = "X"
                // Add click Listener
                RemoveEl.addEventListener('click', () => {
                    // Remove on click Listener
                    todo.remove(item.id)
                    // Update UI
                    ShowList(todo)
                }, false)
                // Add remove button to li
                LiEl.appendChild(RemoveEl)
            })
    }

    return { TaskListEl, ShowList }
}


export default Result