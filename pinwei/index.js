import 'swiper/dist/css/swiper.min.css'
import './main.less'
import Swiper from 'swiper/dist/js/swiper.min.js'; //swiper
//import $ from 'jquery/dist/jquery.min.js' //jquery

var s = function() {
    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });

    window.onscroll = function(e) {
        var e = e || window.event;
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolltop > 55) {
            document.getElementById("fixedtop").style.display = "block";
        } else {
            document.getElementById("fixedtop").style.display = "none";
        }
    }


}

s()