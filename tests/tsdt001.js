
const UrlSite = 'https://domotekhnika.ru/';
const Btn = '//*[@id=\"main-header\"]/div[1]/div[1]/div[1]/section/div/button[1]';
const ResT = '#search-result > div.search-result__wrap > a:nth-child(1)';
const AllRes = '#search-result > div.search-result__button';
const pscreen = './tests/screen/'; //Место сохранения скриншотов


function prepare(browser) {
    console.log('Браузер Chrome открыт');
    browser
        .url(UrlSite)
        .waitForElementVisible('body', 3000)
        .useXpath()
        .assert.visible(Btn)
        .click(Btn)
        .pause(3000)
        .useCss()
    }

function returnpage(browser){
    browser
        .url(UrlSite)
        .waitForElementVisible('body', 3000)
        .assert.urlEquals(UrlSite)
}

function sscreen(browser,name) {
  //  browser.saveScreenshot(pscreen + name + '.png')
}

module.exports = {
    after : function(browser) {
        console.log('Закрытие браузера...');
        browser.end();
    },

    tags: ['domotekhnika', 'test', 'tsdt'],
    'Тесты Домотехника': function (browser) {
        prepare(browser);
        sscreen(browser,'Start')
        },

    'Поиск категории товара и переход на страницу': function (browser) {
        browser.setValue('input[type=text]', ['Спрей', browser.keys.ENTER]);
        browser.waitForElementVisible(ResT, 3000);
        sscreen(browser,'ПоКатегории');
        browser.click(ResT);
        browser.url(function(result){console.log(result); });
        returnpage(browser)
        },

    'Поиск товара по полному наименованию': function (browser) {
        browser.setValue('input[type=text]', ['Портативная колонка Harper PS-041', browser.keys.ENTER]);
        browser.waitForElementVisible(ResT, 3000);
        sscreen(browser,'ПоНаименованию');
        browser.click(ResT);
        browser.url(function(result){console.log(result);});
        returnpage(browser)
        },

    'Поиск схожих товаров': function (browser) {
        browser.setValue('input[type=text]', ['Тостер', browser.keys.ENTER]);
        browser.waitForElementVisible(ResT, 3000);
        sscreen(browser,'СхожиеТовары');
        browser.assert.visible(AllRes);
        browser.click(AllRes);
        browser.url(function(result){console.log(result);});
        returnpage(browser)
        },

    'Поиск несуществующего товара': function (browser) {
        browser.setValue('input[type=text]', ['Shelby gt500', browser.keys.ENTER]);
        browser.verify.elementNotPresent(ResT+':visible');
        browser.verify.elementNotPresent(AllRes+':visible');
        browser.pause(3000);
        sscreen(browser,'Несуществующий товар');
        returnpage(browser);
        },

    'Ввод разных симоволов': function (browser) {
        browser.setValue('input[type=text]', ['1*1*2*3*5*8*13*21*34*55*89*55*34*21*13*8*5*3*2*1*1', browser.keys.ENTER]);
        browser.verify.elementNotPresent(ResT+':visible');
        browser.verify.elementNotPresent(AllRes+':visible');
        browser.pause(3000);
        sscreen(browser,'Несуществующий товар');
    },
};
