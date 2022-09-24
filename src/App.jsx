import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="head">
          <div className="text">Crypto Tracker</div>
          <span className="small-text">(real-time)</span>
        </div>
      </header>
      <Main />

      <Footer />
    </div>
  );
}

export default App;
