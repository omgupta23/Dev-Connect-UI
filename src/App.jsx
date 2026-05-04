import Navbar from './Componant/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './Componant/Body'
import Login from './Componant/Login'
import Profile from './Componant/Profile'
import { Provider } from 'react-redux'
import { appstore } from './utils/appstore'
import Feed from './Componant/Feed'

function App() {
  return (
    <Provider store={appstore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App