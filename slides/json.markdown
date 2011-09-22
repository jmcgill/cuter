### JSON and JSONP

The best format for sharing data between websites is JavaScript Object Notation (JSON).

JSON is a way of representing Javascript Objects (classes) in text. It is more readable than XML, and browsers can convert it directly to a Javascript object.

The code on the left uses JSON to define an object with two properties, one of which is an array.

### Code
var json = '{key: "value", an_array: [1, 2, 3]}'

var object = JSON.parse(json);
window.console.log(object.key);
window.console.log(object.an_array);

### HTML
