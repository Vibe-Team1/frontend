import axios from "axios";

const instance = axios.create({
  baseURL: "http://finland.r-e.kr:8080", // 백엔드 주소에 맞게 필요시 수정
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwZmMyMDRkZi1hMzkxLTQ5OTItOTZmYS04YzdkYTZmODRkZTUiLCJpYXQiOjE3NTA3NDExNTUsImV4cCI6MTc1MDgyNzU1NX0.eW3LU3BIAcH1fcMFdK0N9iTAprxmIP1pL_eAj5yZjbg",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
