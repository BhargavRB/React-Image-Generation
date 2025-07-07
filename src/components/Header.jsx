import { useAuthContext } from '../store/auth-context';

function Header(){
    const {token,logout} = useAuthContext();
    return(
        <header className="text-center text-stone-50">
            <h1 className="font-bold text-3xl font-mono">
                React Image Generator
            </h1>
            {token && (
                <button 
                    onClick={logout} 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600">
                    Logout
                </button>
            )}
        </header>
    );  
}

export default Header;