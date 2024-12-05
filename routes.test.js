const request = require('supertest');
const app = require('./app'); // Import Express app
const items = require('./fakeDB'); // Import the items array

beforeEach(() => {
    items.length = 0; // Clear the array
});


// Get /items route tests
describe('GET /items', () => {
    it('should return a list of items', async () => {
        items.push({ name: 'popsicle', price: 1.45 });
        const response = await request(app).get('/items');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ name: 'popsicle', price: 1.45 }]);
    });
});

// Post /items route tests
describe('POST /items', () => {
    it('should add a new item', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: 'cheerios', price: 3.40 });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ added: { name: 'cheerios', price: 3.40 } });
        expect(items).toContainEqual({ name: 'cheerios', price: 3.40 });
    });

    it('should return 400 if name or price is missing', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: 'incomplete' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Name and price are required' });
    });
});

// Get /items/:name route tests
describe('GET /items/:name', () => {
    it('should return an item by name', async () => {
        const response = await request(app).get('/items/popsicle');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ name: 'popsicle', price: 1.45 });
    });

    it('should return 404 if item is not found', async () => {
        const response = await request(app).get('/items/nonexistent');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ error: 'Item not found' });
    });
});

// Patch /items/:name route tests
describe('PATCH /items/:name', () => {
    it('should update an item', async () => {
        const response = await request(app)
            .patch('/items/popsicle')
            .send({ name: 'new popsicle', price: 2.45 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ updated: { name: 'new popsicle', price: 2.45 } });
        expect(items).toContainEqual({ name: 'new popsicle', price: 2.45 });
    });

    it('should return 404 if item is not found', async () => {
        const response = await request(app)
            .patch('/items/nonexistent')
            .send({ name: 'test' });
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ error: 'Item not found' });
    });
});

// Delete /items/:name route tests
describe('DELETE /items/:name', () => {
    it('should delete an item', async () => {
        const response = await request(app).delete('/items/new popsicle');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Deleted' });
        expect(items).not.toContainEqual({ name: 'new popsicle', price: 2.45 });
    });

    it('should return 404 if item is not found', async () => {
        const response = await request(app).delete('/items/nonexistent');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ error: 'Item not found' });
    });
});

