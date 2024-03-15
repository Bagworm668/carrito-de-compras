document.addEventListener("DOMContentLoaded", function() {
  const productList = document.getElementById("product-list");
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtener el carrito guardado

  // Array de productos para mujer
  const products = [
      // Aquí van tus productos
      { name: "Producto 1", price: 10, image: "https://animalcosk8.com/cdn/shop/products/Tabla-Completa-Monopatin-Gorilla-MONOPATIN_800x.jpg?v=1641315947" },
      { name: "Producto 2", price: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrXF24eqPGjKb0m54q0HlV2MRsBgHDmSVEeWcFkWJK-Eigj_eFQoh6W_jhuemD8ADlOH4&usqp=CAU" },
      { name: "Producto 3", price: 30, image: "https://us.sourcebmx.com/cdn/shop/products/e0707acd-69d0-4d88-884f-1e7d786607e4.jpg?v=1687782232"},
      { name: "Producto 3", price: 40, image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1673180661-bicicleta-bmx-amazon-1673180653.jpg?crop=1xw:1xh;center,top&resize=980:*"},
      { name: "Producto 4", price: 50, image: "https://gwbicycles.com/cdn/shop/files/060521-2.jpg?v=1682607586"},
      { name: "Producto 5", price: 60, image: "https://www.optimusbikes.com/cdn/shop/products/bicicleta-de-montana-doble-suspension-optimus-avior.jpg?v=1679411148"},
      { name: "Producto 6", price: 70, image: "https://ciudadmovilcolombia.com/wp-content/uploads/2022/11/GW-Alligator-2x11V-R29.jpg"},
      { name: "Producto 7", price: 80, image: "https://m.media-amazon.com/images/I/714OJ1awTUL._AC_SL1500_.jpg"},
      { name: "Producto 8", price: 90, image: "https://contents.mediadecathlon.com/p2073761/k$9b33572302d0131280e8f7388707971a/tabla-skate-cp100-mid-ninos-geometric-tamano-75quote.jpg?format=auto&quality=40&f=452x452"},
      { name: "Producto 9", price: 10, image: "https://http2.mlstatic.com/D_NQ_NP_730742-MCO50324739058_062022-O.webp"},
      { name: "Producto 10", price: 20, image: "https://m.media-amazon.com/images/I/71pd9dcsjrL._AC_SL1500_.jpg"},
      { name: "Producto 11", price: 30, image: "https://falabella.scene7.com/is/image/FalabellaCO/121781256_1?wid=800&hei=800&qlt=70"},
      { name: "Producto 12", price: 40, image: "https://homeandroll.com/wp-content/uploads/2023/09/Patineta-profesional-01.jpg"},
      { name: "Producto 13", price: 50, image: "https://atlanta-deportes.com.co/wp-content/uploads/2022/02/Atlanta-Deportes-BAlon-Basket-Authentic-Wilson.jpg"},
      { name: "Producto 14", price: 60, image: "https://imagenes.elpais.com/resizer/Th5HkHDw69y4zCLawxVvZBdkJ4M=/414x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/SFTIVIBQRBGHTITGKXCS2VZJMA.png"},
      { name: "Producto 15", price: 70, image: "https://golty.com.co/wp-content/uploads/2022/07/Balon-Origen-Futbol-sala5-1.png"},
      { name: "Producto 16", price: 80, image: "https://dismovel.com/wp-content/uploads/2021/09/F5A1710_M1.jpg"},
      { name: "Producto 17", price: 90, image: "https://wilsonstore.mx/cdn/shop/files/778374a2-ae3a-4204-9f55-779e767ec9e8.jpg?v=1710155198"},
      { name: "Producto 18", price: 10, image: "https://luegopago.blob.core.windows.net/temporary/whatsapp%20image%202023-04-18%20at%206.44.29%20pm.jpeg"},
      { name: "Producto 19", price: 20, image: "https://contents.mediadecathlon.com/p1968062/k$d2b28a1f94bbeae8795c3ab9699f71e2/900x0/1250pt1201/2500xcr2222/default.jpg?format=auto"},
      { name: "Producto 20", price: 30, image: "https://www.ecured.cu/images/7/75/Tenis_de_mesa61_112017-F.jpg"},

  ];

  // Función para mostrar los productos en la página
  function renderProducts() {
      productList.innerHTML = "";
      products.forEach(product => {
          const productItem = document.createElement("div");
          productItem.classList.add("product");
          productItem.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>Precio: $${product.price}</p>
              <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}">Add</button>
          `;
          productList.appendChild(productItem);
      });
  }

  // Llama a la función para mostrar los productos
  renderProducts();

  // Escucha los clicks en los botones "Add"
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach(button => {
      button.addEventListener("click", function() {
          const productName = this.dataset.name;
          const productPrice = parseFloat(this.dataset.price);
          addToCart(productName, productPrice);
      });
  });

  // Función para agregar un producto al carrito
  function addToCart(productName, productPrice) {
      const existingProductIndex = cart.findIndex(p => p.name === productName);
      if (existingProductIndex !== -1) {
          // Si el producto ya está en el carrito, incrementa la cantidad
          cart[existingProductIndex].quantity++;
      } else {
          // Si el producto no está en el carrito, agrégalo
          cart.push({ name: productName, price: productPrice, quantity: 1 });
      }

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      console.log(`${productName} agregado al carrito`);
      renderCart();
  }

  // Función para mostrar el carrito de compras
  function renderCart() {
      // Encuentra la sección del carrito en tu HTML (por ejemplo, con id="cart")
      const cartSection = document.getElementById("cart");
      cartSection.innerHTML = "";

      let totalPrice = 0;

      cart.forEach(product => {
          const productRow = document.createElement("div");
          productRow.classList.add("cart-item");
          productRow.innerHTML = `
              <h4>${product.name}</h4>
              <p>Precio: $${product.price}</p>
              <p>Cantidad: ${product.quantity}</p>
              <p>Subtotal: $${product.price * product.quantity}</p>
          `;
          cartSection.appendChild(productRow);

          totalPrice += product.price * product.quantity;
      });

      // Agrega una fila para el total
      const totalRow = document.createElement("div");
      totalRow.classList.add("cart-total");
      totalRow.innerHTML = `
          <h4>Total: $${totalPrice.toFixed(2)}</h4>
      `;
      cartSection.appendChild(totalRow);
  }

  // Llama a la función para renderizar el carrito cuando se carga la página
  renderCart();
});
