import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import { useAuthContext } from "./store/auth-context";
import ImageGeneration from "./components/ImageGeneration";

function App() {
  const {token} = useAuthContext();

  return (
     <div className="bg-stone-800 min-h-screen py-8">
      <Header />
      <main className="container mx-auto p-4">
        {!token ? <AuthForm /> : <ImageGeneration />}
      </main>
      </div>
  );
}

export default App
