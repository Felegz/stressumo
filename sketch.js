var player, s;

var anger = 0;
var maxAnger = 100;
var kamikazeMode = false;

var angerGameplayOff = true;

//var enemy;


var health = 99,
    maxHealth = 99;

var score = 0;
var highScore = 0;
var myCursor;

//var bullet = [];

var bullets;
var enemies;
var walls;

var gameStatePlaying = true,
    gameStateResting = false,
    gameStateGeneratingNewWave = false,
    gameStateGoodJob = false,
    gameStateDied = false;

//enemyCountNewWave = 0,
var maxEnemies = 3,
    currentEnemiesSpawned = 0,
    enemySpawnRate = 8;


var backgroundR = 60,
    backgroundG = 122,
    backgroundB = 185;

var textR = 172,
    textG = 185,
    textB = 61;

var wallR = 76,
    wallG = 93,
    wallB = 147;

var playerR = 215,
    playerG = 236,
    playerB = 39;

var enemyR = 127,
    enemyG = 116,
    enemyB = 71;



function setup() {
    createCanvas(800, 600);


    bullets = new Group();
    enemies = new Group();
    walls = new Group();

    //manager = new SceneManager;

    //walls

    createWall(0, 0, 1800, 45);
    createWall(0, 0, 100, 1200);
    createWall(0, height, 1800, 45);
    createWall(width, 0, 100, 1600);

    textAlign(CENTER);

    //my custom cursor
    noCursor();
    myCursor = createSprite(
        width / 2, height / 2, 5, 5);
    myCursor.shapeColor = color(255);
    //bullet[0]="hello";
    //console.log(bullet[0]);


    player = createSprite(
        width / 2, height / 2, 40, 40);
    player.shapeColor = color(playerR, playerG, playerB); ///PLAYER COLOR
    player.rotateToDirection = true;
    player.maxSpeed = 450;
    player.friction = 0.99;

    /*var buttonReset = createButton("Reset");
    buttonReset.mousePressed(resetSketch);*/


    /* var buttonAnger = createButton("The more you have... mode");
    buttonAnger.mousePressed(switchAngerMode);
*/

    /*enemy = createSprite(
        random(10, width - 10), random(10, height - 10), 45, 45);

    enemy.shapeColor = color(10);
    enemy.rotateToDirection = true;
    //r.rotateToDirection = true;
    enemy.maxSpeed = 100;
    enemy.friction = 0.99;*/

    createEnemy();
    createEnemy();
    createEnemy();


    //enemy.setCollider ( type  offsetX  offsetY  width  height )

}

function keyTyped() {
    if (key === 'r') {
        resetSketch();
    } else if (key === 'R') {
        resetSketch();
    }
    if (key === 'a') {
        switchAngerMode()
    } else if (key === 'A') {
        switchAngerMode()
    }
    // uncomment to prevent any default behavior
    // return false;
}

function switchAngerMode() {
    if (angerGameplayOff) {
        angerGameplayOff = false
    } else angerGameplayOff = true;
}

function resetSketch() {



    anger = 0;
    maxAnger = 100;
    kamikazeMode = false;
    //angerGameplayOff = true;
    health = 99;
    maxHealth = 99;
    score = 0;
    gameStatePlaying = true;
    gameStateResting = false;
    gameStateGeneratingNewWave = false;
    gameStateGoodJob = false;
    gameStateDied = false;
    maxEnemies = 3;
    currentEnemiesSpawned = 0;
    enemySpawnRate = 8;


    if (enemies.length > 0) {
        for (var i = 0; i < enemies.length; i++) {
            var g = enemies[i];
            g.remove();
        }
    }

    player.remove();
    player = createSprite(
        width / 2, height / 2, 40, 40);
    player.shapeColor = color(playerR, playerG, playerB); ///PLAYER COLOR
    player.rotateToDirection = true;
    player.maxSpeed = 450;
    player.friction = 0.99;
}

function createWall(x1, y1, x2, y2) {
    var newWall = createSprite(
        x1, y1, x2, y2);
    console.log("stena blet");
    newWall.shapeColor = color(wallR, wallG, wallB); /////WALL COLOR
    walls.add(newWall);
}

//function drawWalls() {}

function createEnemy() {
    if (enemies.length < 42) {
        var enemySize = random(45, 60);
        var newEnemy = createSprite(
            random(20, width - 20), random(20, height - 20), enemySize, enemySize);
        //newEnemy.spriteColor = color(255,0,0);
        newEnemy.shapeColor = color(enemyR, enemyG, enemyB);

        newEnemy.rotateToDirection = true;
        //r.rotateToDirection = true;
        newEnemy.maxSpeed = 100;
        newEnemy.friction = 0.99;
        //newEnemy.life = 1000 * 30;

        //newEnemy.displace(player);
        //newEnemy.displace(bullets);
        //newEnemy.size;
        enemies.add(newEnemy);
    }


}

function spawnEnemies() {
    if (enemies.length <= 0) {
        for (i = 0; i < maxEnemies; i++) {

            createEnemy();
        };
        maxEnemies++;
    }
}


function keyPressed() {
    if (keyCode === 'r') {
        console.log("RRRRRRRRRRRRRRRRRRRRR")
    }
}

function mousePressed() {
    if (!gameStateDied) {
        if (angerGameplayOff) {
            shoot()
        } else if (anger >= 0) {
            shoot();
            anger -= 10;
        }
    }

    //camera.position.x = camera.position.x+random(-5,5); //shitty screenshake
    //camera.position.y = camera.position.y+random(-5,5);


}


function shoot() {

    var newBullet = createSprite(player.position.x, player.position.y, 30, 25);

    newBullet.maxSpeed = 5;
    newBullet.shapeColor = color(172, 185, 61); //////BULLET COLOR
    newBullet.rotateToDirection = true;
    newBullet.velocity.x = (mouseX - newBullet.position.x) * 0.5;
    newBullet.velocity.y = (mouseY - newBullet.position.y) * 0.5;

    //newBullet.displace(enemy);
    newBullet.life = 1000;
    //i++;
    bullets.add(newBullet);
}




function drawGameOver() {
    textSize(120);
    fill(200, 10, 0);
    textAlign(CENTER);
    text("YOU\nTRIED", width / 2, height / 2);
    textSize(32);
    var scoreMessage;
    if (score >= highScore) {
        highScore = score;

        scoreMessage = "and your new highscore is " + highScore + "!";
    } else scoreMessage = "and did a good job!";
    text(scoreMessage + "\nThank you for playing! Hit R to replay", width / 2, height / 2 + 200);
};

function drawWelcome() {
    textSize(45);
    fill(200, 10, 0);
    textAlign(CENTER);
    text("Move cursor to move\nShoot Left Mouse Button to shoot\nYou'll figure the rest, I believe in you!", width / 2, height / 2);

};

function drawScoreHp() {
    textSize(32);
    fill(226, 229, 52);
    fill(textR, textG, textB);

    text("SCORE:" + score, 150, 100);


    text("HP:" + health, width - 150, 100);



    if (!angerGameplayOff) {
        text("ANGER:" + anger, width / 2, 100);
    }
};

function generateEnemyWaves() {
    //console.log("generateEnemyWaves");
    if (currentEnemiesSpawned <= maxEnemies) {
        currentEnemiesSpawned++;
        //console.log("currentEnemiesSpawned <= maxEnemies");
        //console.log("currentEnemiesSpawned", currentEnemiesSpawned);
        //console.log("maxEnemies", maxEnemies)
        createEnemy();

    } else {
        //console.log("currentEnemiesSpawned > maxEnemies");
        gameStateGeneratingNewWave = false;
        gameStatePlaying = true;
        currentEnemiesSpawned = 0;
        maxEnemies++;
    }

};


function draw() {


    background(backgroundR, backgroundG, backgroundB);
    drawScoreHp();

    if (gameStatePlaying && health <= 0) {
        gameStatePlaying = false;
        gameStateDied = true;
        player.remove();
    } else if (health <= maxHealth && frameCount % (maxEnemies * 2) == 0) {
        health++
    }

    if (gameStateDied) drawGameOver();



    if (player.overlap(enemies)) {
        console.log("player overlaps enemy, hp=", health);

        health--;
        anger += 2;
    }
    //GAME STATES
    if (enemies.length == 0 && gameStatePlaying) {
        gameStatePlaying = false;
        gameStateResting = true;

    }
    if (gameStateResting) {
        health++;
        if (health >= 100) {
            console.log("resting", health);
            gameStateResting = false;
            gameStateGeneratingNewWave = true;
            maxHealth++;
        }
    }

    if (gameStateGeneratingNewWave && (frameCount % enemySpawnRate == 0)) {
        //console.log("yobanah:" + gameStateGeneratingNewWave);
        generateEnemyWaves();
    }
    if (gameStatePlaying || gameStateGeneratingNewWave) {
        for (var i = 0; i < enemies.length; i++) {
            var g = enemies[i];
            g.velocity.x = (player.position.x - g.position.x) * 0.5;
            g.velocity.y = (player.position.y - g.position.y) * 0.5;
            //moving all the ghosts y following a sin function (sinusoid) 
            g.position.y += sin(frameCount / 10);

            if (g.position.y < 0 || g.position.y > height || g.position.x < 0 || g.position.x > width) {
                score++;


                g.remove();

                console.log("enemies.length=" +
                    enemies.length);

            };
        }
    } else if (gameStateDied) {
        for (var i = 0; i < enemies.length; i++) {
            var g = enemies[i];
            g.velocity.x = (mouseX - g.position.x) * 2;
            g.velocity.y = (mouseY - g.position.y) * 2;
            //moving all the ghosts y following a sin function (sinusoid) 
            g.position.y += sin(frameCount / 10);

            if (g.position.y < 0 || g.position.y > height || g.position.x < 0 || g.position.x > width) {
                score++;;
                g.remove();

                /*console.log("enemies.length=",                    enemies.length);*/

            };
        }
    };

    //player.collide(enemy);
    //for(i=0; i<bullet.length; i++){console.log(i)};
    for (var i = 0; i < bullets.length; i++) {
        var g = bullets[i];
        g.position.y += sin(frameCount / 10);
    }


    myCursor.position.x = mouseX;
    myCursor.position.y = mouseY;
    myCursor.depth = -1;

    player.velocity.x = (mouseX - player.position.x) * 1.9;
    player.velocity.y = (mouseY - player.position.y) * 1.9;
    //if (mouseIsPressed) {
    //player.attractionPoint(0.5, mouseX, mouseY);
    //}


    if (angerGameplayOff) {
        if (!gameStateDied && mouseIsPressed) {



            anger--;
            player.velocity.x = player.velocity.x * -3;
            player.velocity.y = player.velocity.y * -3;
            //player.attractionPoint(0.5, mouseX, mouseY);
        } else {
            player.velocity.x = (mouseX - player.position.x) * 1.9;
            player.velocity.y = (mouseY - player.position.y) * 1.9;
        };



    } else angerGameplayShooting();
    if (player.position.y < 0 || player.position.y > height || player.position.x < 0 || player.position.x > width) {
        health--;
    }
    bullets.displace(enemies);
    enemies.displace(enemies);
    enemies.collide(player);
    player.collide(enemies);
    drawSprites();
}


function angerGameplayShooting() {
    if (!gameStateDied && mouseIsPressed) {
        if (anger > 0) {

            shoot();
        }
        anger--;
        player.velocity.x = player.velocity.x * -3;
        player.velocity.y = player.velocity.y * -3;
        //player.attractionPoint(0.5, mouseX, mouseY);
    } else {
        player.velocity.x = (mouseX - player.position.x) * 1.9;
        player.velocity.y = (mouseY - player.position.y) * 1.9;
    };

    if (!gameStateDied && anger > 100 && kamikazeMode == false) {
        kamikazeMode = true;
    }
    if (!gameStateDied && anger <= 0 && kamikazeMode == true) {
        kamikazeMode = false;
    }
    if (!gameStateDied && kamikazeMode) {
        if (anger > 0) {
            player.velocity.x = player.velocity.x * -2;
            player.velocity.y = player.velocity.y * -2;
            anger -= 2;

            if (frameCount % 15 == 0) {
                shoot();
            }
        }
    }
}
//console.log(i);
//if (player.overlap(enemy)) console.log("player overlaps enemy");

//bullet[i].displace(enemy);
//player.collide(enemies);
//enemies.collide(player);


//bullet[i].displace(enemy);







//old mousePressed
/* bullet[i] = createSprite(player.position.x, player.position.y, 30, 25);
   
 bullet[i].spriteColor = color(0, 52, 50);
 bullet[i].maxSpeed = 5;
   
 
 //if no image or animation is associated it will be a rectancle of the specified size
 //and a random color

 //now you can use the variable to set properties
 //e.g. a random velocity on the x and y coordinates
 //s.velocity.x = random(-5, 5);
 //s.velocity.y = random(-5, 5);
 bullet[i].shapeColor = color(155, 11, 100);
 bullet[i].rotateToDirection = true;
 bullet[i].velocity.x = (mouseX - bullet[i].position.x) * 0.5;
 bullet[i].velocity.y = (mouseY - bullet[i].position.y) * 0.5;
   
   
  bullet[i].displace(enemy);
   bullet[i].life = 1000;
   i++;*/



/*
 // single enemy
 enemy.shapeColor = color(100);
 enemy.rotateToDirection = true;
 enemy.velocity.x = (player.position.x - enemy.position.x) * 0.5;
 enemy.velocity.y = (player.position.y - enemy.position.y) * 0.5;
 enemy.position.y += sin(frameCount / 10);*/

//s.collide(enemy);

//if(str.overlap(enemy)) {console.log("YOBA")};
