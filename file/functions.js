// Capture viewport size for reload on resize
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

// Reload if window size changes (orientation switch on phones/tablets)
$(window).resize(function () {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth !== clientWidth && newHeight !== clientHeight) {
        location.reload();
    }
});

// Typewriter effect
(function ($) {
    $.fn.typewriter = function () {
        this.each(function () {
            var $ele = $(this),
                str = $ele.html(),
                progress = 0;
            $ele.html('');
            var timer = setInterval(function () {
                var current = str.substr(progress, 1);
                if (current === '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);

// Time counter from a specific date
function timeElapse(date) {
    var current = new Date();
    var seconds = (current - Date.parse(date)) / 1000;
    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    hours = hours < 10 ? "0" + hours : hours;
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var result = `<span class="digit">${days}</span> days 
                  <span class="digit">${hours}</span> hours 
                  <span class="digit">${minutes}</span> minutes 
                  <span class="digit">${seconds}</span> seconds`;
    $("#clock").html(result);

    var text = "THE WORLD JUST GOT LUCKIER SINCE THAT DAY ❤️";
    $("#message-box").html(text);
}
