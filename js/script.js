var checkIfKeyExist = JSON.parse(localStorage.getItem("iDs"));


//     ----------------------------------- Cart elemnet count ----------------------------------------------------//
cartElementCount = () => {
    if (checkIfKeyExist) {
        document.querySelector('.cart span').innerHTML = checkIfKeyExist.length;
    } else {
        document.querySelector('.cart span').innerHTML = 0
    }
}

//     ------------------------------------ Displays all Products  ------------------------------------------------//
showProducts = () => {
    cartElementCount();
    fetch('http://localhost:4000/products').then((products) => {
        if (products.ok) {
            return products.json();
        } else {
            document.body.querySelector('.productPage-section').innerHTML = `<p class="error">Something went wrong <ion-icon name="alert-circle-outline"></ion-icon></p>`
        }
        })
        .then((products) => {
            for (let i in products) {
                let div = document.createElement('card');
                div.className = `product-element ${products[i].category}`;
                div.innerHTML = `<div class="product-heading-div"><h3>${products[i].name}</h3></div><div class="product-img-div"><img  src='${products[i].imageURL}' alt="product image"></div><div class="product-para-div"><p>${products[i].description}</p></div> <div class="product-footer"><div class="product-footer-price"><h6><span>MRP Rs. ${products[i].price}</span></h6></div><div class="product-footer-button"><button onclick="addToCart(${[i]})">Buy Now</button></div></div>`
                document.body.querySelector('.productPage-section').appendChild(div);
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

//    ------------------------------------- Filter products by category  ---------------------------------------//
filterSelection = (id) => {
    fetch('http://localhost:4000/products').then((products) => {
        if (products.ok) {
            return products.json();
        } else {
            document.body.querySelector('.productPage-section').innerHTML = `<p class="error">Something went wrong <ion-icon name="alert-circle-outline"></ion-icon></p>`;
        }
        })
        .then((products) => {
            document.querySelector('.productPage-section').innerHTML = "";
            for (let i in products) {
                if (products[i].category === id) {
                    let div = document.createElement('card');
                    div.className = `product-element ${products[i].category}`;
                    div.innerHTML = `<div class="product-heading-div"><h3>${products[i].name}</h3></div><div class="product-img-div"><img  src='${products[i].imageURL}' alt="Product image"></div><div class="product-para-div"><p>${products[i].description}</p></div> <div class="product-footer"><div class="product-footer-price"><h4><span>Rs. ${products[i].price}</span></h4></div><div class="product-footer-button"><button onclick="addToCart(${[i]})">Add to Cart</button></div></div>`
                    document.body.querySelector('.productPage-section').appendChild(div);
                }
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

// --------------------------------------  Displays Category for main Page ------------------------------------//
showCategory = () =>{
    cartElementCount();

    fetch('http://localhost:4000/categories').then((categories) => {
        if (categories.ok) {
            return categories.json();
        } else {
            document.body.querySelector('.main-section').innerHTML = `<p class="error">Something went wrong <ion-icon name="alert-circle-outline"></ion-icon></p>`;
        }
        })
        .then((categories) => {
            for (let i in categories) {
                let div = document.createElement('div');
                div.className = 'common'
                if (i % 2 === 0) {
                    div.innerHTML = `<div class="common-left"><img src="${categories[i].imageUrl}" alt="${categories[i].key}" class="section-images"></div><div class="common-right"><h3>${categories[i].name}</h3><p>${categories[i].description}</p><button onclick="location.href='../pages/productPage.html'">Explore ${categories[i].key}</button></div>`
                } else {
                    div.innerHTML = `<div class="common-right"><h3>${categories[i].name}</h3><p>${categories[i].description}</p><button onclick="location.href='../pages/productPage.html'">Explore ${categories[i].key}</button></div><div class="common-left"><img src="${categories[i].imageUrl}" alt="${categories[i].key}" class="section-images"></div>`
                }
                document.body.querySelector('.main-section').appendChild(div);
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

//  ---------------------------------- Mobile Toggle functionality  ------------------------------------------// 
myFunction = () => {
    let x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }

    window.onclick = function (event) {
        console.log('a')
        if (event.target == x) {
            x.style.display = "none";
        }
    }
}

// ----------------------------------- To add product to cart -----------------------------------------------//
addToCart = id => {
    let flag = false;
    for (let i in checkIfKeyExist) {
        if (checkIfKeyExist[i] === id) {
            flag = true;
        }
    }
    if (flag === false) {
        checkIfKeyExist.push(id);
        localStorage.setItem("iDs", JSON.stringify(checkIfKeyExist));
        callModel();
    } else {
        alert('Item already in cart');
    }
    document.querySelector('.cart span').innerHTML = checkIfKeyExist.length;
}

//  -------------------------------------  To display cart modal  -------------------------------------//
function callModel() {
    let modal = document.getElementById("cartModal");
    let span = document.getElementsByClassName("close")[0];
    let h4 = document.createElement('h4');
    let productArray = [];

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
        location.reload();
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    h4.innerHTML = `My Cart ( ${checkIfKeyExist.length} items )`;
    document.querySelector('.model-content-header').appendChild(h4);

    fetch('http://localhost:4000/products').then((products) => {
        if (products.ok) {
            return products.json();
        } else {
            document.body.querySelector('.model-content-body').innerHTML = `<p class="error">Something went wrong <ion-icon name="alert-circle-outline"></ion-icon></p>`
        }
        })
        .then((products) => {
            for (let i in products) {
                productArray.push(products[i]);
            }
            for (let i in checkIfKeyExist) {
                let quantity = 1
                let productImage = productArray[checkIfKeyExist[i]].imageURL;
                let productName = productArray[checkIfKeyExist[i]].name;
                let productPrice = productArray[checkIfKeyExist[i]].price;
                const row = document.createElement('div')
                row.className = `cart-rows carts-rows-${i}`
                row.innerHTML = `
                <div class="cart-rows-image"><img src='${productImage}' alt="Product image"></div> <div class="cart-rows-top"><strong><h5>${productName}</h5></strong><div><div class="_3dY_ZR"><ion-icon onclick="decrementQuantity(${quantity},${i})" name="remove-circle-outline" size="x-small"></ion-icon><div class="quantity-inputs"><input type="text" value="${quantity}" class="_253qQK"></div><ion-icon onclick="incrementQuantity(${quantity},${productPrice})" name="add-circle-outline" size="x-small"></ion-icon><span>x ${productPrice}</span`
                document.body.querySelector('.model-content-body').appendChild(row);
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

//  -------------------------------------  Clear Cart  ------------------------------------------------ //
clearCart = (key) => {
    var updatedArray = []
    localStorage.setItem(key, JSON.stringify(updatedArray));
    location.reload();
}

//  -------------------------------------  To Decrement Quantity of Prduct with Price  -----------------//
decrementQuantity = (quantity, i) => {
    
    if(--quantity < 1 ){
        let orignal = [...checkIfKeyExist]
        let revised = orignal.filter(item => item != checkIfKeyExist[i])
        localStorage.setItem('iDs', JSON.stringify(revised))
        document.querySelector(`.carts-rows-${i}`).innerHTML = "";
    }else{
        document.querySelector('._253qQK').value = quantity
    }
}

//  ------------------------------------  To Increment Quantity of Product with Price -----------------//
incrementQuantity = (quantity,price) => {
    document.querySelector('._253qQK').value = ++quantity;
    document.querySelector('._3dY_ZR span').innerHTML = price*quantity
}    


//aspect ratio
//color variables
// banner pause
//remove section and use main
//add to cart tab
//description aligned center
//font changes
//input fields border
//all input in same CaseLetter