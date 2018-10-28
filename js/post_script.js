$(document).ready(function () {
  var entireHeight;
  var originalPos = [];
  var TP = [], POS = [];
  var viewWidth, viewHeight;

  getOriginalPos();
  init();

  function calcEntireHeight() {
    viewWidth = $(window).width();
    viewHeight = $(document).height();
    if (viewWidth < 600) {
      entireHeight = 3500;
      TP[0] = 0;
      TP[1] = 800;
      TP[2] = 1200;
      TP[3] = entireHeight - viewHeight;  
    }
    else
    {
      entireHeight = 3000;
      TP[0] = 0;
      TP[1] = 400;
      TP[2] = 800;
      TP[3] = entireHeight - viewHeight;
    }
    $('.container').css('height', entireHeight);
  }
  function setSVGColor() {
    document.getElementById("svg1").addEventListener("load", function() {
      var doc = this.getSVGDocument();
      var rect = doc.querySelectorAll("path"); // suppose our image contains a <rect>
      $(rect).attr('fill', '#716b97');
    });
    document.getElementById("svg2").addEventListener("load", function() {
      var doc = this.getSVGDocument();
      var rect1 = doc.querySelectorAll("path");
      $(rect1).attr('fill', '#716b97');
    });
  }
  function getOriginalPos() {

  }
  function init() {
    setSVGColor();
    calcEntireHeight();
    setLayouts();

  }
  function setLayouts() {
    
  }
  function getPos(el) {
    var obj = [el.offset().top - $(window).scrollTop(), el.offset().left];
    return obj;
  }
  function updateObjects() {
    var pos = $('.background').scrollTop();
    // setTitleZoom(pos, TP[1], TP[0]);
    // setLeftOpacity(pos, TP[2], TP[1]);
    // setRightScroll(pos, TP[3], TP[2]);
  }
  $(window).resize(function(event) {
    calcEntireHeight();
    setLayouts();
    updateObjects();
  })
})