<template>
    <div>
        <v-row justify="end" class="mb-4">
            <v-col cols="auto">
                <v-btn color="black" @click="openAddContactDialog">
                    <v-icon left>mdi-plus</v-icon> Add New Contact
                </v-btn>
            </v-col>
        </v-row>

        <v-progress-circular v-if="isLoading" indeterminate color="primary"
            class="d-block mx-auto my-5"></v-progress-circular>

        <v-alert v-if="apiError" type="error" prominent class="mb-4">
            {{ apiError }}
        </v-alert>

        <ContactList v-if="!isLoading && !apiError" :contacts="contacts" @edit-contact="handleEditRequest"
            @delete-contact="handleDeleteRequest" />

        <ContactForm v-model="contactFormDialogVisible" :contact-data="selectedContactForEdit"
            :is-submitting="isSubmitting" @save-contact="saveContact" />

        <!-- Delete Confirmation Dialog -->
        <v-dialog v-model="deleteConfirmDialogVisible" persistent max-width="400">
            <v-card>
                <v-card-title class="headline">Confirm Delete</v-card-title>
                <v-card-text>
                    Are you sure you want to delete contact "{{ contactToDelete?.name }}"? This action cannot be undone.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black" text @click="cancelDelete">Cancel</v-btn>
                    <v-btn color="red darken-1" :loading="isDeleting" @click="executeDelete">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as contactService from '@/services/contactService';
import ContactList from '@/components/ContactList.vue';
import ContactForm from '@/components/ContactForm.vue';

// --- State ---
const contacts = ref([]);
const isLoading = ref(false);
const isSubmitting = ref(false); // For form submission
const isDeleting = ref(false); // For delete operation
const apiError = ref(null);

const contactFormDialogVisible = ref(false);
const selectedContactForEdit = ref(null); // To pass to ContactForm for editing

const deleteConfirmDialogVisible = ref(false);
const contactToDelete = ref(null);

// --- Methods for fetching data ---
async function fetchContacts() {
    isLoading.value = true;
    apiError.value = null;
    try {
        contacts.value = await contactService.getContacts();
    } catch (e) {
        apiError.value = e.message;
        contacts.value = [];
    } finally {
        isLoading.value = false;
    }
}

// --- Methods for ContactForm interaction ---
function openAddContactDialog() {
    selectedContactForEdit.value = null; // Clear for new contact
    contactFormDialogVisible.value = true;
}

function handleEditRequest(contact) {
    selectedContactForEdit.value = { ...contact }; // Pass a copy
    contactFormDialogVisible.value = true;
}

async function saveContact(contactDataFromForm) {
    isSubmitting.value = true;
    apiError.value = null;
    try {
        // Create a clean object to send, ensure no reactive proxies if any
        const dataToSave = {
            name: contactDataFromForm.name,
            email: contactDataFromForm.email,
            phone: contactDataFromForm.phone
        };

        if (contactDataFromForm.id) { // If ID exists, it's an update
            dataToSave.id = contactDataFromForm.id;
            const updatedContact = await contactService.updateContact(contactDataFromForm.id, dataToSave);
            const index = contacts.value.findIndex(c => c.id === updatedContact.id);
            if (index !== -1) {
                contacts.value[index] = updatedContact;
            }
        } else { // No ID, it's a new contact
            const newContact = await contactService.addContact(dataToSave);
            contacts.value.push(newContact);
        }
        contactFormDialogVisible.value = false; // Close dialog on success
        selectedContactForEdit.value = null; // Reset selected contact
    } catch (e) {
        apiError.value = `Failed to save contact: ${e.message}`;
        // Dialog remains open for user to retry or cancel
    } finally {
        isSubmitting.value = false;
    }
}

// --- Methods for Delete Confirmation ---
function handleDeleteRequest(contact) {
    contactToDelete.value = contact;
    deleteConfirmDialogVisible.value = true;
}

function cancelDelete() {
    deleteConfirmDialogVisible.value = false;
    contactToDelete.value = null;
}

async function executeDelete() {
    if (!contactToDelete.value || !contactToDelete.value.id) {
        apiError.value = "No contact selected for deletion or contact has no ID.";
        isDeleting.value = false;
        return;
    }

    isDeleting.value = true;
    apiError.value = null;
    try {
        await contactService.deleteContact(contactToDelete.value.id);
        contacts.value = contacts.value.filter(c => c.id !== contactToDelete.value.id);
        cancelDelete(); // Close dialog and reset contactToDelete
    } catch (e) {
        apiError.value = `Failed to delete contact: ${e.message}`;
    } finally {
        isDeleting.value = false;
    }
}

// --- Lifecycle Hooks ---
onMounted(() => {
    fetchContacts();
});
</script>