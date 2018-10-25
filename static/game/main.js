let planets = [];
let currentX = 0;
let currentY = 0;
let x = 0;
let y = 0;
let currentWidth = 800;
let currentHeight = 500;
let clock = 0;
let images = [];
const iceDwarf = new Image()
const mars = new Image()
const volcanicPlanet = new Image()
$('#Maincanvas').html(`<canvas height="500" width="800" id="Astrogation"></canvas>`);

let ctx = document.getElementById('Astrogation');
ctx = ctx.getContext('2d');
ctx.strokeStyle = "red";
ctx.fillStyle = "red";

  iceDwarf.addEventListener('load',() => {
    console.log('stuff')
  })
  iceDwarf.src = '/assets/images/iceDwarf.png';

  mars.addEventListener('load',() => {
    console.log('stuff')
  })
  mars.src = '/assets/images/mars.png';

  volcanicPlanet.addEventListener('load',() => {
    console.log('stuff')
  })
  volcanicPlanet.src = '/assets/images/volcanicPlanet.png';
images.push(iceDwarf);
images.push(mars);
images.push(volcanicPlanet);
const getPlanets = () => {
  jQuery.ajax({
    url: "/game/planets",
    complete: function(event,xhr,settings){
      console.log(event);
      console.log(xhr);
      planets = event.responseJSON;
    }
  })
}
const selector = {
  active: false,
  drawSelector (){
    x = selector.target.x-currentX;
    y = selector.target.y-currentY;
    radius = selector.radius;
    radians = selector.radians;
    if (radius > 40){
      radius -= 15;
      selector.radius -= 15;
    }else{
      if(radians == 2*Math.PI){
          radians = 0;
          selector.radians = 0;
        }
        selector.radians += .035*Math.PI;
        ctx.beginPath();
        ctx.moveTo(x+(radius*Math.cos(radians)),y+(radius*Math.sin(radians)));
        ctx.lineTo(x+(radius*Math.cos(radians))-12*Math.cos(radians),y+(radius*Math.sin(radians))-12*Math.sin(radians));
        ctx.lineTo(x+(radius*Math.cos(radians+.12*Math.PI)),y+(radius*Math.sin(radians+.12*Math.PI)));
        ctx.lineTo(x+(radius*Math.cos(radians)),y+(radius*Math.sin(radians)));
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x+(radius*Math.cos(radians+.67*Math.PI)),y+(radius*Math.sin(radians+.67*Math.PI)));
        ctx.lineTo(x+(radius*Math.cos(radians+.67*Math.PI))-12*Math.cos(radians+.67*Math.PI),y+(radius*Math.sin(radians+.67*Math.PI))-12*Math.sin(radians+.67*Math.PI));
        ctx.lineTo(x+(radius*Math.cos(radians+.12*Math.PI+.67*Math.PI)),y+(radius*Math.sin(radians+.12*Math.PI+.67*Math.PI)));
        ctx.lineTo(x+(radius*Math.cos(radians+.67*Math.PI)),y+(radius*Math.sin(radians+.67*Math.PI)));
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x+(radius*Math.cos(radians+1.34*Math.PI)),y+(radius*Math.sin(radians+1.34*Math.PI)));
        ctx.lineTo(x+(radius*Math.cos(radians+1.34*Math.PI))-12*Math.cos(radians+1.34*Math.PI),y+(radius*Math.sin(radians+1.34*Math.PI))-12*Math.sin(radians+1.34*Math.PI));
        ctx.lineTo(x+(radius*Math.cos(radians+.12*Math.PI+1.34*Math.PI)),y+(radius*Math.sin(radians+1.34*Math.PI+.12*Math.PI)));
        ctx.lineTo(x+(radius*Math.cos(radians+1.34*Math.PI)),y+(radius*Math.sin(radians+1.34*Math.PI)));
        ctx.fill();
      }
    ctx.beginPath();
    ctx.moveTo(x+radius,y);
    ctx.arc(x,y,radius,0,2*Math.PI,false)
    ctx.closePath();
    ctx.stroke();
      }
};
const displayInfo = (object) => {
  $('#Information').html(`Creator: ${object.creator} </br> Information: ${object.about}`);
}
const clearInfo = () => {
  $('#Information').html('');
}
const eventListeners = () => {
  $('#Astrogation').on('click', (event) => {
    console.log(event.currentTarget);
    const ctx = document.getElementById('Astrogation').getContext('2d');
    x = event.originalEvent.clientX - event.currentTarget.offsetLeft - event.currentTarget.offsetParent.offsetLeft;
    y = event.originalEvent.clientY - event.currentTarget.offsetTop - event.currentTarget.offsetParent.offsetTop;
    console.log(x,y);
    for(i=0;i<planets.length;i++){
      if(Math.sqrt(Math.pow((planets[i].x-(currentX+x)),2)+Math.pow((planets[i].y-(currentY+y)),2)) <= 30){
        selector.target = planets[i];
        selector.x = planets[i].x;
        selector.y = planets[i].y;
        selector.radius = 115;
        selector.radians = 0;
        selector.active = true;
        displayInfo(planets[i]);
        i = planets.length;
      }else{
        selector.active = false;
        clearInfo();
      }
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.which == 65){
      currentX -= 100;
    }
    if (event.which == 68){
      currentX += 100;
    }
    if (event.which == 83){
      currentY += 100;
    }
    if (event.which == 87){
      currentY -= 100;
  }})

}
const render = (planet) =>{
  ctx.drawImage(images[planet.image],planet.x-currentX-25,planet.y-currentY-25,50,50);
}
const renderPlanets = () => {
  for(i=0;i<planets.length;i++){
    if(!(planets[i].x-currentX < 0) && !(planets[i].x-currentX > currentWidth) && !(planets[i].y-currentY < 0) && !(planets[i].y-currentY > currentHeight)){
      render(planets[i]);
    }
  }
}

const renderLoop = setInterval(() => {
  ctx.clearRect(0,0,currentWidth,currentHeight);
  if(selector.active == true){
    selector.drawSelector();
  }
  renderPlanets();
},60)
getPlanets();
eventListeners();
