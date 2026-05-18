import { useState } from 'react'

function useForm(initialValues = {}, validate) {
  const [values,  setValues]  = useState(initialValues)
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    if (validate) {
      const newErrors = validate(values)
      if (newErrors[field]) setErrors(prev => ({ ...prev, [field]: newErrors[field] }))
    }
  }

  const validateAll = () => {
    if (!validate) return true
    const newErrors = validate(values)
    setErrors(newErrors)
    setTouched(Object.keys(values).reduce((a, k) => ({ ...a, [k]: true }), {}))
    return Object.keys(newErrors).length === 0
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return { values, errors, touched, handleChange, handleBlur, validateAll, reset, setErrors }
}

export default useForm