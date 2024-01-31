const cursorSize = 80;
const cursorImage = new Image();
cursorImage.src = '/img/shovel.png';

const canvas = document.getElementById('customCursor');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = 0;
let mouseY = 0;
let rotationAngle = -45 * (Math.PI / 180);


const pivotX = 5;
const pivotY = cursorImage.height - 10;

let prevMouseX = 0;
let prevMouseY = 0;
let angularVelocity = 0;
const dampingFactor = 0.94; // Facteur d'amortissement

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('mousedown', () => {
    const moveDistance = 15;
    const rotatedX = moveDistance * Math.cos(-rotationAngle);
    const rotatedY = moveDistance * Math.sin(-rotationAngle);
    mouseX -= rotatedX;
    mouseY -= rotatedY;

});
document.addEventListener('mouseup', () => {
    const moveDistance = 15;
    const rotatedX = moveDistance * Math.cos(-rotationAngle);
    const rotatedY = moveDistance * Math.sin(-rotationAngle);
    mouseX += rotatedX;
    mouseY += rotatedY;

});

function update() {
    const dx = mouseX - pivotX;
    const dy = mouseY - pivotY;
    const targetRotation = Math.atan2(dy, dx);

    // Calcul de la différence angulaire entre la cible et l'angle actuel
    let angleDiff = targetRotation - rotationAngle;

    // Calcul de la distance parcourue par la souris depuis la dernière frame
    const distance = Math.sqrt((mouseX - prevMouseX) ** 2 + (mouseY - prevMouseY) ** 2);

    // Gestion de l'inertie avec une vitesse angulaire
    angularVelocity += angleDiff * 0.05 + distance * 0.001; // Ajustez ces valeurs pour la force d'inertie

    // Appliquer l'amortissement
    angularVelocity *= dampingFactor;

    // Mise à jour de l'angle en fonction de la vitesse angulaire
    rotationAngle += angularVelocity;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(mouseX, mouseY);
    ctx.rotate(rotationAngle);
    ctx.drawImage(cursorImage, -pivotX, -pivotY, cursorSize, cursorSize);
    ctx.restore();

    prevMouseX = mouseX;
    prevMouseY = mouseY;

    requestAnimationFrame(update);
}



update();