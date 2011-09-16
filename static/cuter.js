var slide_number = null;
var editor;
var code;

function main(toc) {
  editor = ace.edit("code");
  editor.setTheme("ace/theme/idle_fingers");
  editor.setShowPrintMargin(false);
  editor.setHighlightActiveLine(true);
 
  var JavaScriptMode = require("ace/mode/javascript").Mode;
  editor.getSession().setMode(new JavaScriptMode());

  // Load the first slide.
  setSlide(getSlideNumber());
}

function slideLoaded(data) {
  var slide = document.getElementById("slide");
  var response = eval('(' + data + ')')
  slide.innerHTML = response['slide'];

  if (response['code']) {
    code = response['code'];
  } else {
    code = "// No code for this excercise!";
  }

  // Do we already have code for this?
  if (hasStorage()) {
    var stored_code = localStorage.getItem('' + slide_number);
    if (stored_code) {
      editor.getSession().setValue(stored_code);
      return;
    }
  }

  editor.getSession().setValue(code);
}

function setSlide(index) {
  // Save the code, if we can.
  if (hasStorage() && slide_number != null) {
    localStorage.setItem('' + slide_number, editor.getSession().getValue());
  }

  slide_number = index;
  slide_name = toc[index];

  // Update the hash fragment.
  window.location = window.location.origin + window.location.pathname + '#' + slide_number;

  $("#slide_number").html('' + (index + 1) + ' / ' + toc.length);

  // Rewrite the navigation widget.
  if (index > 0) {
    $("#prev").removeClass("disabled");
  } else {
    $("#prev").addClass("disabled");
  }

  if (index < toc.length - 1) {
    $("#next").removeClass("disabled");
  } else {
    $("#next").addClass("disabled");
  }

  // TODO(jmcgill): Add error on failure IMPORTANT.
  $.get("/slide/" + slide_name, slideLoaded);
}

function getSlideNumber() {
  var num = document.location.hash;
  if (num == "" || num == "#") {
    return 0;
  }
  return parseInt(document.location.hash.substring(1, document.location.hash.length));
}

function next() {
  var current_slide = getSlideNumber();
  
  // Is this the last slide?
  if (current_slide + 1 == toc.length) {
    return;
  } 

  setSlide(current_slide + 1);
  return false;
}

function previous() {
  var current_slide = getSlideNumber();
  
  // Is this the first slide?
  if (current_slide == 0) {
    return;
  } 

  setSlide(current_slide - 1);
  return false;
}

function run() {
  $("#map_canvas").html();
  var code = editor.getSession().getValue();
  eval( code );
  initialize();
}

function reset() {
  var answer = confirm("Are you sure you want to throw away your code?");
  if (answer) {
    editor.getSession().setValue(code);
    localStorage.removeItem('' + slide_number);
  }
  $("#map_canvas").html();
}
