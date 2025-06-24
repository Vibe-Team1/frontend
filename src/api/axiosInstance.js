import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소에 맞게 필요시 수정
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZThiMzZjZC1iMmUxLTRhYTgtOGVkZS1iMDdhMjM1OWFhZDkiLCJpYXQiOjE3NTA3MzA3OTgsImV4cCI6MTc1MDgxNzE5OH0.TW98PHXyW_jLFDlgqR1MkWb074kKDPJAN3gOgCWsbKQ",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
