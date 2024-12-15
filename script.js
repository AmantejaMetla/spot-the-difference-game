let canvas1 = document.getElementById('image1-canvas');
let canvas2 = document.getElementById('image2-canvas');
let ctx1 = canvas1.getContext('2d');
let ctx2 = canvas2.getContext('2d');
let foundDifferences = 0;
let lives = 3;
let timer = 0;
let interval;

// Sound effects
const bgMusic = new Audio("assets/background-music.mp3");
const clickSound = new Audio("assets/click-sound.mp3");
const successSound = new Audio("assets/success-sound.mp3");

// Play background music
bgMusic.loop = true;
document.addEventListener("click", () => {
    if (bgMusic.paused) bgMusic.play();
});

// Play click sound when a difference is clicked
function playClickSound() {
    clickSound.play();
}

// Play success sound when all differences are found
function playSuccessSound() {
    successSound.play();
    bgMusic.pause();
}

// Load Game Configuration
fetch('config.json')
    .then(response => response.json())
    .then(data => initGame(data));

function initGame(data) {
    loadImages(data.images.image1, data.images.image2);
    setDifferences(data.differences);
    startTimer();
}

function loadImages(img1Path, img2Path) {
    const img1 = new Image();
    const img2 = new Image();

    img1.src = img1Path;
    img2.src = img2Path;

    img1.onload = () => {
        canvas1.width = img1.width / 2; // Set canvas size to half of image size
        canvas1.height = img1.height / 2;
        ctx1.drawImage(img1, 0, 0, canvas1.width, canvas1.height);
    };

    img2.onload = () => {
        canvas2.width = img2.width / 2;
        canvas2.height = img2.height / 2;
        ctx2.drawImage(img2, 0, 0, canvas2.width, canvas2.height);
    };
}

function setDifferences(differences) {
    canvas2.addEventListener('click', (e) => {
        const rect = canvas2.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < differences.length; i++) {
            const diff = differences[i];
            const distance = Math.sqrt((x - diff.x) ** 2 + (y - diff.y) ** 2);
            
            if (distance < diff.radius && !foundDifferences.includes(i)) {
                foundDifferences.push(i);
                markDifference(ctx2, diff.x, diff.y, diff.radius);
                playClickSound();
                updateScore();

                if (foundDifferences.length === differences.length) {
                    displaySuccess();
                }
                return;
            }
        }
        loseLife();
    });
}

function markDifference(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

function updateScore() {
    document.getElementById('found-count').innerText = foundDifferences;
}

function loseLife() {
    lives--;
    document.getElementById('lives').innerText = lives;

    if (lives === 0) {
        alert('Game Over! Try again.');
        location.reload(); // Reload the game when lives reach 0
    }
}

function startTimer() {
    interval = setInterval(() => {
        timer++;
        document.getElementById('timer').innerText = timer;
    }, 1000);
}

function displaySuccess() {
    clearInterval(interval); // Stop the timer
    document.getElementById('success-message').classList.remove('hidden');
    playSuccessSound();
}
