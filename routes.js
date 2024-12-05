const express = require('express');
const router = new express.Router();
const items = require('./fakeDB'); // Import the fakeDB module.


/*
1. GET /items - this should render a list of shopping items.

Here is what a response looks like:

[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
*/
// Renders a list of shopping items with name and price data
router.get('/items', (req, res) => {
    res.json(items); // Send the global items array.
});

/*
2. POST /items - this route should accept JSON data and add it to the shopping list.

Here is what a sample request/response looks like:

{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}
*/

// Adds items to the shopping list 'items'
router.post('/items', (req, res) => {
    const {name, price} = req.body;

    // Validate that both 'name' and 'price' are provided
    if (!name || price === undefined) {
        return res.status(404).json({error: "Name and Price are required"});
    }

    // Add a new item to 'items'
    const newItem = {name, price};
    items.push(newItem);

    // Responde with the added item
    res.status(201).json({added: newItem});
});

/*
3. GET /items/:name - this route should display a single item’s name and price.

Here is what a sample response looks like:

{“name”: “popsicle”, “price”: 1.45}
*/
// Display an item's name and price
router.get('/items/:name', (req, res) => {
    const item = items.find(item => item.name === req.params.name);

    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }

    res.json(item); // Send the full item object (name and price)
});

/*
4. PATCH /items/:name, this route should modify a single item’s name and/or price.

Here is what a sample request/response looks like:

{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}
*/

// Modify an item's name or price
router.patch('/items/:name', (req, res) => {
    const item = items.find(item => item.name === req.params.name);

    if (!item) {
        return res.status(404).json({error: "Item not found"});
    }

    const {name, price} = req.body;

    // Update the item's properties if provided in the request body
    if (name !== undefined) item.name = name;
    if (price !== undefined) item.price = price;

    res.json(updated, item);
});

/*
5. DELETE /items/:name - this route should allow you to delete a specific item from the array.

Here is what a sample response looks like:

{message: “Deleted”}
*/

// Delete a specific item
router.delete('/items/:name', (req, res) => {
    // Find the index of the item to delete
    const itemIndex = items.findIndex(item => item.name === req.params.name);

    // If the item isn't found, return a 404 error
    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
    }

    // Remove the item from the array
    items.splice(itemIndex, 1);

    // Respond with a success message
    res.json({ message: "Deleted" });
});




module.exports = router; // Export the router.
