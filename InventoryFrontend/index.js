const apiUrl = "http://localhost:5263/api/items";

async function fetchItems() {
    const response = await fetch(apiUrl);
    const items = await response.json();
    console.log(items);
    
const tableBody = document.getElementById("inventory-table-body");
tableBody.innerHTML = ''; // clear table

items.forEach(item => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.quantity}</td>
    <td>\u20B9${item.price.toFixed(2)}</td>
    <td>${item.type || 'N/A'}</td>
    <td>${item.location || 'N/A'}</td>
    <td>${item.status || 'N/A'}</td>
    <td>${item.supplier || 'N/A'}</td>
    <td>${item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : 'N/A'}</td>
    <td><button class="delete-button" onclick="deleteItem(${item.id})">Delete</button></td>
  `;
  tableBody.appendChild(tr);
});

}


async function deleteItem(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    fetchItems();
}

async function addItem() {
    const name = document.getElementById("item-name").value.trim();
    const quantity = document.getElementById("item-quantity").value;
    const price = document.getElementById("item-price").value;

    const type = document.getElementById("type").value;
    const location = document.getElementById("location").value;
    const status = document.getElementById("status").value;
    const supplier = document.getElementById("supplier").value;
    const purchaseDate = document.getElementById("purchaseDate").value;

    if (!name || !quantity || !price || !type || !location || !status || !supplier || !purchaseDate) {
        return;
    }

    const newItem = {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        type,
        location,
        status,
        supplier,
        purchaseDate
    };

    const response = await fetch(apiUrl);
    const items = await response.json();

    const existingItem = items.find(i => i.name.toLowerCase() === name.toLowerCase());

    if (existingItem) {
        const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + newItem.quantity,
            price: existingItem.price + newItem.price,
            type,
            location,
            status,
            supplier,
            purchaseDate
        };

        await fetch(`${apiUrl}/${existingItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem)
        });
    } else {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });
    }

    const fields = ["item-name", "item-quantity", "item-price", "type", "location", "status", "supplier", "purchaseDate"];
    fields.forEach(id => document.getElementById(id).value = '');

    fetchItems();
}

window.onload = fetchItems;
