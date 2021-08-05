const { test, expect } = require('@playwright/test');
const {DuckStartPage} = require('../Pages/duckStartPage')

test.describe('duck duck test page', () =>{
  let page;

  test.beforeAll(async ({ browser}) =>{
  page = await browser.newPage();
  startPage = new DuckStartPage(page);
  });
  test.beforeEach(async () =>{
    await startPage.goto();
  })



test('Checks that duckduckGo page can be opened', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  const isLogoVisable = await page.isVisible('#logo_homepage_link');
    expect(isLogoVisable).toBe(true);
});


test('Checks that results page opens and results are correct', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', 'Test');
    await page.click('#search_button_homepage');
    const textrez = await page.textContent('#r1-0');
    console.log(textrez);
      expect(textrez).toContain('Test');
  });


  test('Inspector demo', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('[placeholder="Search the web without being tracked"]', 'Test');
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://duckduckgo.com/?q=Test&t=h_&ia=web' }*/),
        page.click('input:has-text("S")')
  ]);
  await page.click('#links >> :nth-match(div:has-text("https://www.speedtest.net/ru"), 4)');
  expect(page.url()).toBe('https://www.speedtest.net/ru');
  });



  test('returns MS cheat sheet ', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', 'microsoft word cheat sheet');
    await page.click('#search_button_homepage');
    const textrez = await page.textContent('.c-base__title');
    const isCheatSheepVisable = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
      expect(textrez).toContain('Microsoft Word 2010');
      expect(isCheatSheepVisable).toBe(true);

    
  });



  
//   test('go to wikipedia ', async ({ page }) => {
//     await page.goto('https://duckduckgo.com/');
//     await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
//     await page.click('#search_button_homepage');
//     const shorturl = await page.url('#shorten-url');
//     await page.goto(shorturl);
       
//   });



  test('shorten wikipedia page ', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
    await page.click('#search_button_homepage');
    const shortUrl = await page.getAttribute('#shorten-url','value');
    await page.goto(shortUrl);
    const webPage = page.url();
    expect(webPage).toBe('https://www.wikipedia.org/');    
  });



  test('panda', async ({ page }) => {
    await page.goto('https://duckduckgo.com');
  await page.waitForSelector("#search_form_input_homepage");
  await page.fill('#search_form_input_homepage', "intitle:panda");
  await page.click("#search_button_homepage", { force: true });
  await page.waitForNavigation();
      const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
      console.log(results);
  results.forEach(result => {
    expect(result.toLowerCase()).toContain("panda");
  });
});



const passwordsLengths = ['8', '16', '64'];
    passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async ({ page }) => {
        await page.goto('https://duckduckgo.com');
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const generatedPassword = await page.textContent(".c-base__title");
        expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });



  
  const passwordsLengths2 = ['7', '65'];
    passwordsLengths2.forEach(passwordLength => {
    test(`Does not generate ${passwordLength} chracters long password`, async ({ page }) => {
        await page.goto('https://duckduckgo.com');
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const generatedPasswordVisible = await page.isVisible(".c-base__title");
        expect(generatedPasswordVisible).toBe(false)
    });
  });

});