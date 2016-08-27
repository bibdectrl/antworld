"use strict";

var antWorld;
var canvas;
var resetButton;

const HEIGHT = 60;
const WIDTH = 80;
const CELLSIZE = 10;
const WHITE = 0;
const BLACK = 1;
const ANT = 2;

function Ant(x, y, world){
  this.x = x;
  this.y = y;
  this.angle = 90;
  this.world = world;
  this.update = function(){
    if (this.world[this.x][this.y] === WHITE){
      this.white();
    } else {
      this.black();
    }
  }
  this.white = function(){
    this.world[this.x][this.y] = BLACK;
    this.move(-90);
  };
  this.black = function(){
    this.world[this.x][this.y] = WHITE;
    this.move(90);
  };

  this.move = function(angle){
    this.angle = this.angle + angle;
    if (this.angle < 0) this.angle = 270;
    if (this.angle == 360) this.angle = 0;
    var a = this.angle
    if (a === 0){
      this.x += 1;
    } else if (a === 90){
      this.y -= 1;
    } else if (a === 180){
      this.x -= 1;
    } else if (a === 270){
      this.y += 1;
    }
    if (this.x == WIDTH){
      this.x = 0
    } else if (this.x < 0){
      this.x = WIDTH - 1;
    }
    if (this.y == HEIGHT){
      this.y = 0
    } else if (this.y < 0) {
      this.y = HEIGHT - 1;
    }

  }

  this.show = function(){
    fill(255, 0, 0);
    rect(this.x * CELLSIZE, this.y * CELLSIZE, CELLSIZE, CELLSIZE);
  }
}

function AntWorld(width, height){
  this.width = width;
  this.height = height;
  this.grid = [];
  for (var x = 0; x < this.width; x++){
    this.grid[x] = []
    for (var y = 0; y < this.height; y++){
      this.grid[x][y] = WHITE;
    }
  };
  this.ants = [];
  this.ants.push(new Ant(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height), this.grid));

  this.addAnt = function(x, y){
    this.ants.push(new Ant(x, y, this.grid));
  }

  this.show = function(){
    for (var x = 0; x < this.width; x++){
      for (var y = 0; y < this.height; y++){
        if (this.grid[x][y] == WHITE){
          fill(255, 255, 255);
        } else {
          fill(0, 0, 0);
        }
        rect(x*CELLSIZE, y*CELLSIZE, CELLSIZE, CELLSIZE);
      }
    }
    for (var i = 0; i < this.ants.length; i++){
      this.ants[i].show();
    }
  };
  this.update = function(){
    for (var i = 0; i < this.ants.length; i++){
      this.ants[i].update();
    }
  }

}


function setup(){
  canvas = createCanvas(800, 600);
  canvas.parent('canvasHere');
  antWorld = new AntWorld(WIDTH, HEIGHT);
  noStroke();
  resetButton = createButton('reset').parent('reset');
  resetButton.mousePressed(function(){ antWorld = new AntWorld(WIDTH, HEIGHT);});

}

function draw(){
  antWorld.update();
  antWorld.show();
  if (mouseIsPressed){
    antWorld.addAnt(Math.floor(mouseX / CELLSIZE),
                    Math.floor(mouseY / CELLSIZE));
  }
}
