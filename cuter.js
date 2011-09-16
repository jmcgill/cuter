function main() {
  var editor = ace.edit("code");
  editor.setTheme("ace/theme/twilight");
  editor.setShowPrintMargin(false);
  editor.setHighlightActiveLine(true);
 
  var JavaScriptMode = require("ace/mode/javascript").Mode;
  editor.getSession().setMode(new JavaScriptMode());
}
