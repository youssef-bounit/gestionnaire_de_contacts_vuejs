// src/services/contactService.js
const API_BASE_URL = '/api/contacts' // Using Vite proxy, or http://localhost:3001/contacts directly if not using proxy

export async function getContacts() {
    const response = await fetch(API_BASE_URL)
    if (!response.ok) throw new Error('Failed to fetch contacts')
    return response.json()
}

export async function addContact(contact) {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    })
    if (!response.ok) throw new Error('Failed to add contact')
    return response.json()
}

export async function updateContact(id, contact) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT', // or PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    })
    if (!response.ok) throw new Error('Failed to update contact')
    return response.json()
}

export async function deleteContact(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete contact')
    return {} // json-server returns {} on successful delete
}
