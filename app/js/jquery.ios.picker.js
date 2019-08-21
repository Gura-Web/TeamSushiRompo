! function (t) {
    var n = t.event.dispatch || t.event.handle,
        e = t.event.special,
        a = "D" + +new Date,
        l = "D" + (+new Date + 1);
    e.scrollstart = {
        setup: function (l) {
            var c, s = t.extend({
                    latency: e.scrollstop.latency
                }, l),
                i = function (t) {
                    var e = this,
                        a = arguments;
                    c ? clearTimeout(c) : (t.type = "scrollstart", n.apply(e, a)), c = setTimeout(function () {
                        c = null
                    }, s.latency)
                };
            t(this).bind("scroll", i).data(a, i)
        },
        teardown: function () {
            t(this).unbind("scroll", t(this).data(a))
        }
    }, e.scrollstop = {
        latency: 250,
        setup: function (a) {
            var c, s = t.extend({
                    latency: e.scrollstop.latency
                }, a),
                i = function (t) {
                    var e = this,
                        a = arguments;
                    c && clearTimeout(c), c = setTimeout(function () {
                        c = null, t.type = "scrollstop", n.apply(e, a)
                    }, s.latency)
                };
            t(this).bind("scroll", i).data(l, i)
        },
        teardown: function () {
            t(this).unbind("scroll", t(this).data(l))
        }
    }
}(jQuery);

(function ($) {

    //    $("head").append("<style type='text/css'></style>");


    $.fn.picker = function (json, callback) {
        var options = json.data;
        var lineHeight = 30;
        var name = json.name;
        $ele = $(this);
        $ele.empty();
        $ele.addClass("picker-wrapper");
        $ele.append('<div class="clone-scroller clone-scroller-' + name + '"></div>');
        $ele.append('<div class="picker-up"></div>');
        $ele.append('<div class="picker-down"></div>');
        $ele.append('<div class="picker-scroller picker-scroller-' + name + '"></div>');

        if (typeof json.lineHeight != "undefined") {
            lineHeight = json.lineHeight;
        }
        $.each(options, function (index, option) {
            $ele.find('.clone-scroller-'+name).append('<div class="option">' + option + '</div>');
            $ele.find('.picker-scroller-' + name).append('<div class="option">' + option + '</div>');
        });

        $ele.find('.clone-scroller-' + name).bind("scroll", function () {
            //            $(this).parent().find(".picker-scroller").scrollTop($(this).scrollTop());
            //            var scrollAmount = Math.round($(this).scrollTop() / lineHeight);
            //            if (callback){
            //                callback($($(this).parent().find(".picker-scroller").find(".option").get(scrollAmount)).html());
            //            }

            clockWise(lineHeight,name);
        });
        $ele.find(".clone-scroller-" + name).bind("scrollstop", function (e) {
            console.log("アイウエオ")
            var scrollAmount = Math.round($(this).scrollTop() / lineHeight) * lineHeight;
            $(this).parent().find(".clone-scroller-" + name).animate({
                scrollTop: scrollAmount
            }, 100);
            
            
            
            var eIndex = Math.round(unit / 22.5);
            var $scroller = $(".picker-scroller-" + name);
            var $clone = $(".clone-scroller-" + name);
            var $cloneScrollTop = $(".clone-scroller-" + name).scrollTop();
    var $options = $scroller.find(".option");
    var $optionsNo = $options.length;
    var $cloneHeight = lineHeight * $optionsNo;
    var totalDeg = 22.5 * $optionsNo;
    var unit = totalDeg / $cloneHeight * $cloneScrollTop;
            
            unit = Math.round(unit/22.5)*22.5;
    //    $(".output").html(totalDeg + "/" + $cloneHeight + "/" + $cloneScrollTop);
    $scroller.css("-webkit-transform", "translateZ(-90px) rotateX(" + unit + "deg)");
            
            
        });

        /*setting css*/
        if (typeof json.lineHeight != "undefined") {
            $ele.css("height", (lineHeight * 7) + "px");
            $ele.css("line-height", lineHeight + "px");
            $ele.find('.clone-scroller-' + name).css({
                "padding-top": (lineHeight * 3) + "px",
                "padding-bottom": (lineHeight * 3) + "px"
            });
            $ele.find('.picker-scroller-' + name).css({
                "padding-top": (lineHeight * 3) + "px",
                "padding-bottom": (lineHeight * 3) + "px"
            });
            $ele.find(".picker-up").css("height", (lineHeight * 3) + "px");
            $ele.find(".picker-down").css("height", (lineHeight * 3) + "px");
            $ele.find(".picker-down").css("top", (lineHeight * 4) + "px");
        }
        // default selected
        if (typeof json.selected != "undefined") {
            console.log(lineHeight * json.selected);

            console.log($ele.find('.clone-scroller-' + name).scrollTop());
            // console.log($ele.find('.picker-scroller-' + name).scrollTop());

            $('.clone-scroller-' + name).scrollTop(240);
            // $ele.find('.picker-scroller-' + name).scrollTop(lineHeight * json.selected);

            console.log($ele.find('.clone-scroller-' + name).scrollTop());
            // console.log($ele.find('.picker-scroller-' + name).scrollTop());
        }

        $ele.find('.picker-scroller-' + name).find(".option").each(function (index, $option) {
            $option = $($option);
            $option.css("-webkit-transform", "rotateX(-" + (22.5 * index) + "deg) translateZ(90px)");
            if (index > 7) {
                $option.hide();
            }
        });

    };
}(jQuery));


var deg = 0;

function clockWise(lineHeight,name) {
    console.log($('.clone-scroller-' + name).scrollTop());
    // console.log($('.picker-scroller-' + name).scrollTop());
    var $scroller = $(".picker-scroller-"+name);
    var $clone = $(".clone-scroller-"+name);
    var $cloneScrollTop = $(".clone-scroller-"+name).scrollTop();
    var $options = $scroller.find(".option");
    var $optionsNo = $options.length;
    var $cloneHeight = lineHeight * $optionsNo;
    var totalDeg = 22.5 * $optionsNo;
    var unit = totalDeg / $cloneHeight * $cloneScrollTop;
    //    $(".output").html(totalDeg + "/" + $cloneHeight + "/" + $cloneScrollTop);
    $scroller.css("-webkit-transform", "translateZ(-90px) rotateX(" + unit + "deg)");

    var eIndex = Math.round(unit / 22.5);
    $(".picker-"+name).attr("data-"+name,eIndex);
    $($options).hide();
    $($options.get(eIndex)).show();
    for (i = eIndex; i < (eIndex + 7); i++) {
        $($options.get(i)).show();
    }
    if (eIndex > 7) {
        for (i = eIndex; i >= (eIndex - 7); i--) {
            $($options.get(i)).show();
        }
    } else {
        for (i = 0; i < 8; i++) {
            $($options.get(i)).show();
        }
    }

}