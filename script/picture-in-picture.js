const videoElement = document.getElementById('video');
const button = document.getElementById('button');

async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        } 
    } catch(error){
        // Error
        console.log("Error :", error)
    }
}

button.addEventListener('click', async () => {
    //disable btn
    button.disabled = true;

    //start p in p

    await videoElement.requestPictureInPicture();

    // reset btn

    button.disabled = false;
});

selectMediaStream();