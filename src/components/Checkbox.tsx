import css from "./Checkbox.module.css"

export default function Checkbox({
  id,
  label,
  onChange,
  checked,
}: {
  id: string
  label: string
  onChange: () => void
  checked: boolean
}) {
  return (
    <div className={css.checkbox}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
