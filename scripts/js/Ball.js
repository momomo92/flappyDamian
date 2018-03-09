function Ball(context, canvas) {
    const that = this;
    this.canvas = canvas;
    this.context = context;
    this.size = 70;
    this.position = {};
    this.fly = false;
    this.alive = true;

    this.init = function() {
        this.img = new Image();
        this.img.src = './d.jpg';
        this.position = {
            'positionX': 30,
            'positionY': (this.canvas.height / 2) - (this.size / 2),
        };
        this.fly = false;
        this.alive = true;
        this.addKeyEvent(window);
    };

    this.addKeyEvent = function(window) {
        window.onkeydown = function(event) {
            if (event.keyCode = 32) {
                that.fly = true;
            }
        };

        window.onkeyup = function(event) {
            if (event.keyCode = 32) {
                that.fly = false;
            }
        }
    };

    this.move = function() {
        this.changePosition();
        this.draw();
    };

    this.changePosition = function() {
        if (!this.fly) {
            this.position.positionY += 3;
        } else {
            this.position.positionY -= 3;
        }

    };

    this.draw = function() {

        this.context.save();
        this.context.drawImage(this.img, this.position.positionX, this.position.positionY, this.size,this.size);
        this.context.restore();
    };

    this.checkPosition = function() {
        if (this.position.positionY < 0 || this.position.positionY + this.size > this.canvas.height) {
            this.alive = false;
        }
    }
}