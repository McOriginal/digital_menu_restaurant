import { useState, useEffect } from 'react';

export default function Meals({ btn }) {
  const [loading, setLoading] = useState(true);
  const [plats, setPlats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [tableNumber, setTableNumber] = useState('');
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const categories = [
    'burgers',
    'pizzas',
    'desserts',
    // 'drinks',
    'best-foods',
    'ice-cream',
    'chocolates',
    'fried-chicken',
    'sausages',
    'steaks',
    // 'our-foods',
    'breads',
    'sandwiches',
    'bbqs',
  ];

  // Fonction pour mélanger un tableau
  const shuffleArray = (array) => {
    return array
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          categories.map((cat) =>
            fetch(`https://free-food-menus-api-two.vercel.app/${cat}`).then(
              (res) => res.json()
            )
          )
        );

        // prendre 10 éléments de chaque catégorie
        const selected = results.flatMap((list) => list.slice(0, 10));

        // mélanger
        const mixed = shuffleArray(selected);

        setPlats(mixed);
      } catch (error) {
        setLoading(false);
        console.error('Erreur :', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Charger panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurant_cart');
    if (savedCart) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Sauvegarder panier à chaque modification
  useEffect(() => {
    localStorage.setItem('restaurant_cart', JSON.stringify(cart));
  }, [cart]);

  const openModal = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    const newItem = {
      ...selectedMeal,
      table: tableNumber,
      quantity: qty,
      addedAt: new Date().toISOString(),
    };

    const updatedCart = [...cart, newItem];
    setCart(updatedCart);

    setShowModal(false);
    setTableNumber('');
    setQty(1);

    // console.log('PANIER LOCALSTORAGE :', updatedCart);
  };

  // ##########################################""""

  return (
    <>
      <header className='bg-gray-600 shadow-md flex items-center gap-3 justify-center mb-6 '>
        <img src='logo.png' alt='logo' className='h-30' />
        <h3
          className='
text-2xl font-bold text-white  
        '
        >
          Cisse Délice
        </h3>
        {btn}
      </header>
      <div className='min-h-screen bg-gray-100 p-6'>
        {!loading && (
          <h1 className='text-3xl font-bold text-center mb-6'>
            Faite-vous plaisir avec nos délicieux plats !
          </h1>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {loading ? (
            <h2
              className='
text-center col-span-full text-xl font-semibold text-orange-500
          '
            >
              Loading...
            </h2>
          ) : (
            plats.map((p, index) => (
              <div
                key={index}
                className='bg-white rounded-xl shadow hover:shadow-lg transition p-4'
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className='w-full h-40 object-cover rounded-lg'
                />

                <h3 className='text-lg font-semibold mt-3'>{p.name}</h3>
                <p className='text-gray-600 text-sm mt-1 line-clamp-2'>
                  {p.dsc}
                </p>

                <div className='flex items-center justify-between mt-3'>
                  <span className='text-red-500 font-bold text-lg'>
                    {p.price} €
                  </span>
                  <button
                    onClick={() => openModal(p)}
                    className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer'
                  >
                    Commander
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 🟢 MODAL */}
        {showModal && selectedMeal && (
          <div
            className={`fixed inset-0 flex justify-center items-center transition-opacity duration-300
  ${showModal ? 'bg-black bg-opacity-60 opacity-100' : 'opacity-0'}`}
          >
            {' '}
            <div
              className={`bg-white rounded-xl p-6 w-96 transform transition-all duration-300
  ${showModal ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            >
              {' '}
              <h2 className='text-xl font-bold mb-4 text-center'>
                Ajouter au panier
              </h2>
              <div className='flex gap-3 items-center mb-3'>
                <img
                  src={selectedMeal.img}
                  alt={selectedMeal.name}
                  className='w-16 h-16 rounded object-cover'
                />
                <div>
                  <h3 className='font-semibold'>{selectedMeal.name}</h3>
                  <p className='text-red-500 font-bold'>
                    {selectedMeal.price} €
                  </p>
                </div>
              </div>
              <form onSubmit={handleAddToCart} className='space-y-3'>
                <div>
                  <label className='font-semibold'>Numéro de table</label>
                  <input
                    required
                    type='number'
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className='w-full border rounded px-3 py-2 mt-1 outline-none'
                  />
                </div>

                <div>
                  <label className='font-semibold'>Quantité</label>
                  <input
                    required
                    type='number'
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className='w-full border rounded px-3 py-2 mt-1 outline-none'
                  />
                </div>

                <div className='flex justify-between mt-4'>
                  <button
                    type='button'
                    onClick={() => setShowModal(false)}
                    className='px-4 py-2 bg-gray-400 text-white rounded-lg transition cursor-pointer'
                  >
                    Annuler
                  </button>

                  <button
                    type='submit'
                    className='px-4 py-2 bg-green-500 text-white rounded-lg transition cursor-pointer'
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
