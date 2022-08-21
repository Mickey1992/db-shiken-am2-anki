import puppeteer from 'puppeteer';

const QUESTIONS_PER_YEAR = 25;
const WEBSITE_HOST = "https://www.db-siken.com";
const IMAGE_NAME_PREFIX = "db_shiken_am2";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.db-siken.com/dbkakomon.php');
  const numberOfQuestions = await page.$$eval('#tab1 > label', labels => labels.length * 25);
  await Promise.all([
    page.waitForNavigation(),
    page.click('.submit'),
    ]);

  let questionNo = 0;
  while(questionNo < 1) {
    questionNo = await page.$eval(".qno", qno => Number.parseInt(qno.textContent!.slice(2)));
    let [question] = await getCardHTML(page, ".qno ~ div");
    let [selections, explanation] = await getCardHTML(page, ".ansbg");
    let answer = await getCardHTML(page, "#answerChar");

    console.log(questionNo + "/" + numberOfQuestions);
    
    await Promise.all([
    page.waitForNavigation(),
    page.click('.submit'),
    ]);
  }
  await browser.close();
})();

async function getCardHTML(page: puppeteer.Page, selector: string): Promise<string[]> {
    return page.$$eval(selector, elements => {
        return elements.map($ => $.innerHTML);
    })
}



