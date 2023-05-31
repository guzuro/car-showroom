import type { FormInst } from 'naive-ui'
import type { FormValidateCallback } from 'naive-ui/es/form/src/interface'
import type { Ref } from 'vue'

const handleFormValidate = (
  e: MouseEvent,
  formRef: Ref<FormInst | null>,
  onValidate: FormValidateCallback
): void => {
  e.preventDefault()
  formRef.value?.validate(onValidate)
}

export default handleFormValidate
