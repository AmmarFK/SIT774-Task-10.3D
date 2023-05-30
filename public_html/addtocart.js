//peventing window from refreshing upon submitting
window.onload = function() 
{
	displayCart();
}

let cart = [
	{name:"Denim Jacket", quantity:2, price:20.00},
	{name:"Adidas shoes", quantity:1, price:50.00},
	{name:"Handbag", quantity:1, price:14.00},
	{name:"Nike shoes", quantity:3, price:18.00}
];

function addToCart() {
	const addToCartButton = document.getElementById('add-to-cart-button');
	// Check if the product is already in the cart
	const existingItem = cart.find(item => item.productId === productId);

	const productId = addToCartButton.dataset.productId;
	const productName = addToCartButton.dataset.productName;
	const productPrice = addToCartButton.dataset.productPrice;
  
	if (existingItem) {
	  // If it is, just update the quantity
	  existingItem.quantity += quantity;
	} else {
	  // If it's not, add a new item to the cart
	  cart.push({ productId:productId, name:productName, quantity:1, price:productPrice });
	}
  
	// Log the updated cart
	console.log(cart);
  }

  function displayCart() {
	const cartTable = document.getElementById("cartitems");
	const tax = document.getElementById("tax").value;
	var sum = 0;
	// Clear the table before repopulating it
	cartTable.innerHTML = "";
  
	// Add a header row to the table
	const headerRow = document.createElement("tr");
	headerRow.innerHTML = "<th>Product</th><th>Unit Price</th><th>Quantity</th><th>Total</th>";
	cartTable.appendChild(headerRow);
  
	// Add a row for each item in the cart
	cart.forEach(item => {
	  const row = document.createElement("tr");
	  row.innerHTML = `
		<td>${item.name}</td>
		<td>$${item.price}</td>
		<td>${item.quantity}</td>
		<td>$${(item.price * item.quantity)}</td>
	  `
	  sum += item.price;
	  ;
	  cartTable.appendChild(row);
	});
	document.getElementById("subtotal").value = sum;
	document.getElementById("total").value = sum + tax;
  }