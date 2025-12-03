const loader = document.querySelector(".loader");
const row = document.querySelector(".row"); 


const deleteItem = async (id) => {
  if (!confirm(`Вы уверены, что хотите удалить товар с ID ${id}?`)) {
    return;
  }
  
  loader.style.display = "grid";
  try {
    const res = await fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE", 
    });
    
    if (res.ok) {
        alert(`Товар успешно удален.`);
  
        await getData(); 
    } else {
        alert("Ошибка при удалении товара. Статус: " + res.status);
    }
  } catch (e) {
    console.error("Ошибка при выполнении DELETE запроса:", e);
    alert("Не удалось удалить товар из-за сетевой ошибки.");
  } finally {
    loader.style.display = "none";
  }
};



const getData = async () => {
  loader.style.display = "grid";
  try {
    const res = await fetch("http://localhost:8000/products");
    

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    row.innerHTML = ""; 

    data.forEach((item) => {

      const oldPrice = Math.floor(item.price * 1.3);

      const card = document.createElement("div");
      card.classList.add("col-4");
      
      card.innerHTML = `
        <div class="products__card">
          <div class="card-image-wrapper">
             <span class="card-badge">-30%</span>
             <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="card-info">
             <h3>${item.title}</h3>
             <p class="card-desc">${item.description}</p>
             
             <div class="price-block">
               <span class="current-price">$${item.price}</span>
               <span class="old-price">$${oldPrice}</span>
             </div>

             <div class="card-actions">
               <a href="./pages/detail/detail.html?id=${item.id}" class="btn-primary">Подробнее</a>
               <button class="btn-delete" onclick="deleteItem('${item.id}')">🗑</button>
             </div>
          </div>
        </div>
      `;
      row.appendChild(card);
    });
    
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  } finally {
    loader.style.display = "none";
  }
};

getData();


