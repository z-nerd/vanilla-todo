import Todo from "./todo"
import { formatDate } from "./utility"


const Result = (root: HTMLDivElement) => {
    const TaskListEl = document.createElement('div') as HTMLDivElement
    TaskListEl.setAttribute('class', 'todo-result')
    root.appendChild(TaskListEl)


    const ShowList = (todo: Todo) => {
            while (TaskListEl.firstChild) TaskListEl.firstChild.remove()

            const UlEl = document.createElement('ul') as HTMLUListElement
            TaskListEl.appendChild(UlEl)

            todo.get().map(item => {
                const showDate = item.updateDate ? item.updateDate : item.createDate

                const LiEl = document.createElement('li') as HTMLLIElement
                UlEl.appendChild(LiEl)

                const TextEl = document.createElement('p') as HTMLParagraphElement
                TextEl.textContent = `${item.title}: ${item.description}, ${formatDate(new Date(showDate))}`
                LiEl.appendChild(TextEl)


                const CheckBoxEl = document.createElement('input') as HTMLInputElement
                CheckBoxEl.setAttribute('type', 'checkbox')
                CheckBoxEl.checked = item.status
                CheckBoxEl.addEventListener('input', (e) => {
                    todo.changeStatus(item.id, (e.currentTarget as any).checked)
                    ShowList(todo)
                }, false)
                LiEl.appendChild(CheckBoxEl)


                const RemoveEl = document.createElement('div') as HTMLDivElement
                RemoveEl.setAttribute('class', 'todo-result_remove')
                RemoveEl.textContent = "X"
                RemoveEl.addEventListener('click', () => {
                    todo.remove(item.id)
                    ShowList(todo)
                }, false)
                LiEl.appendChild(RemoveEl)
            })
    }

    return { TaskListEl, ShowList }
}


export default Result