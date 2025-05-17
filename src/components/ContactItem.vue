<template>
    <v-list-item class="list_item_hover" :key="contact.id" :title="contact.name" :subtitle="`${contact.email} - ${contact.phone}`">
        <template v-slot:append>
            <v-btn icon="mdi-pencil" variant="text" color="black" class="mr-2" @click="onEdit"></v-btn>
            <v-btn icon="mdi-delete" variant="text" color="error" @click="onDelete"></v-btn>
        </template>
    </v-list-item>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    contact: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['edit', 'delete'])

function onEdit() {
    emit('edit', props.contact)
}

function onDelete() {
    emit('delete', props.contact)
}
</script>

<style>
.list_item_hover{
    transition: .5s;
}
.list_item_hover:hover {
    cursor: pointer;
    background-color: rgb(217, 222, 248) !important;
}
</style>