import RegistrationForm from './components/RegistrationForm';
import SearchComponent from './components/Search';

function App() {
    return (
        <div>
            <h1 className='mx-auto my-6 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl'>Кадровая программа</h1>
            <RegistrationForm />
            <SearchComponent />
        </div>
    );
}

export default App
