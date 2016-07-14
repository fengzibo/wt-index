var Common = {
    //导航菜单
    nav: function () {
        $('.multistage').on('mouseover', function () {
            $(this).addClass('mulshow');
        });
        $('.multistage').on('mouseout', function () {
            $(this).removeClass('mulshow');
        });
    },
    //新闻通告
    news: function () {
        var scroll_area = $("ul.roll-box");
        var timespan = 2000;
        var timeID;

        function movestart() {
            var moveline = scroll_area.find('li:first');
            var lineheight = -moveline.innerHeight();
            moveline.animate({marginTop: lineheight + 'px'}, 500, function () {
                moveline.css('marginTop', 0).appendTo(scroll_area);
            });
        };
        scroll_area.hover(function () {
            clearInterval(timeID);
        }, function () {
            timeID = setInterval(function () {
                movestart();
            }, timespan);
        }).trigger('mouseleave');
        $('.roll-prev').click(function () {
            movestart();
        })
        $('.roll-next').click(function () {
            var moveline = scroll_area.find('li:first');
            var moveline2 = scroll_area.find('li:last');
            var lineheight = -moveline.innerHeight();
            moveline.animate({marginTop: -lineheight + 'px'}, 500, function () {
                moveline.css('marginTop', 0);
                moveline2.prependTo(scroll_area);
            });
        })

    },
    //产品展示
    productShow: function () {
        $('.pro-box .col-xs-4').hover(function () {
            $(this).addClass('pro-active').siblings().removeClass('pro-active');
        });
    },

    //左侧菜单栏
    menuSidebar: function(){
        (function(){
            $('#menuSidebar').on('click','span',function(){
                var els=$(this).parent('div');
                if(els.hasClass('active')){
                    els.find('ul').stop().slideUp('fast');
                    els.removeClass('active');
                }
                else {
                    $('#menuSidebar').find('ul').stop().slideUp('fast');
                    $('#menuSidebar').children('div').removeClass('active');
                    els.find('ul').stop().slideDown('fast');
                    els.addClass('active');
                }
            })
        })();

    },
    //点击状态
    clickStatus: function (obj) {
        $(obj).on('click', function () {
            $(this).addClass('current').siblings().removeClass('current');
        })
    },
    //限定字数
    wordLimit: function (obj,obj2,number) {
        var num = new Array();
        for (var i = 0; i < $(obj).length; i++) {
            num[i] = $(obj).eq(i).find(obj2).text().replace(/\s+/g, "");
            var txt = num[i];
            $(obj).eq(i).find(obj2).attr('data-content', txt)
            if (num[i].length > number) {
                $(obj).eq(i).find(obj2).html(num[i].substr(0, number) + '......')
            }
        };
    },
    slider:function(){
        $(function () {
            var x_pos = 0;
            var li_items_n = 0;
            var right_clicks = 0;
            var left_clicks = 0;
            var li_col = $("#slider_list1 > li");
            var li_width = li_col.outerWidth(true)+40;
            var viewWindow = Math.round($('.sml-magaz-main').width()/li_width);

            li_col.each(function(index){
                x_pos += $(this).outerWidth(true);
                li_items_n++;
            })

            right_clicks = li_items_n - viewWindow;
            total_clicks = li_items_n - viewWindow;

            $('#slider_list1').css('position','relative');
            $('#slider_list1').css('left','0px');
            $('#slider_list1').css('width', x_pos+'px');

            var is_playing = false;
            var completed = function() { is_playing = false; }

            $('.prev-btn').click( function(){
                var thisSlider =$(this).prevAll('.sml-magaz-main').children('#slider_list1');
                cur_offset = thisSlider.position().left;
                if (!is_playing){
                    if (left_clicks > 0) {
                        is_playing = true; thisSlider.animate({'left': cur_offset + li_width + 'px'}, 300, "linear", completed);
                        right_clicks++;
                        left_clicks--;
                    }
                    else {
                        is_playing = true;
                        thisSlider.animate({'left':    -li_width*total_clicks	+ 'px'}, 300, "linear", completed);
                        right_clicks = 0;
                        left_clicks = total_clicks;
                    }
                }
            });

            $('.next-btn').click( function(){
                if (!is_playing){
                    var thisSlider =$(this).prevAll('.sml-magaz-main').children('#slider_list1')
                    cur_offset = thisSlider.position().left;
                    if (right_clicks > 0) {
                        is_playing = true;
                        thisSlider.animate({'left': cur_offset - li_width + 'px'},300, "linear", completed );
                        right_clicks--; left_clicks++;
                    }
                    else {
                        is_playing = true; thisSlider.animate({'left':    0	+ 'px'},300, "linear", completed );
                        left_clicks = 0;
                        right_clicks = total_clicks;
                    }
                }
            });
            var slider_link = $('.next-btn');
            var slider_link_index = 1;
            var slider_count = $('#slider_list1 > li').size();

            function slider_intro(){
                if(slider_link_index <= slider_count){
                    slider_link.trigger('click');
                    slider_link_index++;
                    setTimeout(function(){slider_intro()}, 5000); //select change time
                }
            }
            setTimeout(function(){slider_intro()}, 5000)

        })
    },
    //回到顶部
    gotop: function () {
        $('.footer-top-line span').click(function () {
            $("html,body").animate({scrollTop:"0px"},200);
        });
    },
    //banner居中
    bannercenter:function(obj){
        $(function(){
            var win = $(window);

            cal(obj);
            win.resize(function() {
                cal(obj);
            });
            function cal(obj) {
                var win_width = win.width();
                var distance = 1920 - win_width;
                if (distance <  0 || distance > 866) return false;
                distance = Math.floor((distance) / 2);
                obj.css({
                    "left": -distance + "px"
                });
            }
        })
    },
    //公共头部
    cheader: function (whichPage) {
        var headhtml = $.ajax({
            type: "GET",
            url: "/wtindex-new/common-top.html",
            data: {date: new Date().getTime().toString()},
            async: false,
            dataType: "html"
        }).responseText;
        if (whichPage != '' && whichPage != false) {
            //给选中的一级导航栏添加选中样式
            $('#navbar').find("." + whichPage).addClass('current');
        }
        return $(headhtml);
    },
    cfooter: function () {
        var foothtml = $.ajax({
            type: "GET",
            url: "/wtindex-new/common-footer.html",
            data: { date: new Date().getTime().toString() },
            async: false,
            dataType: "html"
        }).responseText;
        return $(foothtml);
    },
    textword: function () {
        $(".com-content textarea").keyup(function(){
            var area=$(this);
            var max=parseInt(area.attr("maxlength"),10); //获取maxlength的值
            if(max>0){
                if(area.val().length>max){ //textarea的文本长度大于maxlength
                    area.val(area.val().substr(0,max)); //截断textarea的文本重新赋值
                }
            }
            area.next('.text-number').find('span').text(max-area.val().length);
        });
        //复制的字符处理问题
        $(".com-content textarea").blur(function(){
            var area=$(this);
            var max=parseInt(area.attr("maxlength"),10); //获取maxlength的值
            if(max>0){
                if(area.val().length>max){ //textarea的文本长度大于maxlength
                    area.val(area.val().substr(0,max)); //截断textarea的文本重新赋值
                }
            }
        });
    }
}