'use strict';
var itemLength;
var progressIndex = 0, secNum, secNumber, progressItemArray = [], progressItemLen;

var progressItemLength = $('.item').length;
progressItemArray.push(progressItemLength)
var btn;
var defaultOptions = {
    showProgress: true,
    showProgressCount: true,
    onFinish: function () {
        alert('Finished');
    }
};
var width = $(window).width();
$(window).on('resize', function () {
    if ($(this).width() !== width) {
        window.location.reload();
    }
});

// Main function to trigger tyle
$.fn.tyle = function (options) {
    var showProgressBar, showProgressCount;
    var targetElement = $(this);
    targetElement.before(' <div class="progress-container"></div>');
    if (options) {
        if (options.showProgress !== undefined)
            showProgressBar = options.showProgress;
        else
            showProgressBar = defaultOptions.showProgress;
        if (options.showProgressCount !== undefined)
            showProgressCount = options.showProgressCount;
        else
            showProgressCount = defaultOptions.showProgressCount;
        if (options.onFinish != undefined && typeof (options.onFinish) == 'function')
            defaultOptions.onFinish = options.onFinish;

        if (options.duration) {
            targetElement.children().css({
                '-webkit-transition-duration': options.duration / 1000 + 's',
                '-moz-transition-duration': options.duration / 1000 + 's',
                '-mz-transition-duration': options.duration / 1000 + 's',
                'transition-duration': options.duration / 1000 + 's'
            });
        }
    }
    else {
        showProgressBar = defaultOptions.showProgress;
        showProgressCount = defaultOptions.showProgressCount;
    }
    if (showProgressBar) {
        $('.progress-container').append('<div class="progress-indicator"><span class="progress-bar"></span></div>');
    }
    if (showProgressCount) {
        $('.progress-container').append(' <div class="progress-count">Step</div>');
    }
    $('.step-buttons-container').append('<div class="step-nav"><button class="form-item-changer nav-btn prev-btn" btn-type="prev" disabled="true">Back</button><button class="form-item-changer nav-btn next-btn">Next</button></div>');

    itemLength = targetElement.children().length;
    progressIndication(0, itemLength);

    $('.form-item-changer').click(function () {
        if ($(window).width() > 991) {
            // For vertical transition in desktop
            $(this).initTyle(targetElement, "height");
        } else {

            // For horizontal transition in mobile and tablet
            $(this).initTyle(targetElement, "height");
        }
    });
};


// Initialize Tyle elements

$.fn.initTyle = function (targetElement, transType) {
    var activeItem = targetElement.children('.active');
    var itemIndex = targetElement.children().index(activeItem);
    var nextItemIndex = targetElement.children().index(activeItem.next().next());
    var btn = $(this);
    var btnType = btn.attr('btn-type');
    if(btnType != 'prev'){
        if(!activeItem.hasClass('is-viewed')){
            activeItem.addClass('is-viewed');
        }
        if(!activeItem.next().hasClass('is-viewed')){
            disableBtn('.next-btn', false);
        }
        else{
            disableBtn('.next-btn', false);
        }
    }
    if (itemIndex === 0) {
        disableBtn('.prev-btn', false);
    }
    if (nextItemIndex < 0 ) {
        disableBtn('.next-btn', false);
    }
    if ((itemIndex >= 0 && itemIndex < itemLength - 1) || btnType == 'prev') {
        elementTransitionType(activeItem, itemLength, itemIndex, btnType, transType, btn);
    }
    else {
        defaultOptions.onFinish(); // On end
    }
};

// To Toggle button state

function disableBtn(btn, flag) {
    $(btn).attr('disabled', flag);
};

// To Indicate step progress

function progressIndication(itemIndex, itemLength) {


    var progressPercent;
    $('.progress-count').html((itemIndex + 1) + '/' + itemLength);
    if (itemIndex <= itemLength - 1) {
        progressPercent = (itemIndex + 1) / itemLength * 100;
    }
    console.log(itemIndex, itemLength)
    $('.progress-bar').css({ 'width': progressPercent + '%' });
}
// To get the type of transition
function elementTransitionType(activeItem, itemLength, itemIndex, btnType, transType, btn) {
    var transitionAxis, activeItemHeight, nextItemTransitionPos,nextItemHeight;
    itemIndex = itemIndex + 1;
    if (btnType === 'prev') {
        nextItemHeight=activeItem.prev().outerHeight();
    }
    else{
        nextItemHeight=activeItem.next().outerHeight();
    }
    console.log(nextItemHeight);
    if (transType === 'height') {
        activeItemHeight = activeItem.outerHeight();
        transitionAxis = 'Y'; // For selecting translate axis
    } else {
        
      
        activeItemHeight = activeItem.outerWidth()+5;
        console.log(activeItemHeight);
        transitionAxis = 'X'; // For selecting translate axis
    }
    var currentItemTransitionPos;


    if (secNumber) {
     //   console.log(secNum)
        progressItemLen = progressItemArray[secNumber - 1];
    }
    else {
        progressItemLen = progressItemArray[0];
    }
    if (btnType === 'prev') {
        if (progressIndex == 0) {
            $('li.active').removeClass('active').prev().addClass('active');
        }
        if (progressIndex < 1) {
            progressItemLen = progressItemArray[secNumber - 2];
            progressIndex = progressItemLen;

        }
        progressIndex = progressIndex - 1;
        if (secNumber) {
            btn.addClass('prev-pressed')
        }
        progressIndication(progressIndex, progressItemLen); // Subtracting 2 to get current progress 
        disableBtn('.next-btn', false);
        itemIndex = itemIndex;
        if (itemIndex === 2) {
            nextItemTransitionPos = 0; // To resolve "Infinity" Error
            disableBtn('.prev-btn', true)
        }
        else {
            nextItemTransitionPos = activeItemHeight * (itemIndex - 2); // To set position of element to inital state
        }
        currentItemTransitionPos = nextItemTransitionPos * 0.5; // Leaving Transition position prev
        transitionStyles(activeItem, activeItem.prev(), currentItemTransitionPos, -nextItemTransitionPos, transitionAxis);
    }
    else {
        console.log("progressIndex",progressIndex)
        if (progressIndex == -1) {
            $('li.active').removeClass('active').next().addClass('active');
        }
        // if (progressIndex == 0) {
        //     if (secNumber && btn.hasClass('prev-pressed')) {
        //         progressItemLen = progressItemArray[secNumber - 1];
        //         console.log('secno', progressItemLen)
        //     }
        // }
        progressIndex = progressIndex + 1;
        progressIndication(progressIndex, progressItemLen);
        nextItemTransitionPos = activeItemHeight * itemIndex; // To set the position of next element
        currentItemTransitionPos = nextItemTransitionPos * 0.7; // Leaving Transition position next
        transitionStyles(activeItem, activeItem.next(), -currentItemTransitionPos, -nextItemTransitionPos, transitionAxis);
    }
}

// Transition Styles

function transitionStyles(activeItem, effectingEle, cpos, npos, transitionAxis) {
    activeItem.removeClass('active').css({ transform: 'translate' + transitionAxis + '(' + cpos * 1.5 + 'px)' }); //Transition for the current element to exit viewport
    effectingEle.addClass('active').css({ transform: 'translate' + transitionAxis + '(' + npos + 'px)' }); //Transition for the next element to enter viewport
}

if(width<991){
    var feh=$('.f-e').outerHeight();
}