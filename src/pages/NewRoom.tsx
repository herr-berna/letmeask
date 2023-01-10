import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss'

import { useContext } from 'react';
import { AuthContext } from '../App';

export function NewRoom() {
    const { user } = useContext(AuthContext);

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
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            required
                        />
                        <Button type='submit'>Criar Sala</Button>
                        <p>Quer entrar em uma sala existente? <Link to={'/'}>clique aqui</Link></p>
                    </form>
                </div>
            </main>
        </div>
    )
}

// 43:13