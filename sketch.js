//Create variables here
var dog, happyDog, database, foodS, foodStock,dogImg1,dogImg,milkImg
var feed,addFood,feedDog,addTheFood
var lastFed,fedTime
var foodObj;
var changeGameState,readingGameState
var bedroomImg,washroomImg,gardenImg

function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg1.png")
  dogImg  = loadImage("images/dogImg.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(200,200,10,10);
  dog.addImage("dog",dogImg);
  dog.addImage("dog1",dogImg1)
  dog.scale = 0.3;
  foodObj=new Food()
  database = firebase.database();

feed=createButton("Feed the dog")
feed.position(500,95)
feed.mousePressed(feedDog)

addFood=createButton("Add Food")
addFood.position(600,95)
addFood.mousePressed(addTheFood)


} 

function draw() {  
background(46, 139, 87)
foodObj.display()
foodStock=database.ref('Food')
foodStock.on("value",getFoodStock);
fedTime=database.ref("FeedTime")
fedTime.on('value',function(data){
lastFed=data.val()
})
if(lastFed>=12){
  textSize(15)
  fill("white")
  text("LastFed: " +lastFed%12+"PM",350,30)
}
else if(lastFed==0){
  textSize(15)
  fill("white")
text("last Fed: 12 AM",350,30)
}else{
  textSize(15)
  fill("white")
  text("Last Fed: "+lastFed+ "AM",350,30)
}

readState=database.ref('gameState')
readState.on('value',function(data){
  gameState=data.val()
})

drawSprites();
//if(keyWentDown(UP_ARROW)){
  //foodS=foodS - 1
 // writeStock(foodS)
 // dog.addImage("dog1",dogIMG1)
  //dogIMG1.scale = 0.15; 
//}
//textSize(20)
//fill("white")
//text("Food Remaining : " + foodS ,140,140)
}

/*function readStock(data){
foodS=data.val();
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
*/
 
function getFoodStock(data){
  foodS=data.val();
  }
function updateFoodStock(x){
    database.ref('/').update({
  Food:x
    })
  }
function deductFoodStock(x){
    database.ref('/').update({
     Food:x
    })
  }
function addTheFood(){
  foodS++
  database.ref("/").update({
    Food:foodS
  })
}
function feedDog(){
  dog.changeImage("dog1",dogImg1)
  foodS=foodS-1
  database.ref("/").update({
    Food:foodS,
    fedTime:hour()
  })
}
