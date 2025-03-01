const express = require('express');
const fs = require('fs');
const { isValidIsraeliID, isValidPhone } = require('./validation.js');

const app = express();
app.use(express.json());

const users = new Map();

// Read and validate users from JSON file
function loadAndValidateUsers() {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users:', err);
            return;
        }
        try{
            const parsedData = JSON.parse(data);
            parsedData.forEach(user => {
                if (isValidIsraeliID(user.ID) && isValidPhone(user.Phone)) {
                    users.set(user.ID, user);
                } else {
                    console.log(`Invalid user: ${user.Name}`);
                }
        });
        }
        catch (parseError){
            console.error('Error parsing users data:', parseError);
        }
    });
}

loadAndValidateUsers();

// Get all usernames
app.get('/users', (req, res) => {
    if (users.size === 0) {
        return res.status(404).send('There are no users, try adding one');
    }
    res.json([...users.values()].map(user => user.Name));
});

// Get user information by name
app.get('/users/:name', (req, res) => {
    const foundUsers = [...users.values()].filter(u => u.Name.toLowerCase() === req.params.name.toLowerCase());

    if (foundUsers.length > 0) {
        return res.json(foundUsers);
    } else {
        return res.status(404).send('User not found');
    }
});

// Create new user - validate ID, phone, name, and address
app.post('/users', (req, res) => {
    const { ID, Name, Phone, Address } = req.body;
    if (!isValidPhone(Phone)) {
        return res.status(400).send(`Invalid phone number for ${Name}, Please try again`);
    }
    if (!isValidIsraeliID(ID)) {
        return res.status(400).send(`Invalid ID for ${Name}, Please try again`);
    }
    if (Phone == '' || Name == ''){
        return res.status(400).send(`Missing some information for ${Name}, Please try again`);
    }
    if (users.has(ID)) {
        return res.status(409).send('User with this ID already exists');
    }

    const newUser = { ID, Name, Phone, Address };
    users.set(ID, newUser);

    fs.writeFile('users.json', JSON.stringify([...users.values()], null, 2), (err) => {
        if (err) {
            console.error('Error saving users to file:', err);
            return res.status(500).send('Failed to save user');
        }

        res.status(201).send(`User ${Name} created`);
    });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

