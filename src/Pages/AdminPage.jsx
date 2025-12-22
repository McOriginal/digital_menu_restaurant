import { Link } from 'react-router-dom';
import Meals from '../Components/Meals';

export default function AdminPage() {
  return (
    <>
      <header className='bg-white shadow-md p-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-red-500'>Cisse Délice</h1>
        <Link
          to='/orders'
          className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'
        >
          Voir les commandes
        </Link>
      </header>
      <Meals />
    </>
  );
}
