describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    console.log("Hello?");
    browser.get('http://www.angularjs.org');
    element(by.model('yourName')).sendKeys('Julie');
    var greeting = element(by.binding('yourName'));
    expect(greeting.getText()).toEqual('Hello Julie!');
  });
});
