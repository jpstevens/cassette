describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    browser.get('/');
    element(by.model('testingStatus')).sendKeys('online');
    var status = element(by.binding('testingStatus'));
    expect(status.getText()).toEqual('Testing status: online');
  });
});
