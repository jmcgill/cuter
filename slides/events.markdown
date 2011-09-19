### Events

Javascript uses only a single thread, but is event driven. You can associate a block of code to be executed in response to an event being triggered. When multiple events occur, they are scheduled and executed in order.

The code on the left adds a function to be run when the 'click' event is triggered on a button.

### Code
var button = document.getElementById("button");
button.addEventListener('click', eventHandler);

function eventHandler() {
  alert('Hello, world');
}

### HTML
<input type="button" id="button" value="Click me"/>
