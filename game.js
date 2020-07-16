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
// const color = {
//     BACKGROUND_COLOR: "rgb(0, 0, 0)",
//     SIDE_COLOR: "rgb(94, 94, 94)",
//     BALL_COLOR: "rgb(255, 255, 255)",
//     PADDLE_COLOR: "rgb(255, 255, 255)"
// }

// DIRECTION OF MOVEMENT
// const direction = {
//     LEFT: 0,
//     RIGHT: 1,
//     STOP: 2
// }

// DIMENSIONS
let width, height, side

// GAME VARIABLES
let ball, paddle

// GAME LOOP VARIABLES
let deltaTime, lastTime

// MAIN BALL CLASS
class Ball {
    constructor() {
        this.width = side
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
    canvas.width = width //?
    canvas.height = height // ?
    ctx.lineWidth = side
    startNewGame()
}

const startNewGame = () => {
    paddle = new Paddle()
    ball = new Ball()
}

const outOfBounds = () => {
    // OUT OF BOUNDS WRITE
    startNewGame()
}


class Input {
    constructor() {
        this.LEFT =  0
        this.RIGHT = 1
        this.STOP = 2
    }
    keyDownHandler = (event) => {
        switch (event.keyCode) {
            case 32: // SPACE BAR STARTS THE BALL
                ballStart()
                break
            case 37: // LEFT ARROW MOVES PADDLE LEFT
                paddleMove(this.LEFT)
                // console.log("37")
                break
            case 39: // RIGHT ARROW MOVES PADDLE RIGHT
                paddleMove(this.RIGHT)
                break
        }
    }

    keyUpHandler = (event) => {
        switch (event.keyCode) {
            case 37: // LEFT ARROW STOPS MOVING
            case 39: // RIGHT ARROW STOPS MOVING
                paddleMove(this.STOP)
                break
        }
    }
}

input = new Input()

// // KEY DOWN HANDLER FUNCTION
// const keyDownHandler = (event) => {
//     switch (event.keyCode) {
//         case 32: // SPACE BAR STARTS THE BALL
//             ballStart()
//             break
//         case 37: // LEFT ARROW MOVES PADDLE LEFT
//             paddleMove(direction.LEFT)
//             // console.log("37")
//             break
//         case 39: // RIGHT ARROW MOVES PADDLE RIGHT
//             paddleMove(direction.RIGHT)
//             break
//     }
// }

// // KEY UP HANDLER FUNCTION
// const keyUpHandler = (event) => {
//     switch (event.keyCode) {
//         case 37: // LEFT ARROW STOPS MOVING
//         case 39: // RIGHT ARROW STOPS MOVING
//             paddleMove(direction.STOP)
//             break
//     }
// }

document.addEventListener("keydown", input.keyDownHandler)
document.addEventListener("keyup", input.keyUpHandler)
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
const paddleMove = (DIRECTION) => {
    switch (DIRECTION) {
        case input.LEFT:
            paddle.speedX = -paddle.speed
            break
        case input.RIGHT:
            paddle.speedX = paddle.speed
            break
        case input.STOP:
            paddle.speedX = 0
            break
    }
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

// DRAW CLASS
class Draw {
    constructor() {
        this.BACKGROUND_COLOR = "rgb(0, 0, 0)"
        this.SIDE_COLOR = "rgb(94, 94, 94)"
        this.BALL_COLOR = "rgb(255, 255, 255)"
        this.PADDLE_COLOR = "rgb(255, 255, 255)"
    }

    /* DRAW BACKGROUND FUNCTION
    The function that is responsible for drawing the background of the game.
    (#000000 (black) color)
    */
    drawBackground() {
        ctx.fillStyle = this.BACKGROUND_COLOR
        ctx.fillRect(0, 0, width, height)
    }

    /* DRAW BALL FUNCTION
    The function that is responsible for drawing the ball of the game.
    (#ffffff (white) color)
    */
    drawBall() {
        ctx.fillStyle = this.BALL_COLOR
        ctx.fillRect(ball.x - ball.width * 0.5, ball.y - ball.height * 0.5, ball.width, ball.height)
    }

    /* DRAW PADDLE FUNCTION
    The function that is responsible for drawing the paddle of the game.
    (#ffffff (white) color)
    */
    drawPaddle() {
        ctx.fillStyle = this.PADDLE_COLOR
        ctx.fillRect(paddle.x - paddle.width * 0.5, paddle.y - paddle.height * 0.5, paddle.width, paddle.height)
    }

    /* DRAW SIDES FUNCTION
    The function that is responsible for drawing the sides of the game.
    (#5e5e5e (dark gray) color)
    */
    drawSides() {
    let hside = side * 0.5
    ctx.strokeStyle = this.SIDE_COLOR
    ctx.beginPath()
    ctx.moveTo(hside, height)
    ctx.lineTo(hside, hside)
    ctx.lineTo(width - hside, hside)
    ctx.lineTo(width - hside, height)
    ctx.stroke()
    }
}

/* DRAW GAME FUNCTION
The main function of the entire game,
which is responsible for rendering and updating elements.
*/
const drawGame = (timestamp) => {
    if (!lastTime) {
        lastTime = timestamp
    }

    // CALCULATE TIME DIFFERENCE
    deltaTime = (timestamp - lastTime) * 0.001 //? seconds
    lastTime = timestamp

    // UPDATE ELEMENTS
    paddleUpdate(deltaTime)
    ballUpdate(deltaTime)

    const draw = new Draw
    // DRAW GAME ELEMENTS
    draw.drawBackground()
    draw.drawSides()
    draw.drawBall()
    draw.drawPaddle()

    // CREATE NEXT GAME LOOP
    requestAnimationFrame(drawGame)
}

const createNewGame = () => {
    requestAnimationFrame(drawGame)
    startNewGame()
    setDimensions()
}

createNewGame()