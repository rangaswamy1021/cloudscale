$(document).ready(function () {
    $('.tyle-container').tyle({
        showProgressCount: false
        // onFinish: function () {
        //     // $('.sec-2').children().addClass('tyle-container');
        //     // $('.sec-1').children().removeClass('tyle-container').hide();
        //     // $('.tyle-container').tyle();
        //     var transTypeInner;
        //     var nextSecName = $('.sec-1').attr('next-sec');
        //  //   console.log(nextSecName);

        //     secNum = parseInt(nextSecName.split('-')[1]);
        //     secNumber = secNum;
        //     if(secNum==4){
        //         $('.next-btn').addClass('last-btn');
        //     }
        //     if (secNum < 5) {
        //         secNum = secNum + 1;
        //     }
           
        //     //   $('a[sec-name="'+nextSecName+'"]').parent().addClass('active').siblings().removeClass('active');
        //     $('.sec-1').attr('next-sec', 'sec-' + secNum);
        //     var nextSec = $('.' + nextSecName);
        //     var nextSecItem = nextSec.children('.item');
        //     var secData = nextSec.html();
            
        //     $('.tyle-container .item.active').after(secData);
        //     progressItemLength = nextSecItem.length;

        //     itemLength = $('.tyle-container .item').length;

        //     progressItemArray.push(progressItemLength);

        //    // console.log(progressItemArray);
        //     progressIndex = -1;
        //     if (width > 991) {
        //         transTypeInner = 'height';
        //     }
        //     else {
        //         transTypeInner = 'width';
        //     }
        //     elementTransitionType($('.item.active'), $('.item').length, $('.item.active').index(), null, transTypeInner);
        //     progressIndication(0, nextSecItem.length);
        // }
    });
})
