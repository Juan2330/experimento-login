import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/myaccount" element={<MyAccount />} />
      </Routes>
    </Layout>
  );
}

export default App;
