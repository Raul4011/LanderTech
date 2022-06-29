import { BrowserRouter,Routes,Route } from "react-router-dom";
import Main from "./components/Main.jsx"
import Read from "./components/Read.jsx"


function App() {

  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/pokemon/:id" element={<Read />} />
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
