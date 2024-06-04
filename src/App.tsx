import Header from "./components/Header";
import SectionCollections from "./components/SectionCollections";
import SectionTop from "./components/SectionTop";


function App() {
  return (
    <div className="App">
      <Header/>
      <main className="main">
        <div className="container">
          <SectionTop/>
          <SectionCollections/>
        </div>
      </main>
    </div>
  );
}

export default App;
