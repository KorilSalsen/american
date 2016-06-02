$(window).on('load', function(){
    popup().init();
});

function popup(){
    var
        $popup = $('[data-popup]'),
        $showButton = $('[data-popup-show]'),
        $closeButton =  $popup.find('[data-popup-close]'),
        time = 300;

    function _eventListener(){
        $showButton.on('click', _showPopup);
        $(document).on('click', _hidePopup);
    }

    function _showPopup(e){
        e.preventDefault();

        $popup.fadeIn(time);
    }

    function _hidePopup(e){
        var $target = $(e.target);

        if($target.hasClass('popup') || $target.hasClass('popup__close')){
            e.preventDefault();

            $popup.fadeOut(time);
        }
    }

    return {
        init: function(){
            _eventListener();
        }
    }
}