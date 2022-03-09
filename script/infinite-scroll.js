const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = 'TP7DYwYDQI0bndyirqR_ojRo4WUEpiwMfnoTUxfLhRk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos(){
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray)
    } catch (error){
        // catch error
    }
}

//load more photo when scoll
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
        getPhotos();
    }
});


getPhotos();