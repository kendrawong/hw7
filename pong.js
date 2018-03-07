var puck = {
  x: 200,
  y: 200,
  xSpeed: 3,
  ySpeed: -1,
  r: 7
};
var edgeOffset = 20;

var player1 = {
  x: edgeOffset,
  y: 200,
  ht: 50,
  wd: 10
};

var player2 = {
  x: 400 - edgeOffset,
  y: 200,
  ht: 50,
  wd: 10
};

function setup() {
  createCanvas(400, 400);
}

var p1Score = 0;
var p2Score = 0;
var textPlay = '';
var textPlay2 = '';

function draw() {
  background("black");
  textSize(32);

  //draw net
  var ySquare = 0;
  while (ySquare < 400) {
    rect(200, ySquare, 3, 15);
    ySquare = ySquare + 20;
  }
  
  fill("white");
  
  //keep player 1's score
  text(p1Score, 100, 80);
  if (puck.x == 401) {
    p1Score = p1Score + 1;
  }

  //keep player 2's score
  text(p2Score, 300, 80);
  if (puck.x == -10) {
    p2Score = p2Score + 1;
  }
  
  textSize(20);
  textAlign(CENTER);
  text(textPlay, 200, 30);
  textPlay = 'Press SPACE for new game.';
  
  textSize(30);
  textAlign(CENTER);
  text(textPlay2, 200, 150);
	
  
  //if player1 wins
  if (p2Score < 10 && p1Score == 10) {
    textPlay2 = 'PLAYER 1 WINS!'; 
  }
   
   //if player2 wins	
   else if (p2Score == 10 && p1Score < 10) {
    textPlay2 = 'PLAYER 2 WINS!';
    puck.xSpeed = 0;
    puck.ySpeed = 0;
    puck.x = 400;
    puck.y = 250;
  }

  // draw puck
  ellipse(puck.x, puck.y, puck.r * 2);


  // move puck
  if (puck.y < puck.r || puck.y > height - puck.r) {
    puck.ySpeed = -puck.ySpeed;
  }

  puck.x += puck.xSpeed;
  puck.y += puck.ySpeed;

  // draw paddles
  rect(player1.x, player1.y, player1.wd, player1.ht);
  rect(player2.x - player2.wd, player2.y, player2.wd, player2.ht);

  // paddle movement
  if (player1.paddleDown && !player1.paddleUp) {
    player1.y += 3;
  }
  if (player1.paddleUp && !player1.paddleDown) {
    player1.y -= 3;
  }

  if (player2.paddleDown && !player2.paddleUp) {
    player2.y += 3;
  }
  if (player2.paddleUp && !player2.paddleDown) {
    player2.y -= 3;
  }

  // don't let paddles outside of the play area
  player1.y = constrain(player1.y, 0, height - player1.ht - 1);
  player2.y = constrain(player2.y, 0, height - player2.ht - 1);

  // bounce puck on paddles -- player 1 -- based on x-coordinate
  if (puck.x - puck.r < player1.x + player1.wd) {
    // check if puck is within paddle height...
    if (puck.y > player1.y && puck.y < player1.y + player1.ht) {
      puck.xSpeed = abs(puck.xSpeed);
    }
    if (puck.x < -200) {
      puck.x = 200;
      puck.y = 200;
    }
  }

  // bounce puck on paddles -- player 2 -- based on x-coordinate
  if (puck.x + puck.r > player2.x - player2.wd) {
    // check if puck is within paddle height...
    if (puck.y > player2.y && puck.y < player2.y + player2.ht) {
      puck.xSpeed = -abs(puck.xSpeed);
    }
    if (puck.x > 500) {
      puck.x = 200;
      puck.y = 200;
    }
  }
}

// keyboard input
function keyPressed() {
  print(key);
  if (key == 'Z') {
    player1.paddleDown = true;
  } else if (key == 'A') {
    player1.paddleUp = true;
  }

  if (keyCode == DOWN_ARROW) {
    player2.paddleDown = true;
  } else if (keyCode == UP_ARROW) {
    player2.paddleUp = true;
  }
  
  //hit spacebar to restart game
  if (keyCode == '32') {
    fill("white");
    p1Score = 0;
    p2Score = 0;
    puck.xSpeed = 3;
    puck.ySpeed = -1;
  	textPlay = '';
  }
  

}

function keyReleased() {
  if (key == 'Z') {
    player1.paddleDown = false;
  } else if (key == 'A') {
    player1.paddleUp = false;
  }

  if (keyCode == DOWN_ARROW) {
    player2.paddleDown = false;
  } else if (keyCode == UP_ARROW) {
    player2.paddleUp = false;
  }
}
