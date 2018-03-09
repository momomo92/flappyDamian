function Game(context, canvas) {
    const that = this;
    this.canvas = canvas;
    this.context = context;
    this.ball = new Ball(this.context, this.canvas);
    this.walls = new Walls(this.context, this.canvas);

    this.init = function() {
        this.welcomeScreen();
    };

    this.welcomeScreen = function() {
        context.font = "18px Arial";
        context.fillStyle = "#0095DD";
        context.fillText("Chcesz Na chwilę stać się Damianem?", this.canvas.width / 2 - 220, this.canvas.height/2 - 50);

        context.font = "16px Arial";
        context.fillStyle = "red";
        context.fillText("Press enter!", this.canvas.width / 2 - 110, this.canvas.height/2);

        this.addKeyEvent(window);
    };

    this.playGame = function() {
        this.ball.init();
        this.walls.init();
        this.intervalId = setInterval(function() {
            that.ball.checkPosition();
            that.walls.checkPosition(that.ball);

            if (that.walls.shouldAddWall) {
                that.walls.addWall();
            }
            if (that.ball.alive) {
                context.clearRect(0, 0, that.canvas.width, that.canvas.height);
                that.ball.move();
                that.walls.move();
            } else {
                that.endGame();
            }
        }, 10);
    };

    this.endGame = function() {
        clearInterval(this.intervalId);
        context.font = "16px Arial";
        context.fillStyle = "#0095DD";
        context.fillText("GAME OVER", this.canvas.width / 2 - 60, 140);

        context.font = "16px Arial";
        context.fillStyle = "red";
        context.fillText("Pres enter to star game!", this.canvas.width / 2 - 100, 200);

        this.addKeyEvent(window);
    };

    this.addKeyEvent =function(window) {
        window.onkeydown = function(event) {
            const keyCode = event.keyCode;

            if (keyCode == 13) {
                that.playGame();
            }
        }
    };
}