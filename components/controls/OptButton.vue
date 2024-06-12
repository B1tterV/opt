<template>
    <button
        :id="id"
        class="opt-button"
        :class="[setColor, {'disabled': disabled}]"
        :autofocus="autofocus"
        :disabled="disabled"
        :form="form"
        :name="name"
        :type="type"

        @click="handleClick($event)"
    >
        <slot>
            {{ value }}
        </slot>
    </button>
</template>

<script setup lang="ts">
import '@css/controls/opt-button.scss'

const props = defineProps({
  // Default Button Props
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  form: { type: String, default: null },
  id: { type: String, default: null },
  name: { type: String, default: null },
  type: { type: String as () => 'button' | 'submit' | 'reset' | undefined, default: 'button' },
  value: { type: [String, Number], default: null },

  // Custom Button Props
  bForm: { type: [String, Array<String>], default: null }
})

const setColor = computed(() => {
  if (props.bForm) {
    if (typeof props.bForm === 'object') {
      const bForms = [...props.bForm]
      let finalClass = ''
      for (const item of bForms) { finalClass += `opt-button_${item} ` }
      return finalClass.trim()
    }
    return 'opt-button' + `_${props.bForm}`
  }
  return 'opt-button_blue'
})

const handleClick = (e: any) => { return e }
provide('click', handleClick)

</script>
