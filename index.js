const pipBtn = document.getElementById("pipBtn");
const pipVideo = document.getElementById("pipVideo");
const pipCanvas = document.getElementById("pipCanvas");
const test = document.getElementById("test");

const ctx = pipCanvas.getContext('2d');

const stream = pipCanvas.captureStream(60);
pipVideo.srcObject = stream;

let pip;

pipBtn.addEventListener("click", async () => {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      pip = await pipVideo.requestPictureInPicture();
      pip.width = 100;
      pip.height = 100;
    }
  } catch (error) {
    console.error(error);
  }
});

  const lgGradient = ctx.createLinearGradient(0, 0, 0, pipCanvas.height);
  lgGradient.addColorStop(0, '#4d4d4d');
  lgGradient.addColorStop(1, '#141414');

async function update() {
  ctx.clearRect(0, 0, pipCanvas.width, pipCanvas.height)
  
  const roundness = pip ? 4000/pip.width : 10;
  ctx.beginPath();
  ctx.roundRect(0, 0, pipCanvas.width-1, pipCanvas.height-1, roundness);
  ctx.fillStyle = "#2f2f2f";
  ctx.fill();
  
  ctx.strokeStyle = lgGradient;
  ctx.lineWidth = 6;
  ctx.stroke();
  
  const dateString = new Date().toLocaleTimeString([], {timeStyle: "short"});
  ctx.font = '40px Google Sans';
  ctx.fillStyle = "white";
  ctx.textAlign = 'center';
  ctx.fillText(dateString, pipCanvas.width/2, pipCanvas.height/2 - 5);
  
  ctx.font = '16px Google Sans';
  ctx.fillStyle = "grey";
  ctx.fillText("0:23 left in Period 1", pipCanvas.width/2, pipCanvas.height - 50);
  
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#33cc33";
  ctx.beginPath();
  ctx.moveTo(50, pipCanvas.height - 30);
  ctx.lineTo(pipCanvas.width - 50, pipCanvas.height - 30);
  ctx.stroke();
  
  ctx.lineCap = "round";
  
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
