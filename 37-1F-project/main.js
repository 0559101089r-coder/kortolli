const loader = document.querySelector(".loader");

const getData = async () => {
  loader.style.display = "grid";
  try {
    const res = await fetch("http://localhost:8000/products");
    const data = await res.json();

    const row = document.querySelector(".row");
    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("col-4");
      card.innerHTML = `
              <div class="products__card">
                <img src="${item.image}" alt="" />
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <b>${item.price}$</b>
                <a href="./pages/detail/detail.html?id=${item.id}">Подробнее</a>
                <button>Удалить</button>
              </div>`;
      row.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = "none";
  }
};
getData();

const deleteProduct = async (event) => {
  event.preventDefault();
  try {
    // метод delete
  } catch (e) {
    console.log(e);
  }
};
