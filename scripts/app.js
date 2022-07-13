
let squares = document.querySelectorAll('.square')
let mole = document.querySelector('.mole')
let timeLeft = document.querySelector('#time')
let score = document.querySelector('#score')
let displayHighScore = document.querySelector('#high-score')

let result = 0
let hitPos
let currentTime
let highestScore = 0
let savedHighScore


function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * squares.length)]
    randomSquare.classList.add('mole')
    hitPos = randomSquare.id
    addScore()

}


function addScore() {
    squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (square.id === hitPos) {
                result += 10

                customAlert('Yay', 500)

                score.textContent = result
                hitPos = null
                console.log(result)

            }
        })
    })
}

let timerId
let countDownTimerId
let startBtn = document.querySelector('button')
function startGame() {
    countDownTimerId = setInterval(countDown, 1000)
    currentTime = 31
    score.textContent = 0
    startBtn.disabled = true
    startBtn.style.opacity = '.4'
    startBtn.style.cursor = 'not-allowed'
    timerId = setInterval(randomSquare, 500)
}

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime <= 10) {
        timeLeft.classList.add('warning')
    } else {
        timeLeft.classList.remove('warning')

    }
    if (currentTime <= 0) {

        clearInterval(countDownTimerId)
        clearInterval(timerId)
        setTimeout(() => {
            startBtn.disabled = false
            startBtn.style.opacity = '1'
            startBtn.style.cursor = 'pointer'
            result = 0

        }, 1000);
        setTimeout(() => {
            alert(`GameOver!!,Your Final Score is ${result} `, 2000)

        }, 500);
        squares.forEach(square => {
            square.removeEventListener('mousedown', addScore, true)

        })

        setTimeout(updateScore, 500)
    }

}
let saveHighScore
function updateScore() {
    highestScore = result
    if (highestScore > savedHighScore) {
        displayHighScore.textContent = highestScore

        saveHighScore = localStorage.setItem('highScore', highestScore)
    }
}
document.addEventListener('DOMContentLoaded', () => {


    savedHighScore = JSON.parse(localStorage.getItem('highScore'))
    console.log(savedHighScore)
    displayHighScore.textContent = savedHighScore
})




function customAlert(msg, duration) {

    let element = document.createElement('div')
    element.setAttribute('style', `
        background: #0ff;
        position: absolute;
        top:0;
        display:flex;
        color: #000a2d;
        justify-content:center;
        width:100%;
        `)
    element.innerHTML = `<h1> ${msg}</h1>`
    setTimeout(() => {
        element.parentNode.removeChild(element)
    }, duration);
    document.body.appendChild(element)
}


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        alert(`*GUIDE: Click on the CAT (if you can) to Score! Good luck*`)
    }, 500);


    // =====GSAP===========

    var scene = new THREE.Scene();
    document.addEventListener('mousemove', onMouseMove, false);
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var mouseX;
    var mouseY;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    var distance = Math.min(1400, window.innerWidth / 5);
    var geometry = new THREE.Geometry();

    for (var i = 0; i < 1600; i++) {

        var vertex = new THREE.Vector3();

        var theta = Math.acos(THREE.Math.randFloatSpread(2));
        var phi = THREE.Math.randFloatSpread(360);

        vertex.x = distance * Math.sin(theta) * Math.cos(phi);
        vertex.y = distance * Math.sin(theta) * Math.sin(phi);
        vertex.z = distance * Math.cos(theta);

        geometry.vertices.push(vertex);
    }
    var particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x00ffff, size: .2 }));
    particles.boundingSphere = 10;


    var renderingParent = new THREE.Group();
    renderingParent.add(particles);

    var resizeContainer = new THREE.Group();
    resizeContainer.add(renderingParent);
    scene.add(resizeContainer);

    camera.position.z = 500;

    var animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    var myTween;
    function onMouseMove(event) {
        if (myTween)
            myTween.kill();

        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
        myTween = gsap.to(particles.rotation, { duration: 0.1, x: mouseY * -1, y: mouseX });
        //particles.rotation.x = mouseY*-1;
        //particles.rotation.y = mouseX;
    }
    animate();

    // Scaling animation
    var animProps = { scale: 1.6, xRot: 0, yRot: 0 };
    gsap.to(animProps, {
        duration: 10, scale: 1.7, repeat: -1, yoyo: true, ease: "sine", onUpdate: function () {
            renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale);
        }
    });

    gsap.to(animProps, {
        duration: 250, xRot: Math.PI * 2, yRot: Math.PI * 4, repeat: -1, yoyo: true, ease: "none", onUpdate: function () {
            renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
        }
    });
    // ========GSAP [END]============
})