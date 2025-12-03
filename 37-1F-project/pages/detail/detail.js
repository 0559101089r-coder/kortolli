const getDetail = async () => {
  const container = document.querySelector("#detail-container");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<h2>Товар не найден</h2>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:8000/products/${id}`);
    
    if (!res.ok) throw new Error("Ошибка при получении данных");
    
    const product = await res.json();


    const oldPrice = Math.floor(product.price * 1.4);
    const economy = oldPrice - product.price;

    container.innerHTML = `
      <div class="detail-wrapper">
        <div class="detail-image">
          <img src="${product.image}" alt="${product.title}" />
        </div>

        <div class="detail-info">
          
          <div class="detail-badges">
            <span class="badge badge-sale">-30%</span>
            <span class="badge badge-hit">Хит продаж</span>
          </div>

          <h1 class="detail-title">${product.title}</h1>

          <div class="detail-rating">
            ★★★★☆ <span>(127 отзывов)</span>
          </div>

          <div class="detail-price-box">
             <div>
                <span class="detail-main-price">$${product.price}</span>
                <span class="detail-old-price">$${oldPrice}</span>
             </div>
             <span class="economy-label">Экономия $${economy}</span>
          </div>

          <div class="detail-description">
            <h4>Описание</h4>
            <p>${product.description}</p>
            <br>
            <p>Этот товар отличается высоким качеством и надежностью. Идеально подходит для повседневного использования.</p>
          </div>

        </div>
      </div>
    `;

  } catch (err) {
    console.log(err);
    container.innerHTML = "<h2>Ошибка загрузки товара</h2>";
  }
};

getDetail();