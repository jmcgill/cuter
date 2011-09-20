### Javascript 101

Javascript is the language of the web. It is a C-style language (with squigly braces {}). It has loops, if statements, strings, numbers, regexp and most other features you'll find in C or Python.

By default, any code outside a function is executed when the page is loaded. Code inside a function is only run when called.

Run the code on the right and see what it does.

Then add

    myfunc();

to the end of the code (to call that function), and run it again.

### Code
// Always runs.
alert("Hello!");

// Only run if called.
function myfunc() {
  var name = prompt("What is your name?");
  alert("Hello " + name);
}
