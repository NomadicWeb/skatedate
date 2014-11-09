$(window).bind("popstate", function() {
  var link = location.pathname.replace(/^.*[\\/]/, "");
  loadContent(link);
});

var $mainContent = $("#switch-content"),
    $pageWrap    = $(".container"),
    baseHeight   = 0,
    $el;

$pageWrap.height($pageWrap.height());
baseHeight = $pageWrap.height() - $mainContent.height();

function linkLoader(theEl){
  $(theEl).delegate("a", "click", function(e) {
    e.preventDefault();
    var _href = $(this).attr("href");
    history.pushState(null, null, _href);
    loadContent(_href);
  });
}

function loadContent(href, func){
    $mainContent.fadeOut(200, function(){
        $mainContent.hide().load(href + " #switch-content", function(){
            $mainContent.fadeIn(200, func)
            console.log("AJAX-in complete");
         });
      $("nav a").removeClass("current");
      $("nav a[href$='" + href + "']").addClass("current");
    });
}

function isObjectEmpty(obj){
    var name;
    for(name in obj){
        return false;
    }
    return true
}

/* navigation link ajax stuff */
$(function() {
  if (Modernizr.history){
    $("#nav").delegate("a", "click", function(e) {
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

/* gif ajax loads stuff */
$(function() {
    var fadeIn  = 1000;
    var fadeOut = 600;
    var frame1  = $('#frame1');

    frame1.fadeIn(fadeIn);
    frame1.fadeOut(fadeOut, function(){
        loadContent("/gif-part-two", function(){
            var frame2 = $('#frame2');
            frame2.fadeIn(fadeIn);
            frame2.fadeOut(fadeOut, function(){
                loadContent("/gif-part-three", function(){
                    var frame3 = $('#frame3');
                    frame3.fadeIn(fadeIn);
                    frame3.fadeOut(fadeOut, function(){
                        loadContent("/intro", function(){
                            $('#introduction').fadeIn(fadeIn);
                       });
                    });
                });
            });
        });
    });
});
