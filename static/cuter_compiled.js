var slide_number=null,editor,code,html,html_editor,history={};function main(){editor=ace.edit("code");editor.setTheme("ace/theme/idle_fingers");editor.setShowPrintMargin(!1);if($.browser.msie)editor.setHighlightActiveLine(!1),editor.getSession().setUseWrapMode(!1);else{editor.setHighlightActiveLine(!0);var a=require("ace/mode/javascript").Mode;editor.getSession().setMode(new a)}setSlide(getSlideNumber());resize();$(window).resize(resize)}
function resize(){var a=$("#controls"),b=$("#sidebar"),d=$("#code"),c=$("#html");d.css("height",(b.height()-a.outerHeight()-42)*1+"px");d.css("width",b.width()+"px");c.css("height",(b.height()-a.outerHeight()-42)*0+"px");c.css("top",(b.height()-a.outerHeight()-42)*1+"px");c.css("position","relative");editor.resize()}function save(a,b){hasStorage()?localStorage.setItem(a,b):history[a]=b}function load(a){return hasStorage()?localStorage.getItem(a):history[a]}
function remove(){hasStorage()?localStorage.removeItem(""+slide_number):history[key]&&delete history[key]}
function slideLoaded(a){var b=document.getElementById("slide"),a=eval("("+a+")");b.innerHTML=a.slide;a.code?(code=a.code,$("#top_right").css("height","50%"),$("#bottom_right").css("height","50%")):(code="// No code for this excercise!",$("#top_right").css("height","100%"),$("#bottom_right").css("height","0%"));a.html?(html=a.html,a=$("<div/>").text(html).html(),b.innerHTML+='<br><h4>HTML</h4><pre class="prettyprint">'+a+"</pre>"):html="";setHtml(html,!0);prettyPrint();(b=load(""+slide_number))?editor.getSession().setValue(b):
editor.getSession().setValue(code)}function setSlide(a){slide_number!=null&&save(""+slide_number,editor.getSession().getValue());slide_number=a;slide_name=toc[a];window.location.hash="#"+slide_number;$("#slide_number").html(""+(a+1)+" / "+toc.length);a>0?$("#prev").removeClass("disabled"):$("#prev").addClass("disabled");a<toc.length-1?$("#next").removeClass("disabled"):$("#next").addClass("disabled");$.get("/slide/"+slide_name,slideLoaded)}
function getSlideNumber(){var a=document.location.hash;return a==""||a=="#"?0:parseInt(document.location.hash.substring(1,document.location.hash.length))}function next(){var a=getSlideNumber();if(a+1!=toc.length)return setSlide(a+1),!1}function previous(){var a=getSlideNumber();if(a!=0)return setSlide(a-1),!1}function run(){setHtml(html,!1);var a=editor.getSession().getValue();eval(a);initialize()}
function reset(){confirm("Are you sure you want to throw away your code?")&&(editor.getSession().setValue(code),remove(""+slide_number));setHtml(html,!0)}
function setHtml(a,b){$("#bottom_right").html(a);b&&$("#bottom_right").children().each(function(){this.nodeName.toUpperCase()=="INPUT"?$(this).attr("value",$(this).attr("id")):($(this).css("background","url(static/check.png)"),$(this).css("color","#404040"),$(this).css("padding","5px"),$(this).css("border","1px solid white"),$(this).html("<h3>"+$(this).attr("id")+"</h3>"))})}function showHtml(){setHtml(html,!0)};