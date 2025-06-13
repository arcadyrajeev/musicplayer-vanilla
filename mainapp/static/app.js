

document.addEventListener('DOMContentLoaded', function () {
    let isfirst = true;
    let isScrolling = false;
    let velocity = 0;
    let scrollTarget = 0;
    let animationFrameId = null;

    const nxt = document.querySelector('.next');
    const prv = document.querySelector('.prev');
    const container = document.querySelector('.card-container');
    var volume = document.getElementById('volume')
    var audioPlayer = document.getElementById('audioPlayer');

    audioPlayer.volume=.3;
    volume.value = audioPlayer.volume;


    container.scrollLeft = 300;



    // Momentum scroll function
    function momentumScroll() {
        if (!isScrolling && Math.abs(velocity) < 0.1) {
            cancelAnimationFrame(animationFrameId); // Stop the animation when velocity is low
            return;
        }
        isfirst=false;
        container.scrollLeft += velocity; // Move by velocity
        velocity *= 0.95; // Decrease velocity to create friction-like effect
        isScrolling = false; // Only allow new scrolls after momentum ends

        checkIfInBox();

        animationFrameId = requestAnimationFrame(momentumScroll); // Continue the animation loop
    }



    var invisibleBox = {
        left: window.innerWidth / 2 - 140,  // Start 150px left from the center of the screen
        right: window.innerWidth / 2 + 140 // End 150px right from the center
    };

    container.addEventListener('scroll', checkIfInBox);

    function checkIfInBox() {
        var audioPlayer = document.getElementById('audioPlayer');
        var cards = document.querySelectorAll('.card');
          // All the cards or elements you want to check
        cards.forEach(function (card) {
            var rect = card.getBoundingClientRect();

            // Check if the card intersects with the invisible box
            if (rect.left >= invisibleBox.left && rect.right <= invisibleBox.right) {
                card.classList.add('active');

                velocity = 0;  // Stop scrolling once card is active
                isScrolling = false;

                // Update the song based on the active card
                const songSrc = card.getAttribute('data-song');
                if (songSrc) {
                    audioPlayer.querySelector('source').src = songSrc;
                    audioPlayer.load(); // Reload audio for the new song

                    
                    if(!isfirst){
                        audioPlayer.play().then(() => {
                            var icon = document.querySelector('.play');
                            icon.src = icon2;
                            icon.style.marginLeft = '16px';
                        });
                    }
                    }
            }
                 else {
                card.classList.remove('active');
            }
        });
    }

    nxt.addEventListener('click', (event) =>{
        event.preventDefault();
        scrollTarget += 200;
        velocity += 30;

        if (!isScrolling ) {
            momentumScroll(); // Start the momentum scroll if it's not already running
            checkIfInBox();
            isScrolling = true;
        }

        var icon = document.querySelector('.play');
        icon.src = icon2;
        icon.style.marginLeft = '16px';
        
    })
    

    prv.addEventListener('click', (event) =>{
        event.preventDefault();

        scrollTarget += -200;
        velocity += -30;

        if (!isScrolling ) {
            momentumScroll(); // Start the momentum scroll if it's not already running
            checkIfInBox();
            isScrolling = true;
        }

        var icon = document.querySelector('.play');
        icon.src = icon2;
        icon.style.marginLeft = '16px';
    })



    container.addEventListener('wheel', (event) => {
        event.preventDefault();

        // Change in scroll target
        const delta = event.deltaY;

        // Set the target scroll position
        scrollTarget += delta;

        // Increase velocity when wheel is used
        velocity += delta * 0.3; // Change this multiplier for faster/slower momentum start

        // Ensure that momentum scrolling starts and doesn't stop abruptly
        if (!isScrolling ) {
            momentumScroll(); // Start the momentum scroll if it's not already running
            checkIfInBox();
            isScrolling = true;
        }
    });

    // Auto play funtion and loop

    var loop = document.getElementById('loop');
    let songs = document.querySelectorAll('.card');
    var loopback = document.getElementById('loopback');
    let index =-1;

    songs.forEach((song, i)=>{
        if(song.classList.contains('active')){
            index = i;
        }
    })

    audioPlayer.addEventListener('ended', function() {
       if(loop.classList.contains('active')){
        audioPlayer.currentTime = 0;
        audioPlayer.play();

       }else if(loopback.classList.contains('active') && (index === songs.length-1)){

        scrollTarget += -300;
        velocity += -100;

            if (!isScrolling ) {
                momentumScroll(); // Start the momentum scroll if it's not already running
                checkIfInBox();
                isScrolling = true;
            }
        }else{
            scrollTarget +=200;
            velocity += 30;

            if (!isScrolling ) {
                momentumScroll(); // Start the momentum scroll if it's not already running
                checkIfInBox();
                isScrolling = true;
            }
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const progress = document.getElementById('progress');
    const audioPlayer = document.getElementById('audioPlayer');

    // Update the progress bar as the song plays
    audioPlayer.addEventListener('timeupdate', function () {
        if (!isNaN(audioPlayer.duration)) {
            progress.value = audioPlayer.currentTime;
        }
    });

    // Set the progress bar's max value when metadata is loaded
    audioPlayer.addEventListener('loadedmetadata', function () {
        if (!isNaN(audioPlayer.duration)) {
            progress.max = audioPlayer.duration;
        }
    });

    // Use 'change' event instead of 'input' for seeking
    progress.addEventListener('change', function () {
        audioPlayer.currentTime = progress.value;
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const icon = document.querySelector('.play');

    icon.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            icon.src = icon2;  // Change to pause icon
            this.style.marginLeft = "16px";
            console.log('Playing');  // Debugging log
        } else {
            audioPlayer.pause();
            icon.src = icon1;  // Change back to play icon
            this.style.marginLeft = "22px";
            console.log('Paused');  // Debugging log
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    // Update time displays
    audioPlayer.addEventListener('timeupdate', function () {
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    });

    audioPlayer.addEventListener('loadedmetadata', function () {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});

/*document.addEventListener('DOMContentLoaded', function(){
    const icons = doncument.querySelectorAll('.cls-1');
    
    icons.forEach( function(icon) {
        icon.classList.toggle('active');
    });
});*/

document.addEventListener('DOMContentLoaded', function(){
    const sound = document.getElementById('sound');
    const volume = document.getElementById('volume');

    sound.addEventListener('click', ()=>{
        volume.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function(){
    const loop = document.getElementById('loop');

    loop.addEventListener('click', ()=>{
        loop.classList.toggle('active');
    });
});

document.addEventListener('click', (event) =>{
    var sound = document.getElementById('sound');
    var volume = document.getElementById('volume');

    if(!sound.contains(event.target) && !volume.contains(event.target)){
        volume.classList.remove('active');
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const volumeControl = document.getElementById('volume');

    // Set initial values
    volumeControl.value = audioPlayer.volume;

    // Update volume
    volumeControl.addEventListener('input', function () {
        audioPlayer.volume = volumeControl.value;
    });
});

document.addEventListener('DOMContentLoaded', ()=>{
    const menu = document.querySelector('.menu-button');
    const rootElement = document.documentElement;

    menu.addEventListener('click', ()=>{
        if(rootElement.hasAttribute('upload')){
            rootElement.toggleAttribute('upload');
        }else{
            rootElement.toggleAttribute('menu-open');
        }
    });
});

document.addEventListener('DOMContentLoaded', ()=>{
    const uploader = document.getElementById('uploader');
    const rootElement = document.documentElement;

    uploader.addEventListener('click', ()=>{
        rootElement.toggleAttribute('upload');
    });
});

document.addEventListener('DOMContentLoaded', ()=>{
    const loopback = document.getElementById('loopback');

    loopback.addEventListener('click',()=>{
        loopback.classList.toggle('active');
    });
});
