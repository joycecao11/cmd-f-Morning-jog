 
var GameOver = false;
var jumpy = 0;
var inTransaction = false;
function getRand(min, max){
    return  Math.random() * (max - min) + min;
}
 window.onload = function(){   
    var myCanvas = document.getElementById("gameCanvas");
    var myContext = myCanvas.getContext("2d");
    myCanvas.width=window.innerWidth;
    myCanvas.height=window.innerHeight;
    
    var background = new Image();
    var obstacle = new Image();
    var girl = new Image();

    obstacle.src = "obs.png";
    background.src = "bg.png";
    // https://www.alamy.com/stock-photo-seamless-cartoon-city-background-vector-illustration-with-separate-141766248.html

    var BGx = 0;
    var BGy = 0;
    var BGx2 = myCanvas.width - 2;
    var Girlx = 100;
    var Girly = 380;
    var isOne = true;
    var obsx = myCanvas.width;
    var obsy = myCanvas.height - 80;
    var obs_size = 50;
    var jump = false;
    
    var indexes = [obsx, obsx + getRand(400,500), obsx + getRand(700,800)];



    main();
    function main(){
        startBGAnimation();
    }
    

    function changeGirl(){
        if (!jump && inTransaction){
            jumpy -= 50;
            if (jumpy < 0){
                jumpy = 0;
                inTransaction = false;
            }
        }
        if(jump) {
            console.log("in jump");
            girl.src="jump.png";
            jump = false;
        }
        console.log(inTransaction + "   " + jump);
        
        if(isOne){
            girl.src ="jump.png";
            Girly = 380 - jumpy;
            isOne = false;
         }else{
            girl.src ="run 2.png";
            isOne = true;
        }
    }
    function randomTime(){
        return ((Math.random()*(600)) + 1);
    }
    function draw(){
        myContext.clearRect(0,0,myCanvas.width,myCanvas.height);
        myContext.drawImage(background, BGx, BGy, myCanvas.width, myCanvas.height);
        myContext.drawImage(background, BGx2, BGy, myCanvas.width, myCanvas.height);
        if (!GameOver){
            myContext.drawImage(girl, Girlx, Girly,200,300);
            var i;
            for(i = 0; i < indexes.length; i ++){
                if (checkCollision(indexes[i])){
                    GameOver = true;
                }else{
                    myContext.drawImage(obstacle, indexes[i], obsy,obs_size,obs_size);
                }
            }
            window.requestAnimationFrame(draw);
        } else {
            myContext.font = "50px Comic Sans MS";
            myContext.fillStyle = "black";
            myContext.textAlign = "center";
            myContext.fillText("GAME OVER", myCanvas.width / 2, myCanvas.height / 2); 
        }
    }

    function moveBG(){
        if(BGx-5 <= -myCanvas.width){
            BGx = myCanvas.width;
        }
        if(BGx2-5 <= -myCanvas.width){
            BGx2 = myCanvas.width;
        }
        BGx -= 5;
        BGx2 -= 5;
        var i = 0;
        for (i = 0; i < indexes.length; i++){
            if (indexes[i] + obs_size < 0 ){
                indexes[i] = obsx + getRand(100,400);
            }else{
                indexes[i] -= 5;
            }
        }
    }

    function update(){
        moveBG();
        window.setTimeout(update,50);
    }
    function updateGirl() {
        if(jump) {
            changeGirl();
            window.setTimeout(updateGirl,500);
        } else {
            changeGirl();
            window.setTimeout(updateGirl,300);
        }
        
        
    }

    function startBGAnimation(){
        update();
        updateGirl();
        window.requestAnimationFrame(draw);
    }

    function checkCollision(index_x) {
        if(Girly == 380 && index_x <= Girlx + 150 && index_x + 50 >= Girlx ){
            return true;
        }
        return false;

    }

    if (!('webkitSpeechRecognition' in window)) {
    alert("your browser doesn't support this function");
    } else {
        var key = ['jump', 'up']; //keyword
        var grammar = '#JSGF V1.0; grammar key; public <key> = ' + key.join(' | ') +';';

        var recognition = new webkitSpeechRecognition();

        recognition.lang = 'en-US';

        //will continue to listen even after user stops talking
        recognition.continuous = true; 
        //interim result
        recognition.interimResults = true; 
        recognition.maxAlternatives = 1;

        recognition.onresult = function(event) { 
            var last = event.results.length - 1;
            var word = event.results[last][0].transcript;

            var array = word.split(" ");
            console.log("I hear this" + word);

            for(var i = 0; i < array.length; i++) {
              console.log(array[i]);
              if(array[i] == "jump" || array[i] == 'up' || array[i] == 'dumb' || array[i] == 'John'
                 || array[i] == 'job' || array[i] == "trump" || array[i] == "fly") {
                console.log("jump value " + jump);
                jump = true;
                inTransaction = true;
                jumpy = 130;
                console.log("jump value " + jump);
              break;
              }
            }
            

         }
        recognition.onerror = function(event) { 
            console.log("an error occurred");
            console.log(event);
         }
        recognition.onend = function() { 
            console.log("it's done");
         }
    }

    document.body.onclick = function() {
        recognition.start();
        console.log('waiting for command');
    }
    
}

