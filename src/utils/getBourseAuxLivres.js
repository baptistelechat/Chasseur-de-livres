import fetch from "node-fetch";
import puppeteer from "puppeteer";

const getBourseAuxLivres = async (isbn) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://app.labourseauxlivres.fr/scan/", {
    waitUntil: "networkidle2",
  });

  await page.type(
    "#mainRouter > app-scan > ion-content > ion-grid > form > ion-list > ion-item > ion-input > input",
    isbn
  );
  await page.waitForTimeout(2000);

  const btn = await page.click(
    "#mainRouter > app-scan > ion-content > ion-grid > form > ion-button"
  );

  try {
    await page.waitForSelector(
      "#ion-overlay-1 > div > app-detail-scan > ion-header > ion-toolbar > ion-title"
    );

    const bodyHTML = await page.evaluate(() => document.body.innerHTML);

    await console.log({
      laBourseAuxLivres: {
        isbn: isbn,
        title: bodyHTML
          .split('class="md title-large hydrated">')[2]
          .split("</ion-title></ion-toolbar>")[0]
          .replace("&amp;", "&"),
        price: bodyHTML
          .split('class="estimation_price')[1]
          .split("+ ")[1]
          .split("</b>")[0]
          .split(" €")[0],
        description: `Livre de ${
          bodyHTML
            .split("<h3")[1]
            .split('style="margin-top: 0px;">')[1]
            .split("</h3>")[0]
        }`,
        image_url: "",
        product_link: `https://app.labourseauxlivres.fr/scan/${isbn}`,
      },
    });
    await browser.close();
  } catch (error) {
    // console.log(error.message);
    console.log({
      laBourseAuxLivres: {
        error:
          "Article non trouvé - Vous avez peut-être fait une faute de frappe ? Vérifiez encore une fois le numéro saisi.",
      },
    });
    await browser.close();
  }
};

export default getBourseAuxLivres;
