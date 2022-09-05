import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const titleInput = document.querySelector<HTMLInputElement>('#new-task-title');
const dateInput = document.querySelector<HTMLInputElement>('#new-task-due-date')

//let toDoArray: any[] = [];

form?.addEventListener("submit", e => {
  e.preventDefault();

  if (titleInput?.value == null) return;

  let date:any = new Date();
  let dateArr: string[] =  `${date}`.split(' ', 4);

  let dateValue = dateInput?.value
  let utc = new Date(`${dateValue}`).toUTCString();

  const dueDateTime = new Date(`${dateValue}`).getTime();
  const newUtc: string[] = `${utc}`.split(' ', 4)

  const currentDateTimeString = new Date()
  const currentDateTime = currentDateTimeString.getTime();

  type taskObj = {
     taskTitle: string,
     completed: boolean,
     dueDate: string,
     created_at: string,
     urgent: boolean
  }
  const task: taskObj = {
     taskTitle: titleInput.value,
     completed: false,
     dueDate: newUtc.join(' '),
     created_at: dateArr.join(' '),
     urgent: determineUrgency(dueDateTime, currentDateTime)
   }

  addListItem(task)
  
})

function determineUrgency(dueTime:number, currentTime:number): boolean {
  if((dueTime - currentTime) <= 101847843) {
    return true;
  } else {
    return false;
  }
}

function addListItem(newTask: {taskTitle: string, completed: boolean, dueDate: string, created_at: string, urgent: boolean}):void {

  console.log('urgent', newTask.urgent)
  let lineItem:HTMLLIElement = <HTMLLIElement>document.createElement('li');
  let label:HTMLLabelElement = <HTMLLabelElement>document.createElement('label');
  let checkbox:HTMLInputElement = <HTMLInputElement>document.createElement('input');
  checkbox.type = 'checkbox';

  let deleteBtn:HTMLButtonElement=<HTMLButtonElement>document.createElement('button')
  deleteBtn.textContent = "delete"

  let createdAtP:HTMLParagraphElement = <HTMLParagraphElement>document.createElement('p');
  createdAtP.textContent = `Created on: ${newTask.created_at}`

  let dueDateP:HTMLParagraphElement = <HTMLParagraphElement>document.createElement('p');
  dueDateP.textContent = `Due by: ${newTask.dueDate}`;
  newTask.urgent ? dueDateP.style.setProperty("color", "red") : dueDateP.style.setProperty("color", "black");

  checkbox.addEventListener('change', (e)=> {
    e.preventDefault();
    newTask.completed = !newTask.completed;
    newTask.completed ? label.style.setProperty("text-decoration", "line-through") : label.style.setProperty("text-decoration", "none");
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
  lineItem.append(createdAtP);
  lineItem.append(dueDateP);
  lineItem.append(deleteBtn);
  lineItem.style.setProperty("border", "1px solid rgb(36, 217, 245)");
  lineItem.style.setProperty("border-radius", "7px");
  lineItem.style.setProperty("margin",".5em auto 0 auto");
  lineItem.style.setProperty("width", "30vw");
  lineItem.style.setProperty("padding", ".3em"); //can we loop over these?
  list?.append(lineItem);
}
