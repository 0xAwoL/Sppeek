import { BrowserRouter } from 'react-router-dom';
import { MainRouter } from './components/pages/MainRouter'

function App() {
  // if (process.env.PROD) {
  //   console.log = () => {}
  //   console.error = () => {}
  //   console.debug = () => { }
  // }
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  )
}

export default App
