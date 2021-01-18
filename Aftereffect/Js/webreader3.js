var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?6ef419ba5cea4fb5ed354aab51911eb2";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-73011249-2', 'auto', {
    'allowLinker': false
});
ga('send', 'pageview');

// console.log = function(){};
//当前加载的文件名
var strCurHtmlPage = '';
//服务器上的路径
var tBookName = '';
var qaddbook = '';

var mouseY = 0;
var maxWidth = "760px";
//设备宽度
var winWidth = window.outerWidth;
var maxHeight = 0;
var innerMaxHeight = 0;

var loading = false;
var homePageUrlBooks = '';

//切换
var showBooleanValue = {
    menu: false,
    readerTop: false,
    appTo: false,
    vipTo: true
}
//屏幕响应
var clickScreenCenter = {
    left: (winWidth / 5) * 2,
    right: (winWidth / 5) * 4
};
var isVip = 1;
    isVip = window.localStorage.getItem('ReaderisVIP') || 0;

//翻译
var online_lang = {
    'add': ['Add', '添加'],
    'DEFAULT': ['Defaut', '默认'],
    'Booknotexist': ['Book not exist!', '书籍不存在!'],
    'Background': ['Background', '背景'],
    'FONT': ['Font', '字体'],
    'MODE': ['Mode', '翻页'],
    'TURN': ['Turn Page', '平移'],
    'DefaultTURN': ['Scroll', '滚动'],
    'SIZE': ['Size', '字号'],
    'SHOW': ['Width', '宽度'],
    'Immerse': ['Immerse', '沉浸'],
    'Full': ['Full', '铺满'],
    'prePage': ['Prev', '上一章'],
    'NextPage': ['Next', '下一章'],
    'Catalogue': ['Catalog ', '目录'],
    'More': ['More', '更多图书'],
    'upgradetovip': ['Upgrade to VIP', '40元畅读1年'],
    'Selected': ['Epubee selected books', '小蜜蜂 精选图书'],
    'ONE': ['One year', '畅读1年'],
    'Read': ['Read on App', 'App阅读'],
    'Mini': ['The smallest size', '已经是最小字号'],
    'Max': ['The largest size', '已经是最大字号'],
    'Strongest': ['The strongest IOS reader', '地表最强IOS阅读器'],
    'bookName': ['Title', '书名'],
    'library':['Library', '资源书库']
};
//记录页面位置的相关参数
var pageScroll = {
    contentScrollWidth: 0,
    contentWidth: 0,
    currentPageNumber: 1,
    ratioPageAll: 1,
    turnPageMode: "vertical",
    contentScrollHeight: 0,
    contentHeight: 0,
    currentVerticalScrollTop: 0,
    ratioVerticalPageAll: 1
};
//上次宽度的总页数
var lastRatioPageAll = window.localStorage.getItem('lastRatioPageAll') || 1;
//手机端翻页相关参数
var mobileSwipe = {
    minRange: 30,
    touchX: 0,
    readyMoved: true,
    scrollLeft: 0
}

var booksMarks = {};
var booksMarksControl = true;


var fontFamily = /macintosh|mac os x/i.test(navigator.userAgent) ? ['PingFang', 'STHeiti', 'STSong'] : ['YaHei', 'SimHei', 'SimSun'];



// var locationData = { Htmlpage: "", number: 1, verticalNumber: 0 };
// var locationDataString = "{ \"Htmlpage\" : \"\", \"number\": 1, \"verticalNumber\": 0 }";
// var dataLocatiton = window.localStorage.getItem('currentLocaitionPageNum');
// if (dataLocatiton) {
//     currentLocaitionPageNum = JSON.parse(dataLocatiton);
// } else {
//     currentLocaitionPageNum = locationData;
//     window.localStorage.setItem('currentLocaitionPageNum', locationDataString);
// }
var currentLocaitionPageNum = { Htmlpage: "", number: 1, verticalNumber: 0 };
var ReaderV2Location = window.localStorage.getItem('ReaderV2Location');


//设置的当前状态
var settingStatusString = "{ \"mode\": 0, \"size\": 0, \"family\": 0, \"background\": 0, \"width\": 1 }";
var settingStatus = { mode: 0, size: 0, family: 0, background: 0, width: 1 };

//语言类型 中文1 英文0
var lang_type = 0;
var lang = navigator.language || navigator.userLanguage;
lang = lang.substr(0, 2);
lang_type = lang == 'zh' ? 1 : 0;

//判断设备
var clientOrNot = '';
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
    clientOrNot = 'iOS';
} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
    clientOrNot = 'Android';
} else {
    clientOrNot = 'PC';
}

var strSettingPCContent = `
                <div class="font-family df font-line">
                    <div class="wd-same">
                      <div class="l-gray">${online_lang.MODE[lang_type]}</div>
                    </div>
                    <div class="default-color c-pointer wd-same"><em onclick="toggleMode('vertical', this)" index="0" class="mode">${online_lang.DefaultTURN[lang_type]}</em></div>
                    <div class="default-color c-pointer wd-same" style='white-space: nowrap;'><em onclick="toggleMode('column', this)" index="1" class="mode">${online_lang.TURN[lang_type]}</em></div>
                </div>
                <div class="font-size df font-line">
                    <div class="wd-same">
                        <div class="l-gray">${online_lang.SIZE[lang_type]}</div>
                    </div>
                    <div class="default-color subtract c-pointer wd-same"><div class="img-pic size-same" onclick="fontPlus(event, this, 'subtract')" index="0" style="background-image: url(../icons/subtract.png);background-repeat: no-repeat;" ></div></div>
                    <div class="default-color plus c-pointer wd-same"><div class="img-pic size-same" onclick="fontPlus(event, this, 'plus')" index="1" style="background-image: url(../icons/plus.png);background-repeat: no-repeat;" ></div></div>
                    <div class="default-color deffault c-pointer wd-same"><em class="size-same" onclick="fontPlus(event, this, 'default')" index="2">${online_lang.DEFAULT[lang_type]}</em></div>
                </div>
                <div class="font-family df font-line mobile-none">
                    <div class="wd-same">
                      <div class="l-gray">${online_lang.FONT[lang_type]}</div>
                    </div>
                    <div class="default-color Yahei c-pointer wd-same"><em class="family-same" onclick="fontChange(event, this, 'Microsoft YaHei-PingFang SC')" index="0">${fontFamily[0]}</em></div>
                   <div class="default-color Yahei c-pointer wd-same" ><em class="family-same" onclick="fontChange(event, this, 'SimHei-STHeiti')" index="1">${fontFamily[1]}</em></div>
                   <div class="default-color Yahei c-pointer wd-same" ><em class="family-same" onclick="fontChange(event, this, 'SimSun-STSong')" index="2">${fontFamily[2]}</em></div>
                </div>
            <div class="bg-color df font-line">
                    <div class="wd-same">
                        <div class="l-gray">${online_lang.Background[lang_type]}</div>
                    </div>
                    <div class="default-color wd-same">
                    <div class="bg-circle orange c-pointer" index="0" onclick="bgChange(event, this, '#F8F0D9')"></div>
                    </div>
                    <div class="default-color wd-same">
                    <div class="bg-circle green c-pointer" index="1" onclick="bgChange(event, this, '#D0E9D8')"></div>
                    </div>
                    <div class="default-color wd-same">
                    <div class="bg-circle night c-pointer" index="2" onclick="bgChange(event, this, '#000000')"></div>
                    </div>
                    <div class="default-color wd-same">
                    <div class="bg-circle day c-pointer" index="3" onclick="bgChange(event, this, '#ffffff')"></div>
                    </div>
                </div>

                <div class="reader-mode df font-line mobile-none">
                <div class="wd-same">
                    <div class="l-gray">${online_lang.SHOW[lang_type]}</div>
                </div>
                <div class="default-color deep c-pointer wd-same" ><em class="different-width" onclick="fullScreenWidth(this)" index="0">${online_lang.Immerse[lang_type]}</em></div>
                <div class="default-color small c-pointer wd-same" ><em class="different-width" onclick="changeReadWidth('820', this)" index="1">760</em></div>
                <div class="default-color normal c-pointer wd-same" ><em class="different-width" onclick="changeReadWidth('1260', this)" index="2">1200</em></div>
                <div class="default-color all c-pointer wd-same" ><em class="different-width" onclick="changeReadWidth('100%', this)" index="3">${online_lang.Full[lang_type]}</em></div>
            </div>
`;


function isMobile() {
    var userAgentInfo = navigator.userAgent.toLowerCase();
    var Agents = ['android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod', 'ios', 'mobile', 'juc', 'webos'];
    var flag = 0;
    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) != -1) {
            flag = 1;
            return flag;
        }
    }
    return flag + 0;
}

var resizeTimer = null;

//浏览器窗口大小改变
    // window.addEventListener('resize', function() {
    //     console.log('11 :>> ', 11);
    //     if (resizeTimer) {
    //         clearTimeout(resizeTimer); // 取消上次的延迟事件
    //     }
    //     resizeTimer = setTimeout(function() {
    //         console.log('22 :>> ', 22);
    //         console.log(document.documentElement.clientHeight, screen.height)
    //         if(document.documentElement.clientHeight != screen.height){
    //         }
    //     }, 500);
    // })
if (document.addEventListener)
{
 document.addEventListener('fullscreenchange', exitHandler, false);
 document.addEventListener('mozfullscreenchange', exitHandler, false);
 document.addEventListener('MSFullscreenChange', exitHandler, false);
 document.addEventListener('webkitfullscreenchange', exitHandler, false);
}

function exitHandler()
{
    console.log('change')
 if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
 {
  // Run code on exit
  
    var settingStatus = JSON.parse(localStorage.getItem('settingStatus'));
    addActive($('.different-width').eq(settingStatus._width) ,"width", "different-width", settingStatus);
    if(pageScroll.turnPageMode == 'column'){
        // maxHeight = isVip == 1 ? innerHeight : window.innerHeight - 130;
        // $('.readercontent').height(window.innerHeight);
        // $('.readercontent-inner').height(maxHeight);
        // turnBookPage($('.readercontent-inner'), $('.readercontent'));
        maxHeight =  innerHeight;
        console.log(innerHeight)
        innerMaxHeight = isVip == 1 ? innerHeight: window.innerHeight - 130;
        $('.readercontent').height(window.innerHeight);
        $('.readercontent-inner').height(isVip == 1 ? innerHeight: window.innerHeight - 130);

    }   
    setTimeout(sumPages)
 }else{
    // addActive(_this, "width", "different-width", settingStatus);
    if(pageScroll.turnPageMode == 'column'){
        maxHeight =  outerHeight;
        innerMaxHeight = isVip == 1 ? outerHeight: window.outerHeight - 130;
        $('.readercontent').height(window.outerHeight);
        $('.readercontent-inner').height(innerMaxHeight);
    
    }
    setTimeout(sumPages)
 }
}

//监听页面滑动
window.onscroll = function (e) {
    //console.log('document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop :>> ', document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
    pageScroll.currentVerticalScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    //console.log('object :>> ', pageScroll.currentVerticalScrollTop);
    currentLocaitionPageNum.verticalNumber = pageScroll.currentVerticalScrollTop;
    ReaderV2Location[tBookName] = currentLocaitionPageNum;
    window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
    //window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
}
//翻页的缓动过渡效果
function animate(callback) {
    var _animate = function () {
        var isValid = callback && callback();
        isValid && requestAnimationFrame(_animate);
    };

    requestAnimationFrame(_animate);
}
//键盘响应翻页
document.addEventListener('keyup', function (e) {
    var keyCode = e.which || e.keyCode;
    var aPreBtn = $('.a_prev');
    var aNextBtn = $('.a_next');
    var contentMain = $('.readercontent');
    if (keyCode == 37) {
        //左
        turnToPrePage(aPreBtn, contentMain);
    }
    if (keyCode == 39) {
        //右
        turnToNextPage(aNextBtn, contentMain);
    }
})


//初始化加载
$(document).ready(function () {
    var loading = $('.loading');
    loading.css('display', 'block');

    tBookName = window.location.pathname.toString().replace('\\', '\/');

    //这里并未获取?参数及#锚
    console.log('window.location.pathname', window.location.pathname);
    //---/books/mobile2/0e/0e0d7f7f1d3e047a2fb9d0582bfe05e4/text00008.html
    //console.log(tBookName.split('/')[4]);


    //要带上锚值window.location.hash.
    strCurHtmlPage = tBookName.split('/' + tBookName.split('/')[4] + '/')[1] + window.location.hash;
    console.log('strCurHtmlPage :', strCurHtmlPage);

    tBookName = tBookName.split('/')[4];

    // console.log('tBookName :', tBookName);

    if (tBookName === "") {
        alert(_ts("Booknotexist"));
        return;
    }

    var LocalUserID = 0;
    LocalUserID = window.localStorage.getItem('ReaderUID') || 0;
    if (LocalUserID == 0) {
        qaddbook = "book=" + tBookName;
    }

    // console.log('qaddbook :', qaddbook);

    var contentMain = $('.readercontent');
    var readercontentInner = $('.readercontent-inner');

    console.log('contentMain :>> ', contentMain);

    // contentMain.css({
    //     minHeight: window.innerHeight
    // });

    //章节切换按钮
    if (!$('.top-prev a').length) {
        $('.top-prev').css('opacity', '0.5');
    } else {
        readercontentInner.append('<div style="margin:30px auto 60px;text-align:center;"><a href="' + $('.a_prev').eq(0).attr('href') + '">' + online_lang.prePage[lang_type] + '</a></div>');
    }
    if (!$('.top_next a').length) {
        $('.top_next').css('opacity', '0.5');
    } else {
        readercontentInner.append('<div style="margin:30px auto 60px;text-align:center;"><a href="' + $('.a_next').eq(0).attr('href') + ' ">' + online_lang.NextPage[lang_type] + '</a></div>');
    }


    //homePageUrlBooks = 'http://cn.epubee.com/files.aspx?utm_medium=webreader&utm_source=webreader&utm_campaign=homelogo&utm_content=webreader2.0_' + tBookName + '&upgradevip=1&ismobile=' + mobileOrNot + '&' + qaddbook;
    homePageUrlBooks = 'http://cn.epubee.com/files.aspx?utm_medium=webreader&utm_source=webreader&utm_campaign=homelogo&utm_content=webreader2.0_' + tBookName + '&upgradevip=1&ismobile=' + clientOrNot + '&' + qaddbook;
    window.localStorage.setItem('homePageUrlBooks', homePageUrlBooks);
    $(".a_reader").attr("href", "https://coldfrontXu.github.io");
    //$(".a_reader").attr("href", "/books/mobile/moreBooks.html");

    $(".reader-setting").html(strSettingPCContent);

    $('.WebReader').append(`<div class="pre-page icon-page"></div><div class="next-page icon-page"></div>`);

    $('body').append(`<div class="top-title-about" onclick="stopProp(event)">
                          <div class="inner-about df justify-center align-center">
                            <div class="title-name">书名</div>
                            <a class="app-read btn-hover" href="#">
                            ${clientOrNot != "IOS" ? online_lang.library[lang_type] : online_lang.Read[lang_type]}</a>
                          </div>
                          </div>
                          <div class="has-max has-size size-font">已经是最大字号</div>
                          <div class="has-mix has-size size-font">已经是最小字号</div>`);

    //初始化某些样式

    adjustAttr();

    //位置
    console.log('currentLocaitionPageNum :', currentLocaitionPageNum);
    //记录阅读书籍位置
    if (ReaderV2Location) {
        ReaderV2Location = JSON.parse(ReaderV2Location);
        if(ReaderV2Location[tBookName]){
            currentLocaitionPageNum = ReaderV2Location[tBookName];
        }else{
            ReaderV2Location[tBookName] = currentLocaitionPageNum;
        }
    } else {
        ReaderV2Location = {};
        ReaderV2Location[tBookName] = currentLocaitionPageNum;
    }

    console.log('ReaderV2Location :>> ', ReaderV2Location);
    

    // currentLocaitionPageNum = JSON.parse(currentLocaitionPageNum);
    console.log('currentLocaitionPageNum :', currentLocaitionPageNum);
    pageScroll.turnPageMode = window.localStorage.getItem('turnPageMode') || "vertical";

    //有锚点和没有锚点页面跳转当前位置不同以及需不需要初始化跳转
    if (currentLocaitionPageNum.Htmlpage) {
        //之前已存储阅读位置
        if (pageScroll.turnPageMode === 'column') {
            //横向
            if (currentLocaitionPageNum.Htmlpage.split('#')[0] === strCurHtmlPage.split('#')[0]) {
                //同一文件不同锚点
                if (currentLocaitionPageNum.Htmlpage.indexOf('#') > -1 && strCurHtmlPage.indexOf('#') < 0) {
                    //当前文件 访问没有带锚点
                    pageScroll.currentPageNumber = currentLocaitionPageNum.number;
                } else if (currentLocaitionPageNum.Htmlpage.indexOf('#') < 0 && strCurHtmlPage.indexOf('#') > -1) {
                    //当前访问并未带锚点要取得是之前这个文件的位置
                    pageScroll.currentPageNumber = -1;
                } else if (currentLocaitionPageNum.Htmlpage.indexOf('#') > -1 && strCurHtmlPage.indexOf('#') > -1) {
                    //两个都带锚点 属于一个文件
                    pageScroll.currentPageNumber = -1;
                } else {
                    pageScroll.currentPageNumber = currentLocaitionPageNum.number;
                }
            } else {
                //不同文件
                pageScroll.currentPageNumber = 1;
                currentLocaitionPageNum.Htmlpage = strCurHtmlPage;
                currentLocaitionPageNum.number = 1;
                //window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
            }
        } else {
            //纵向currentVerticalPageNumber
            if (currentLocaitionPageNum.Htmlpage.split('#')[0] === strCurHtmlPage.split('#')[0]) {
                //同一文件不同锚点
                if (currentLocaitionPageNum.Htmlpage.indexOf('#') > -1 && strCurHtmlPage.indexOf('#') < 0) {
                    //当前文件 访问没有带锚点
                    pageScroll.currentVerticalScrollTop = currentLocaitionPageNum.verticalNumber;
                } else if (currentLocaitionPageNum.Htmlpage.indexOf('#') < 0 && strCurHtmlPage.indexOf('#') > -1) {
                    //当前访问并未带锚点要取得是之前这个文件的位置
                    pageScroll.currentVerticalScrollTop = -1;
                } else if (currentLocaitionPageNum.Htmlpage.indexOf('#') > -1 && strCurHtmlPage.indexOf('#') > -1) {
                    //两个都带锚点 属于一个文件
                    pageScroll.currentVerticalScrollTop = -1;
                } else {
                    pageScroll.currentVerticalScrollTop = currentLocaitionPageNum.verticalNumber;
                }
            } else {
                pageScroll.currentVerticalScrollTop = 0;
                currentLocaitionPageNum.Htmlpage = strCurHtmlPage;
                currentLocaitionPageNum.verticalNumber = pageScroll.currentVerticalScrollTop;
                // window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
            }
        }
    } else {
        //第一次打开阅读器
        pageScroll.currentPageNumber = 1;
        pageScroll.currentVerticalScrollTop = 0;
        currentLocaitionPageNum.Htmlpage = strCurHtmlPage;
        currentLocaitionPageNum.number = 1;
        currentLocaitionPageNum.verticalNumber = pageScroll.currentVerticalScrollTop;
        //window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
    }

    ReaderV2Location[tBookName] = currentLocaitionPageNum;
    window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));

    //尝试翻页

    maxHeight = window.innerHeight;
    innerMaxHeight = maxHeight - 40;

    var isVip = 1;
    isVip = window.localStorage.getItem('ReaderisVIP') || 0;
    var readerToVip = $('.reader-to-vip');
    if (isVip != 1) {
        //显示vip广告
        readerToVip.html(`
        <div onclick="toVip(event)" class="vip-inner df justify-between align-center ">
        <div class="df align-center vip-left">
          <div class="about">
            <p>${online_lang.upgradetovip[lang_type]}</p>
            <em>${online_lang.Selected[lang_type]}</em>
          </div>
        </div>
        <div class="to-vip btn-hover">
          ${online_lang.ONE[lang_type]}
          <img src="../icons/close.png" alt="">
        </div>
        </div>
        `);


        innerMaxHeight = maxHeight - 130;
        // $('.readercontent').addClass('not-vip');

    }

    //横屏模式
    if (pageScroll.turnPageMode === 'column') {

        turnBookPage(readercontentInner, contentMain);

        //翻页参数
        pageScroll.contentScrollWidth = contentMain[0].scrollWidth;
        pageScroll.contentWidth = contentMain[0].clientWidth;
        // pageScroll.currentPageNumber = 1;
        pageScroll.ratioPageAll = Math.ceil(pageScroll.contentScrollWidth / pageScroll.contentWidth);
        console.log('pageScroll.ratioPageAll :', pageScroll.ratioPageAll);
        //防止切换屏幕差别太大 页数变化太大 导致页码不对
        if (currentLocaitionPageNum.number > pageScroll.ratioPageAll) {
            currentLocaitionPageNum.number = pageScroll.ratioPageAll;
            pageScroll.currentPageNumber = pageScroll.ratioPageAll;
        }

        //如果阅读区域宽度和上次不一样
        // if ((pageScroll.contentWidth + 40) != window.localStorage.getItem('maxWidth')) {
        //     console.log('111 :>> ', 111);
        // }

        console.log('pageScroll.currentPageNumber :', pageScroll.currentPageNumber);


        //如果是从上一页加载上一章节的显示
        if (window.location.search.substr(1).indexOf('fromPre=last') > -1) {
            contentMain.scrollLeft(pageScroll.contentScrollWidth - pageScroll.contentWidth);
            pageScroll.currentPageNumber = pageScroll.ratioPageAll;

            currentLocaitionPageNum.number = pageScroll.ratioPageAll;
            // window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
            ReaderV2Location[tBookName] = currentLocaitionPageNum;
            window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
            //去掉网址的查询参数
            window.history.pushState(null, null, window.location.pathname);
        } else {
            if (pageScroll.currentPageNumber != 1) {
                if (pageScroll.currentPageNumber === -1) {
                    console.log('$(window.location.hash) :>> ', $(window.location.hash));
                    if(window.location.hash){
                        $(window.location.hash)[0].scrollIntoView(true);
                    }
                    var sLeft = Math.ceil(contentMain[0].scrollLeft / contentMain[0].clientWidth);
                    pageScroll.currentPageNumber = (sLeft === 0) ? 1 : sLeft + 1;
                    currentLocaitionPageNum.Htmlpage = strCurHtmlPage;
                    currentLocaitionPageNum.number = pageScroll.currentPageNumber;
                    //window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));

                    ReaderV2Location[tBookName] = currentLocaitionPageNum;
                    window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
                } else {
                    contentMain.scrollLeft((pageScroll.currentPageNumber - 1) * pageScroll.contentWidth);
                }
            }
        }
    } else {
        //竖屏模式 只需要把文件滑动到某个距离就行 不需要具体在几个章节 
        //currentVerticalScrollTop
        scrollBookDefault(readercontentInner, contentMain);
        if (pageScroll.currentVerticalScrollTop !== -1) {
            console.log('pageScroll.currentVerticalScrollTop :>> ', pageScroll.currentVerticalScrollTop);
            document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = pageScroll.currentVerticalScrollTop;
        } else {
            pageScroll.currentVerticalScrollTop = 0;
            currentLocaitionPageNum.verticalNumber = pageScroll.currentVerticalScrollTop;
            // window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
            ReaderV2Location[tBookName] = currentLocaitionPageNum;
            window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
        }

        //$('body').removeClass('turn-page');
    }

    window.localStorage.setItem('lastRatioPageAll', pageScroll.ratioPageAll);

    loading.css('display', 'none');

    var aPreBtn = $('.a_prev');
    var aNextBtn = $('.a_next');
    //上一页
    $('.pre-page').on('click', function (e) {
        turnToPrePage(aPreBtn, contentMain);
    })
    //下一页
    $('.next-page').on('click', function (e) {
        turnToNextPage(aNextBtn, contentMain);
    })

    //手机端翻书阅读
    contentMain[0].addEventListener('touchstart', function (e) {
        //console.log('e :', e);
        if (pageScroll.turnPageMode === 'column') {
            if (mobileSwipe.readyMoved) {
                mobileSwipe.touchX = e.touches[0].pageX;
                mobileSwipe.readyMoved = false;
            }
        }
    })
    contentMain[0].addEventListener('touchmove', function (e) {
        //console.log('touchmove-e :', e);
        // e.preventDefault();

        if (pageScroll.turnPageMode === 'column') {
            var releasedAt = e.changedTouches[0].pageX;
            var distance = -(releasedAt - mobileSwipe.touchX);
            mobileSwipe.scrollLeft = (pageScroll.currentPageNumber - 1) * pageScroll.contentWidth + distance;
            contentMain.scrollLeft(mobileSwipe.scrollLeft);
        }

    })
    contentMain[0].addEventListener('touchend', function (e) {
        // console.log('touchend-e :', e);
        // e.preventDefault();
        if (pageScroll.turnPageMode === 'column') {
            if (!mobileSwipe.readyMoved) {
                //animate(function(){});
                var releasedAt = e.changedTouches[0].pageX;
                var isNext = releasedAt - mobileSwipe.touchX < 0;
                var targetScrollLeft = 0;
                if (releasedAt + mobileSwipe.minRange < mobileSwipe.touchX) {
                    //向左下一页
                    //turnToNextPage(aNextBtn, contentMain);
                    ++pageScroll.currentPageNumber;
                    console.log('pageScroll.currentPageNumber :', pageScroll.currentPageNumber);
                    targetScrollLeft = (pageScroll.currentPageNumber - 1) * pageScroll.contentWidth;
                    if (pageScroll.currentPageNumber > pageScroll.ratioPageAll) {
                        if (aNextBtn.length) {
                            window.location.href = aNextBtn.attr('href');
                        }
                    } else {
                        animate(function () {
                            var scrollLeft = contentMain.scrollLeft() + 16;
                            if (scrollLeft > targetScrollLeft) {
                                contentMain.scrollLeft(targetScrollLeft);
                                return false;
                            } else {
                                contentMain.scrollLeft(scrollLeft);
                                return true;
                            }
                        });
                    }
                } else if (releasedAt - mobileSwipe.minRange > mobileSwipe.touchX) {
                    //向右上一页
                    //turnToPrePage(aPreBtn, contentMain);
                    --pageScroll.currentPageNumber;
                    targetScrollLeft = (pageScroll.currentPageNumber - 1) * pageScroll.contentWidth;
                    if (pageScroll.currentPageNumber < 1) {
                        if (aPreBtn.length) {
                            window.location.href = aPreBtn.attr('href') + '?fromPre=last';
                        }
                    } else {
                        animate(function () {
                            var scrollLeft = contentMain.scrollLeft() - 16;
                            if (scrollLeft < targetScrollLeft) {
                                contentMain.scrollLeft(targetScrollLeft);
                                return false;
                            } else {
                                contentMain.scrollLeft(scrollLeft);
                                return true;
                            }
                        });
                    }
                    //mobileSwipe.readyMoved = true;
                } else {
                    targetScrollLeft = (pageScroll.currentPageNumber - 1) * pageScroll.contentWidth;
                    animate(function () {
                        var scrollLeft = contentMain.scrollLeft();
                        scrollLeft = isNext ? scrollLeft + 16 : scrollLeft - 16;
                        if (scrollLeft < targetScrollLeft || scrollLeft > targetScrollLeft) {
                            contentMain.scrollLeft(targetScrollLeft);
                            return false;
                        } else {
                            contentMain.scrollLeft(scrollLeft);
                            return true;
                        }
                    });
                    // contentMain.scrollLeft(targetScrollLeft);
                    //mobileSwipe.readyMoved = true;
                }

                mobileSwipe.readyMoved = true;

                currentLocaitionPageNum.number = pageScroll.currentPageNumber;
                //window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
                ReaderV2Location[tBookName] = currentLocaitionPageNum;
                window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
            }
        }

    })

    //点击屏幕响应
    contentMain[0].addEventListener('click', function (e) {
        var ev = e || window.event;
        console.log('ev :', ev);
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() != 'a') {
            if (isMobile() == 1) {
                if (ev.pageX > clickScreenCenter.left && ev.pageX < clickScreenCenter.right) {
                    ev.preventDefault();
                    reactMiddleClick();
                } else {
                    if (pageScroll.turnPageMode === 'column') {
                        if (ev.pageX < clickScreenCenter.left) {
                            turnToPrePage(aPreBtn, contentMain);
                        } else if (ev.pageX > clickScreenCenter.right) {
                            turnToNextPage(aNextBtn, contentMain);
                        }
                    }
                }

            } else {
                var text = '';
                if(document.selection){　
                    text = document.selection.createRange().text;//ie
            　　} else { 
                    text = window.getSelection().toString();//标准
            　　}
                if(!text){
                    reactMiddleClick();
                }
            }

        }
    }, false);
    //点击目录跳转
    $('.readermenu').on('click', function (e) {
        var href = e.target.href;
        var readerTop = $(".readertop");
        var topTitleAbout = $(".top-title-about");
        var readerToVip = $('.reader-to-vip');
        readerTop.css({
            display: 'none'
        });

        readerToVip.css({
            display: 'block'
        });

        topTitleAbout.css({
            display: 'none'
        });

        showBooleanValue.readerTop = false;
        showBooleanValue.appTo = false;

        //如果是属于一个文件不同猫点获取当前位置便于跳转后切换页面数是准确的
        if (href && href.indexOf('/') > -1) {
            var strArr = href.split('/');
            var pageReallyName = strArr[strArr.length - 1];
            if (pageReallyName.split('#')[0] === strCurHtmlPage.split('#')[0]) {
                currentLocaitionPageNum.Htmlpage = pageReallyName;
                if (pageScroll.turnPageMode === 'column') {
                    $('#' + pageReallyName.split('#')[1])[0].scrollIntoView(true);
                    var MenuSLeft = Math.ceil(contentMain[0].scrollLeft / contentMain[0].clientWidth);
                    pageScroll.currentPageNumber = (MenuSLeft === 0) ? 1 : MenuSLeft + 1;
                    currentLocaitionPageNum.Htmlpage = strCurHtmlPage;
                    currentLocaitionPageNum.number = pageScroll.currentPageNumber;
                    //window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
                    ReaderV2Location[tBookName] = currentLocaitionPageNum;
                    window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
                } else {
                    //
                }
            }
        }

    })

    var settingStatusLocaiton = window.localStorage.getItem('settingStatus');
    console.log('settingStatusLocaiton :>> ', settingStatusLocaiton);
    if (settingStatusLocaiton) {
        settingStatus = JSON.parse(settingStatusLocaiton);
    } else {
        window.localStorage.setItem('settingStatus', settingStatusString);
    }

    console.log('settingStatus :>> ', settingStatus);

    var mode = $('.mode');
    // var size = $('.size-same');
    var family = $('.family-same');
    var width = $('.different-width');
    $(mode).eq(settingStatus.mode).addClass('on-active-setting');
    // $(size).eq(settingStatus.size).addClass('on-active-setting');
    $(family).eq(settingStatus.family).addClass('on-active-setting');
    // if(document.body.scrollHeight == window.screen.height && document.body.scrollWidth == window.screen.width){
    $(width).eq(settingStatus.width || 1).addClass('on-active-setting');   
    // } else if(settingStatus.width == 0){
        // $(width).eq(1).addClass('on-active-setting');
    // }



    //书名
    var topBottomText = $('.top-bottom p');
    var bookNameCurrent = document.title || online_lang.bookName[lang_type];
    $('.title-name').html(bookNameCurrent);
    $('.menutop span').html(bookNameCurrent);
    //底部设置翻译
    topBottomText.eq(0).html(online_lang.Catalogue[lang_type]);
    topBottomText.eq(1).html(online_lang.prePage[lang_type]);
    topBottomText.eq(2).html(online_lang.NextPage[lang_type]);
    topBottomText.eq(3).html(online_lang.More[lang_type]);

    //app阅读链接
    var appRead = $('.app-read');
    if (clientOrNot == 'iOS') {
        appRead.attr('href', 'https://apps.apple.com/cn/app/epubor-pro/id1491572379');
    } else {
        appRead.attr('href', 'http://cn.epubee.com/books/?utm_medium=menu&utm_source=extension&utm_campaign=extension&utm_content=menu');
    }

});
//屏幕中间响应函数
function reactMiddleClick() {
    var readerTop = $(".readertop");
    var topTitleAbout = $(".top-title-about");
    var readerToVip = $('.reader-to-vip');

    if (showBooleanValue.readerTop) {
        readerTop.css({
            display: 'none'
        });

        readerToVip.css({
            display: 'block'
        });
    } else {
        readerTop.css({
            display: 'block'
        });

        readerToVip.css({
            display: 'none'
        });

    }

    if (showBooleanValue.appTo) {
        topTitleAbout.css({
            display: 'none'
        });
    } else {
        topTitleAbout.css({
            display: 'block'
        });
    }

    showBooleanValue.readerTop = !showBooleanValue.readerTop;
    showBooleanValue.appTo = !showBooleanValue.appTo;
}

//设置选中函数
function addActive(dom, key, name, setting) {
    var colorIndex = +$(dom).attr('index');
    console.log('colorIndex :>> ', colorIndex);
    var allDom = $('.' + name);
    var domLen = allDom.length;
    var currentDom = null;
    for (let i = 0; i < domLen; i++) {
        currentDom = allDom.eq(i);
        currentDom.removeClass('on-active-setting');
    }
    allDom.eq(colorIndex).addClass('on-active-setting');

    var data = JSON.parse(window.localStorage.getItem('settingStatus')) || setting;
    data[`_${key}`] = data[key] || 1;
    data[key] = colorIndex;
    // if(data.width == 0){
    //     data.width = 1;
    // }
    window.localStorage.setItem('settingStatus', JSON.stringify(data));
}

//切换阅读模式
function toggleMode(mode, _this) {
    //尝试翻页
    var contentMain = $(".readercontent");
    console.log('contentMain :', contentMain);

    var readercontentInner = $('.readercontent-inner');
    var contentClientWidth = contentMain[0].clientWidth;
    console.log('contentMain[0].clientWidth :', contentClientWidth);

    pageScroll.turnPageMode = mode;

    //横屏模式
    if (pageScroll.turnPageMode === 'column') {
        console.log('document.body.scrollTop :>> ', document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
        var column_top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        pageScroll.currentVerticalPageNumber = Math.floor(column_top / window.innerHeight);
        pageScroll.ratioVerticalPageAll = Math.ceil(contentMain[0].scrollHeight / window.innerHeight);

        turnBookPage(readercontentInner, contentMain);

        //翻页参数
        pageScroll.contentScrollWidth = contentMain[0].scrollWidth;
        pageScroll.contentWidth = contentMain[0].clientWidth;
        pageScroll.ratioPageAll = Math.ceil(pageScroll.contentScrollWidth / pageScroll.contentWidth);
        console.log('pageScroll.ratioPageAll :', pageScroll.ratioPageAll);
        pageScroll.currentPageNumber = Math.ceil((pageScroll.ratioPageAll * pageScroll.currentVerticalPageNumber) / pageScroll.ratioVerticalPageAll);
        //防止切换屏幕差别太大 页数变化太大 导致页码不对
        // if (currentLocaitionPageNum.number > pageScroll.ratioPageAll) {
        //     currentLocaitionPageNum.number = pageScroll.ratioPageAll;
        //     pageScroll.currentPageNumber = pageScroll.ratioPageAll;
        // }

        console.log('pageScroll.currentPageNumber :', pageScroll.currentPageNumber);

        contentMain.scrollLeft((pageScroll.currentPageNumber - 1) * pageScroll.contentWidth);

        window.localStorage.setItem('turnPageMode', pageScroll.turnPageMode);
    } else {
        //竖屏模式

        scrollBookDefault(readercontentInner, contentMain);

        pageScroll.contentScrollHeight = contentMain[0].scrollHeight;
        pageScroll.contentHeight = window.innerHeight;
        var lastRatio = pageScroll.ratioPageAll;
        pageScroll.ratioVerticalPageAll = Math.ceil(pageScroll.contentScrollHeight / pageScroll.contentHeight);
        console.log('pageScroll.ratioVerticalPageAll :', pageScroll.ratioVerticalPageAll);
        //从横向切屏到纵向滑动的当前位置的重新定位的所在位置
        var currentVerticalPageNumber = Math.ceil((pageScroll.ratioVerticalPageAll * pageScroll.currentPageNumber) / lastRatio);
        console.log('currentVerticalPageNumber :>> ', currentVerticalPageNumber);

        //$('body').scrollTop((currentVerticalPageNumber - 1) * pageScroll.contentHeight);
        var scroll_top = (currentVerticalPageNumber - 1) * pageScroll.contentHeight;
        document.documentElement.scrollTop = scroll_top;
        window.pageYOffset = scroll_top;
        document.body.scrollTop = scroll_top;

        window.localStorage.setItem('turnPageMode', pageScroll.turnPageMode);

        pageScroll.currentVerticalScrollTop = scroll_top;
        currentLocaitionPageNum.verticalNumber = pageScroll.currentVerticalScrollTop;
        //window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
        ReaderV2Location[tBookName] = currentLocaitionPageNum;
        window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
    }
    addActive(_this, "mode", "mode", settingStatus);

}


//翻页
function turnBookPage(readercontentInner, contentMain) {
    $('body').addClass('turn-page');

    var contentClientWidth = contentMain[0].clientWidth;

    contentMain.css({
        "height": maxHeight
    });

    var numWidth = contentClientWidth || parseInt(window.localStorage.getItem('MaxWidth'));
    console.log('numWidth :', numWidth);
    readercontentInner.css({
        "height": innerMaxHeight,
        "width": contentClientWidth - 20,
        "column-width": numWidth - 20
    });

    //翻页的计算
    $('.readercontent img').css('max-height', innerMaxHeight);

}
//默认滑动
function scrollBookDefault(readercontentInner, contentMain) {
    $('body').removeClass('turn-page');

    var contentClientWidth = contentMain[0].clientWidth;

    readercontentInner.css({
        "height": "auto",
        "width": "auto"
    });

    contentMain.css({
        "min-height": maxHeight,
        height: 'auto'
    });

    var numWidth = contentClientWidth || parseInt(window.localStorage.getItem('MaxWidth'));
    console.log('numWidth :', numWidth);
    readercontentInner.css("column-width", 'auto');

    //翻页的计算
    $('.readercontent img').css('max-height', 'auto');
}
//上一页
function turnToPrePage(aPreBtn, contentMain) {
    //.add-cushion
    --pageScroll.currentPageNumber;
    if (pageScroll.currentPageNumber < 1) {
        if (aPreBtn.length) {
            window.location.href = aPreBtn.attr('href') + '?fromPre=last';
        }
    } else {
        contentMain.scrollLeft((pageScroll.currentPageNumber - 1) * pageScroll.contentWidth);
        //contentMain[0].scrollLeft = (pageScroll.currentPageNumber - 1)*pageScroll.contentWidth;
        currentLocaitionPageNum.number = pageScroll.currentPageNumber;
        // window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
        ReaderV2Location[tBookName] = currentLocaitionPageNum;
        window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
    }
}
//下一页
function turnToNextPage(aNextBtn, contentMain) {
    ++pageScroll.currentPageNumber;
    console.log('pageScroll.currentPageNumber :', pageScroll.currentPageNumber);
    if (pageScroll.currentPageNumber > pageScroll.ratioPageAll) {
        if (aNextBtn.length) {
            window.location.href = aNextBtn.attr('href');
        }
    } else {
        contentMain.scrollLeft((pageScroll.currentPageNumber - 1) * pageScroll.contentWidth);
        //contentMain[0].scrollLeft = (pageScroll.currentPageNumber - 1)*pageScroll.contentWidth;
        currentLocaitionPageNum.number = pageScroll.currentPageNumber;
        // window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
        ReaderV2Location[tBookName] = currentLocaitionPageNum;
        window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
    }
}

//初始化调整样式
function adjustAttr() {
    var acSize = window.localStorage.getItem('size') || 16;
    if (acSize > 26) {
        window.localStorage.setItem('size', 26);
    } else if (acSize < 12) {
        window.localStorage.setItem('size', 12);
    }

    var isFonts = isMac();

    var acFamily = window.localStorage.getItem('family') || isFonts.fonts;
    var color = window.localStorage.getItem('color') || 'rgb(248, 240, 217)';
    if(color == '#000000') {
        $('#prev').attr('src', "../icons/pre-1.png");
        $('#next').attr('src', "../icons/next-1.png");
        color = '#fff';
    }
    $('.icon-page').css('background-color', color);
    //#604E36 #2C4C3C
    $(".readercontent, .readercontent p, .readercontent span, .readercontent label, .readercontent div, .readercontent font").css({
        "font-size": acSize + "px",
        "font-family": acFamily
    });
    var width = window.localStorage.getItem('maxWidth') || '760';
    //屏幕宽度
    // console.log(width)
    switchWidth(width);
    //$(".readercontent,.readercontent p,.readercontent span,.readercontent label,.readercontent div").css("font-family", acFamily);
    // //959082 米色 //7d8c82 

    //颜色主题的初始化样式
    var colorIndex = window.localStorage.getItem('index') || 0;
    var allDom = $('.bg-circle');
    $(allDom).eq(colorIndex).addClass('active');
    $('body').addClass('active-' + colorIndex);



}

//标签选择颜色 #007AFF

//全局事件响应
document.addEventListener('click', function (e) {
    showBooleanValue.menu = false;
    $(".readermenu").css({
        display: 'none'
    });
    $('.menu-inner').removeClass('menu-move');
}, false);

//阻止冒泡
function stopProp(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}

function toVip(event) {
    stopProp(event);
    window.open(homePageUrlBooks);
}




function isMac() {
    // console.log('mac :', /macintosh|mac os x/i.test(navigator.userAgent));
    return /macintosh|mac os x/i.test(navigator.userAgent) ? {
        type: 1,
        fonts: 'PingFang SC'
    } : {
            type: 0,
            fonts: 'Microsoft YaHei'
        };
}

//进入全屏
function fullScreenWidth(_this) {
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    addActive(_this, "width", "different-width", settingStatus);
    // $('.readercontent').height(window.outerHeight);
    // setTimeout(sumPages)
    // sumPages();
    
    // pageScroll.currentPageNumber = Math.ceil($('.readercontent')[0].scrollWidth / pageScroll.contentWidth * pageScroll.currentPageNumber / pageScroll.ratioPageAll);
    // $('.readercontent').scrollLeft((pageScroll.currentPageNumber - 1) * pageScroll.contentWidth)
}
//退出全屏
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

//目录切换
function menusfade(event) {
    var readerMenu = $(".readermenu");

    if (showBooleanValue.menu) {
        readerMenu.css({
            display: 'none'
        });
    } else {
        readerMenu.css({
            display: 'block'
        });
    }
    $('.menu-inner').addClass('menu-move');
    showBooleanValue.menu = !showBooleanValue.menu;
    //console.log('window.location.pathname :', window.location.pathname + window.location.hash);

    $(".menu-inner div a").removeClass('on-link');
    $(".menu-inner a[href='" + window.location.pathname + window.location.hash + "']").addClass('on-link');
}


//改变字体大小
function fontPlus(event, _this, plusSubtract) {
    var realSize = +window.localStorage.getItem('size') || 16;
    if (plusSubtract === 'plus') {
        realSize = realSize + 1;
    } else if (plusSubtract === 'subtract') {
        realSize = realSize - 1;
    } else {
        realSize = 16;
    }

    if (realSize > 26) {
        $('.has-max').css('display', 'block');
        setTimeout(function () {
            $('.has-max').css('display', 'none');
        }, 3000);
    } else if (realSize < 12) {
        $('.has-mix').css('display', 'block');
        setTimeout(function () {
            $('.has-mix').css('display', 'none');
        }, 3000);
    } else {
        $(".readercontent, .readercontent p, .readercontent span, .readercontent label, .readercontent div, .readercontent font").css("font-size", realSize + "px");
        window.localStorage.setItem('size', realSize);
    }
    // addActive(_this, "size", "size-name", settingStatus);
}
//改变字体
function fontChange(event, _this, family) {
    var isFonts = isMac();
    var lastFonts = window.localStorage.getItem('family') || isFonts.fonts;
    var acFamily = family.split('-')[isFonts.type] || lastFonts;
    $(".readercontent, .readercontent p, .readercontent span, .readercontent label, .readercontent div, .readercontent font").css("font-family", acFamily);

    window.localStorage.setItem('family', acFamily);

    addActive(_this, "family", "family-same", settingStatus);
}
//改变背景颜色
function bgChange(event, dom, color) {
    var colorIndex = +$(dom).attr('index');
    var allDom = $('.bg-circle');
    var domLen = allDom.length;
    var currentDom = null;
    for (let i = 0; i < domLen; i++) {
        currentDom = allDom.eq(i);
        currentDom.removeClass('active');
        $('body').removeClass('active-' + i);
    }
    $(allDom).eq(colorIndex).addClass('active');

    window.localStorage.setItem('color', color);
    var color = window.localStorage.getItem('color') || '#ffffff';
    if(color == '#000000') {
        $('#prev').attr('src', "../icons/pre-1.png");
        $('#next').attr('src', "../icons/next-1.png");
        color = '#fff';
    }else{
        $('#prev').attr('src', "../icons/pre.png");
        $('#next').attr('src', "../icons/next.png");
    }
    $('.icon-page').css('background-color', color);
    $('body').addClass('active-' + colorIndex);

    window.localStorage.setItem('index', colorIndex);

    var data = JSON.parse(window.localStorage.getItem('settingStatus')) || settingStatus;
    data.background = colorIndex;
    window.localStorage.setItem('settingStatus', JSON.stringify(data));
}
//全屏切换
function changeFullscreen(element) {
    if (document.fullscreenElement) {
        exitFullscreen();
    } else {
        launchFullscreen(element);
    }
}
//切换阅读宽度
function changeReadWidth(width, _this) {
    switchWidth(width);
    addActive(_this, "width", "different-width", settingStatus);
    // console.log(width)
    window.localStorage.setItem('maxWidth', width);
}

//提取公共切屏函数
function switchWidth(width) {
    var paramsWidth = parseInt(width);
    var webReader = $('.WebReader');
    var readerTop = $('.readertop');
    var readerToVip = $('.reader-to-vip');
    var tocmenulinks = $('#tocmenulinks');
    var topTitleAbout = $('.top-title-about');
    if ((winWidth < 1260 && width == 1260) || width === '100%') {
        webReader.css('max-width', '100%');
        readerTop.css('max-width', '100%');
        tocmenulinks.css('max-width', '100%');
        readerToVip.css('max-width', '100%');
        topTitleAbout.css('max-width', '100%');
    } else {
        webReader.css('max-width', paramsWidth);
        readerTop.css('max-width', paramsWidth);
        tocmenulinks.css('max-width', paramsWidth);
        readerToVip.css('max-width', paramsWidth);
        topTitleAbout.css('max-width', paramsWidth);
    }

    var contentMain = $('.readercontent');
    var numWidth = contentMain[0].clientWidth || parseInt(sWidth);
    var readercontentInner = $('.readercontent-inner');

    if (pageScroll.turnPageMode === 'column') {
        readercontentInner.css({
            "width": numWidth - 20,
            "column-width": numWidth - 20
        });

        pageScroll.contentScrollWidth = contentMain[0].scrollWidth;
        pageScroll.contentWidth = numWidth;
        var lastRatio = pageScroll.ratioPageAll;
        pageScroll.ratioPageAll = Math.ceil(pageScroll.contentScrollWidth / pageScroll.contentWidth);
        var currentPageNumber = Math.ceil((pageScroll.ratioPageAll * pageScroll.currentPageNumber) / lastRatio);
        pageScroll.currentPageNumber = currentPageNumber;

        contentMain.scrollLeft((currentPageNumber - 1) * numWidth);

        currentLocaitionPageNum.number = pageScroll.currentPageNumber;
        // window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
        ReaderV2Location[tBookName] = currentLocaitionPageNum;
        window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
    }
}

function sumPages(){
    if (pageScroll.turnPageMode === 'column') {
        var contentMain = $('.readercontent');
        // var numWidth = contentMain[0].clientWidth;
        var readercontentInner = $('.readercontent-inner');

        pageScroll.contentScrollWidth = contentMain[0].scrollWidth;
        var lastRatio = pageScroll.ratioPageAll;
        pageScroll.ratioPageAll = Math.ceil(pageScroll.contentScrollWidth / pageScroll.contentWidth);
        var currentPageNumber = Math.ceil((pageScroll.ratioPageAll * pageScroll.currentPageNumber) / lastRatio);
        pageScroll.currentPageNumber = currentPageNumber;

        contentMain.scrollLeft((currentPageNumber - 1) * pageScroll.contentWidth);

        currentLocaitionPageNum.number = pageScroll.currentPageNumber;
        // window.localStorage.setItem('currentLocaitionPageNum', JSON.stringify(currentLocaitionPageNum));
        ReaderV2Location[tBookName] = currentLocaitionPageNum;
        window.localStorage.setItem('ReaderV2Location', JSON.stringify(ReaderV2Location));
    }
}
var isPreview = localStorage.getItem('isPreview');
if(isPreview == '1'){
    setTimeout(function(){
        var div = document.createElement('div');
        div.className = 'modal';
        div.style.fontFamily = localStorage.getItem('family');
        var href = 'http://cn.epubee.com/files.aspx?utm_medium=webreader&utm_source=webreader&utm_campaign=homelogo&utm_content=webreader2.0_' + tBookName + '&ismobile=' + clientOrNot
        div.innerHTML = `<dl>
            <dt> <h2>预览完毕</h2> <p>预览已完毕，前往确认需求？</p></dt>
            <dd> <a href='${href}'>去确认</a> </dd>
        </dl>`;
        document.body.appendChild(div);
    }, 60000);
}