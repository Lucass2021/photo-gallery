const btnEl = document.querySelector(".btn");
const apiKey = "vZTGo4sE7w5NQQfBXLI29iDPqAMz8yUzmm2kRwyrvvY";
const errorMessageEl = document.querySelector(".errorMessage");
const galleryEl = document.querySelector(".gallery");

async function fetchImage() {
  const inputValue = document.querySelector(".input").value;
  const random = Math.round(Math.random() * 1000);

  if (inputValue > 10 || inputValue < 1) {
    errorMessage.style.display = "block";
    errorMessage.innerText = " Number should be betwenn 1 and 10";
    return;
  }

  let images = "";
  try {
    btnEl.style.display = "none";
    const loading = `<img src="./spinner.svg" alt="Loading"/>`;
    galleryEl.innerHTML = loading;
    await fetch(
      `https://api.unsplash.com/photos/?per_page=${inputValue}&page=${random}&client_id=${apiKey}`
    ).then((response) =>
      response.json().then((data) => {
        if (data) {
          data.forEach((pic) => {
            images += `<img src="${pic.urls.small}" alt="Images"/>`;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = images;
            btnEl.style.display = "block";
            errorMessage.style.display = "none";
          });
        }
      })
    );
  } catch (error) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = "An error has ocurred, please try again later";
    btnEl.style.display = "block";
    galleryEl.style.display = "none";
  }
}

btnEl.addEventListener("click", fetchImage);
