const db = new Dexie('ShoppingApp')
db.version(1).stores({items: '++id,name,quantity,price'})

const itemForm = document.getElementById('itemForm')
const itemsDiv = document.getElementById('itemsDiv')
const totalPriceDiv = document.getElementById('totalPriceDiv')
const loadAllItemsFromDbAndDisplay = async () => {

    console.log("Populating items div ...")
    const allItems = await db.items.reverse().toArray()

    itemsDiv.innerHTML = allItems.map(item =>
        `<div class="item ${item.isPurchased && 'purchased'}">
        <label>
            <input type="checkbox" class="checkbox" onchange="toggleItemStatus(event, ${item.id})" ${item.isPurchased && 'checked'}>
        </label>

        <div class="itemInfo">
            <p>${item.name}</p>
            <p>$${item.price} x ${item.quantity}</p>
        </div>

        <button class="deleteButton" onclick="removeItem(${item.id})">X</button>
    </div>`
    ).join('')
    let totalPrice = 0
    allItems.forEach(item => totalPrice += item.price * item.quantity)

    totalPriceDiv.innerText = 'Total price: $' + totalPrice
}

window.onload = loadAllItemsFromDbAndDisplay

itemForm.onsubmit = async (event) => {
    event.preventDefault()

    await addNewItemToDb()
    await loadAllItemsFromDbAndDisplay()
    itemForm.reset()
}

async function addNewItemToDb() {
    const name = document.getElementById('nameInput').value
    const quantity = document.getElementById('quantityInput').value
    const price = document.getElementById('priceInput').value

    await db.items.add({name, quantity, price})
}

const toggleItemStatus = async (event, id) => {
    await db.items.update(id, {isPurchased: !!event.target.checked})
    await loadAllItemsFromDbAndDisplay()
}

const removeItem = async (id) => {
    await db.items.delete(id)
    await loadAllItemsFromDbAndDisplay()
}