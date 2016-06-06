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
                $this.attr('placeholder', $this.data('value'));
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
            .removeClass('form__group_valid form__group_no-valid')
            .end()
            .find('.form__field')
            .attr('placeholder', '');
    }

    return {
        init: function () {
            _eventListener();
        }
    }
}

//Google-maps
var styleArr = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#3e606f"
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.84
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "weight": 0.6
            },
            {
                "color": "#607892"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4f6985"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#526d8a"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#607892"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#aabdce"
            },
            {
                "lightness": "0"
            },
            {
                "weight": "0.20"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "hue": "#0063ff"
            },
            {
                "invert_lightness": true
            },
            {
                "weight": "5.13"
            },
            {
                "gamma": "8.43"
            },
            {
                "lightness": "34"
            },
            {
                "saturation": "48"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#5b7189"
            }
        ]
    }
];

google.maps.event.addDomListener(window, "load", init);

function init() {
    var e = {
            zoom: 7,
            center: new google.maps.LatLng(41.547859,-72.8765097,17),
            styles: styleArr
        },
        t = document.getElementById("map"),
        i = new google.maps.Map(t, e);

    new google.maps.Marker({
        position: new google.maps.LatLng(42.3540236,-71.0730505,15.88),
        map: i,
        title: "Fisher College",
        icon: "img/svg/markpoint.svg"
    });

    new google.maps.Marker({
        position: new google.maps.LatLng(42.3770068,-71.1188488,17),
        map: i,
        title: "Harvard University",
        icon: "img/svg/markpoint.svg"
    });

    new google.maps.Marker({
        position: new google.maps.LatLng(40.8075395,-73.9647614,17),
        map: i,
        title: "Columbia University",
        icon: "img/svg/markpoint.svg"
    });

    new google.maps.Marker({
        position: new google.maps.LatLng(42.3600949,-71.0963487),
        map: i,
        title: "Massachusetts Institute of Technology",
        icon: "img/svg/markpoint.svg"
    });

    new google.maps.Marker({
        position: new google.maps.LatLng(40.7295174,-73.9986496,17),
        map: i,
        title: "New York University",
        icon: "img/svg/markpoint.svg"
    });
}