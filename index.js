const puppeteer = require('puppeteer');
const cliProgress = require('cli-progress');

// create new progress bar
const b1 = new cliProgress.SingleBar({
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
});

// initialize the bar - defining payload token "speed" with the default value "N/A"
console.log('Work in progress, please wait.');
b1.start(20, 0);

(async () => {
  // Go to Final page of Form.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.bk-feedback-de.com/Index.aspx?c=051011');

  for (let index = 0; index < 21; index++) {
    await page
      .waitForSelector('#NextButton')
      .then(() => page.click('#NextButton'))
      .then(() => b1.update(index));
  }
  b1.stop();

  // Take result in Final page.
  const element = await page.$('.ValCode');
  const element_property = await element.getProperty('innerHTML');
  const inner_html = await element_property.jsonValue();
  const result = inner_html.replace('Validierungscode: ', '');
  console.log(result);
  await browser.close();
})();
