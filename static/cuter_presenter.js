var slide_number = null;
var editor;
var code;
var html;
var html_editor;

// Used to store code state when localStorage is not available. Does not persist
// between sessions.
var history = {};

function main(toc) {
  // Create a Javascript editor.
  editor = ace.edit("code");
  editor.setTheme("ace/theme/idle_fingers");
  editor.setShowPrintMargin(false);

  if ($.browser.msie) {
    editor.setHighlightActiveLine(false);
    editor.getSession().setUseWrapMode(false);
  } else {
    editor.setHighlightActiveLine(true);
    var JavaScriptMode = require("ace/mode/javascript").Mode;
    editor.getSession().setMode(new JavaScriptMode());
  }

  // Support window.console.log in legacy browsers.
  if (!window.console) {
    window.console = {};
    window.console.log = function(e) {
      document.getElementById("map_canvas").innerHTML +=
          e + "<br>";
    }
  }

  // Create a HTML editor.
  // html_editor = ace.edit("html");
  // html_editor.setTheme("ace/theme/idle_fingers");
  // html_editor.setShowPrintMargin(false);
  // html_editor.setHighlightActiveLine(true);

  // var HtmlMode = require("ace/mode/html").Mode;
  // html_editor.getSession().setMode(new HtmlMode());

  // Load the first slide.
  setSlide(getSlideNumber());

  // Size the UI.
  resize();
  $(window).resize(resize);


  $(document).keydown(function(e){
  if (e.keyCode == 37) {
    presenterPrevious();
    return false;
  }
  if (e.keyCode == 39) {
    presenterNext();
    return false;
  }
});}

function resize() {
  var well = $("#controls");
  var sidebar = $("#sidebar");
  var editor_div = $("#code");
  var output_div = $("#output");

  var code_to_html_ratio = 0.5;

  // We subtract an additional 40 px to account for the topbar.
  editor_div.css('height', (sidebar.height() - well.outerHeight() - 42) + 'px');
  editor_div.css('width', (sidebar.width()  / 2) + 'px');

  output_div.css('height', (sidebar.height() - well.outerHeight() - 42) + 'px');
  output_div.css('left', (sidebar.width()  / 2) + 'px');
  output_div.css('width', (sidebar.width()  / 2) + 'px');
  output_div.css('position', 'relative');
  editor.resize();
}

function save(key, value) {
  if (hasStorage()) {
    localStorage.setItem(key, value);
    return;
  }

  history[key] = value;
}

function load(key) {
  if (hasStorage()) {
    var stored_code = localStorage.getItem(key);
    return stored_code;
  }

  return history[key];
}

function remove() {
  if (hasStorage()) {
    localStorage.removeItem('' + slide_number);
    return;
  }

  if (history[key]) delete history[key];
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

  if (response['html']) {
    html = response['html'];

    // Add details of the HTML.
    var escaped_html = $('<div/>').text(html).html();
    slide.innerHTML += '<br><h4>HTML</h4><pre class="prettyprint">' + escaped_html + '</pre>';
  } else {
    html = "";
  }
  setHtml(html, true);
  prettyPrint();

  // Do we already have code for this?
  var saved_code = load('' + slide_number);
  if (saved_code) {
    editor.getSession().setValue(saved_code);
  } else {
    editor.getSession().setValue(code);
  }
}

function setSlide(index) {
  // Save the code, if we can.
  if (slide_number != null) {
    save('' + slide_number, editor.getSession().getValue());
  }

  slide_number = index;
  slide_name = toc[index];

  // Update the hash fragment.
  window.location.hash = '#' + slide_number;

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
  setHtml(html, false);
  var code = editor.getSession().getValue();
  eval( code );
  if (typeof initialize != "undefined")  initialize();
}

function reset() {
  var answer = confirm("Are you sure you want to throw away your code?");
  if (answer) {
    editor.getSession().setValue(code);
    remove('' + slide_number);
  }
  setHtml(html, true);
}

function setHtml(html, highlight) {
  $("#output").html(html);
  // html_editor.getSession().setValue(html);

  // Should we highlight each element?
  if (!highlight) return;

  // Label each element in the supplied HTML.
  $('#output').children().each(function(){
    // We must treat inputs differently.

   if (this.nodeName.toUpperCase() == 'INPUT') {
     $(this).attr('value', $(this).attr('id'));
   } else {
     // IE creates ghost DIVs for each form element, so we exclude these
     // by searching for IDs.
     $(this).css('background', 'url(static/check.png)');
     $(this).css('color', '#404040');
     $(this).css('padding', '5px');
     $(this).css('border', '1px solid white');
     $(this).html('<h3>' + $(this).attr('id') + '</h3>');
   }
  });
}

function showHtml() {
  setHtml(html, true);
}

function presenterShowCode() {
  $("#sidebar").css('visibility', 'visible');
  $("#rightbar").css('visibility', 'hidden');
  window.console.log("code #2");
}

function presenterShowSlide() {
  $("#sidebar").css('visibility', 'hidden');
  $("#rightbar").css('visibility', 'visible');
  window.console.log("presenter");
}

var SLIDE = 0;
var CODE = 1;
var state = SLIDE;

function presenterNext() {
  if (state == SLIDE) {
    state = CODE;
    presenterShowCode();
  } else {
    state = SLIDE;
    next();
    presenterShowSlide();
  }
}

function presenterPrevious() {
  if (state == SLIDE) {
    state = CODE;
    presenterShowCode();
  } else {
    state = SLIDE;
    previous();
    presenterShowSlide();
  }
}

