import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Upload } from './pages/Upload';
import { Analysis } from './pages/Analysis';
import { Edit } from './pages/Edit';
import ClickSpark from './components/effects/ClickSpark';
import RippleGrid from './components/effects/RippleGrid';

function App() {
  return (
    <Router>
      <ClickSpark
        sparkColor="#60A5FA"
        sparkSize={12}
        sparkRadius={18}
        sparkCount={6}
        duration={400}
        easing="ease-out"
      >
        <div className="relative min-h-screen bg-slate-950">
          {/* RippleGrid 背景修饰 */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <RippleGrid
              enableRainbow={false}
              gridColor="#1e3a5f"
              rippleIntensity={0.03}
              gridSize={12}
              gridThickness={10}
              mouseInteraction={true}
              mouseInteractionRadius={1.5}
              opacity={0.4}
              fadeDistance={1.2}
              vignetteStrength={2.5}
              glowIntensity={0.05}
            />
          </div>

          {/* 主内容 */}
          <div className="relative z-10">
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/edit" element={<Edit />} />
              </Routes>
            </Layout>
          </div>
        </div>
      </ClickSpark>
    </Router>
  );
}

export default App;
