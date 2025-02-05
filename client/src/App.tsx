import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Header from "./components/header";
import Signin from "./pages/Signin";
import Post from "./pages/Post";
import Error from "./pages/Error";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/search' element={<Search />} />

        <Route path='/err' element={<Error />} />
        <Route path='/*' element={<Error unknown={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
