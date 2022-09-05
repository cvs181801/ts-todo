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

  let date:any = new Date();
  let dateArr: string[] =  `${date}`.split(' ', 4);

  type taskObj = {
     taskTitle: string,
     completed: boolean,
     created_at: string
  }
  const task: taskObj = {
     taskTitle: titleInput.value,
     completed: false,
     created_at: dateArr.join(' ')
   }

  addListItem(task)
  
})

function addListItem(newTask: {taskTitle: string, completed: boolean, created_at: string}):void {
  let lineItem:HTMLLIElement = <HTMLLIElement>document.createElement('li');
  let label:HTMLLabelElement = <HTMLLabelElement>document.createElement('label');
  let checkbox:HTMLInputElement = <HTMLInputElement>document.createElement('input');
  checkbox.type = 'checkbox';

  let deleteBtn:HTMLButtonElement=<HTMLButtonElement>document.createElement('button')
  deleteBtn.textContent = "delete"

  let paragraph:HTMLParagraphElement = <HTMLParagraphElement>document.createElement('p');
  paragraph.textContent = `Created on: ${newTask.created_at}`

  checkbox.addEventListener('change', (e)=> {
    e.preventDefault();
    label.style.setProperty("text-decoration", "line-through");
  })

  function deleteLineItem(): void {
    list?.removeChild(lineItem);
   }

  deleteBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    deleteLineItem()
  }) 

  label.append(checkbox, newTask.taskTitle)
  lineItem.append(label);
  lineItem.append(paragraph);
  lineItem.append(deleteBtn);
  lineItem.style.setProperty("border", "1px solid rgb(122, 226, 109)");
  lineItem.style.setProperty("border-radius", "7px");
  lineItem.style.setProperty("margin",".5em auto 0 auto");
  lineItem.style.setProperty("width", "30vw");
  lineItem.style.setProperty("padding", ".3em");
  list?.append(lineItem);
}
