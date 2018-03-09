function Walls(context, canvas) {
    that = this;
    this.canvas = canvas;
    this.context = context;
    this.size = 30;
    this.distanse = 350;
    this.shouldAddWall = false;
    this.wallPosition = [];
    this.wallsNumber = 0;

    this.init = function() {
        this.wallPosition = [];
        this.wallsNumber = 0;
        this.shouldAddWall = false;
        this.addWall();
    };

    this.checkPosition = function(ball) {
        if (this.wallPosition[0].positionX + this.size <= 0) {
            this.wallsNumber--;
            this.wallPosition.shift();
        }

        if (this.canvas.width - this.wallPosition[this.wallsNumber-1].positionX + this.size > this.distanse) {
            this.shouldAddWall = true;
        }

        if ((this.wallPosition[0].positionX > Number(ball.position.positionX)
            && this.wallPosition[0].positionX < Number(ball.position.positionX) + Number(ball.size)
            && ball.position.positionY < this.wallPosition[0].hole.position)
            || (this.wallPosition[0].positionX > Number(ball.position.positionX)
                && this.wallPosition[0].positionX < Number(ball.position.positionX) + Number(ball.size)
                && Number(ball.position.positionY) + Number(ball.size) > Number(this.wallPosition[0].hole.position) + Number(this.wallPosition[0].hole.height))) {
            console.log('test');
            ball.alive = false;
        }
    };

    this.addWall = function() {
        this.wallPosition.push({'positionX': this.canvas.width, 'hole': this.randomHolePosition()});
        this.wallsNumber++;
        this.shouldAddWall = false;
    };

    this.randomHolePosition = function() {
        let position = Math.floor((Math.random() * (this.canvas.height - 240)) + 50);
        let height = Math.floor((Math.random() * 70) + 140);

        return {'position': position, 'height': height};
    };


    this.move = function() {
        this.changePosition();
        this.draw();
    };

    this.changePosition = function() {
        for (let wall = 0; wall < this.wallsNumber; wall++) {
            this.wallPosition[wall].positionX--;
        }
    };

    this.draw = function() {
        for (let wall = 0; wall < this.wallsNumber; wall++) {
            let holeHeight = this.wallPosition[wall].hole.position + this.wallPosition[wall].hole.height;
            this.context.beginPath();
            this.context.rect(this.wallPosition[wall].positionX, 0, this.size, this.wallPosition[wall].hole.position);
            this.context.rect(this.wallPosition[wall].positionX, holeHeight, this.size, this.canvas.height - holeHeight);
            this.context.fillStyle = "#0095DD";
            this.context.fill();
            this.context.closePath();
        }
    }
}