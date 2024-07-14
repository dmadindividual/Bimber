
import { Route, Routes } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import CoinId from "./Pages/CoinId"



const App = () => {
  return (
    <div className="App w-screen p-4 px-8">

      <Header/>
      <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/coin/:coinId" element={<CoinId/>} />
      </Routes>
     


     
     
    </div>
  )
}

export default App
