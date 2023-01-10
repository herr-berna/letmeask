//import { Button } from "./components/Button";
import { createContext } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { resourceLimits } from 'worker_threads';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { auth, firebase } from './services/firebase'

// O contexto forma um componente
export const AuthContext = createContext({} as any); 

function App() {
  //context permite pegar um state e deixar ele presente e manipulável across different components
  const [user, setUser] = useState();

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(res => {
            if (res.user) {
              const { displayName, photoURL, uid } = res.user
              if (!displayName || !photoURL) {
                throw new Error('Informações faltando da conta do Google.')
              }

              setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
              })
            }           
        })
  }

  return (
    <div className="App">
      <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
          
            <Route path="/" element={<Home/>}/>
            <Route path="/rooms/new" element={<NewRoom/>}/>
          
        </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

// 1:06:00

export default App;
