import Aos from "aos";
import { useEffect } from "react";
import Routers from "./routers/Routers";
import "aos/dist/aos.css";
function App() {
  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
  }, []);
  return <Routers />;
}

export default App;
