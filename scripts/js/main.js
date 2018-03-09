function init() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    let game = new Game(context, canvas);
    game.init();
}

