$(function() {
    var frame1 = $('#frame1');
    var frame2 = $('#frame2');
    var frame3 = $('#frame3');

    fadeInFadeOut(frame1, {fadeInTime: 700, fadeOutTime: 600});
});

function fadeInFadeOut(el, opts){
    setTimeout(function(){
         el.css('visibility','visible').hide().fadeIn('slow', function(){
           setTimeout(function(){el.fadeOut("slow");}, opts['fadeOutTime']);
         });
    }, opts['fadeInTime']);
}


/* code from nomadic.web.github.io */
$(window).bind("popstate", function() {
  var link = location.pathname.replace(/^.*[\\/]/, ""); // get filename only
  loadContent(link);
});

// set up some variables
var $mainContent = $(".switch-content"),
    $pageWrap    = $(".container"),
    baseHeight   = 0,
    $el;

$pageWrap.height($pageWrap.height());
baseHeight = $pageWrap.height() - $mainContent.height();

$(function() {
  if (Modernizr.history){
    $(".menu").delegate("a", "click", function(e) {
      e.preventDefault();
      console.log("Hijacking the click event!");
      var _href = $(this).attr("href");
      history.pushState(null, null, _href);
      loadContent(_href);
    });

  }else{
    console.log("Modernizr.history not supported!");
  }
});

function linkLoader(theEl){
  $(theEl).delegate("a", "click", function(e) {
    e.preventDefault();
    console.log("Hijacking the click event outside the menu!");
    var _href = $(this).attr("href");
    history.pushState(null, null, _href);
    loadContent(_href);
  });
}

function loadContent(href){
  console.log("Attempting to AJAX-in some content");
  $mainContent
    .fadeOut(200, function(){
      console.log("Just faded out the .wrapper");
      $mainContent
        .hide()
        .load(href + " .switch-content", function(){
          $mainContent.fadeIn(200, function(){
            console.log("AJAX-in complete");

            // should really only do this on
            // the index page - @todo
            rotateTextSetup();
         });
      
      $("nav a").removeClass("current");
      $("nav a[href$='" + href + "']").addClass("current");
    });
  });
}

function isObjectEmpty(obj){
    var name;
    for(name in obj){
        return false;
    }
    return true
}
