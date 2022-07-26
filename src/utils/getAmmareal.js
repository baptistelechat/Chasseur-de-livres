import fetch from "node-fetch";

const getAmmareal = async (isbn) => {
  const response = await fetch(
    `https://www.ammareal.fr/recherche?controller=search&s=isbn%3A+${isbn}`
  );
  const body = await response.text();
  const article = body.substring(
    body.indexOf("<article"),
    body.lastIndexOf("</article")
  );

  if (article === "") {
    console.log({
      Ammareal: {
        error:
          "Article non trouvé - Vous avez peut-être fait une faute de frappe ? Vérifiez encore une fois le numéro saisi.",
      },
    });
  } else {
    const data = {
      Ammareal: {
        isbn: isbn,
        title: article
          .split("\n")[6]
          .split(` <span class="title">`)[1]
          .split("</span>")[0],
        price: article
          .split("\n")[10]
          .split(` <span class="price">`)[1]
          .split(`<sup>&euro;</sup></span>`)[0]
          .replace(",", "."),
        description: `Livre de ${
          article
            .split("\n")[7]
            .split(`<span class="author">`)[1]
            .split("</span>")[0]
        }`,
        image_url: article
          .split("\n")[2]
          .split(`data-src="`)[1]
          .split(`" alt="Yuto Suzuki - Sakamoto Days - Tome 02">`)[0],
        product_link: `https://www.ammareal.fr${
          article.split(`<a href="`)[1].split(`" title=`)[0]
        }`,
      },
    };
    console.log(data);
  }
};

export default getAmmareal;
