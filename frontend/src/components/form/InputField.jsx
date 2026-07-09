import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputField({type, placeholder, label, ...props}) {
  return (
    <Field>
      <FieldLabel htmlFor="input-field-username">{label}</FieldLabel>
      <Input
        id="input-field-username"
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </Field>
  )
}
