import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    // dummy data
    image: '',
    name: 'nice shoes',
    price: 1233,
    description: 'perfect shoes for summer',
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="image">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="name"
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            value={inputs.price}
            onChange={handleChange}
            placeholder="price"
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            value={inputs.description}
            onChange={handleChange}
            placeholder="description"
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
