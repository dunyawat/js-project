const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24 ;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

// Populate Countdown
const updateDOM = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance/day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    // console.log(days,hours,minutes,seconds);

    //Hide Input
    inputContainer.hidden = true;

    // if the countdonw end , show complete
    if (distance < 0) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
        completeEl.hidden = false
    }else{
        // show countdown
        //Populate Countdown
        countdownElTitle.textContent = `${countdownTitle}`
        timeElements[0].textContent = `${days}`
        timeElements[1].textContent = `${hours}`
        timeElements[2].textContent = `${minutes}`
        timeElements[3].textContent = `${seconds}`
        completeEl.hidden = true;

        //Show Countdown
        countdownEl.hidden = false;
    }
  }, second);
}

// Take Values from Form Input
const updateCountdown = (e) => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    // console.log(countdownTitle,countdownDate);
    
    //Check valid date
    if(countdownDate === ''){
        alert('Please select a date')
    }else{
        // Get number date , update Dom
        countdownValue = new Date(countdownDate).getTime();
        // console.log('countdown value:',countdownValue)
        updateDOM();
    }
}

//Reset All Values

const reset = () => {
    //Hide Countdonw. Show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    //Stop the countdown
    clearInterval(countdownActive);
    //Reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

const restorePreviousCountdown = () => {
    //Get countdown from localStorege
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }

}

//Event Listeners
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset)

//On load Check localstorage
restorePreviousCountdown();