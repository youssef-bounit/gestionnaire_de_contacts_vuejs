<template>
    <v-card variant="tonal">
        <p v-if="!isLoading && contacts.length === 0" class="text-center grey--text">
            No contacts yet. Add one!
        </p>
        <v-list lines="three" v-else-if="!isLoading && contacts.length > 0">
            <ContactItem v-for="contact in contacts" :key="contact.id" :contact="contact" @edit="handleEdit"
                @delete="handleDelete" />
        </v-list>
        <!-- Loading indicator could be here or in HomeView -->
    </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import ContactItem from './ContactItem.vue';

defineProps({
    contacts: {
        type: Array,
        required: true
    },
    isLoading: { // Optional: if you want list-specific loading
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['edit-contact', 'delete-contact']);

function handleEdit(contact) {
    emit('edit-contact', contact);
}

function handleDelete(contact) {
    emit('delete-contact', contact);
}
</script>

<style>

</style>