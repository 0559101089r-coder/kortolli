const form = document.querySelector(".form");

const createProduct = async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  try {
    const response = await fetch("http://localhost:8000/products", {
      method: "POST",
      body: formData,
    });
    const created = await response.json();
    window.location.href = "/";
  } catch (err) {
    console.log(err);
  }
};

form.addEventListener("submit", (event) => createProduct(event));
