// Khai báo thẻ canvas
const canvas = document.querySelector('canvas');
// Tạo môi trường 2d
const c = canvas.getContext('2d');



// Set Canvas full màn hình  
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//#region Objects
// Tạo nhân vật
class Player {

    constructor() {
        // Vị trí
        this.position = {
            x: 100,
            y: 100
        }
        // Vận tốc
        this.velocity = {
            x: 0,
            y: 1
        }
        // Chiều Cao
        this.width = 30
        // Chiều dài
        this.height = 30
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    // cập nhật lại vị trí
    update() {
        // Trọng lực
        const gravity = 0.5

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
        else
            this.velocity.y = 0

        this.draw()
    }
}

// Nền Tàng
class Platform {
    constructor() {
        // Vị Trí
        this.position = {
            x: 300,
            y: 700
        }

        this.width = 200
        this.height = 10

    }

    draw() {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
//#region



const player = new Player()
const platform = new Platform()

const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
    right: {
        pressed: false,
    },
    right: {
        pressed: false,
    }
}

//#region Methods
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platform.draw();

    // Nếu như bấm nút phải, thì di chuyển sang phải +5, không thì dừng lại
    if (keys.right.pressed)
        player.velocity.x = 5
    else if (keys.left.pressed)
        player.velocity.x = -5
    else
        player.velocity.x = 0;

    //  nếu nhân vật chạm vào platform
    if (player.position.x + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width)
        player.velocity.y = 0;
}
//#region

//#region Events

// Window lắng nghe sự kiện nhận từ bàn phím
window.addEventListener('keydown', ({
    keyCode
}) => {
    // console.log('key down listen', keyCode);
    switch (keyCode) {
        case 37:
            console.log('left');
            // Set bấm phím "TRÁI"
            keys.left.pressed = true;
            // player.velocity.x -= 2;
            break;
        case 39:
            console.log('right');
            // Set bấm phím "PHẢI"
            keys.right.pressed = true;
            // player.velocity.x += 2;
            break;
        case 38:
            console.log('up');
            break;
        case 40:
            player.velocity.y += 10;
            console.log('down');

            break;

        default:
            break;
    }
})

window.addEventListener('keyup', ({
    keyCode
}) => {
    // console.log('key down listen', keyCode);
    switch (keyCode) {
        case 37:
            console.log('left');
            keys.left.pressed = false;
            // player.velocity.x -= 2;
            break;
        case 39:
            console.log('right');
            keys.right.pressed = false;
            // player.velocity.x += 2;
            break;
        case 38:
            console.log('up');
            player.velocity.y -= 20;
            break;
        case 40:
            console.log('down');

            break;

        default:
            break;
    }
})
//#region

animate();