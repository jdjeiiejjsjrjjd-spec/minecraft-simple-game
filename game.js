// إعدادات اللعبة
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// حجم كل مكعب
const BLOCK_SIZE = 40;

// أنواع المكعبات
const BLOCK_TYPES = {
    EMPTY: 0,
    GRASS: 1,
    DIRT: 2,
    STONE: 3,
    WOOD: 4
};

// الألوان
const COLORS = {
    0: '#87CEEB', // سماء
    1: '#22AA22', // عشب
    2: '#8B7355', // تراب
    3: '#808080', // حجر
    4: '#8B4513'  // خشب
};

// خريطة اللعبة
let gameMap = [];
let playerX = 5;
let playerY = 5;
let selectedBlock = BLOCK_TYPES.GRASS;

// المفاتيح المضغوطة
const keys = {};

// إنشاء خريطة جديدة
function createMap() {
    gameMap = [];
    for (let y = 0; y < 15; y++) {
        gameMap[y] = [];
        for (let x = 0; x < 20; x++) {
            // طبقات أرضية
            if (y < 5) {
                gameMap[y][x] = BLOCK_TYPES.GRASS;
            } else if (y < 10) {
                gameMap[y][x] = BLOCK_TYPES.DIRT;
            } else {
                gameMap[y][x] = BLOCK_TYPES.STONE;
            }
        }
    }
}

// رسم المكعبات
function drawMap() {
    for (let y = 0; y < gameMap.length; y++) {
        for (let x = 0; x < gameMap[y].length; x++) {
            const blockType = gameMap[y][x];
            const color = COLORS[blockType];
            
            ctx.fillStyle = color;
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            
            // رسم حدود
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}

// رسم اللاعب
function drawPlayer() {
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(playerX * BLOCK_SIZE + 5, playerY * BLOCK_SIZE + 5, BLOCK_SIZE - 10, BLOCK_SIZE - 10);
}

// حركة اللاعب
function movePlayer() {
    let newX = playerX;
    let newY = playerY;
    
    if (keys['ArrowUp'] || keys['w'] || keys['W']) newY--;
    if (keys['ArrowDown'] || keys['s'] || keys['S']) newY++;
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) newX--;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) newX++;
    
    // التحقق من الحدود
    if (newX >= 0 && newX < 20 && newY >= 0 && newY < 15) {
        playerX = newX;
        playerY = newY;
    }
}

// البناء والحفر
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / BLOCK_SIZE);
    const y = Math.floor((e.clientY - rect.top) / BLOCK_SIZE);
    
    if (x >= 0 && x < 20 && y >= 0 && y < 15) {
        gameMap[y][x] = selectedBlock;
    }
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / BLOCK_SIZE);
    const y = Math.floor((e.clientY - rect.top) / BLOCK_SIZE);
    
    if (x >= 0 && x < 20 && y >= 0 && y < 15) {
        gameMap[y][x] = BLOCK_TYPES.EMPTY;
    }
});

// تتبع المفاتيح
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// حلقة اللعبة الرئيسية
function gameLoop() {
    // مسح الشاشة
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // تحديث وحركة
    movePlayer();
    
    // رسم
    drawMap();
    drawPlayer();
    
    requestAnimationFrame(gameLoop);
}

// بدء اللعبة
createMap();
gameLoop();