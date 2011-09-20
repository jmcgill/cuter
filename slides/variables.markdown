### Variables

Variables in JavaScript are declared with `var`.

    var x = 1234;
    var y = "Hello world";
    var z = y + x; // This is "Hello world1234";

Variables declared outside functions are global. Anything else is scoped to the *function* it is declared in.

**Note:** JavaScript does not have block scope.


### Code
var x = 1234;
var y = "Hello world";
var z = y + x;
window.console.log(z);

// Some math.
var num  = 1024;
window.console.log((num * 10) / 4);

### HTML
