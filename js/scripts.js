
$(window).resize(function() {
  
});

$(window).load(function() {
  
});
      

$(window).scroll(function () {
  
});

$(document).ready(function () {

  makeup();
  
  // Tabbed content
  
  $(".tabbed-content").each(function() {
    var tabs = $(this).children(".tabs").find(".tab");
    var tabContents = $(this).children(".tabs-content").children(".tab-content");
    
    tabs.first().addClass("act");
    
    tabContents.hide();
    tabContents.first().show();
    
    tabs.click(function() {
      tabs.removeClass("act");
      $(this).addClass("act");
      
      tabContents.hide();
      
      tabContents.filter("[rel='"+$(this).attr("rel")+"']").fadeIn(250)
      
    });
    
  });
  
  // Events carousel
  
  if ($(".events-carousel").length) {
    $(".events-carousel").each(function() {
      $(this).jCarouselLiteCustom({
        btnNext: ".mainpage-events .next",
        btnPrev: ".mainpage-events .prev",
        visible: 4,
        circular: true,
        scroll: 2,
        speed:1000
      });
    });
  }
  
  // Calendar carousel
  
  if ($(".calendar-carousel").length) {
    $(".calendar-carousel .jcarousel").jcarousel({
      scroll:1,
      animation: 2000,
      itemFirstInCallback: calendarFirstInCallback,
      itemLastInCallback: calendarLastInCallback
    });
  }
  
  $(".calendar-month-prev").click(function() {
    $(".calendar-carousel .jcarousel-prev").click();
    return false;
  });
  
  $(".calendar-month-next").click(function() {
    $(".calendar-carousel .jcarousel-next").click();
    return false;
  });
  
  // Partners carousel
  
  if ($(".partners-carousel").length) {
    $(".partners-carousel .jcarousel").jcarousel({
      scroll:5,
      animation: 1000
    });
  }
  
  // Login popup

  $(".login-popup-trigger").bind("click",function() {
    $(".login-popup").css("top",$(this).position().top - 9).css("left",$(this).position().left).fadeToggle(150);
  });
  
  $(".login-popup,.login-popup-trigger").hover(function() {
    $(this).addClass("hover");
  },function() {
    $(this).removeClass("hover");
  });
  
  $(".login-popup").bind("mouseout",function() {
    if (loginT) {
      cleadTimeout(loginT)
    }
    var loginT = setTimeout(function() {
      if (!$(".login-popup-trigger").hasClass("hover") && !$(".login-popup").hasClass("hover")) {
        $(".login-popup").fadeOut(250)
      }
    },500);
  });
  
  $(".input-wrapper").click(function() {
    var wrapper = $(this);
    $(this).children("input").focus();
    $(this).addClass("input-wrapper-focus");
    $(this).children("input").blur(function() {
      wrapper.removeClass("input-wrapper-focus");
    });
  });

});

function makeup() {

  if ($(".calendar-carousel").length) {
    $(".calendar-calendar").each(function() {
      var li = $(this);
      li.find(".calendar-day").each(function() {
        if ($(this).position().left > li.width()/2 && $(this).position().top < li.height()/2) {
          $(this).find(".calendar-day-view").addClass("calendar-day-view-left");
        }
        
        if ($(this).position().left > li.width()/2 && $(this).position().top >= li.height()/2) {
          $(this).find(".calendar-day-view").addClass("calendar-day-view-leftbtm");
        }
        
        if ($(this).position().left < li.width()/2 && $(this).position().top >= li.height()/2) {
          $(this).find(".calendar-day-view").addClass("calendar-day-view-btm");
        }
        
      });
    });
  }

  if ($(".mainpage-education").length) {
    $(".mainpage-education .ttl").each(function() {
      $(this).css("padding-top",0);
      if ($(this).height() < 25) {
        $(this).css("padding-top",5);
      }
    });
  }

  $("input:text, textarea").each(function() {
    if (!$(this).prev("label").length && $(this).attr("phvalue") != "") {
      $(this).before("<label for='"+$(this).attr("id")+"' class='placeholder'>"+$(this).attr("phvalue")+"</label>");
      $(this).addClass("initial");
      
      if ($(this).prop("tagName") == "INPUT") {
        // if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
        $(this).focus(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
        $(this).blur(function() {
          $(this).prev().prev(".placeholder").hide();
          if (!$(this).val()) {
            $(this).addClass("initial");
            $(this).parents(".form-item").find(".placeholder").show();
          }
        });
      } else {
        $(this).focus(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
        $(this).blur(function() {
          if (!$(this).val()) {
            $(this).addClass("initial");
            $(this).parents(".form-item").find(".placeholder").show();
          }
        });
      }
      
      
      $(this).parents(".form-item").find(".placeholder").click(function() {
        $(this).focus();
      });
    } else if ($(this).prop("tagName") == "INPUT") {
      // $(this).wrap("<div class='input-wrapper' />")
    }
  });

  $("ul,ol").each(function() {
    if (!$(this).children("li").first().hasClass("first")) {
      $(this).children("li").last().addClass("last");
      $(this).children("li").first().addClass("first");
    }
  });

  $("ol li").each(function() {
    if (!$(this).find(".li-cont").length) {
      $(this).html("<span class='li-cont'>"+$(this).html()+"</span>")
    }
  });
  
  $("table").each(function() {
    if (!$(this).find("tr").first().hasClass("first")) {
      $(this).find("tr").last().addClass("last");
      $(this).find("tr").first().addClass("first");
    }
  });
  
  $("input.button").each(function () {
    if ($(this)[0].tagName == "INPUT" && !$(this).next("div.form-submit").length) {
      var divBtn = $("<div></div>");
      var submit = $(this);
      divBtn.attr("class",$(this).attr("class")).attr("id",$(this).attr("id")).html("<span>" + $(this).val() + "</span>");
      $(this).after(divBtn);
      $(this).hide();
      divBtn.on("click",function () {
        submit.click();
      });
    }
    
  });
  
}

function calendarFirstInCallback(carousel, item, idx, state) {
  carousel.list.find("li").removeClass("next").removeClass("prev");
  carousel.list.find("li[jcarouselindex='"+parseInt(idx+1)+"']").addClass("next");
  carousel.list.find("li[jcarouselindex='"+parseInt(idx-1)+"']").addClass("prev");
};
function calendarLastInCallback(carousel, item, idx, state) {
  carousel.list.find("li").removeClass("next").removeClass("prev");
  carousel.list.find("li[jcarouselindex='"+parseInt(idx+1)+"']").addClass("next");
  carousel.list.find("li[jcarouselindex='"+parseInt(idx-1)+"']").addClass("prev");
};