import { useNavigate } from "react-router-dom";

// Importando as images
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

// Importando 
import { Button } from "../components/Button";


// Importando CSS
import '../styles/auth.scss';
// webpack é utilizado pelo create-react-app
// cria bundle.js a partir das dependências

export function Home() {

    const navigate = useNavigate();

    function handleCreateRoom() {
        navigate("/rooms/new");
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Ilustração de programadora" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire dúvidas em tempo real.</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className='create-room' >
                        <img src={googleIconImg} alt="Logo da Google" /> Entre com sua conta Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Digite o código da sala"
                        />
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
} 