import "./App.css";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import ToolsLayout from "./layout/ToolsLayout";
import { Fragment } from "react/jsx-runtime";
import {
  robotsHref,
  imageCompressorHref,
  pngToJpegHref,
  faviconHref,
  imgToWebpHref,
} from "./constants/strings";
import RobotsGenerator from "./pages/tools/RobotsGenerator";
import ImageCompression from "./pages/tools/ImageCompression";
import PngToJpeg from "./pages/tools/PngToJpeg";
import FaviconGenerator from "./pages/tools/FaviconGenerator";
import ImageToWebP from "./pages/tools/ImageToWebp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/tools" element={<ToolsLayout />}>
            <Route index element={<Fragment></Fragment>} />
            <Route path={robotsHref.slice(7)} element={<RobotsGenerator />} />
            <Route
              path={imageCompressorHref.slice(7)}
              element={<ImageCompression />}
            />
            <Route path={pngToJpegHref.slice(7)} element={<PngToJpeg />} />
            <Route path={faviconHref.slice(7)} element={<FaviconGenerator />} />
            <Route path={imgToWebpHref.slice(7)} element={<ImageToWebP />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
