import { useEffect } from 'react'
import './App.css'
import AppRouter from './config/AppRouter'
import './static/colors/Colors.css'
import Aos from 'aos'
import 'aos/dist/aos.css'

function App() {

  useEffect(() => {
    Aos.init({
      duration: 1000,
      // offset: 20
    })
  }, [])
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
