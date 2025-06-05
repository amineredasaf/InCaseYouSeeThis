import Home from "./pages/Home";
import "./globals.css";


export default function App() {
  return (
    <div className=" h-full w-full overflow-hidde">
      <main className=" h-full w-full overflow-hidden ">
        <Home/>
        <div className="overlay"></div>
        <div className="animation w-full h-full overflow-hidde " />
      </main>
    </div>
  );
}
