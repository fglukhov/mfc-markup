
$(window).resize(function() {
  
});

$(window).load(function() {
  
});
      

$(window).scroll(function () {
  
});

$(document).ready(function () {

  makeup();
  
  $(".main-menu .link").parents("li").hover(function() {
    $(this).find(".submenu").fadeIn(150);
  },function() {
    $(this).find(".submenu").fadeOut(150);
  });
  
  $(".more-reviews span").click(function() {
    $(".review-hidden").fadeIn(150)
  })
  
  // Fancyboxes
  
  if ($(".fancybox").length) {
    
      
    $(".fancybox")
    .fancybox({
      nextEffect: 'fade',
      prevEffect: 'fade',
      beforeShow: function () {
      
        if (this.title) {
          // New line
          this.title += '';
          
          //this.title += '<div class="descr">'+$(this.element).children(".descr").html()+'</div>'
          
          this.title += '<div class="fancybox-counter">Фотография ' + (this.index + 1) + ' из ' + this.group.length +'</div>';
          
        }
      },
      afterShow: function() {
        // Render tweet button
        twttr.widgets.load();
      },
      helpers : {
        title : {
          type: 'inside'
        }
      }
    });
    

  }
  
  validateForms();
  
  $(".common-form select").customSelect();
  
  // Adding form field
  
  $(".common-form .add-field").click(function() {
    var adder = $(this);
    var newIndex = parseInt($(".form-item[rel='" + adder.attr("rel") + "']").length + 1);
    
    var newFormItem = $(".form-item[rel='" + adder.attr("rel") + "']").last().clone();
    
    newFormItem.find("input").attr("id",newFormItem.find("input").attr("id").replace("_"+parseInt(newIndex-1),"_"+newIndex));
    newFormItem.find("input").attr("name",newFormItem.find("input").attr("id").replace("_"+parseInt(newIndex-1),"_"+newIndex));
    
    newFormItem.insertAfter($(".form-item[rel='" + adder.attr("rel") + "']").last());
    newFormItem.find("label").html("");
    
  });
  
  // custom input
  
  if ($(".common-form input:file").length) {
    $(".common-form input:file").nicefileinput({ 
      label : 'Выбрать файл'
    });
  }
  
  $(".hint .close").click(function() {
    $(this).parents(".hint").slideUp(150)
  });
  
  $(".course-manager .trigger, .manager-popup .name").click(function() {
    $(".manager-popup").fadeToggle(150)
  })
  
  $(".manager-popup,.course-manager h4").hover(function() {
    $(this).addClass("hover");
  },function() {
    $(this).removeClass("hover");
  });
  
  $(".manager-popup").bind("mouseout",function() {
    if (managerT) {
      cleadTimeout(managerT)
    }
    var managerT = setTimeout(function() {
      if (!$(".manager-popup").hasClass("hover") && !$(".course-manager h4").hasClass("hover")) {
        $(".manager-popup").fadeOut(250)
      }
    },500);
  });
  
  $(".course-program .ttl").click(function() {
    $(this).parents(".cp-item").find(".descr").slideToggle(250);
    $(this).parents(".cp-item").toggleClass("cp-open")
  });
  
  $(".course-docs .trigger").click(function() {
    $(this).next(".cont").slideToggle(150);
  });
  
  // Tabbed content
  
  $(".tabbed-content").each(function() {
    var tabs = $(this).children(".tabs").find(".tab");
    var tabContents = $(this).children(".tabs-content").children(".tab-content");
    
    if (!tabs.hasClass("act")) {
      tabs.first().addClass("act");
    }
    
    tabContents.hide();
    tabContents.filter("[rel='"+tabs.filter(".act").attr("rel")+"']").show();
    
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
  
  // Books carousel
  
  if ($(".books-carousel").length) {
    $(".books-carousel .jcarousel").jcarousel({
      scroll:6,
      animation: 2000,
      initCallback: booksInit,
      buttonPrevCallback: booksPrev,
      buttonNextCallback: booksNext
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

  if ($(".events-table-2").length) {
    $(".events-table-2 .name a").each(function() {
      if ($(this).height() > 50) {
        $(this).css("font-size","18px").css("line-height","18px");
      }
    });
  }

  if ($(".upcoming-courses").length) {
    $(".upcoming-courses .ttl a").each(function() {
      if ($(this).height() < 55) {
        $(this).css("font-size","36px").css("line-height","36px");
      }
      
    });
  }
  
  if ($(".upcoming-courses-2").length) {
    $(".upcoming-courses-2 .ttl a").each(function() {
      if ($(this).height() < 70 && $(this).height() >= 32) {
        $(this).css("font-size","24px").css("line-height","24px");
      }
      if ($(this).height() < 32) {
        $(this).css("font-size","36px").css("line-height","36px");
      }
    });
  }

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
    if (!$(this).prev("label").length && $(this).attr("phvalue")) {
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

function booksInit(carousel, state) {
  var cloneNext = carousel.list.parents(".books-carousel").find(".jcarousel-next").clone();
  var clonePrev = carousel.list.parents(".books-carousel").find(".jcarousel-prev").clone();
  carousel.list.parents(".books-carousel").append(clonePrev);
  carousel.list.parents(".books-carousel").append(cloneNext);
  cloneNext.click(function() {
    carousel.list.parents(".books-carousel").find(".jcarousel-next").click();
  });
  clonePrev.click(function() {
    carousel.list.parents(".books-carousel").find(".jcarousel-prev").click();
  });
};

function booksPrev(carousel, button, enabled) {
  if (!enabled) {
    carousel.list.parents(".books-carousel").children(".jcarousel-prev").addClass("jcarousel-prev-disabled");
  } else {
    carousel.list.parents(".books-carousel").children(".jcarousel-prev").removeClass("jcarousel-prev-disabled");
  }
};

function booksNext(carousel, button, enabled) {
  if (!enabled) {
    carousel.list.parents(".books-carousel").children(".jcarousel-next").addClass("jcarousel-next-disabled");
  } else {
    carousel.list.parents(".books-carousel").children(".jcarousel-next").removeClass("jcarousel-next-disabled");
  }
};

function validateForms() {
  
  // Заказ, персональные данные
  
  var validatorPersonal = $("#personalForm").bind("invalid-form.validate", function() {
  	    
  	  }).validate({
  	  focusInvalid: false,
  	  sendForm : false,
  	  messages: {
  	    personal_name_1: "&mdash; Обязательное для заполнения поле",
  	    personal_hotel: "&mdash; Обязательное для заполнения поле",
  	    personal_contactperson: "&mdash; Обязательное для заполнения поле"
        
  	  },
  	  errorPlacement: function(error, element) {
  	    // element.parents(".input-wrapper").addClass("input-wrapper-error");
        error.insertAfter(element);
  	  },
  	  unhighlight: function(element, errorClass, validClass) {
  	    // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
  	    $(element).removeClass(errorClass);
        $(element).next("label.error").remove();
  	  },
  	  invalidHandler: function(form, validatorPersonal) {
  	      var errors = validatorPersonal.numberOfInvalids();
  	      if (errors) {                    
  	          validatorPersonal.errorList[0].element.focus();
  	      }
  	  } 
  	});
  
}

(function( $ ) {
  $.fn.customSelect = function() {
    var selects = $(this);
    selects.each(function () {
      var select = $(this);
      
      if (!$(this).next(".param-selector").length) {
        select.css("visibility","hidden").css("position","absolute").css("z-index","-1");
        select.after("<div class='param-selector' id='" + select.attr("id") + "-selector'>");
        var selector = select.next(".param-selector");
        
        if (select.is(":disabled")) {
          selector.addClass("selector-disabled")
        }
        
        
        selector.append("<div class='param-sel' />").append("<div class='dropdown' />");
        var dropdown = selector.find(".dropdown");
        // dropdown.append("<div class='top-border' />");
        var paramSel = selector.find(".param-sel");
        paramSel.addClass("initial");
        paramSel.append("<div class='arr' />");
        paramSel.append("<div class='sel-value' />");
        
        if (select.find("option[value=" + select.val() + "]").attr("flag")) {
          paramSel.find(".sel-value").html("<img src='" + select.find("option[value=" + select.val() + "]").attr("flag") + "' />" + select.find("option[value=" + select.val() + "]").html());
        } else {
          paramSel.find(".sel-value").html(select.find("option[value=" + select.val() + "]").html());
        }
        
        select.find("option").each(function () {
          if ($(this).attr("flag")) {
            var flag = "<img src=" + $(this).attr("flag") + " />";
          } else {
            flag = "";
          }
          if ($(this).val() != select.val()/* || select.attr("ttl")*/) {
            dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
          } else {
            dropdown.append("<div style='display:none' val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
          }
        });
      
      
        paramSel.click(function() {
          if (!select.is(":disabled")) {
            if (dropdown.css("display") != "block") {
              $(".dropdown").fadeOut(150);
              $(".param-open").removeClass("param-open");
              dropdown.fadeIn(150);
              selector.addClass("param-open");
              var maxWidth = 0;
              
              $(this).parents(".form-item").prevAll(".form-item").css("z-index","100");
              $(this).parents(".form-item").css("z-index","1000");
              $(this).parents(".form-item").nextAll(".form-item").css("z-index","100");
              
              dropdown.find("div").each(function () {
                if ($(this).width() >= maxWidth) {
                  maxWidth = $(this).width();
                }
                if (paramSel.width() >= maxWidth) {
                  maxWidth = paramSel.width() + 1;
                }
              });
              
              //paramSel.css("width", maxWidth + "px");
              // dropdown.find("div").css("width", maxWidth + "px");
              // dropdown.css("width", maxWidth);
              
              // ddOverflow = $("html").height() - (dropdown.offset().top + dropdown.height());
              // if (ddOverflow < 0) {
                // dropdown.css("margin-top", -30 - dropdown.height());
              // }
              
              //dropdown.css("top",paramSel.position().top + paramSel.height());
              
            } else {
              dropdown.fadeOut(150);
              selector.removeClass("param-open");
            }
          }
        });
        
        dropdown.find("div").click(function () {
          selector.removeClass("param-sel-error");
          paramSel.removeClass("initial");
          var div = $(this);
          paramSel.find(".sel-value").html($(this).html());
          if ($(this).attr("flag")) {
            paramSel.find(".sel-value").attr("flag",$(this).attr("flag"));
          }
          select.val($(this).attr("val")).change();
          if (select.hasClass("hide-ttl")) {
            //select.find("option[value='']").remove();
            dropdown.find("div[val='']").remove();
          }
          dropdown.fadeOut(150, function () {
            dropdown.find("div").show().removeClass("selected");
            div.addClass("selected");
            div.parents(".param-open").removeClass("param-open");
          });
        });
      
      }
    });
    
  };
})( jQuery );