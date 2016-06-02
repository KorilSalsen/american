$(window).on('load', function () {
    popup().init();
    validator().init();
});

function popup() {
    var
        $popup = $('[data-popup]'),
        $showButton = $('[data-popup-show]'),
        time = 300;

    function _eventListener() {
        $showButton.on('click', _showPopup);
        $(document).on('click', _hidePopup);
    }

    function _showPopup(e) {
        e.preventDefault();

        $popup.fadeIn(time);
    }

    function _hidePopup(e) {
        var $target = $(e.target);

        if ($target.hasClass('popup') || $target.hasClass('popup__close')) {
            e.preventDefault();

            $popup.fadeOut(time);
        }
    }

    return {
        init: function () {
            _eventListener();
        }
    }
}

function validator() {
    var $forms = $('.form');

    function _eventListener() {
        $forms
            .on('submit', _validate)
            .on('reset', _clear);
    }

    function _validate(e) {
        e.preventDefault();

        var
            $this = $(this),
            $inputs = $this.find('[data-required]'),
            valid = true;

        $inputs.each(function () {
            var
                $this = $(this),
                $group = $this.closest('.form__group'),
                value = $this.val();

            if (
                (value && $this.attr('type') !== 'email') ||
                (
                    $this.attr('type') === 'email' &&
                    /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/.test($this.val())
                )
            ) {
                $group.addClass('form__group_valid');
            } else {
                valid = false;
                $group.addClass('form__group_no-valid');
            }

            $this.on('input', function () {
                $group.removeClass('form__group_no-valid');
            });
        });

        if(valid){
            $this[0].submit();
        }
    }

    function _clear(){
        $(this)
            .find('.form__group')
            .removeClass('form__group_valid form__group_no-valid');
    }

    return {
        init: function () {
            _eventListener();
        }
    }
}