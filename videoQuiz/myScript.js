// Global variables
var playlist;
var quizButton;
var playButton;
var videoDescription;
var descriptionSection;
var video;
var timeStep;
var questionSection;
var stopTimes = [];
var playlistButton;
var scoreQuiz = 0;
var quizAnswers = ["Llama", "Electric", "A fur thread", "No"];
var quizQuestions = ["What kind of animal is this?", "What kind of fence is the second appearing one?", "What made the Llama get electrocuted?", "Is the Llama dead?"];
var quizAlternatives = [["Llama", "Camel", "Horse"], ["Wood", "Electric", "Plastic"], ["A strand of hair", "The air", "A fur thread"], ["No", "Yes", "Maybe"]];

// Array of video items
var playlistItems =[
    {   "videoURL": "https://mainline.i3s.unice.fr/mooc/week2p1/video1.mp4",
        "posterURL": "https://mainline.i3s.unice.fr/mooc/week2p1/caminandes-1.jpg",
        "videoTitle": "Caminandes: Grand Dillama",
        "videoInfo": "By the Blender Foundation",
        "videoDescription": "Caminandes: Episode 2 is an Open Movie produced by Blender Institute in Amsterdam, the Netherlands. You can support the makers and open source projects by purchasing the 8 GB USB card with all the movie data and tutorials.",
        "videoType": "type/mp4",
        "videoID" : "v0"
    },
    {   "videoURL": "https://mainline.i3s.unice.fr/mooc/week2p1/video2.mp4",
        "posterURL": "https://mainline.i3s.unice.fr/mooc/week2p1/caminandes-2.jpg",
        "videoTitle": "Caminandes: Llama Drama",
        "videoInfo": "By the Blender Foundation",
        "videoDescription": "Caminandes is a Creative Commons movie made by Pablo Vazquez, Beorn Leonard, and Francesco Siddi. Music and Sound by Jan Morgenstern.",
        "videoType": "type/mp4",
        "videoID" : "v1"
    },
    {   "videoURL": "https://mainline.i3s.unice.fr/mooc/week2p1/video3.mp4",
        "posterURL": "https://mainline.i3s.unice.fr/mooc/week2p1/big-buck-bunny.jpg",
        "videoTitle": "Big Buck Bunny",
        "videoInfo": "By the Blender Foundation",
        "videoDescription": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.",
        "videoType": "type/mp4",
        "videoID" : "v2"
    },
    {   "videoURL": "https://mainline.i3s.unice.fr/mooc/week2p1/video4.mp4",
        "posterURL": "https://mainline.i3s.unice.fr/mooc/week2p1/sintel.jpg",
        "videoTitle": "Sintel",
        "videoInfo": "By the Blender Foundation",
        "videoDescription": "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.",
        "videoType": "type/mp4",
        "videoID" : "v3"
    },
];

// Guidelines for quiz
var guidelines = "Alright! Let's start. We'll ask you 4 questions about the video at a specific time. Don't worry, the video will pause automatically. We will present you 3 answer options and we will give you immediate feedback about your choice. Click next!";

window.onload = function() {

    // Get video element from DOM
    video = document.querySelector("#video");

    // Get playlist button
    playlistButton = document.querySelector("#pl-button");

    // Get quiz button
    quizButton = document.querySelector(".quiz");

    // Set video up
    video.src = playlistItems[0].videoURL;
    video.id = playlistItems[0].videoID;
    video.poster = playlistItems[0].posterURL;
    video.type = playlistItems[0].videoType;

    videoDescription = document.querySelector("#video-description");
    videoDescription.textContent = playlistItems[0].videoDescription;

    // Set playlist up
    playlist = document.querySelector("#playlist");

    for (let i = 1; i < playlistItems.length; i++) {

        // Create previews
        var image = document.createElement("img");
        image.src = playlistItems[i].posterURL;
        image.id = playlistItems[i].videoID;
        playlist.appendChild(image);

        // Add event listener for changing video
        image.addEventListener('click', function (){

            // Hide quiz button
            quizButton.style.display = "none";
            
            // Get image id
            var j = this.id;

            if (j === "v0") {
                quizButton.style.display = "inline";
            }

            // Get current video ID
            var k = video.id;
            
            // Update video info
            var videoIndex = playlistItems.findIndex(findID, j);
            video.src = playlistItems[videoIndex].videoURL;
            video.poster = playlistItems[videoIndex].posterURL;
            video.type = playlistItems[videoIndex].videoType;
            video.id = playlistItems[videoIndex].videoID;
            videoDescription.textContent = playlistItems[videoIndex].videoDescription;

            // Update playlist
            var imageIndex = playlistItems.findIndex(findID, k);
            this.src = playlistItems[imageIndex].posterURL;
            this.id = playlistItems[imageIndex].videoID;

        });

    }

    // Get control section buttons from DOM
    playButton = document.querySelector("#play-pause");
    var muteButton = document.querySelector("#mute");
    var fullScreenButton = document.querySelector("#full-screen");
  
    // Get control section sliders from DOM
    var seekBar = document.querySelector("#seek-bar");
    var volumeBar = document.querySelector("#volume-bar");
    var previousVolume = 1;

    // Event listener for the play/pause button
    playButton.addEventListener('click', function() {

        if (video.paused == true) {

            // Play the video
            video.play();
        
            // Update the button text to 'Pause'
            playButton.innerHTML = "Pause";

        } else {

            // Pause the video
            video.pause();
        
            // Update the button text to 'Play'
            playButton.innerHTML = "Play";

        }
    });

    // Event listener for the mute button
    muteButton.addEventListener('click', function() {

        if (video.muted == false) {

            // Mute the video
            video.muted = true;
        
            // Update the button text to 'Unmute'
            muteButton.innerHTML = "Unmute";

            // Move range thumb to 0
            previousVolume = volumeBar.value;
            volumeBar.value = 0;

        } else {

            // Unmute the video
            video.muted = false;
        
            // Update the button text to 'Mute'
            muteButton.innerHTML = "Mute";

            // Move range thumb to previous volume value
            volumeBar.value = previousVolume;

        }
    });

    // Event listener for the full-screen button
    fullScreenButton.addEventListener('click', function() {

        if (video.requestFullscreen) {

        video.requestFullscreen();

        } else if (video.mozRequestFullScreen) {

        video.mozRequestFullScreen(); // Firefox

        } else if (video.webkitRequestFullscreen) {

        video.webkitRequestFullscreen(); // Chrome and Safari

        }
    });

    // Event listener for the seek bar
    seekBar.addEventListener('change', function() {

        // Calculate the new time
        var time = video.duration * (seekBar.value / 100);
    
        // Update the video time
        video.currentTime = time;

    });

    // Update the seek bar as the video plays
    video.addEventListener('timeupdate', function() {

        // Calculate the slider value
        var value = (100 / video.duration) * video.currentTime;
    
        // Update the slider value
        seekBar.value = value;

    });

    // Pause the video when the slider handle is being dragged
    seekBar.addEventListener('mousedown', function() {

        video.pause();

    });
    
    // Play the video when the slider handle is dropped
    seekBar.addEventListener('mouseup', function() {

        video.play();

        // Update the button text to 'Pause'
        playButton.innerHTML = "Pause";

    });

    // Event listener for the volume bar
    volumeBar.addEventListener('change', function() {

        // Update the video volume
        video.volume = volumeBar.value;

    });

    // Event listener for the play/pause click on video
    video.addEventListener('click', function() {

        if (video.paused == true) {

            // Play the video
            video.play();
        
            // Update the button text to 'Pause'
            playButton.innerHTML = "Pause";

        } else {

            // Pause the video
            video.pause();
        
            // Update the button text to 'Play'
            playButton.innerHTML = "Play";

        }
    });

    // Event listener for end of video
    video.addEventListener('ended', function() {
        
        video.load();

        // Update the button text to 'Play'
        playButton.innerHTML = "Play";

        //
          
    });

    // Get description section
    descriptionSection = document.querySelector(".description");

    // When durationchange happens in video calculate stop times
    video.addEventListener('durationchange', function() {

        // Calculate stop times for 4 questions
        timeStep = Math.floor(video.duration / 5);

        for (let i = 0; i < 4; i++) {
            
            stopTimes[i] = timeStep * (i + 1);

        }
    });
  }

// Function for showing/hiding playlist section
function togglePlaylist() {

    if (playlist.style.display === "flex") {

        document.querySelector("main").style.maxWidth = "854px";
        playlist.style.display = "none";

    } else {

        document.querySelector("main").style.maxWidth = "1139px";
        playlist.style.display = "flex";

    }
}

// Use when updating playlist content
function findID(v) {

    return v.videoID == this;

}

// Prepare page for quiz
function setQuiz() {

    // Reload video
    video.load();

    // If playing video when setQuiz called, change button name to 'Play'
    if (playButton.innerHTML === "Pause") {

        playButton.innerHTML = "Play";

    }
        
    // Hide playlist button
    playlistButton.style.display = "none";
    
    // Hide quiz button
    quizButton.style.display = "none";

    // Change background color
    videoDescription.style.background = "#bbd444";

    // Clear paragraph for description and show guidelines
    videoDescription.textContent = guidelines;

    // Show and set next button
    var nextButton = document.createElement("button");
    nextButton.innerHTML = "Next";
    nextButton.id = "next";
    videoDescription.parentNode.appendChild(nextButton);
    nextButton.onclick = function() {

        // Question placeholder
        videoDescription.textContent = "Question and alternatives will appear here.";

        // Prepare video for pausing and showing questions
        video.addEventListener('timeupdate', displayQuestion);

        // Hide next button
        nextButton.style.display = "none";

        // Play video
        video.play();
        playButton.innerHTML = "Pause";

    };

}

// Display question and set quiz going
function displayQuestion() {

    // Get current time
    var timeMark = Math.ceil(video.currentTime);
    
    // Get index for questions array
    var questionIndex = stopTimes.indexOf(timeMark);
  
    if (questionIndex > -1) {

        // Pause video
        video.pause();

        // Display question and answer alternatives
        videoDescription.textContent = quizQuestions[questionIndex];
        
        // Get alternatives
        var questionAlternatives = quizAlternatives[questionIndex];
        
        // Create question section
        questionSection = document.createElement("section");
        questionSection.id = "q" + questionIndex;
        questionSection.className = "question-section";
        descriptionSection.appendChild(questionSection);
  
        for (let i = 0; i < questionAlternatives.length; i++) {

            // Create radio input element
            var inputRadio = document.createElement("input");
            inputRadio.type = "radio";
            inputRadio.id = "r" + i;
            inputRadio.value = questionAlternatives[i];

            // Create radio input label
            var labelRadio = document.createElement("label");
            labelRadio.htmlFor = "r" + i;
            labelRadio.innerHTML = questionAlternatives[i];

            // Append radio inputs and labels to question section
            questionSection.appendChild(inputRadio);
            questionSection.appendChild(labelRadio);

            // Add event listener for input
            inputRadio.addEventListener('input', checkAnswer);

        }

        // Remove timeMark from stopTimes
        stopTimes.splice(questionIndex, 1);

    }
}

function checkAnswer() {
    
    // Get index for the answer, question and alternatives arrays (from question-section)
    var indexCheck = parseInt(this.parentNode.id.split("")[1]);

    // Get answer
    var answer = quizAnswers[indexCheck];

    // Check answer
    if (this.value === answer) {

        videoDescription.textContent = "Correct!";
        scoreQuiz++;
        questionSection.parentNode.removeChild(questionSection);

    } else {

        videoDescription.textContent = "Sorry, you are wrong.";
        questionSection.parentNode.removeChild(questionSection); 
    
    }

    // Remove past answers from quizAnswers
    quizAnswers.splice(indexCheck, 1);

    // Remove past alternatives from quizAlternatives
    quizAlternatives.splice(indexCheck, 1);

    // Remove past question from quizQuestions
    quizQuestions.splice(indexCheck, 1);

    // Show score
    if (quizQuestions.length === 0) {

        setTimeout(function () {videoDescription.textContent = "Your score: " + scoreQuiz + " out of 4.";}, 2000);

    }

    // Resume playing
    video.play();

}