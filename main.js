(function(){
  'use strict';

  /**
   * This javascript module displays a clock, updates the background color
   * and animates a minute progress bar.
   */

   var clockHours = document.querySelector('.clock-display .hours');
   var clockMinutes = document.querySelector('.clock-display .minutes');
   var clockSeconds = document.querySelector('.clock-display .seconds');
   var clockContainer = document.querySelector('.container');
   var progressBar = document.getElementById('progress-bar');
   var mouseHoevering = false;

   // Formats my time as zero padded numbers
   function formatTime(timeToFormat){
     var formattedTime = [];

     formattedTime[0] = ("0" + timeToFormat[0]).slice(-2);
     formattedTime[1] = ("0" + timeToFormat[1]).slice(-2);
     formattedTime[2] = ("0" + timeToFormat[2]).slice(-2);

     return formattedTime;
   }

   // Update the clock display
   function updateClockDisplay(time){
    // Format my time
    var formattedTime = formatTime(time);

    // Print the time to the screen
    clockHours.textContent = formattedTime[0];
    clockMinutes.textContent = formattedTime[1];
    clockSeconds.textContent = formattedTime[2];
   }

   function updateProgressBar(time){
     var percentSeconds = Math.floor(time[2] / 60 * 100);

     progressBar.style.width = percentSeconds + '%';
   }

   // Updates the background color of the clock based percent of seconds
   function updateBackgroundColor(time){
     var formattedTime = formatTime(time);

     var red =  time[0].toString(16);
     var green = time[1].toString(16);
     var blue = time[2].toString(16);
     var backgroundColor = formatTime([red, green, blue]);

     clockContainer.style.backgroundColor = '#' + backgroundColor.join('');

     return backgroundColor;
   }

   // This function updates the clock display when called
   function runClock(){
     // Get the current time
     var currentTime = new Date();

     // Format the time into hours, minutes, seconds
     var hours = currentTime.getHours(),
     minutes = currentTime.getMinutes(),
     seconds = currentTime.getSeconds();

     var clockTime = [hours, minutes, seconds];

     // Update the background color
     var newBackgroundColor = updateBackgroundColor(clockTime);

     // Update the DOM with the time
     if(mouseHoevering){
       updateClockDisplay(newBackgroundColor);
     }else{
       updateClockDisplay(clockTime);
     }

     // Set the progress bar
     updateProgressBar(clockTime);
   }

   function trackMouse(event){
     mouseHoevering = event.type == "mouseenter" ? true : false ;
     return mouseHoevering;
   }

   // Call the clock function every second
   window.setInterval(runClock, 1000);

    // Register Event Listeners
   clockContainer.addEventListener('mouseenter', trackMouse);
   clockContainer.addEventListener('mouseleave', trackMouse);
}());
