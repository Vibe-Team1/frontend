// src/components/landing/LandingPage.jsx

import React, { useEffect } from "react";
import "./LandingPage.css";

const backgroundImage = "/landing.jpg"; // CSS에서 사용하는 경로와 일치
const gifImage = "/characters/101.gif"; // public 폴더 기준 경로
const title = "슬라임 키우기 안녕하세요!";
const GOOGLE_OAUTH_URL = 'http://finland.r-e.kr:8080/oauth2/authorization/google';

export default function LandingPage() {
  useEffect(() => {
    const handleRedirect = () => {
      window.location.href = GOOGLE_OAUTH_URL;
    };
    window.addEventListener('keydown', handleRedirect);
    window.addEventListener('click', handleRedirect);
    return () => {
      window.removeEventListener('keydown', handleRedirect);
      window.removeEventListener('click', handleRedirect);
    };
  }, []);

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
