var balloonImg, balloon,bgImg,bg;
var height, database;
function preload(){
  bgImg = loadImage("HotAirBallon-01.png");
  balloonImg = loadImage("HotAirBallon-02.png");
}

function setup(){
    database = firebase.database();
    createCanvas(1200,600);
    
    

    bg = createSprite(0,0,1200,600);
    bg.addImage(bgImg);
    

    balloon = createSprite(250,600,10,10);
    balloon.addImage(balloonImg);
    balloon.scale=0.5;

    var ballPosition = database.ref('balloon/height');
    ballPosition.on("value",readPosition,showError);
}

function draw(){
 
    

       
        if(keyDown(LEFT_ARROW)){
            writePosition(-10,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(10,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-10);
            balloon.scale -= 0.005;
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+10);
            balloon.scale += 0.005;
        }
    
    drawSprites();
    }


function writePosition(x,y){
    database.ref("balloon/height").set(
        { 
            'x':height.x+x,
            'y':height.y+y
        }
    )
}
function readPosition(data){
    height = data.val();
   console.log(height)
    balloon.x=height.x;
    balloon.y=height.y;
}
function showError(){
    console.log("error");    
}
