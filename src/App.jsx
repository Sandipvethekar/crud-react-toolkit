import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Create from './components/Create'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Read from './components/Read'
import Update from './components/Update'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Navbar/>
       <Routes>
       <Route exact path="/" element={<Read />} />
       <Route exact  path="/read" element={<Read/>}></Route>
        <Route exact  path="/create" element={<Create/>}></Route>
        <Route exact  path="/edit/:id" element={<Update/>}></Route>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
