'use strict';

// Execution is from left to right.
// the querySelector is used to select the element with class as message and textContent is used to get the content of the element which is selected.
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number!';

// document.querySelector('.score').textContent = '09 ';
// console.log(document.querySelector('.highscore').textContent);
// document.querySelector('.number').textContent = 13;
// console.log(document.querySelector('.guess').value);

/*
  * Steps followed in developing the game
    * Step 1: 
      * Adding the event listener to the check button on the UI. On the click of the button, we retrieve the the value given by the user to the input box.
    * Step 2: 
      * Checking whether any value is provided or not -> if not and user just clicked the check button -> On UI we reflect that '⛔️ Enter the number '
    * Step 3: 
      * Generating the random number [ aka secret number ] -> using Math.random(). the generated number is btw 0 to 20.
    * Step 4: 
     *  Providing the case condition: checking whether the generated random number is less than or equal to or more than the guessed value -> On UI we reflect respective O/P.
    * Step 5: 
      *  Each time user guess the number && guessed Number !== secretNumber -> the score shall decrease by 1. for this we created a variable let and in the condition we used this variable to be represented on the UI [ Along with decrement ]
    * Step 6:
      * Add the functionality of stoping the game.
      * This happens when the user has tried the game 20 times -> as a result score become zero. In this scenario we disabled the click button and on the UI we, refelect that game is lost
    * Step 7:
      * Remove the random number on the UI with question mark 
    * Step 8:
      * Adding the functionality to play the game again -> for this we have a button on the UI. 
      * Methodology
          * select the element with the 'again' class and attach a event listener/handler
          * In the handler function, restore the initial values of the score and secret number variables
          * Restore the inital conditions of the message, number, score and guess input field
          * also restore the original background color (#222) and number width (15rem)
    * Step 9: Implementing the functionality of highScore:
        *  HighScore => minumum number of guess user take to guess the number. irrespective of the number of game he plays

*/

// * Implementing the functionality for the game

// ! Defining the Score value -> which is 20
let score = 20;
document.querySelector('.score').textContent = score;

//! HighScore variable
let highScore = 0;

// !  STEP 2: Defining the secret number
// the Math.trunc() -> is used to remove the noise from the random number generator. && + 1 is done to include 20 also becoz in Math.random() o/p is always btw 0 to 1 where 1 is not included.
let secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = '?';

// ! STEP 1: adding the event listner to the button on the UI
// ! STEP 3: Adding the cases to the event listner
document.querySelector('.check').addEventListener('click', () => {
  const guessNumber = Number(document.querySelector('.guess').value);
  console.log(typeof guessNumber);

  // Adding the corner cases ->
  // case 1: if there is no guess number and user clicked on the button
  if (!guessNumber) {
    document.querySelector('.message').textContent = '⛔️ Enter the number ';
  }
  // case 2: if the guess number == the secret number'
  else if (guessNumber === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
    // Displaying the secret number:
    document.querySelector('.number').textContent = secretNumber;
    // document.querySelector('body').style = 'background-color: green';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  }
  // if the guess number is too high
  else if (guessNumber > secretNumber) {
    if (score > 0) {
      document.querySelector('.message').textContent = '📈 Too High!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '�� You lost the game!';
      document.querySelector('.check').disabled = true;
      document.querySelector('.score').textContent = 0;
    }
  }
  // if the guess number is too low
  else if (guessNumber < secretNumber) {
    if (score > 0) {
      document.querySelector('.message').textContent = '📉 Too Low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '�� You lost the game!';
      document.querySelector('.score').textContent = 0;
      document.querySelector('.check').disabled = true;
    }
  }
});

//! Functionality for restarting the game

document.querySelector('.again').addEventListener('click', () => {
  // * 1. restore the initial values of the score
  score = 20;
  document.querySelector('.score').textContent = score;

  // * 2. restore the inital conditions of the message, number, score and guess input field
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  document.querySelector('.check').disabled = false;

  // * 3. restore the original background color (#222) and number width (15rem)
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
