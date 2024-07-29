<template>
    <label
        class="opt-input"
    >
        {{ label }}
        <input
            v-model="proxyValue"
            class="opt-input__input"
            :class="[
                {'error': error },
                {'focused': focused },
                {'active': proxyValue },
                {'disabled': disabled},
                setStyle
            ]"
            :autocomplete="autocomplete"
            :disabled="disabled"
            :form="form"
            :max="max"
            :maxlength="maxlength"
            :name="name"
            :pattern="pattern"
            :placeholder="placeholder"
            :readonly="readonly"
            :required="required"
            :size="size"
            :step="step"
            :type="localType"

            @input="onInput($event)"
            @change="onChange($event)"
            @focus="focused = true"
            @blur="focused = false"
        >
    </label>
</template>

<script setup lang="ts">
import '@css/controls/opt-input.scss'

const props = defineProps({
// Default Input Props
  autocomplete: { type: String, default: null },
  label: { type: String, default: null },
  disabled: { type: Boolean, default: null },
  form: { type: String, default: null },
  max: { type: Number, default: null },
  maxlength: { type: Number, default: null },
  min: { type: Number, default: null },
  minlength: { type: Number, default: null },
  name: { type: String, default: null },
  pattern: { type: String, default: null },
  placeholder: { type: String, default: null },
  readonly: { type: Boolean, default: null },
  required: { type: Boolean, default: null },
  size: { type: Number, default: null },
  step: { type: Number, default: 1 },
  type: {
    type: String as (() => 'tel' |
    'range' |
    'hidden' |
    'number' |
    'password' |
    'search' |
    'text' |
    undefined),
    default: 'text'
  },
  modelValue: { type: [String, Number], default: null },

  // Custom Input Props
  iForm: { type: String, default: null },
  error: { type: Boolean, default: false },

  // Input Types
  passwordType: { type: Boolean, default: false }
})

const localType = props.passwordType ? ref('password') : ref(props.type)

const emit = defineEmits(['input', 'focus', 'change', 'update:modelValue', 'searchClick'])

const proxyValue = ref<string | number>(props.modelValue)
const focused = ref<Boolean>(false)

const onInput = (event: any): void => {
  const newValue = (event.target as HTMLInputElement).value
  proxyValue.value = newValue
  emit('input', event.target.value)
  emit('update:modelValue', event.target.value)
}

const onChange = (event: any): void => {
  const newValue = (event.target as HTMLInputElement).value
  proxyValue.value = newValue
  emit('change', event.target.value)
}

const setStyle = computed(() => {
  if (props.iForm) { return props.iForm }
  return 'default'
})

watch(() => props.modelValue, (newValue) => {
  proxyValue.value = newValue
})

onMounted(() => {
  proxyValue.value = props.modelValue
})

</script>
