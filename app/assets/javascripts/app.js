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
    var frame1 = $('#frame1');
    frame1.fadeIn(2000);
    frame1.fadeOut(1000, function(){
        loadContent("/gif-part-two", function(){
            var frame2 = $('#frame2');
            frame2.fadeIn(2000);
            frame2.fadeOut(1000, function(){
                loadContent("/gif-part-three", function(){
                    var frame3 = $('#frame3');
                    frame3.fadeIn(2000);
                    frame3.fadeOut(1000, function(){
                        loadContent("/intro", function(){
                            console.log("Finished gif stuff");
                       });
                });
            });
        });
    });
  });
});
