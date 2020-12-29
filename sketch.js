var dog, happydog;
var database;
var foodS;
var foodStock;
var lastFed;

function preload()
{
  DogImg1 = loadImage("images/dogImg.png");
  DogImg2 = loadImage("images/dogImg1.png");
  MilkImg = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(800, 500);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  Dog = createSprite(575,250,50,50);
  Dog.addImage(DogImg1);
  Dog.scale = 0.2;

  feed = createButton("Feed Drago");
  feed.position(950,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(850,100);
  addFood.mousePressed(addFoods);

}


function draw() {
  background(31, 196, 118);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  greetDrago = createButton("Greet Drago!!")
  greetDrago.position(900,130);
  greetDrago.mousePressed(Message);
 
  drawSprites();

  fill(206, 0, 9);
  noStroke();
  textSize(20);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed % 12 + " PM", 200,70);
   }else if(lastFed == 0){
     text("Last Fed : 12 AM",200,70);
   }else{
     text("Last Fed : "+ lastFed + " AM", 200,70);
   }

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  Dog.addImage(DogImg2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  Dog.addImage(DogImg1);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function Message(){
  mssg = createElement("h3");
  mssg.html("Hi Drago! How are you?");
  mssg.position(600,350);
  
}