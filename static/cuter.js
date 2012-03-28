var slide_number = null;
var editor;
var code;
var html;
var html_editor;
var answer_timeout;
var slide_name;

// Milliseconds between polling for answers.
var kAnswerTimeout = 15000;

// Used to store code state when localStorage is not available. Does not persist
// between sessions.
var history = {};

function main(toc) {
  // Create a Javascript editor.
  editor = ace.edit("code");
  editor.setTheme("ace/theme/idle_fingers");
  editor.setShowPrintMargin(false);

  // Save on every key press, when editing the current slide.
  editor.getSession().on('change', function() {
    save('' + slide_number, editor.getSession().getValue());
  });

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
      alert(e);
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

  document.getElementById('code').onkeyup = function() {
    save('' + slide_number, editor.getSession().getValue());
  };
}

function resize() {
  var well = $("#controls");
  var sidebar = $("#sidebar");
  var editor_div = $("#code");
  var html_div = $("#html");

  var code_to_html_ratio = 1.0;

  // We subtract an additional 40 px to account for the topbar.
  editor_div.css('height', ((sidebar.height() - well.outerHeight() - 42) * code_to_html_ratio) + 'px');
  editor_div.css('width', sidebar.width() + 'px');

  html_div.css('height', ((sidebar.height() - well.outerHeight() - 42) * (1 - code_to_html_ratio)) + 'px');
  html_div.css('top', ((sidebar.height() - well.outerHeight() - 42) * (code_to_html_ratio)) + 'px');
  html_div.css('position', 'relative');
  editor.resize();
  // html_editor.resize();
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

function slideLoaded(data, index) {
  // Discard requests which have returned too late.
  if (index != slide_number) {
    return;
  }

  var slide = document.getElementById("slide");
  var response = eval('(' + data + ')')
  slide.innerHTML = response['slide'];

  if (response['code']) {
    code = response['code'];
  } else {
    code = "// No code for this exercise!";
  }

  if (response['html']) {
    // Show the output console.
    $("#top_right").css('height', '50%');
    $("#bottom_right").css('height', '50%');

    html = response['html'];

    // Add details of the HTML.
    var escaped_html = $('<div/>').text(html).html();
    slide.innerHTML += '<br><h4>HTML</h4><pre class="prettyprint">' + escaped_html + '</pre>';
  } else {
    html = "";

    // Hide the output console.
    $("#top_right").css('height', '100%');
    $("#bottom_right").css('height', '0%');
  }

  // Does this page have an answer available?
  if (response['answer']) {
    if (answer_timeout) {
      window.clearTimeout(answer_timeout);
    }
    answer_timeout = window.setTimeout(pollAnswer, 100);
    slide.innerHTML += '<input id="show_answer_btn" class="btn disabled" type="button" value="Show Answer">';
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

// Poll the server to see if an answer is available for this challenge.
function pollAnswer() {
  var nonse = Math.round((new Date().getTime()) / (kAnswerTimeout / 2));
  window.console.log('Polling: ', nonse);
  $.get('/answers/read/maps_api', {'name': slide_name, 'nonse': nonse}, function(data) {
    if (data != "") {
      var btn = document.getElementById('show_answer_btn');
      $(btn).click(function() {
        var slide = document.getElementById("slide");
        slide.innerHTML += '<br><br><pre class="prettyprint">' + data + '</pre>'; 
      });
      $(btn).removeClass('disabled');
    } else {
      answer_timeout = window.setTimeout(pollAnswer, kAnswerTimeout);
    }
  });
}

function setSlide(index) {
  // Avoid saving code while still loading.
  loading = true;

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
  $.get("/slide/" + slide_name, function(index) {
    return function(data) {
      slideLoaded(data, index);
    }
  }(slide_number));
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
  $("#bottom_right").html(html);
  // html_editor.getSession().setValue(html);

  // Should we highlight each element?
  if (!highlight) return;

  // Label each element in the supplied HTML.
  $('#bottom_right').children().each(function(){
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
  $("#sidebar").css('visibility', 'hidden');
  $("#rightbar").css('visibility', 'visible');
}

function presenterShowSlide() {
  $("#sidebar").css('visibility', 'hidden');
  $("#rightbar").css('visibility', '');
}
