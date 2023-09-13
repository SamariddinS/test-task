import axios from 'axios';
import { useState } from 'react';

const SearchComponent = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        firstName: '',
        passportNumber: '',
    });
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prevCriteria) => ({
            ...prevCriteria,
            [name]: value,
        }));
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/employee', {
                params: searchCriteria,
            });

            // Извлекаем массив searchResults из ответа сервера
            const { searchResults } = response.data;

            setSearchResults(searchResults);
        } catch (error) {
            console.error('An error occurred while searching:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white border rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Поиск сотрудников</h2>
            <div className="mb-4">
                <label htmlFor="firstName" className="block font-medium mb-1">Имя:</label>
                <input
                    type="text"
                    name="firstName"
                    value={searchCriteria.firstName}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="sureName" className="block font-medium mb-1">Фамилия:</label>
                <input
                    type="text"
                    name="sureName"
                    value={searchCriteria.sureName}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="lastName" className="block font-medium mb-1">Отчество:</label>
                <input
                    type="text"
                    name="lastName"
                    value={searchCriteria.lastName}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="passportNumber" className="block font-medium mb-1">Номер паспорта:</label>
                <input
                    type="text"
                    name="passportNumber"
                    value={searchCriteria.passportNumber}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block font-medium mb-1">Номер тел:</label>
                <input
                    type="text"
                    name="phone"
                    value={searchCriteria.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="country" className="block font-medium mb-1">Страна:</label>
                <input
                    type="text"
                    name="country"
                    value={searchCriteria.country}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="region" className="block font-medium mb-1">Область:</label>
                <input
                    type="text"
                    name="region"
                    value={searchCriteria.region}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="education" className="block font-medium mb-1">Образование:</label>
                <input
                    type="text"
                    name="education"
                    value={searchCriteria.education}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="speciality" className="block font-medium mb-1">Специальность:</label>
                <input
                    type="text"
                    name="speciality"
                    value={searchCriteria.speciality}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button onClick={handleSearch} disabled={loading} className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600">
                Search
            </button>
            {loading && <p>Loading...</p>}
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>
                        {result.firstName} - {result.passportNumber} - {result.sureName} - {result.phone} - {result.education} - {result.birthday} - {result.speciality}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
