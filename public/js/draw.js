tool.maxDistance = 50;
var socket = io.connect('/socket');
socket.on('startChat',function(data){
    socket.username = data.user;
    socket.room = data.id;
    socket.avatar = gravatar.url(data.avatar, {s: '140', r: 'x', d: 'mm'});
});
// Returns an object specifying a semi-random color
// The color will always have a red value of 0
// and will be semi-transparent (the alpha value)
function randomColor() {
    
    return {
        red: 0,
        green: Math.random(),
        blue: Math.random(),
        alpha: ( Math.random() * 0.25 ) + 0.05
    };
}
function drawCircle( x, y, radius, color ) {
    // Render the circle with Paper.js
    var circle = new Path.Circle( new Point( x, y ), radius );
    circle.fillColor = new RgbColor( color.red, color.green, color.blue, color.alpha );
    // Refresh the view, so we always get an update, even if the tab is not in focus
    view.draw();
}

// every time the user drags their mouse
// this function will be executed
function onMouseDrag(event) {
    // Take the click/touch position as the centre of our circle
    var x = event.middlePoint.x;
    var y = event.middlePoint.y;
    // The faster the movement, the bigger the circle
    var radius = event.delta.length / 2;
    // Generate our random color
    var color = randomColor();
    // Draw the circle 
    drawCircle( x, y, radius, color );
    // Pass the data for this circle
    // to a special function for later
    emitCircle( x, y, radius, color );
} 
 
// This function sends the data for a circle to the server
// so that the server can broadcast it to every other user
function emitCircle( x, y, radius, color ) {

  
    // An object to describe the circle's draw data
    var data = {
        x: x,
        y: y,
        radius: radius,
        color: color
    };

    // send a 'drawCircle' event with data and sessionId to the server
    socket.emit( 'drawCircle', data )


    // Lets have a look at the data we're sending

}

// Listen for 'drawCircle' events
// created by other users
socket.on( 'drawCircle', function( data ) {

    console.log( data );

    // Draw the circle using the data sent
    // from another user
    drawCircle( data.x, data.y, data.radius, data.color );
    
})

