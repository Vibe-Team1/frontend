import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "../../api/axiosInstance";

const NewsContainer = styled.div`
  background-color: #f3e9d3;
  border: 7px solid #4a2e2a;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 4px #8d6e63;
  color: #5d4037;
  font-family: monospace;
  flex-grow: 1;
  margin: 0 20px;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const NewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 10px 0;
  padding-bottom: 10px;
  border-bottom: 2px dashed #c9b79c;
`;

const HeaderTitle = styled.h4`
  margin: 0;
  font-size: 1.7rem;
`;

const NewsContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 3px;
  background-color: #fff9e9;
  border: 1px solid #c9b79c;
  border-radius: 5px;
`;

const NewsItem = styled.div`
  padding: 15px;
  margin-bottom: 7px;
  background-color: white;
  border: 1px solid #c9b79c;
  border-radius: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const NewsSummary = styled.p`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #4a2e2a;
`;

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/v1/news");
        if (response.data.success) {
          setNews(response.data.data);
        }
      } catch (error) {
        console.error("뉴스를 불러오는데 실패했습니다:", error);
      }
    };

    fetchNews();
    // 1분마다 뉴스 새로고침
    const interval = setInterval(fetchNews, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NewsContainer>
      <NewsHeader>
        <HeaderTitle>최신 뉴스</HeaderTitle>
      </NewsHeader>
      <NewsContent>
        {news.map((item) => (
          <NewsItem key={item.id}>
            <NewsSummary>{item.summary}</NewsSummary>
          </NewsItem>
        ))}
        {news.length === 0 && (
          <NewsItem>
            <NewsSummary>현재 표시할 뉴스가 없습니다.</NewsSummary>
          </NewsItem>
        )}
      </NewsContent>
    </NewsContainer>
  );
};

export default News;
