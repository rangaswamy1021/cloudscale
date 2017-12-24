$(document).ready(function () {
    $('.navbar-toggle').click(function () {

        if ($(this).hasClass("active")) {
            $(this).removeClass('active');
            $('.navbar-default').removeClass('mob-nav-open');
        }
        else {
            $(this).addClass('active');
            $('.navbar-default').addClass('mob-nav-open');
        }

    })
    new WOW().init();
})