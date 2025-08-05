import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JungleTownPage from "./pages/jungletown/JungleTownPage";
import JunglePeoplePage from "./pages/junglepeople/JunglePeoplePage";
import JungleTalkPage from "./pages/jungletalk/JungleTalkPage";
import JungleSoundPage from "./pages/junglesound/JungleSoundPage";
//import RootLayout from "./shared/layouts/RootLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<JungleTownPage />} />
        <Route path="/junglepeople" element={<JunglePeoplePage />} />
        <Route path="/jungletalk" element={<JungleTalkPage />} />
        <Route path="/junglesound" element={<JungleSoundPage />} />
      </Routes>
    </Router>
  );
}
