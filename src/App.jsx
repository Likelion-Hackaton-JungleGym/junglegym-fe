import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./shared/layouts/RootLayout";
import JungleTownPage from "./pages/jungletown/JungleTownPage";
import JunglePeoplePage from "./pages/junglepeople/JunglePeoplePage";
import JungleTalkPage from "./pages/jungletalk/JungleTalkPage";
import JungleSoundPage from "./pages/junglesound/JungleSoundPage";
import LeeseungroProfile from "./pages/junglepeople/components/profiles/LeeseugroProfile";
import OhsehunProfile from "./pages/junglepeople/components/profiles/OhsehunProfile";
import KimyungbaeProfile from "./pages/junglepeople/components/profiles/KimyungbaeProfile";
import KimnamgeunProfile from "./pages/junglepeople/components/profiles/KimnamgeunProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<JungleTownPage />} />
          <Route path="/junglepeople" element={<JunglePeoplePage />} />
          <Route path="/junglepeople/leeseungro" element={<LeeseungroProfile />} />
          <Route path="/junglepeople/ohsehun" element={<OhsehunProfile />} />
          <Route path="/junglepeople/kimyungbae" element={<KimyungbaeProfile />} />
          <Route path="/junglepeople/kimnamgeun" element={<KimnamgeunProfile />} />

          <Route path="/jungletalk" element={<JungleTalkPage />} />
          <Route path="/junglesound" element={<JungleSoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
