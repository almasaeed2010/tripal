(function($) {

  Drupal.behaviors.tripal_ds = {
    attach: function (context, settings){

      // Add a close button for each pane except for the te_base
      $('div.tripal_pane').each(function (i) {
        $(this).prepend(
          '<div class="tripal_pane-fieldset-buttons">' +
            '<div id="tripal-pane-close-button" class="tripal-pane-button">' +
              '<i class="fa fa-window-close-o fa-lg"></i>' +
            '</div>' +
          '</div>'
        );
        var id = '.tripal_pane-fieldset-' + $(this).attr('id');
      });

      // Hide the pane when the close button is clicked
      $('#tripal-pane-close-button .fa-lg').each(function (i) {
        $(this).click(function () {
          var fs = $(this).parents('div.tripal_pane');
          if($(fs).hasClass('showTripalPane'))  {
            $(fs).removeClass('showTripalPane');
            $(fs).addClass('hideTripalPane');
          }
          else {
            $(fs).addClass('hideTripalPane');
          } 
        });
      });
      // Move the tripal pane to the first position when its TOC item is clicked.
      $('.tripal_pane-toc-list-item-link').each(function (i) {
        $(this).click(function() {
          var id = '.tripal_pane-fieldset-' + $(this).attr('id');
          var prevObj = $(id).prev().attr('class');

            // Highlight the fieldset instead of moving if it's already at the top
            if (prevObj.indexOf('group-tripal-pane-content-top') == 0) {
              $(id).fadeTo(10, 0.3, function() {});
              $(id).fadeTo(200, 1, function() {});
            }
            if ($(id).hasClass('hideTripalPane')) {
              $(id).removeClass('hideTripalPane');
              $(id).addClass('showTripalPane');
            }
            $(id).hide();
            var obj = $(id).detach();
            $('.group-tripal-pane-content-top').after(obj);
            $(id).show(300);
          return false;
        });
      });
    },
  };
  
})(jQuery);
