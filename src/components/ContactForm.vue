<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" persistent
        max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="contactVuetifyForm" v-model="isFormValid" lazy-validation @submit.prevent="submitForm">
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="localContact.name" label="Name*" :rules="[rules.required]"
                                    required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="localContact.email" label="Email*"
                                    :rules="[rules.required, rules.email]" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="localContact.phone" label="Phone*" :rules="[rules.required]"
                                    required variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn class="px-5" style="padding-top: 4px;" color="black" @click="$emit('update:modelValue', false)">Cancel</v-btn>
                <v-btn class="px-5" style="padding-top: 4px;" variant="tonal" color="black" :disabled="!isFormValid || isSubmitting" :loading="isSubmitting"
                    @click="submitForm">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
    modelValue: Boolean, // For v-model on dialog visibility
    contactData: {
        type: Object,
        default: null,
    },
    isSubmitting: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:modelValue', 'save-contact'])

const contactVuetifyForm = ref(null)
const isFormValid = ref(false)
const localContact = ref({ id: null, name: '', email: '', phone: '' })

const formTitle = computed(() => (localContact.value.id ? 'Edit Contact' : 'Add New Contact'))

const rules = {
    required: (value) => !!value || 'Required.',
    email: (value) => {
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
    },
}

watch(
    () => props.modelValue,
    (isVisible) => {
        if (isVisible) {
            if (props.contactData) {
                localContact.value = { ...props.contactData }
            } else {
                localContact.value = { id: null, name: '', email: '', phone: '' }
            }
            if (contactVuetifyForm.value) {
                contactVuetifyForm.value.resetValidation()
            }
        }
    },
)

// Also watch contactData directly in case dialog is already open and contactData changes (less common scenario)
watch(
    () => props.contactData,
    (newData) => {
        if (props.modelValue) {
            // Only update if dialog is visible
            if (newData) {
                localContact.value = { ...newData }
            } else {
                localContact.value = { id: null, name: '', email: '', phone: '' }
            }
            if (contactVuetifyForm.value) {
                contactVuetifyForm.value.resetValidation()
            }
        }
    },
    { deep: true },
)

async function submitForm() {
    if (contactVuetifyForm.value) {
        const { valid } = await contactVuetifyForm.value.validate()
        if (!valid) return
    }
    // Emit only the data, not the reactive ref
    emit('save-contact', { ...localContact.value })
}
</script>
