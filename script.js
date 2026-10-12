let currentPin = "";

// ⚙️ CHANGE YOUR 4-DIGIT PIN HERE:
const CORRECT_PIN = "1310";

function pressNum(num) {
  if (currentPin.length < 4) {
    currentPin += num;
    updateDots();
  }

  if (currentPin.length === 4) {
    setTimeout(checkPin, 200);
  }
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index < currentPin.length) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function clearPin() {
  currentPin = "";
  updateDots();
  document.getElementById('error-msg').style.display = 'none';
}

function deleteLast() {
  currentPin = currentPin.slice(0, -1);
  updateDots();
  document.getElementById('error-msg').style.display = 'none';
}

function checkPin() {
  if (currentPin === CORRECT_PIN) {
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';

    // Play Music
    const music = document.getElementById('bgMusic');
    if (music) {
      music.play().catch(error => {
        console.log("Autoplay failed:", error);
      });
      setupMusicProgress();
    }

    // Launch Celebration Confetti
    popConfetti();
  } else {
    document.getElementById('error-msg').style.display = 'block';
    setTimeout(clearPin, 800);
  }
}

// Function to trigger Confetti Burst
function popConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#38bdf8', '#facc15', '#34d399', '#ffffff']
    });
  }
}

// Toggle Play/Pause Music
function toggleMusic() {
  const music = document.getElementById('bgMusic');
  const icon = document.getElementById('playIcon');
  const equalizer = document.getElementById('equalizer');
  const musicText = document.getElementById('musicText');

  if (music.paused) {
    music.play();
    icon.className = 'fa-solid fa-pause';
    equalizer.classList.add('playing');
    musicText.innerHTML = '<i class="fa-solid fa-music"></i> Playing Song...';
  } else {
    music.pause();
    icon.className = 'fa-solid fa-play';
    equalizer.classList.remove('playing');
    musicText.innerHTML = '<i class="fa-solid fa-music"></i> Song Paused';
  }
}

// Update Music Progress Bar automatically
function setupMusicProgress() {
  const music = document.getElementById('bgMusic');
  const progressBar = document.getElementById('progressBar');

  if (music) {
    music.addEventListener('timeupdate', () => {
      if (music.duration) {
        const progressPercent = (music.currentTime / music.duration) * 100;
        if (progressBar) progressBar.style.width = `${progressPercent}%`;
      }
    });
  }
}

// Seek Music on Progress Bar Click
function setSeek(event) {
  const music = document.getElementById('bgMusic');
  const container = event.currentTarget;
  const clickX = event.offsetX;
  const width = container.clientWidth;

  if (music && music.duration) {
    music.currentTime = (clickX / width) * music.duration;
  }
}

// Interactive Gift Box Handler
