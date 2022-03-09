const wordContainer = document.getElementById('word-container');
const wordText = document.getElementById('word');
const wordType = document.getElementById('type');
const twitterBtn = document.getElementById('twitter');
const newWordBtn = document.getElementById('new-word');
const wordImg = document.getElementById('word-img');
const loader = document.getElementById('loader');


let apiWord = [];

function showLoadingSpinner(){
    loader.hidden = false;
    wordContainer.hidden = true;
}

//hide load
function removeLoadingSpinner(){
    if(!loader.hidden){
        wordContainer.hidden = false;
        loader.hidden = true;
    }
}

function newWord(){
    showLoadingSpinner()
    //random
    const word =  apiWord[Math.floor(Math.random() * apiWord.length)];

    if(!word.type){
        wordType.textContent = "Unknown";
    } else{
        wordType.textContent = word.type;
    }

    if(word.word.length > 50){
        wordText.classList.add('long-word');
    } else {
        wordText.classList.remove('long-word');
    }

    wordText.textContent = word.word;
    wordImg.src = word.image;
    removeLoadingSpinner();
}

async function getWord(){
    showLoadingSpinner()
    const apiUrl = 'https://572250lm2e.execute-api.us-east-1.amazonaws.com/dev/';
    try {
        const responce = await fetch(apiUrl);
        apiWord = await responce.json();
        newWord();
    } catch (error){
        throw new Error('opps')
        console.log(error)
        getWord();
    }
}

// Tweet Word
function tweetWord(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${wordImg.src} - ${wordText.textContent} - ${wordType.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
newWordBtn.addEventListener('click',newWord);
twitterBtn.addEventListener('click',tweetWord);

// on load

getWord();
