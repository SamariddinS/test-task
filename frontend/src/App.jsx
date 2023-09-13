import { useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import SearchComponent from './components/Search';

function App() {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "ru",
                autoDisplay: false
            },
            "google_translate_element"
        );
    };
    useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);
    return (
        <div>
            <h1 className='mx-auto my-6 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl'>Кадровая программа</h1>
            <div id="google_translate_element" className='max-w-md mx-auto my-8 p-6 bg-white border rounded shadow'></div>
            <RegistrationForm />
            <SearchComponent />
        </div>
    );
}

export default App
