import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { database } from '../services/firebase';


import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const navigate = useNavigate()

    async function handleCreateRoom(event: FormEvent) {


        event.preventDefault();
        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        navigate(`rooms/${firebaseRoom.key}`)
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
                    <h2>Criar uma nova sala</h2>
                    {/* handler de formulários sempre vai no submit */}
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={e => setNewRoom(e.target.value)}
                            value={newRoom}
                        />
                        <Button type='submit'>Criar Sala</Button>
                        <p>Quer entrar em uma sala existente? <Link to={'/'}>clique aqui</Link></p>
                    </form>
                </div>
            </main>
        </div>
    )
}
