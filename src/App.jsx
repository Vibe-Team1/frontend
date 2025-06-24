import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LandingPage from "./components/landing/LandingPage";
import MainPage from "./components/main/MainPage";
import WebSocketProvider from "./components/common/WebSocketProvider";
import bgm from "./assets/bgm.mp3";
import OAuthSuccess from "./components/landing/OAuthSuccess";

function App() {
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch(() => {
          setIsMusicPlaying(false);
        });
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlayAttempt = () => {
        audio
          .play()
          .then(() => {
            setIsMusicPlaying(true);
          })
          .catch(() => {
            setIsMusicPlaying(false);
            document.body.removeEventListener("click", handlePlayAttempt);
            document.body.addEventListener("click", handleUserInteraction, {
              once: true,
            });
          });
      };

      const handleUserInteraction = () => {
        audio.play().then(() => {
          setIsMusicPlaying(true);
        });
      };

      handlePlayAttempt();

      return () => {
        document.body.removeEventListener("click", handleUserInteraction);
      };
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src={bgm} loop />
      <WebSocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/main"
              element={
                <MainPage
                  isMusicPlaying={isMusicPlaying}
                  playMusic={playMusic}
                  pauseMusic={pauseMusic}
                />
              }
            />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
          </Routes>
        </BrowserRouter>
      </WebSocketProvider>
    </>
  );
}

export default App;
