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

function set_menu_icon(pname){
    if(pname != "/form"){
        $("#fixed-nav a[href='/form'] i")
            .removeClass('fa-circle')
            .addClass('fa-circle-o');
    }

    var others = $("#fixed-nav a i");
    for(var i = 0; i < others.length-1; i++){
        $(others[i]).removeClass('fa-circle').addClass('fa-circle-o');
    }
    var item = $("#fixed-nav a[href='"+ pname + "'] i");
    item.removeClass('fa-circle-o').addClass('fa-circle');
}

function loadContent(href, bfunc, afunc){
    mainContent.fadeOut(200, function(){
        mainContent.hide().load(href + " #switch-content", function(){
            set_menu_icon(href);
            try{ bfunc(); }catch(err){}
            mainContent.fadeIn(200, afunc);
         });
    });
}

$(function() {
    var pathname = window.location.pathname;
    set_menu_icon(pathname);
    if( pathname != "/"){$('#fixed-logo').removeClass("hidden");}
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
});
