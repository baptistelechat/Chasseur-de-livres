import fetch from "node-fetch";

const getMomox = async (isbn) => {
  const response = await fetch(
    `https://api.momox.fr/api/v4/media/offer/?ean=${isbn}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '".Not/A)Brand";v="99", "Microsoft Edge";v="103", "Chromium";v="103"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-api-token": "2231443b8fb511c7b6a0eb25a62577320bac69b6",
        "x-client-version": "r6868-580f8b7",
        "x-marketplace-id": "momox_fr",
      },
      referrer: "https://www.momox.fr/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );

  const body = await response.json();
  if (body.product === null) {
    console.log({
      Momox: {
        error:
          "Article non trouvé - Vous avez peut-être fait une faute de frappe ? Vérifiez encore une fois le numéro saisi.",
      },
    });
  } else {
    console.log({
      Momox: {
        isbn: body.product.ean,
        title: body.product.title,
        price: body.price,
        description: body.product.description,
        image_url: body.product.image_url,
        product_link: `https://www.momox.fr/offer/${body.product.ean}`,
      },
    });
  }
};

export default getMomox;
