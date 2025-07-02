const wishes = [
  "Chúc bé sinh nhật vui vẻ, mãi luôn xinh đẹp và rạng rỡ! 🎂💖",
  "Tuổi mới chúc em thật nhiều niềm vui, may mắn và thành công nhé! 🥳",
  "Mỗi năm đều mong được ở cạnh em và cùng em đón sinh nhật thế này 💞",
  "Chúc em tuổi mới tràn đầy tiếng cười, bình yên và những điều ngọt ngào nhất! 🌸",
];

let heartClicks = 0;

function showWish(btn) {
  heartClicks++;
  const random = Math.floor(Math.random() * wishes.length);
  Swal.fire({
    title: "💝 Gửi bé yêu!",
    text: wishes[random],
    imageUrl:
      "https://i.pinimg.com/474x/df/ce/a7/dfcea7989195d3273c2bcb367fca0a83.jpg",
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: "Trái tim",
    confirmButtonText: "🥰 Cảm ơn anh!",
  });

  if (heartClicks >= 4) {
    setTimeout(() => {
      Swal.fire({
        title: "❤️ Em đã chạm hết trái tim!",
        text: "Dù em chọn tim nào, thì người anh chọn vẫn luôn là em!",
        confirmButtonText: "Em biết rồi 😚",
      });
      heartClicks = 0;
    }, 600);
  }
}

function openGift() {
  Swal.fire({
    title: "🎁 Bất ngờ nè!",
    html: "<b>Chúc mừng sinh nhật em yêu! Mong mọi điều tốt đẹp nhất sẽ đến với em trong năm nay 🎈<br>Yêu em nhiều lắm! 💖</b>",
    confirmButtonText: "Ôi đáng yêu quá! 💕",
  });
}

window.addEventListener("load", () => {
  const music = document.getElementById("background-music");
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise
      .then((_) => console.log("Âm nhạc đã tự động phát!"))
      .catch((error) => {
        console.log("Tự động phát nhạc thất bại:", error);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Chạm vào màn hình để nghe nhạc nhé!",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        const playMusicOnClick = () => {
          if (music.paused)
            music
              .play()
              .catch((e) =>
                console.log("Không thể phát nhạc sau khi click:", e)
              );
          document.body.removeEventListener("click", playMusicOnClick);
          document.body.removeEventListener("touchstart", playMusicOnClick);
        };
        document.body.addEventListener("click", playMusicOnClick);
        document.body.addEventListener("touchstart", playMusicOnClick);
      });
  }

  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "flex";

    setTimeout(() => {
      if (Swal.isVisible()) return;
      Swal.fire({
        title: "💌 Gửi bé...",
        text: "Sinh nhật em hôm nay, điều anh ước là được làm em cười thật nhiều 💝",
        confirmButtonText: "Em cảm nhận được rồi... 💞",
      });
    }, 60000);
  }, 2000);
});

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  heart.style.fontSize = Math.random() * 15 + 15 + "px";
  document.getElementById("hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 250);

const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const gameArea = document.getElementById('game-area');

let yesMoveCount = 0;
let canClickYes = false;

// Nút "Có" chạy khi hover hoặc click (tối đa 20 lần)
function moveYesButton() {
  const areaWidth = gameArea.clientWidth - yesBtn.offsetWidth;
  const areaHeight = gameArea.clientHeight - yesBtn.offsetHeight;

  const x = Math.random() * areaWidth;
  const y = Math.random() * areaHeight;

  yesBtn.style.left = `${x}px`;
  yesBtn.style.top = `${y}px`;

  yesMoveCount++;
  if (yesMoveCount >= 20) {
    canClickYes = true;
  }
}

// Nút "Không" chạy nhẹ, nhưng vẫn để người dùng đuổi kịp
function moveNoButton() {
  const areaWidth = gameArea.clientWidth - noBtn.offsetWidth;
  const areaHeight = gameArea.clientHeight - noBtn.offsetHeight;

  const x = Math.random() * areaWidth;
  const y = Math.random() * areaHeight;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Nút "Có"
yesBtn.addEventListener('mouseenter', () => {
  if (!canClickYes) moveYesButton();
});

yesBtn.addEventListener('click', () => {
  if (!canClickYes) {
    moveYesButton();
  } else {
    Swal.fire({
      title: 'Anh biết màaaa 💘',
      text: 'Em thương anh thật rồi đúng không? 😍',
      icon: 'success',
      confirmButtonText: 'Yêu nhiều luôn!'
    });
  }
});

// Nút "Không" vẫn chạy khi hover, nhưng không nhanh như nút "Có"
noBtn.addEventListener('mouseenter', () => {
  setTimeout(moveNoButton, 300); // Trễ 0.3s để người dùng vẫn có thể bấm
});

noBtn.addEventListener('click', () => {
  Swal.fire({
    title: 'Ơ kìa 😢',
    text: 'Không thương anh thiệt á? Thử lại nha 🥹',
    icon: 'warning',
    confirmButtonText: 'Thôi được, chọn lại nè'
  });
});

