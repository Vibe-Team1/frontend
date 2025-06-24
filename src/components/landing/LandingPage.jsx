// src/components/landing/LandingPage.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const backgroundImage = "/landing.jpg"; // CSS에서 사용하는 경로와 일치
const gifImage = "/characters/101.gif"; // public 폴더 기준 경로
const title = "슬라임 키우기 안녕하세요!";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = () => {
      navigate("/main"); // 이동할 경로
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="landing-background">
      <div className="landing-content">
        <h1 className="landing-title">{title}</h1>
        <img src={gifImage} alt="캐릭터" className="landing-gif" />
        <p className="landing-tip">아무 키나 눌러 시작하세요</p>
      </div>
    </div>
  );
}
