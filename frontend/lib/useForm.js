import { useState } from 'react';

export default function useForm(initial = {}) {
  // create state obj for out inputs
  const [inputs, setInputs] = useState(initial);

  // {
  //     name: 'sar',
  //     description: 'cotton shoes',
  //     price: '1200'
  // }
  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }
  // return wa we want to surfice from this hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
