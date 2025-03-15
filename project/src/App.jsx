import './App.css'
import Header from './Componants/Header'
import Sidebar from './Componants/sidebar/Sidebar'
import BotRouter from './Componants/BotRoutes'
import ChauutInterface from './Componants/ChatInterface'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>
     <BrowserRouter>
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex max-sm:flex-col overflow-hidden">
          <Sidebar />
          <div className="flex-grow overflow-y-auto">
            <Routes>
              <Route path="/bot/:botId" element={<BotRouter />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App;
