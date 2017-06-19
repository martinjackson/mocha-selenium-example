require('chromedriver');   // setup so PATH is not needed

var assert = require('assert');

var WD = require('selenium-webdriver')
 , By = require('selenium-webdriver').By
 , test = require('selenium-webdriver/testing')
 , chrome = require('selenium-webdriver/chrome')
;

function getDriverInstance(){
    var driverInstance = new WD.Builder()
        .usingServer()
        .withCapabilities({
            browserName: 'chrome'
        })
        .setChromeOptions(
            new chrome.Options()
                .addArguments('--privileged')
                .addArguments('--no-sandbox')
        )
        .build();
    return driverInstance;
}



test.describe('Google Search', function() {
  // override mocha's default 2sec timeout, example runs 5326ms, 5252ms, 5618ms
  this.timeout(30000);
  var browser;

  before(function() {
      // browser = new WD.Builder().withCapabilities(WD.Capabilities.chrome()).build();
      browser = getDriverInstance();
  });

  after(function() {
      browser.quit();
  });

  test.it('Google Search ... should work', function(done) {

    browser.get('http://www.google.com');
    var searchBox = browser.findElement(By.name('q'));

    searchBox.sendKeys('simple programmer');
    // searchBox.submit();

    searchBox.getAttribute('value').then(function(value) {
      console.log('value: ',value);
      assert.equal(value, 'simple programmer');
    });

    done();
  });


});
