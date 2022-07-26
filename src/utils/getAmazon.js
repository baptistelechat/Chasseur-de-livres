import fetch from "node-fetch";
import puppeteer from "puppeteer";

const getAmazon = async (isbn) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.amazon.fr/s?k=${isbn}`, {
    waitUntil: "networkidle2",
  });
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  console.log({
    Amazon: {
      isbn: isbn,
      title: bodyHTML
        .split('<span class="a-size-base-plus a-color-base a-text-normal">')[1]
        .split("</span>")[0],
      price: bodyHTML
        .split('<span class="a-offscreen">')[1]
        .split("&nbsp;€")[0]
        .replace(",", "."),
      description: `Livre de ${
        bodyHTML
          .split('</span><span class="a-size-base">')[1]
          .split("</span>")[0]
      }`,
      image_url: bodyHTML
        .split(
          '<div class="a-section aok-relative s-image-square-aspect"><img class="s-image" src="'
        )[1]
        .split(" 2.5x, ")[1]
        .split(' 3x" ')[0],
      product_link: `https://www.amazon.fr${
        bodyHTML
          .split(
            '<a class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal" href="'
          )[1]
          .split('"><span')[0]
      }`,
    },
  });
  await browser.close();
};

export default getAmazon;
