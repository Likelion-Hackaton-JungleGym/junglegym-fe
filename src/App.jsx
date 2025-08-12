import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./shared/layouts/RootLayout";
import JungleTownPage from "./pages/jungletown/JungleTownPage";
import JunglePeoplePage from "./pages/junglepeople/JunglePeoplePage";
import JungleTalkPage from "./pages/jungletalk/JungletalkPage";
import JungleSoundPage from "./pages/junglesound/JungleSoundPage";
import PersonProfile from "./pages/junglepeople/components/PersonProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<JungleTownPage />} />
          <Route path="/junglepeople" element={<JunglePeoplePage />} />
          <Route path="/junglepeople/:id" element={<PersonProfile />} />

          <Route path="/jungletalk" element={<JungleTalkPage />} />
          <Route path="/junglesound" element={<JungleSoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
