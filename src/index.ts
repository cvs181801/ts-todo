

import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('#new-task-form') as HTMLFormElement;
const titleInput = document.querySelector<HTMLInputElement>('#new-task-title');

//create a way for the add button to add text to the array of to do items

let toDoArray: string[] = [];

form?.addEventListener("submit", e => {
  e.preventDefault();
  console.log(e)
  if (titleInput?.value == null) return;

  //toDoArray.push(titleInput.value);
  console.log(titleInput.value)
})

//loop through array and render them all to the screen.  each should have 1. a checkbox 2. a delete button