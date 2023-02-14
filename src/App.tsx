import { useState } from 'react'
import './App.css'
import ExampleList from './components/ExampleList/ExampleList'
import ExampleList3CSV from './components/ExampleList3CSV/ExampleList3CSV'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ExampleList3CSV />
    </div>
  )
}

export default App
