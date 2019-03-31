describe('Simple Protractor Test', function() {
	
	it('Open login page', function () {
        browser.get('https://uat.ormuco.com/login');
        expect(browser.getCurrentUrl()).toContain('ormuco.com');
    });

    it('Try invalid login', function () {
		element(by.name("username")).clear();
		element(by.name("username")).sendKeys('test@test.com');
		element(by.name("password")).clear();
		element(by.name("password")).sendKeys('hello');
		element(by.xpath("//*[@type='submit']")).click();
		
		var ec = protractor.ExpectedConditions;

		browser.driver.wait(function () {
			browser.wait(ec.visibilityOf(element(by.xpath("//span[@class='warning']"))), 5000);
			return element(by.xpath("//span[@class='warning']"));
		});
		
        expect(element(by.xpath("//span[@class='warning']")).getText()).toEqual("The user or password is incorrect.");
    });	
});
