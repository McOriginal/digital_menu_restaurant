import { Link } from 'react-router-dom';
import { GrValidate } from 'react-icons/gr';

export default function OrderPage() {
  const orderData = JSON.parse(localStorage.getItem('restaurant_cart')) || [];
  return (
    //  Récupérer le "restaurant_cart" dans localStorage et l'afficher ici avec
    // Style avec Tailwind

    <div className='p-4'>
      <Link
        to='/admin_page'
        className='bg-red-700 text-white flex justify-start w-24 font-bold items-center px-4 py-2 rounded-lg hover:bg-red-600 transition'
      >
        Accueil
      </Link>
      <h1 className='text-2xl font-bold mb-4 text-orange-600'>
        Commandes Disponible...
      </h1>
      {/* Contenu du panier à implémenter ici */}
      {orderData.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <ul className='space-y-4'>
          {orderData.map((item, index) => (
            <li
              key={index}
              className='sm:p-4 bg-white rounded-lg shadow flex sm:flex-row flex-col items-center sm:items-start justify-between'
            >
              <img
                src={item.img}
                alt={item.name}
                className='w-24 h-24 object-cover rounded-lg mb-2 sm:mb-0 sm:mr-4'
              />
              <div>
                <h2 className='text-lg font-semibold'>{item.name}</h2>
                <p>
                  Table:{' '}
                  <span className='text-orange-500 font-semibold'>
                    #{item.table}
                  </span>
                </p>
                <p>Quantité: {item.quantity}</p>
              </div>
              <div className='text-right'>
                <p className='font-bold'>
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
              </div>

              {/* Commande Servis */}
              <button
                className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mt-2 sm:mt-0'
                onClick={() => {
                  const updatedOrders = orderData.filter((_, i) => i !== index);
                  localStorage.setItem(
                    'restaurant_cart',
                    JSON.stringify(updatedOrders)
                  );
                  window.location.reload();
                }}
              >
                {/* Check React Icon */}
                <GrValidate />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
