const startBtn = document.querySelector('#start'),
        screens = document.querySelectorAll('.screen'),
        timeList = document.querySelector('#time-list'),
        timeEl = document.querySelector('#time'),
        board = document.querySelector('#board'),
        colors = ['#e74c3c', '#8e44ad', '#3498ab', '#3498db', '#e67e22',
        '#2ecc71', '#F1C40F', '#ECF0F1' , '#1ABC9C', '#FF1493',
        '#9932CC', '#0000FF', '#FFF0F5'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();    
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime () {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            setTime(`0${time}`);
        }else {
            setTime(current);
        }
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score: <span class='primary'>${score}</span>
    </h1><br><a onClick="window.location.reload()">Refresh</a>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(15, 70);
    
    //Returns the size of the element and its position relative to the viewport
    const {width, height} = board.getBoundingClientRect(); 

    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    setColor(circle);

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}
