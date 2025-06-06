import Home from "./pages/Home";
import "./globals.css";


export default function App() {
  return (
    <div className="h-full w-full overflow-hidde border border-blue-300">
      <main className=" h-full w-full overflow-hidden ">
        <div className="pointer-events-none animation overflow-hidde " />
        <Home/>
        <div className="overlay"></div>
      </main>
    </div>
  );
}
