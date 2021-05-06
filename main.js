const { Builder } = require('selenium-webdriver');
(async function myFunction() {
    let driver = await new Builder().forBrowser('chrome').build();
    //your code inside this block
    await driver.get('https://selenium.dev');
    await driver.getCurrentUrl();
    await driver.navigate().back();
    await driver.navigate().forward();
    await driver.navigate().refresh();
    await driver.getTitle();
    await driver.getWindowHandle();

    const originalWindow = await driver.getWindowHandle();

//assert?
//assert?
    //Check we don't have other windows open already
    assert((await driver.getAllWindowHandles()).length === 1);

    //Click the link which opens in a new window
    await driver.findElement(By.linkText('new window')).click();

    //Wait for the new window or tab
    await driver.wait(
        async () => (await driver.getAllWindowHandles()).length === 2,
        10000
    );

    //Loop through until we find a new window handle
    const windows = await driver.getAllWindowHandles();
    windows.forEach(async handle => {
        if (handle !== originalWindow) {
            await driver.switchTo().window(handle);
        }
    });

    //Wait for the new tab to finish loading content
    await driver.wait(until.titleIs('Selenium documentation'), 10000);


    // Opens a new tab and switches to new tab
    await driver.switchTo().newWindow('tab');

    // Opens a new window and switches to new window
    await driver.switchTo().newWindow('window');


})();