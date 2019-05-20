import 'swiper/dist/css/swiper.min.css'
import './main.less'
import Swiper from 'swiper/dist/js/swiper.min.js'; //swiper

//import $ from 'jquery/dist/jquery.min.js' //jquery


var s = function() {



    if ((/menu/ig.test(location.pathname))) { //菜单页
        //图片循环放入数组
        let menuImgList = [];
        for (let i = 1; i <= 43; i++) {
            let img = require("./" + i + ".jpg");
            menuImgList.push(img);
        }
        let imgIndex = 4; //每次下拉显示几张图片
        imgHtml(imgIndex); //初始放4张图
        //每次下拉加4张
        window.addEventListener("scroll", function(e) {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let screenHeight = window.screen.availHeight;
            let docHeight = document.body.scrollHeight;
            if ((scrollTop + screenHeight) >= docHeight) {
                imgIndex += 4;
                imgHtml(imgIndex);
            }
        });

        function imgHtml(index) { //数组循环放入页面
            let html = '';
            for (let i = 0; i < index; i++) {
                if (i < 43) {
                    html += "<img class='menu-img' src=" + menuImgList[i] + ">";
                }
            }
            document.getElementById("menu").innerHTML = html;

            var menuImg = document.getElementsByClassName("menu-img");
            for (var i = 0; i < menuImg.length; i++) {
                var a = menuImg[i];
                a.index = i; //给每个className为child的元素添加index属性;
                a.onclick = function() {
                    //alert(this.index);
                    let screenWidth = window.screen.width;
                    if (screenWidth > 1024) {
                        document.getElementById("mask").style.display = "block";
                        document.getElementById("menu-slide-div").style.display = "block";
                        menuswiper.init();
                        menuswiper.slideTo(this.index, 0, false); //切换到第一个slide，速度为1秒
                    }
                }
            }
        }



        let swiperHtml = '';
        for (let i = 0; i < 43; i++) {
            swiperHtml += "<div class='swiper-slide'><img src=" + menuImgList[i] + "></div>";
        }
        document.getElementById("menu-swiper-wrapper").innerHTML = swiperHtml;

        var menuswiper = new Swiper('.swiper-container', {
            initialSlide: 0,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            init: false,
        });







        var maskDom = document.getElementById('mask');

        function hide() {
            document.getElementById("mask").style.display = "none";
            document.getElementById("menu-slide-div").style.display = "none";
        }
        maskDom.onclick = hide;




    } else {
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
    }

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