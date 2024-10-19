
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Verify } from "./pages/verify"
import { Dashboard } from "./pages/Dashboard"
import { CreatePost } from "./pages/CreatePost"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
