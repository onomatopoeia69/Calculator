document.addEventListener('numberKey',()=>{

      const audio = new Audio("sounds/calculator_single_press.mp3");

       audio.pause();
        audio.currentTime = 0;
        audio.play();

});


document.addEventListener('specialKey',() =>{

      const audio = new Audio("sounds/calculator_single_press-2.mp3"); 
      
      audio.pause();
        audio.currentTime = 0;
        audio.play();

});

document.addEventListener('operator',() =>{

      const audio = new Audio("sounds/calculator_single_press-3.mp3"); 

        audio.play();

});

