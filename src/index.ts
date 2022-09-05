import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const titleInput = document.querySelector<HTMLInputElement>('#new-task-title');


let toDoArray: any[] = [];

form?.addEventListener("submit", e => {
  e.preventDefault();
  if (titleInput?.value == null) return;

  type taskObj = {
     taskTitle: string,
     completed: boolean,
     created_at: any
  }
  const task: taskObj = {
     taskTitle: titleInput.value,
     completed: false,
     created_at: new Date() 
   }

  addListItem(task)
  console.log(task.created_at)
  
})

function addListItem(newTask: {taskTitle: string, completed: boolean, created_at: any}):void {
  let lineItem:HTMLLIElement = <HTMLLIElement>document.createElement('li');
  let label:HTMLLabelElement = <HTMLLabelElement>document.createElement('label');
  let checkbox:HTMLInputElement = <HTMLInputElement>document.createElement('input');
  checkbox.type = 'checkbox';
  let deleteBtn:HTMLButtonElement=<HTMLButtonElement>document.createElement('button')
  deleteBtn.textContent = "delete"

  function deleteLineItem(): void {
    list?.removeChild(lineItem);
   }

  deleteBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    deleteLineItem()
  }) 

  label.append(checkbox, newTask.taskTitle)
  lineItem.append(label);
  lineItem.append(deleteBtn)
  list?.append(lineItem);
}
