const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactPath = path.join(__dirname, 'db/contacts.json');
const updateContacts = async(contacts) => await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
    try {
        const data = await fs.readFile(contactPath);
        return JSON.parse(data);
    } catch (error) {
        error => console.log(error.message);
    };
};

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const result = contacts.find(i => i.id === contactId.toString());
        return result || null;
    } catch (error) {
        error => console.log(error.message);
    };
};

async function removeContact(contactId) {
   try {
        const contacts = await listContacts();
        const index = contacts.findIndex(i => i.id === contactId.toString());
        if (index === -1) {
            return null
        };
        const [result] = contacts.splice(index, 1);
       updateContacts(contacts);
        return result;
   } catch (error) {
       error => console.log(error.message);
    };
};

async function addContact({name, email, phone}) {
    try {
        const contacts = await listContacts()
        const newContact = {
            id: uuidv4(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        updateContacts(contacts)
        return newContact;
    } catch (error) {
        error => console.log(error.message);
    };
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};