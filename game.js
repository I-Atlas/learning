class Ball {
    constructor() {
        this.w = wall;
        this.h = wall;
        this.x = paddle.x;
        this.y = paddle.y - paddle.h / 2 - this.h / 2;
        this.spd = BALL_SPD * height;
        this.xv = 0;
        this.yv = 0;

        this.setSpeed = function (spdMult) {
            this.spd = Math.max(this.spd, BALL_SPD * height * spdMult);
        };
    }
}

class Brick {
    constructor(left, top, w, h, color, score, spdMult) {
        this.w = w;
        this.h = h;
        this.bot = top + h;
        this.left = left;
        this.right = left + w;
        this.top = top;
        this.color = color;
        this.score = score;
        this.spdMult = spdMult;

        this.intersect = function (ball) {
            let bBot = ball.y + ball.h * 0.5;
            let bLeft = ball.x - ball.w * 0.5;
            let bRight = ball.x + ball.w * 0.5;
            let bTop = ball.y - ball.h * 0.5;
            return this.left < bRight
                && bLeft < this.right
                && this.bot > bTop
                && bBot > this.top;
        };
    }
}

class Paddle {
    constructor() {
        this.w = PADDLE_W * width;
        this.h = wall * PADDLE_SIZE;
        this.x = width / 2;
        this.y = height - wall * 3.5 + this.h / 2;
        this.spd = PADDLE_SPD * width;
        this.xv = 0;
    }
}


class PowerUp {
    constructor(x, y, size, type) {
        this.w = size;
        this.h = size;
        this.x = x;
        this.y = y;
        this.type = type;
        this.yv = PUP_SPD * height;
    }
}

    // game parameters
    const BALL_SPD = 0.5; // starting ball speed as a fraction of screen height per second
    const BALL_SPD_MAX = 2; // max ball speed as a multiple of starting speed
    const BALL_SPIN = 0.2; // ball deflection off the paddle (0 = no spin, 1 = high spin)
    const BRICK_COLS = 14; // number of brick columns
    const BRICK_GAP = 0.3; // brick gap as a fraction of wall width
    const BRICK_ROWS = 8; // starting number of brick rows
    const GAME_LIVES = 3; // starting number of game lives
    const KEY_SCORE = "breakout_highscore"; // save key for local storage of high score
    const MARGIN = 6; // number of empty rows above the bricks
    const MAX_LEVEL = 10; // maximum game level (+2 rows of bricks per level)
    const MIN_BOUNCE_ANGLE = 30; // minimum bounce angle from the horizontal in degrees
    const PADDLE_SIZE = 1.5; // paddle size as a multiple of wall thickness
    const PADDLE_SPD = 0.5; // fraction of screen width per second
    const PADDLE_W = 0.1; // paddle width as a fraction of screen width
    const PUP_BONUS = 50; // bonus points for collecting an extra powerup
    const PUP_CHANCE = 0.1; // probability of a powerup per brick hit (between 0 and 1)
    const PUP_SPD = 0.15; // powerup speed as a fraction of screen height per second
    const WALL = 0.02; // wall/ball size as a fraction of the shortest screen dimension

    // colours
    const COLOR_BACKGROUND = "black";
    const COLOR_BALL = "white";
    const COLOR_PADDLE = "white";
    const COLOR_TEXT = "white";
    const COLOR_WALL = "grey";

    // text
    const TEXT_FONT = "Lucida Console";
    const TEXT_GAME_OVER = "GAME OVER";
    const TEXT_LEVEL = "Level";
    const TEXT_LIVES = "Ball";
    const TEXT_SCORE = "Score";
    const TEXT_SCORE_HIGH = "BEST";
    const TEXT_WIN = "!!! YOU WIN !!!";

    // definitions
    const Direction = {
        LEFT: 0,
        RIGHT: 1,
        STOP: 2
    }

    const PupType = {
        EXTENSION: {color: "dodgerblue", symbol: "="},
        LIFE: {color: "hotpink", symbol: "💓"},
        STICKY: {color: "forestgreen", symbol: "🔒"},
        SUPER: {color: "magenta", symbol: "🌌"},
        DEATH: {color: "red", symbol: "☠️"}
    }

    // set up the game canvas and context
    const canv = document.getElementById("arkanoid")
    const ctx = canv.getContext("2d")

    // set up sound effects
    var fxBrick = new Audio("sounds/brick.m4a");
    var fxPaddle = new Audio("sounds/paddle.m4a");
    var fxPowerup = new Audio("sounds/powerup.m4a");
    var fxWall = new Audio("sounds/wall.m4a");

    // game variables
    var ball, bricks = [], paddle, pups = [];
    var gameOver, pupExtension, pupSticky, pupSuper, win;
    var level, lives, score, scoreHigh;
    var numBricks, textSize, touchX;

    // dimensions
    var height, width, wall;
    setDimensions();

    // event listeners
    canv.addEventListener("touchcancel", touchCancel);
    canv.addEventListener("touchend", touchEnd);
    canv.addEventListener("touchmove", touchMove);
    canv.addEventListener("touchstart", touchStart);
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    window.addEventListener("resize", setDimensions);

    // set up the game loop
    var timeDelta, timeLast;
    requestAnimationFrame(loop);

    function loop(timeNow) {
        
        if (!timeLast) {
            timeLast = timeNow;
        }

        // calculate the time difference
        timeDelta = (timeNow - timeLast) * 0.001; // seconds
        timeLast = timeNow;

        // update
        if (!gameOver) {
            updatePaddle(timeDelta);
            updateBall(timeDelta);
            updateBricks(timeDelta);
            updatePups(timeDelta);
        }

        // draw
        drawBackground();
        drawWalls();
        drawPups();
        drawPaddle();
        drawBricks();
        drawText();
        drawBall();

        // call the next loop
        requestAnimationFrame(loop);
    }

    // update the x and y velocities of the ball
    function applyBallSpeed(angle) {
        ball.xv = ball.spd * Math.cos(angle);
        ball.yv = -ball.spd * Math.sin(angle);
    }

    function createBricks() {
        
        // row dimensions
        let minY = wall;
        let maxY = ball.y - ball.h * 3.5;
        let totalSpaceY = maxY - minY;
        let totalRows = MARGIN + BRICK_ROWS + MAX_LEVEL * 2;
        let rowH = totalSpaceY / totalRows;
        let gap = wall * BRICK_GAP;
        let h = rowH - gap;
        textSize = rowH * MARGIN * 0.5;

        // column dimensions
        let totalSpaceX = width - wall * 2;
        let colW = (totalSpaceX - gap) / BRICK_COLS;
        let w = colW - gap;

        // populate the bricks array
        bricks = [];
        let cols = BRICK_COLS;
        let rows = BRICK_ROWS + level * 2;
        let color, left, rank, rankHigh, score, spdMult, top;
        numBricks = cols * rows;
        rankHigh = rows * 0.5 - 1;
        for (let i = 0; i < rows; i++) {
            bricks[i] = [];
            rank = Math.floor(i * 0.5);
            score = (rankHigh - rank) * 2 + 1;
            spdMult = 1 + (rankHigh - rank) / rankHigh * (BALL_SPD_MAX - 1);
            color = getBrickColor(rank, rankHigh);
            top = wall + (MARGIN + i) * rowH;
            for (let j = 0; j < cols; j++) {
                left = wall + gap + j * colW;
                bricks[i][j] = new Brick(left, top, w, h, color, score, spdMult);
            }
        }
    }

    function drawBackground() {
        ctx.fillStyle = COLOR_BACKGROUND;
        ctx.fillRect(0, 0, width, height);
    }

    function drawBall() {
        ctx.fillStyle = pupSuper ? PupType.SUPER.color : COLOR_BALL;
        ctx.fillRect(ball.x - ball.w * 0.5, ball.y - ball.h * 0.5, ball.w, ball.h);
    }

    function drawBricks() {
        for (let row of bricks) {
            for (let brick of row) {
                if (brick == null) {
                    continue;
                }
                ctx.fillStyle = brick.color;
                ctx.fillRect(brick.left, brick.top, brick.w, brick.h);
            }
        }
    }

    function drawPaddle() {
        ctx.fillStyle = pupSticky ? PupType.STICKY.color : COLOR_PADDLE;
        ctx.fillRect(paddle.x - paddle.w * 0.5, paddle.y - paddle.h * 0.5, paddle.w, paddle.h);
    }

    function drawPups() {
        ctx.lineWidth = wall * 0.35;
        for (let pup of pups) {
            ctx.fillStyle = pup.type.color;
            ctx.strokeStyle = pup.type.color;
            ctx.strokeRect(pup.x - pup.w * 0.5, pup.y - pup.h * 0.5, pup.w, pup.h);
            ctx.font = "bold " + pup.h + "px " + TEXT_FONT;
            ctx.textAlign = "center";
            ctx.fillText(pup.type.symbol, pup.x, pup.y);
        }
    }

    function drawText() {
        ctx.fillStyle = COLOR_TEXT;

        // dimensions
        let labelSize = textSize * 0.5;
        let margin = wall * 2;
        let maxWidth = width - margin * 2;
        let maxWidth1 = maxWidth * 0.27;
        let maxWidth2 = maxWidth * 0.2;
        let maxWidth3 = maxWidth * 0.2;
        let maxWidth4 = maxWidth * 0.27;
        let x1 = margin;
        let x2 = width * 0.4;
        let x3 = width * 0.6;
        let x4 = width - margin;
        let yLabel = wall + labelSize;
        let yValue = yLabel + textSize * 0.9;

        // labels
        ctx.font = labelSize + "px " + TEXT_FONT;
        ctx.textAlign = "left";
        ctx.fillText(TEXT_SCORE, x1, yLabel, maxWidth1);
        ctx.textAlign = "center";
        ctx.fillText(TEXT_LIVES, x2, yLabel, maxWidth2);
        ctx.fillText(TEXT_LEVEL, x3, yLabel, maxWidth3);
        ctx.textAlign = "right";
        ctx.fillText(TEXT_SCORE_HIGH, x4, yLabel, maxWidth4);

        // values
        ctx.font = textSize + "px " + TEXT_FONT;
        ctx.textAlign = "left";
        ctx.fillText(score, x1, yValue, maxWidth1);
        ctx.textAlign = "center";
        ctx.fillText(lives + "/" + GAME_LIVES, x2, yValue, maxWidth2);
        ctx.fillText(level, x3, yValue, maxWidth3);
        ctx.textAlign = "right";
        ctx.fillText(scoreHigh, x4, yValue, maxWidth4);

        // game over
        if (gameOver) {
            let text = win ? TEXT_WIN : TEXT_GAME_OVER;
            ctx.font = textSize + "px " + TEXT_FONT;
            ctx.textAlign = "center";
            ctx.fillText(text, width * 0.5, paddle.y - textSize, maxWidth);
        }
    }

    function drawWalls() {
        let hwall = wall * 0.5;
        ctx.lineWidth = wall;
        ctx.strokeStyle = COLOR_WALL;
        ctx.beginPath();
        ctx.moveTo(hwall, height);
        ctx.lineTo(hwall, hwall);
        ctx.lineTo(width - hwall, hwall);
        ctx.lineTo(width - hwall, height);
        ctx.stroke();
    }

    // red = 0, orange = 0.33, yellow = 0.67, green = 1
    function getBrickColor(rank, highestRank) {
        let fraction = rank / highestRank;
        let r, g, b = 0;

        // red to orange to yellow (increase green)
        if (fraction <= 0.67) {
            r = 255;
            g = 255 * fraction / 0.67;
        }

        // yellow to green (reduce red)
        else {
            r = 255 * (1 - fraction) / 0.33;
            g = 255;
        }

        // return the rgb colour string
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }

    function keyDown(ev) {
        switch (ev.keyCode) {
            case 32: // space bar (serve the ball)
                serve();
                if (gameOver) {
                    newGame();
                }
                break;
            case 37: // left arrow (move paddle left)
                movePaddle(Direction.LEFT);
                break;
            case 39: // right arrow (move paddle right)
                movePaddle(Direction.RIGHT);
                break;
        }
    }

    function keyUp(ev) {
        switch (ev.keyCode) {
            case 37: // left arrow (stop moving)
            case 39: // right arrow (stop moving)
                movePaddle(Direction.STOP);
                break;
        }
    }

    function movePaddle(direction) {
        switch (direction) {
            case Direction.LEFT:
                paddle.xv = -paddle.spd;
                break;
            case Direction.RIGHT:
                paddle.xv = paddle.spd;
                break;
            case Direction.STOP:
                paddle.xv = 0;
                break;
        }
    }

    function newBall() {
        pupExtension = false;
        pupSticky = false;
        pupSuper = false;
        paddle = new Paddle();
        ball = new Ball();
    }

    function newGame() {
        gameOver = false;
        level = 0;
        lives = GAME_LIVES;
        score = 0;
        win = false;

        // get high score from local storage
        let scoreStr = localStorage.getItem(KEY_SCORE);
        if (scoreStr == null) {
            scoreHigh = 0;
        } else {
            scoreHigh = parseInt(scoreStr);
        }
        
        // start a new level
        newLevel();
    }

    function newLevel() {
        pups = [];
        touchX = null;
        newBall();
        createBricks();
    }

    function outOfBounds() {
        lives--;
        if (lives == 0) {
            gameOver = true;
        }
        newBall();
    }

    function serve() {

        // ball already in motion
        if (ball.yv != 0) {
            return false;
        }

        // random angle (not less than min bounce angle)
        let minBounceAngle = MIN_BOUNCE_ANGLE / 180 * Math.PI; // radians
        let range = Math.PI - minBounceAngle * 2;
        let angle = Math.random() * range + minBounceAngle;
        applyBallSpeed(pupSticky ? Math.PI / 2 : angle);
        fxPaddle.play();
        return true;
    }

    function setDimensions() {
        height = window.innerHeight;
        width = window.innerWidth;
        wall = WALL * (height < width ? height : width);
        canv.width = width;
        canv.height = height;
        ctx.textBaseline = "middle";
        newGame();
    }

    function spinBall() {
        let upwards = ball.yv < 0;
        let angle = Math.atan2(-ball.yv, ball.xv);
        angle += (Math.random() * Math.PI / 2 - Math.PI / 4) * BALL_SPIN;

        // minimum bounce angle
        let minBounceAngle = MIN_BOUNCE_ANGLE / 180 * Math.PI; // radians
        if (upwards) {
            if (angle < minBounceAngle) {
                angle = minBounceAngle;
            } else if (angle > Math.PI - minBounceAngle) {
                angle = Math.PI - minBounceAngle;
            }
        } else {
            if (angle > -minBounceAngle) {
                angle = -minBounceAngle;
            } else if (angle < -Math.PI + minBounceAngle) {
                angle = -Math.PI + minBounceAngle;
            }
        }
        applyBallSpeed(angle);
    }

    function touchCancel(ev) {
        touchX = null;
        movePaddle(Direction.STOP);
    }

    function touchEnd(ev) {
        touchX = null;
        movePaddle(Direction.STOP);
    }

    function touchMove(ev) {
        touchX = ev.touches[0].clientX;
    }

    function touchStart(ev) {
        if (serve()) {
            if (gameOver) {
                newGame();
            }
            return;
        }
        touchX = ev.touches[0].clientX;
    }

    function updateBall(delta) {
        ball.x += ball.xv * delta;
        ball.y += ball.yv * delta;

        // bounce the ball off the walls
        if (ball.x < wall + ball.w * 0.5) {
            ball.x = wall + ball.w * 0.5;
            ball.xv = -ball.xv;
            spinBall();
        } else if (ball.x > width - wall - ball.w * 0.5) {
            ball.x = width - wall - ball.w * 0.5;
            ball.xv = -ball.xv;
            spinBall();
        } else if (ball.y < wall + ball.h * 0.5) {
            ball.y = wall + ball.h * 0.5;
            ball.yv = -ball.yv;
            spinBall();
        }

        // bounce off the paddle
        if (ball.y > paddle.y - paddle.h * 0.5 - ball.h * 0.5
            && ball.y < paddle.y + paddle.h * 0.5
            && ball.x > paddle.x - paddle.w * 0.5 - ball.w * 0.5
            && ball.x < paddle.x + paddle.w * 0.5 + ball.w * 0.5
        ) {
            ball.y = paddle.y - paddle.h * 0.5 - ball.h * 0.5;
            if (pupSticky) {
                ball.xv = 0;
                ball.yv = 0;
            } else {
                ball.yv = -ball.yv;
                spinBall();
            }
            fxPaddle.play();
        }

        // handle out of bounds
        if (ball.y > height) {
            outOfBounds();
        }
    }

    function updateBricks(delta) {

        // check for ball collisions
        OUTER: for (let i = 0; i < bricks.length; i++) {
            for (let j = 0; j < BRICK_COLS; j++) {
                if (bricks[i][j] != null && bricks[i][j].intersect(ball)) {
                    updateScore(bricks[i][j].score);
                    ball.setSpeed(bricks[i][j].spdMult);

                    // set ball to the edge of the brick
                    if (ball.yv < 0) { // upwards
                        ball.y = bricks[i][j].bot + ball.h * 0.5;
                    } else { // downwards
                        ball.y = bricks[i][j].top - ball.h * 0.5;
                    }

                    // create a powerup
                    if (Math.random() <= PUP_CHANCE) {
                        let px = bricks[i][j].left + bricks[i][j].w / 2;
                        let py = bricks[i][j].top + bricks[i][j].h / 2;
                        let pSize = bricks[i][j].w / 2;
                        let pKeys = Object.keys(PupType);
                        let pKey = pKeys[Math.floor(Math.random() * pKeys.length)];
                        pups.push(new PowerUp(px, py, pSize, PupType[pKey]));
                    }

                    // bounce the ball (if not a super ball) and destroy the brick
                    if (!pupSuper) {
                        ball.yv = -ball.yv;
                    }
                    bricks[i][j] = null;
                    numBricks--;
                    fxBrick.play();
                    spinBall();
                    break OUTER;
                }
            }
        }

        // next level
        if (numBricks == 0) {
            if (level < MAX_LEVEL) {
                level++;
                newLevel();
            } else {
                gameOver = true;
                win = true;
                newBall();
            }
        }
    }

    function updatePaddle(delta) {

        // handle touch
        if (touchX != null) {
            if (touchX > paddle.x + wall) {
                movePaddle(Direction.RIGHT);
            } else if (touchX < paddle.x - wall) {
                movePaddle(Direction.LEFT);
            } else {
                movePaddle(Direction.STOP);
            }
        }

        // move the paddle
        let lastPaddleX = paddle.x;
        paddle.x += paddle.xv * delta;

        // stop paddle at walls
        if (paddle.x < wall + paddle.w * 0.5) {
            paddle.x = wall + paddle.w * 0.5;
        } else if (paddle.x > width - wall - paddle.w * 0.5) {
            paddle.x = width - wall - paddle.w * 0.5;
        }

        // move the stationary ball with the paddle
        if (ball.yv == 0) {
            ball.x += paddle.x - lastPaddleX;
        }

        // collect powerups
        for (let i = pups.length - 1; i >= 0; i--) {
            if (
                pups[i].x + pups[i].w * 0.5 > paddle.x - paddle.w * 0.5
                && pups[i].x - pups[i].w * 0.5 < paddle.x + paddle.w * 0.5
                && pups[i].y + pups[i].h * 0.5 > paddle.y - paddle.h * 0.5
                && pups[i].y - pups[i].h * 0.5 < paddle.y + paddle.h * 0.5
            ) {
                switch(pups[i].type) {
                    case PupType.EXTENSION:
                        // double the width of the paddle
                        if (pupExtension) {
                            score += PUP_BONUS;
                        } else {
                            pupExtension = true;
                            paddle.w *= 2;
                        }
                        break;
                    case PupType.LIFE:
                        // add a life
                        lives++
                        break
                    case PupType.STICKY:
                        if (pupSticky) {
                            score += PUP_BONUS;
                        } else {
                            pupSticky = true;
                        }
                        break;
                    case PupType.SUPER:
                        if (pupSuper) {
                            score += PUP_BONUS;
                        } else {
                            pupSuper = true;
                        }
                        break;
                    case PupType.DEATH:
                        // remove a life
                        lives--
                        if (lives == 0) {
                            gameOver = true
                        }
                        break
                }
                pups.splice(i, 1);
            }
        }
    }

    function updatePups(delta) {
        for (let i = pups.length - 1; i >= 0; i--) {
            pups[i].y += pups[i].yv * delta;

            // delete off-screen pups
            if (pups[i].y - pups[i].h * 0.5 > height) {
                pups.splice(i, 1);
            }
        }
    }

    function updateScore(brickScore) {
        score += brickScore;

        // check for a high score
        if (score > scoreHigh) {
            scoreHigh = score;
            localStorage.setItem(KEY_SCORE, scoreHigh);
        }
    }
