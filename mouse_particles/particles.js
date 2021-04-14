const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 0;


window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined,
}
canvas.addEventListener('click', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particleArray.push( new Particle());  
  }
});


canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 0.3; i++) {
        particleArray.push( new Particle());  
      }
  });

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        //this.x = Math.random() * canvas.width;
        //this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 23%, 60%)';
    }
    update(){
         this.x += this.speedX;
         this.y += this.speedY;
         if (this.size > 0.3) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();  
        //ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        //ctx.arc(this.y, this.x, this.size, 0, Math.PI * 2); 
        // ctx.rect(this.x, this.y, this.size, 60);
        //ctx.rect(this.y, this.x, this.size, -65)
        
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
       particleArray.push(new Particle());
    }
}
init();
//console.log(particleArray);

function handleParticles() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        for (let j = i; j < particleArray.length; j++) {
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 10) {
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.moveTo(particleArray[i].y, particleArray[i].y);
                //ctx.lineTo(particleArray[j].x, particleArray[j].y);
                //ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.bezierCurveTo(particleArray[j].x, particleArray[j].y,particleArray[j].x, particleArray[j].x, particleArray[j].y, particleArray[j].x);
                //ctx.bezierCurveTo(particleArray[j].y, particleArray[j].x,particleArray[j].x, particleArray[j].x, particleArray[j].y, particleArray[j].x);
                ctx.stroke();
            }
        }
        if (particleArray[i].size <= 0.3) {
            particleArray.splice(i , 1);
            console.log(particleArray.length);
            i--;
        }
     } 
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(0,0,0,0.02)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+=9;
    // console.log(particleArray.length);
    requestAnimationFrame(animate);
}
animate();

