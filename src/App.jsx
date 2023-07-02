import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { MainContent } from './components/MainContent'
import { GameProvider } from './components/context/GameContext'

function App() {
  return (
    <GameProvider>
      <Header />
      <MainContent />
      <Footer />
    </GameProvider>
  )
}

export default App
