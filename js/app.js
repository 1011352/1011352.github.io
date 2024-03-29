// const video = document.getElementById("webcam");
const label = document.getElementById("label");
const score = document.getElementById("score");
const featureExtractor = ml5.featureExtractor('MobileNet',{numLabels : 3}, modelLoaded)



const image = document.getElementById('output')
const fileButton = document.querySelector("#file")



let scores = 0
let synth = window.speechSynthesis
function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])

})

image.addEventListener('load', () => userImageUploaded())



// const labelOneBtn = document.querySelector("#labelOne");
// const labelTwoBtn = document.querySelector("#labelTwo");
// const labelThreeBtn = document.querySelector("#labelThree");
// const trainbtn = document.querySelector("#train");
// const savebtn = document.querySelector("#save");

// labelOneBtn.addEventListener("click", () => addCatImage());
// labelTwoBtn.addEventListener("click", () => addDogImage());
// labelThreeBtn.addEventListener("click", () => addBirdImage());
// trainbtn.addEventListener("click", () => train());
// savebtn.addEventListener("click", () => save());

// if (navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//             video.srcObject = stream;
//         })
//         .catch((err) => {
//             console.log("Something went wrong!");
//         });
// }

label.innerText = "Loading Model";

function modelLoaded() {
    console.log('Model Loaded!')
    classifier = featureExtractor.classification(image, videoReady)
    classifier.load('model.json', customModelReady)
}

function customModelReady(){
    console.log("Custom Model Is Ready")
    label.innerText = "Model is Ready"
}
function videoReady(){
    console.log("the webcam is ready")
}







// function addCatImage() {
//     classifier.addImage(video, 'Cat', ()=>{
//         console.log("added image to model!")
//     })
// }

// function addDogImage() {
//     classifier.addImage(video, 'Dog', ()=>{
//         console.log("added image to model!")
//     })
// }

// function addBirdImage() {
//     classifier.addImage(video, 'Bird', ()=>{
//         console.log("added image to model!")
//     })
// }


// function train(){
//     console.log("start training...")
//     classifier.train((lossValue) => {
//         console.log('Loss is', lossValue)
//         if(lossValue == null) console.log("Finished training")
//     })
// }

// function save() {
//     classifier.save();
// }


function challenge() {
    console.log("Challenge time")
    challenge1 = "dog"
}

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
    intervalId = setInterval(()=>{
        classifier.classify(image, (err, result) => {
            if (err) console.log(err)
            console.log(result)
            label.innerText = `This is probably a ${result[0].label} (I'm ${Math.round(result[0].confidence * 100)}% confident) or a ${result[1].label} (I'm ${Math.round(result[1].confidence * 100)}% confident)`;
            speak(`This is probably a ${result[0].label} (I'm ${Math.round(result[0].confidence * 100)}% confident) or a ${result[1].label} (I'm ${Math.round(result[1].confidence * 100)}% confident)`)
            scores ++
            score.innerText = "Score = " + scores
            console.log(scores)
            
        })
    }, 20)
    setTimeout(() => {
        clearInterval(intervalId);
      }, 21)
}   

/*
const URL = "./my_model/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    } 
    */      
