const canvas = document.getElementById("arkanoid")
const ctx = canvas.getContext("2d")

// GAME PARAMS
const game = {
    SIDE: 0.02,
    BALL_SPEED: 0.5,
    BALL_SPIN: 0.2,
    PADDLE_SPEED: 0.5,
    PADDLE_WIDTH: 0.1
}

// COLORS
const color = {
    BACKGROUND_COLOR: "rgb(0, 0, 0)",
    SIDE_COLOR: "rgb(94, 94, 94)",
    BALL_COLOR: "rgb(255, 255, 255)",
    PADDLE_COLOR: "rgb(255, 255, 255)"
}

// DIRECTION OF MOVEMENT
const direction = {
    LEFT: 0,
    RIGHT: 1,
    STOP: 2
}

// DIMENSIONS
let width, height, side

// GAME VARIABLES
let ball, paddle

// GAME LOOP VARIABLES
let deltaTime, lastTime

// MAIN BALL CLASS
class Ball {
    constructor() {
        this.side = side
        this.height = side
        this.x = paddle.x
        this.y = paddle.y - paddle.height / 2 - this.height / 2
        this.speed = game.BALL_SPEED * height
        this.speedX = 0
        this.speedY = 0
    }
}

// MAIN PADDLE CLASS
class Paddle {
    constructor() {
        this.width = game.PADDLE_WIDTH * width
        this.height = side
        this.x = width / 2
        this.y = height - this.height * 3
        this.speed = game.PADDLE_SPEED * width
        this.speedX = 0
    }
}

const setDimensions = () => {
    height = window.innerHeight
    width = window.innerWidth
    side = game.SIDE * (height < width ? height : width)
    canvas.width = width
    canvas.height = height
    ctx.lineWidth = side
    paddle = new Paddle()
    ball = new Ball()
}

const newGame = () => {
    paddle = new Paddle()
    ball = new Ball()
}

const outOfBounds = () => {
    // TODO out of bounds
    newGame()
}

// KEY DOWN HANDLER FUNCTION
const keyDownHandler = (event) => {
    switch (event.keyCode) {
        case 32: // SPACE BAR STARTS THE BALL
            ballStart()
            break
        case 37: // LEFT ARROW MOVES PADDLE LEFT
            paddleMove(direction.LEFT)
            break
        case 39: // RIGHT ARROW MOVES PADDLE RIGHT
            paddleMove(direction.RIGHT)
            break
    }
}

// KEY UP HANDLER FUNCTION
const keyUpHandler = (event) => {
    switch (event.keyCode) {
        case 37: // LEFT ARROW STOPS MOVING
        case 39: // RIGHT ARROW STOPS MOVING
            paddleMove(direction.STOP)
            break
    }
}

const touch = (x) => {
    if (!x) {
        paddleMove(direction.STOP)
    } else if (x > paddle.x) {
        paddleMove(direction.RIGHT)
    } else if (x < paddle.x) {
        paddleMove(direction.LEFT)
    }
}

const touchStop = () => {
    touch(null)
}

const touchMove = (event) => {
    touch(event.touches[0].clientX)
}

const touchStart = (event) => {
    if (ballStart()) {
        return
    }
    touch(event.touches[0].clientX)
}

canvas.addEventListener("touchstop", touchStop)
canvas.addEventListener("touchmove", touchMove)
canvas.addEventListener("touchstart", touchStart)
document.addEventListener("keydown", keyDownHandler)
document.addEventListener("keyup", keyUpHandler)
window.addEventListener("resize", setDimensions)

// BALL SPEED HANDLER
const ballSpeed = (angle) => {
    // KEEPS ANGLE BETWEEN 30° AND 150°
    if (angle < Math.PI / 6) {
        angle = Math.PI / 6
    } else if (angle > Math.PI * 5 / 6) {
        angle = Math.PI * 5 / 6
    }
    // UPDATES THE SPEED OF THE BALL MOVEMENT IN THE X AND Y COORDINATES
    ball.speedX = ball.speed * Math.cos(angle)
    ball.speedY = -ball.speed * Math.sin(angle)
}

// BALL START HANDLER
const ballStart = () => {
    // IF BALL IN MOTION
    if (ball.speedY != 0) {
        return false
    }
    // RANDOM BALL MOVEMENT ANGLE BETWEEN 60° AND 150°
    let angle = Math.random() * Math.PI / 2 + Math.PI / 3
    ballSpeed(angle)
    return true
}

// BALL UPDATE HANDLER
const ballUpdate = (delta) => {
    ball.x += ball.speedX * delta
    ball.y += ball.speedY * delta

    // bounce the ball off the sides
    if (ball.x < side + ball.width * 0.5) {
        ball.x = side + ball.width * 0.5
        ball.speedX = -ball.speedX
    } else if (ball.x > width - side - ball.width * 0.5) {
        ball.x = width - side - ball.width * 0.5
        ball.speedX = -ball.speedX
    } else if (ball.y < side + ball.height * 0.5) {
        ball.y = side + ball.height * 0.5
        ball.speedY = -ball.speedY
    }

    // bounce off the paddle
    if (ball.y > paddle.y - paddle.height * 0.5 - ball.height * 0.5
        && ball.y < paddle.y
        && ball.x > paddle.x - paddle.width * 0.5 - ball.width * 0.5
        && ball.x < paddle.x + paddle.width * 0.5 + ball.width * 0.5
    ) {
        ball.y = paddle.y - paddle.height * 0.5 - ball.height * 0.5
        ball.speedY = -ball.speedY

        // modify the angle based off ball spin
        let angle = Math.atan2(-ball.speedY, ball.speedX)
        angle += (Math.random() * Math.PI / 2 - Math.PI / 4) * game.BALL_SPIN
        ballSpeed(angle)
    }

    // handle out of bounds
    if (ball.y > height) {
        outOfBounds()
    }

    // move the stationary ball with the paddle
    if (ball.speedY == 0) {
        ball.x = paddle.x
    }
}

// PADDLE MOVEMENT HANDLER
const paddleMove = (direction) => {
    switch (direction) {
        case direction.LEFT:
            paddle.speedX = -paddle.speed
            break
        case direction.RIGHT:
            paddle.speedX = paddle.speed
            break
        case direction.STOP:
            paddle.speedX = 0
            break
    }
}







const drawBackground = () => {
    ctx.fillStyle = game.BACKGROUND_COLOR
    ctx.fillRect(0, 0, width, height)
}

const drawBall = () => {
    ctx.fillStyle = game.BALL_COLOR
    ctx.fillRect(ball.x - ball.w * 0.5, ball.y - ball.h * 0.5, ball.w, ball.h)
}

const drawPaddle = () => {
    ctx.fillStyle = game.PADDLE_COLOR
    ctx.fillRect(paddle.x - paddle.w * 0.5, paddle.y - paddle.h * 0.5, paddle.w, paddle.h)
}

const paddleUpdate = (delta) => {
    paddle.x += paddle.speedX * delta
    // stop paddle at sides
    if (paddle.x < side + paddle.width * 0.5) {
        paddle.x = side + paddle.width * 0.5
    } else if (paddle.x > width - side - paddle.width * 0.5) {
        paddle.x = width - side - paddle.width * 0.5
    }
}

const drawSides = () => {
    let hside = side * 0.5
    ctx.strokeStyle = game.SIDE_COLOR
    ctx.beginPath()
    ctx.moveTo(hside, height)
    ctx.lineTo(hside, hside)
    ctx.lineTo(width - hside, hside)
    ctx.lineTo(width - hside, height)
    ctx.stroke()
}

const gameLoop = (timestamp) => {
    if (!lastTime) {
        lastTime = timestamp
    }

    deltaTime = (timestamp - lastTime) * 0.001
    lastTime = timestamp

    paddleUpdate(deltaTime)
    ballUpdate(deltaTime)

    drawBackground()
    drawSides()
    drawBall()
    drawPaddle()

    requestAnimationFrame(gameLoop)
}

gameLoop()

newGame()

setDimensions()