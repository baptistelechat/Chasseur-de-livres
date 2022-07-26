import fetch from "node-fetch";

const getGoogleBookAPI = async (isbn) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
  )
    .then((res) => res.json())
    .then((data) => {
      const book = data.items;
      if (book !== undefined) {
        const ISBNdescription =
          book[0].volumeInfo.description !== undefined
            ? book[0].volumeInfo.description
            : "";
        const id = book[0].id;
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
          .then((res) => res.json())
          .then((data) => {
            const author = () => {
              var auth = "";
              for (let i = 0; i < data.volumeInfo.authors.length; i++) {
                const element = data.volumeInfo.authors[i];
                i === 0
                  ? (auth = element)
                  : i === data.volumeInfo.authors.length - 1
                  ? (auth = `${auth} et ${element}`)
                  : (auth = `${auth}, ${element}`);
              }
              return auth;
            };
            console.log({
              GoogleAPI: {
                isbn: isbn,
                title: data.volumeInfo.title,
                author: author(),
                publisher: data.volumeInfo.publisher,
                publishedDate: new Date(
                  data.volumeInfo.publishedDate
                ).toLocaleDateString("fr"),
                pageCount: data.volumeInfo.pageCount,
                dimensions: data.volumeInfo.dimensions,
                description:
                  ISBNdescription === ""
                    ? data.volumeInfo.description
                    : ISBNdescription,
                image_url: "",
                product_link: `https://www.googleapis.com/books/v1/volumes/${id}`,
              },
            });
          });
      } else {
        console.log({
          GoogleAPI: {
            error:
              "Article non trouvé - Vous avez peut-être fait une faute de frappe ? Vérifiez encore une fois le numéro saisi.",
          },
        });
      }
    });
};

export default getGoogleBookAPI;
