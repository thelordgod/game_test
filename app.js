

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

var MAX_PLAYER_SPEED = 2.0

function Player(sprite){
    this.sprite = sprite
    this.pos = { x : 0.0, y : 0.0}
    this.speed = { x : 0.0, y : 0.0}

    this.tick = function(delta){
        this.pos.x += this.speed.x * delta
        this.pos.y += this.speed.y * delta

        this.sprite.x = this.pos.x
        this.sprite.y = this.pos.y

        this.speed.x /= 4.0 * delta
        this.speed.y /= 4.0 * delta

        //console.log(this.speed.x + " " + this.speed.y)
    }
}

function Game(player){
    this.player = player
    this.last_input = ""
    this.key_state = {};

    this.process_input = function(){

        if (_this.key_state["d"] == true){
            if (_this.player.speed.x < MAX_PLAYER_SPEED) {
                _this.player.speed.x += 0.1
            }
        }

        if (_this.key_state["a"] == true){
            if (_this.player.speed.x > -MAX_PLAYER_SPEED) {
                _this.player.speed.x -= 0.1
            }
        }

        if (_this.key_state["w"] == true){
            if (_this.player.speed.y < MAX_PLAYER_SPEED) {
                _this.player.speed.y += 0.1
            }
        }

        if (_this.key_state["s"] == true){
            if (_this.player.speed.y > -MAX_PLAYER_SPEED) {
                _this.player.speed.y -= 0.1
            }
        }
    }

    let _this = this
    window.addEventListener('keydown',function(e){
        _this.key_state[e.key] = true;
    },true);

    window.addEventListener('keyup',function(e){
        _this.key_state[e.key] = false;
    },true);
}

function game_tick(state, delta) {
    state.player.tick(delta)
    state.process_input()
}

// load the texture we need
app.loader.add('bunny', 'bunny.png').load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    const bunny = new PIXI.Sprite(resources.bunny.texture);

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny);

    var player = new Player(bunny)
    var game = new Game(player)

    // Listen for frame updates
    app.ticker.add((delta) => {
        // each frame we spin the bunny around a bit
        //bunny.rotation += 0.01;
        game_tick(game, delta)
    });
});