

import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const titleInput = document.querySelector<HTMLInputElement>('#new-task-title');

//create a way for the add button to add text to the array of to do items

let toDoArray: string[] = [];
let checkbox = document.createElement('input')

form?.addEventListener("submit", e => {
  e.preventDefault();
  if (titleInput?.value == null) return;

  // let task = {
  //   taskTitle: titleInput.value,
  //   checkbox: 


  // }

  //toDoArray.push(task);
  
  //console.log(titleInput.value)
  console.log(toDoArray)
})


console.log('hey!')
console.log(list)
console.log(form)
console.log(titleInput)

//loop through array and render them all to the screen.  each should have 1. a checkbox 2. a delete button

// toDoArray.forEach((todo)=>{
//   let toDoItem: string = 
// })