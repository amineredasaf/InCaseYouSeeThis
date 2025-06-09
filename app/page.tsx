import Home from "./pages/Home";
import "./globals.css";
import BackgroundCanvas from "./components/background_model";

export default function App() {
  return (
    <div className="h-full w-full overflow-hidde">
      <main className="h-screen w-screen overflow-hidden relative">
        <div className="absolute inset-0 -z-10">
          <BackgroundCanvas />
        </div>
        {/* <h1>InCaseYouSeeThis</h1> */}
        <Home />
      </main>
    </div>
  );
}
