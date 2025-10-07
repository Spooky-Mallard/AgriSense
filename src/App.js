import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Summary from "./pages/Summary";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <Dashboard > Hi there</ Dashboard>
              
              } />
            <Route path="/insights" element={
              <Insights />
              } />
            <Route path="/summary" element={
              <Summary />
              } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
