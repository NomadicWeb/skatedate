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

function linkLoader(theEl){
  $(theEl).delegate("a", "click", function(e) {
    e.preventDefault();
    var _href = $(this).attr("href");
    history.pushState(null, null, _href);
    loadContent(_href);
  });
}

function set_menu_icon(firstLoad){
    $('#fixed-nav a i').on('click', function(){
        // remove full circle
        $("#fixed-nav a i.fa-circle")
            .removeClass('fa-circle')
            .addClass('fa-circle-o');

        // add new full circle
        $(this)
            .removeClass('fa-circle-o')
            .addClass('fa-circle');
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

$(function() {
    var pathname = window.location.pathname;

    // in case we skip the animation
    if( pathname != "/"){
        $('#fixed-logo').removeClass("hidden");
        $('#fixed-nav').removeClass("hidden");
    }

    if(pathname === "/"){
        var fadeIn  = 1000;
        var fadeOut = 600;
        var frame1  = $('#frame1');
        
        var logo  = $('#fixed-logo');
        logo.hide();
        logo.addClass('hidden');

        var menu  = $('#fixed-nav');
        menu.hide();
        menu.addClass('hidden');

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
                                menu.removeClass('hidden').hide().fadeIn(fadeIn);
                                logo.removeClass('hidden').hide().fadeIn(fadeIn);
                           });
                        });
                    });
                });
            });
        });
    }

    var pname = window.location.pathname;
    if(pname != "/"){
        $("#fixed-nav a[href='"+pname+"'] i")
            .removeClass('fa-circle-o')
            .addClass('fa-circle');
    }else{
        $("#fixed-nav a i:first")
            .removeClass('fa-circle-o')
            .addClass('fa-circle');
    }
    set_menu_icon();
});
