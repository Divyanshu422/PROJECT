'use strict';

// * Step 1: Selecting all the elements at the top of the file and storing in the variables

const modal = document.querySelector('.modal'); // . -> dot is used for the class
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');
const openBtns = document.querySelectorAll('.show-modal');

// * sTEP 3: Refactoring the code
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Step 2: Looping over the array -> using for loop
for (let i = 0; i < openBtns.length; i++) {
  openBtns[i].addEventListener('click', openModal);
}

//* adding the event listener to the close button
closeBtn.addEventListener('click', closeModal);

// using the callBack function
overlay.addEventListener('click', () => closeModal());

//!  what is keyboard events:
// they are global events -> becoz they dont happen on the specific element of the html. hence we have to listen the keyboard events on the whole documents
//* for keyboard -> we have 3 events: keydown, keyup and keypress

// applying the keyboard events on document object
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeModal();
});
