import { FormEvent } from 'react';

const categoryEnumsOptions = [
  'VESTIDOS',
  'BLUSAS',
  'CALCAS',
  'SAIAS',
  'CASACOS',
  'SAPATOS',
  'BOLSAS',
  'ACESSORIOS',
  'LINGERIE',
  'FITNESS',
  'MODA_PRAIA',
  'MEIAS_E_COLLANTS',
  'JOIAS',
  'PERFUMES',
  'MAQUIAGEM',
  'CABELO',
];

const CreateNewProduct = (): JSX.Element => {

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const dataToSend = {
      name: formData.get('name'),
      price: formData.get('price'),
      description: formData.get('description'),
      quantityInStock: formData.get('quantityInStock'),
      categoryEnums: formData.get('categoryEnums'),
      photoLink: formData.get('photoLink'),
      offPrice: formData.get('offPrice'),
      stars: formData.get('stars'),
    }

    const endPoint = 'http://localhost:8093/products';
    const jsonData = JSON.stringify(dataToSend);

    try {
      const response = await fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert('Product created successfully!');
    } catch (error) {
      alert('Error creating product: ' + error);
    }
  };


  return (
    <div className="flex flex-col justify-center items-center w-full h-full mx-auto mb-8 mt-8 p-4 overflow-y-scroll text-gray-900 bg-opacity-0 rounded-md">
      <h2 className="text-2xl font-bold mb-4">CRIAR NOVO PRODUTO</h2>
      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-8'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">NOME:</label>
          <input
            type="text"
            name="name"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">PREÇO:</label>
          <input
            type="number"
            name="price"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">DESCRIÇÂO:</label>
          <textarea
            name="description"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">QUANTIDADE NO ESTOQUE:</label>
          <input
            type="number"
            name="quantityInStock"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">CATEGORIAS:</label>
          <select
            name="categoryEnums"
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select Category</option>
            {categoryEnumsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">LINK PARA FOTO:</label>
          <input
            type="text"
            name="photoLink"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">DESCONTO:</label>
          <input
            type="number"
            name="offPrice"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">ESTRELAS:</label>
          <input
            type="number"
            name="stars"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400"
        >
          CRIAR NOVO PRODUTO
        </button>
      </form>
    </div>
  );
}
export default CreateNewProduct;
