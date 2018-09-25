var $ = require('jquery');
var poll = function () {
    $.ajax({
       url: "localhost:3000/",
       success: function(data){
           console.log(data); // { text: "Some data" } -> will be printed in your browser console every 5 seconds
           poll();
       },
       error: function() {
           poll();
       },
       timeout: 30000 // 30 seconds
    });
};
 
// Make sure to call it once first,
poll();