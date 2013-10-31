var apis = null;

(function($) {

    $(document).ready(function() {

        $('.calendar-day-active').click(function() {
            
            $(".calendar-day").css("z-index",2);
            $(this).css("z-index",3);
            $(".calendar-carousel li").css("z-index",2);
            $(this).parents("li").css("z-index",3);
            
            if (apis) {
                //apis.destroy();
            }
            $('.calendar-day-viewed').removeClass('calendar-day-viewed');
            $(this).addClass('calendar-day-viewed');
            if ($(this).find('.calendar-day-view-list-inner').height() > 500) {
                apis = $(this).find('.calendar-day-view-list').jScrollPane().data().jsp;
            }
        });
        
        
        $(".calendar-day").hover(function() {
          $(".calendar-day").css("z-index",2);
          $(this).css("z-index",3);
          if (!$(".calendar-day").hasClass("calendar-day-viewed")) {
            $(".calendar-carousel li").css("z-index",2);
            $(this).parents("li").css("z-index",3);
          }
        });

        $('.calendar-day-view-top a').click(function() {
            $('.calendar-day-viewed').removeClass('calendar-day-viewed');
            if (apis) {
                //apis.destroy();
            }
            return false;
        });

    });

})(jQuery);