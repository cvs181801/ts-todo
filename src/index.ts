import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const titleInput = document.querySelector<HTMLInputElement>('#new-task-title');


//create a way for the add button to add text to the array of to do items

let toDoArray: any[] = [];

form?.addEventListener("submit", e => {
  e.preventDefault();
  if (titleInput?.value == null) return;

  type taskObj = {
     taskTitle?: string,
     completed: boolean,
     created_at: any
  }
  const task: taskObj = {
     taskTitle: `${titleInput.value}`,
     completed: false,
     created_at: new Date() 
   }

  addListItem(task)
  
})

//Generics.  Used to create reusable components (in this case a  reusable function)

// function getCoolArray<T>(items: T[]): T[] {
//   return new Array().concat(items)

// }
// let numberArr = getCoolArray<number>([1,3,5,7])
// let stringArr = getCoolArray<string>(["hi","what","is","up"])


//loop through array and render them all to the screen.  each should have 1. a checkbox 2. a delete button



function addListItem(newTask: any):any {
  let lineItem = document.createElement('li');
  let label = document.createElement('label');
  let checkbox = document.createElement('input');
  let deleteBtn:HTMLButtonElement=<HTMLButtonElement>document.createElement('button')
  deleteBtn.textContent = "delete"
  function deleteLineItem(): void {
    list?.removeChild(lineItem);
   }
  deleteBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    deleteLineItem()
  }) 
  checkbox.type = 'checkbox';
  label.append(checkbox, newTask.taskTitle)
  lineItem.append(label);
  lineItem.append(deleteBtn)
  list?.append(lineItem);
}
