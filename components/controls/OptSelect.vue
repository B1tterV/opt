<template>
    <div class="custom-select">
        <div
            ref="selectionHeader"
            class="custom-select__header"
            @click="toggleDropdown"
        >
            <span>{{ selectedOptionLabel }}</span>
            <div class="arrow">
                <svg-icon icon="arrow-right" />
            </div>
        </div>
        <Teleport to="body">
            <div
                v-if="isOpen"
                v-click-outside="() => isOpen = false"
                class="custom-select__dropdown"
                :style="dropdownStyles"
            >
                <div
                    v-for="option in options"
                    :key="option.value"
                    class="custom-select__option"
                    @click="selectOption(option)"
                >
                    {{ option.label }}
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

  interface Option {
    value: string | number
    label: string
  }

const props = defineProps<{
    options: Option[]
    modelValue: string | number | null
  }>()
const emit = defineEmits(['update:modelValue'])
const selectionHeader = ref<any>(null)

const isOpen = ref(false)
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const selectedOption = computed(() => props.options.find(option => option.value === props.modelValue))
const dropdownStyles = ref({ top: '0px', left: '0px', width: '100%' })

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    updateDropdownPosition()
    window.addEventListener('scroll', updateDropdownPosition, true)
  } else {
    window.removeEventListener('scroll', updateDropdownPosition, true)
  }
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.label)
  isOpen.value = false
  window.removeEventListener('scroll', updateDropdownPosition, true)
}

const updateDropdownPosition = () => {
  const rect = selectionHeader.value?.getBoundingClientRect()
  if (rect) {
    dropdownStyles.value = {
      top: `${rect.bottom + window.scrollY + 10}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`
    }
  }
}

const selectedOptionLabel = computed(() => {
  const selectedOption = props.options.find(opt => opt.label === props.modelValue)
  return selectedOption ? selectedOption.label : 'Выберите опцию'
})

watch(() => props.modelValue, (newValue) => {
  const selectedOption = props.options.find(opt => opt.label === newValue)
  if (!selectedOption) {
    emit('update:modelValue', '')
  }
}, { immediate: true })

onMounted(() => {
  window.addEventListener('resize', updateDropdownPosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition, true)
})
</script>

  <style scoped>
  .custom-select {
    position: relative;
    font-family: var(--font-family);
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .custom-select__header {
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    height: 35px;
    border: 1px solid var(--background-gray);
    border-radius: 6px;
    font-weight: 400;
    font-size: 16px;
    color: var(--text-color);
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;
    justify-content: space-between;
    overflow: hidden;
    white-space: nowrap;
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 2px;
    top: 2px;
    width: 21px;
    height: calc(100% - 4px);
    background-color: #f6f5f3;
    opacity: 0.9;
    border-radius: 4px;
  }

  .custom-select__dropdown {
    position: absolute;
    background: white;
    border: 1px solid var(--background-gray);
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
    max-height: 300px;
    font-size: 14px;
    overflow: auto;
  }

  .custom-select__option {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .custom-select__option:hover {
    background-color: #f6f5f3;
  }
  </style>
