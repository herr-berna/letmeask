import { useNavigate } from "react-router-dom";

// Importando as images
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

// Importando componente
import { Button } from "../components/Button";

// Importando CSS
import '../styles/auth.scss';
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {

    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        navigate("/rooms/new");
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return 
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exist.');
            return
        }

        navigate(`/rooms/${roomCode}`)
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
                        <img src={googleIconImg} alt="Logo da Google" /> Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
} 