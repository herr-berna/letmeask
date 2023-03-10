//import { Button } from "./components/Button";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { Room } from './pages/Room';
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from './contexts/AuthContext';

// 33:50

function App() {
  //context permite pegar um state e deixar ele presente e manipulável across different components
 
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>        
              <Route path="/" element={<Home/>}/>
              <Route path="/rooms/new" element={<NewRoom/>}/>  
              {/* O componente abaixo depende do ID para a Room */}
              <Route path="/rooms/:id" element={<Room/>}/>        
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
