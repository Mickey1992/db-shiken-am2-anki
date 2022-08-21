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
  while(questionNo < numberOfQuestions) {
    questionNo = await page.$eval(".qno", qno => Number.parseInt(qno.textContent!.slice(2)));
    let question = await page.$(".qno ~ div");
    let [selections, explanation] = await page.$$(".ansbg");
    let answer = await page.$eval("#answerChar", span => span.textContent);
    console.log(questionNo + "/" + numberOfQuestions);
    await Promise.all([
    page.waitForNavigation(),
    page.click('.submit'),
    ]);
  }
  await browser.close();
})();


/*
    url: 
            https://www.db-siken.com/dbkakomon.php
    number of questions: document.querySelectorAll('#tab1 > label').length * 25
    start-button:
            document.querySelector(".submit")
    quesation_no:
            document.querySelector(".qno")
    question:
            document.querySelector(".qno ~ div")
    choice:
            document.querySelector("#select_a")
            document.querySelector("#select_i")
            document.querySelector("#select_u")
            document.querySelector("#select_e")
    answer:
            document.querySelector("#answerChar")
    explanation:
            document.querySelectorAll(".ansbg")[1]
    next-button:
            document.querySelector(".submit")
*/