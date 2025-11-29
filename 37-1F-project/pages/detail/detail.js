const getDetail = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      console.log("нет такого товара");
      return;
    }

    const res = await fetch(`http://localhost:8000/products/${id}`);
    const product = await res.json();

    const container = document.querySelector("#container");

    container.innerHTML = `
      <div class="products-content">
        <img src="${product.image}" alt="" />
        <input id="product-title" value="${product.title}" />
        <input id="product-description" value="${product.description}" />
        <input id="product-price" value="${product.price}" />
        <button >Save</button>
      </div>
    `;
  } catch (err) {
    console.log(err);
  }
};

getDetail();


document.addEventListener("click", async (event) => {
  if (event.target.tagName === "BUTTON" && event.target.textContent === "Save") {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");


    const title = document.getElementById("product-title").value;
    const description = document.getElementById("product-description").value;
    const price = document.getElementById("product-price").value;

    
    const updated = { title, description, price };

    try {
      const res = await fetch(`http://localhost:8000/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updated)
      });

      const data = await res.json();
      console.log("Updated:", data);
      alert("Изменения сохранены!");
    } catch (err) {
      console.log(err);
    }
  }
});