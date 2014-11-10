$(window).bind("popstate", function() {
  var link = location.pathname.replace(/^.*[\\/]/, "");
  loadContent(link);
});

var mainContent = $("#switch-content"),
    pageWrap    = $(".container"),
    baseHeight   = 0,
    el;

pageWrap.height(pageWrap.height());
baseHeight = pageWrap.height() - mainContent.height();

function linkLoader(theEl, bfunc, afunc){
  $(theEl).delegate("a", "click", function(e) {
    e.preventDefault();
    var _href = $(this).attr("href");
    history.pushState(null, null, _href);
    loadContent(_href, bfunc, afunc);
  });
}

function loadContent(href, bfunc, afunc){
    mainContent.fadeOut(200, function(){
        mainContent.hide().load(href + " #switch-content", function(){
            try{ bfunc(); }catch(err){}
            mainContent.fadeIn(200, afunc);
         });
    });
}

function preload_about_images(){
    console.log("Running the preload for about-us");
    setTimeout(function(){
        new Image().src = "/images/luke-mugshot.png";
        new Image().src = "/images/paddy-mugshot.png";
        new Image().src = "/images/martin-mugshot.png";
        new Image().src = "/images/dotted-bracket.png";
    }, 1000);
}

function isObjectEmpty(obj){
    var name;
    for(name in obj){
        return false;
    }
    return true
}

$(function() {
    var pathname = window.location.pathname;
    if( pathname != "/"){$('#fixed-logo').removeClass("hidden");}
    if(pathname === "/"){
        var fadeIn  = 1000;
        var fadeOut = 600;
        var frame1  = $('#frame1');
        
        var logo  = $('#fixed-logo');
        logo.hide();
        logo.addClass('hidden');

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
                            loadContent("/intro", 
                                function(){
                                  $('#introduction').addClass('hidden');
                                }, 
                                function(){
                                setTimeout(function(){
                                    $('#introduction').removeClass('hidden').hide().fadeIn(2000);
                                }, fadeIn);
                                logo.removeClass('hidden').hide().fadeIn(fadeIn);
                           });
                        });
                    });
                });
            });
        });
    }
});
