import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import useStockStore from "../store/useStockStore.js";

const useWebSocket = (url) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("");
  const stompClientRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const setStockData = useStockStore((state) => state.setStockData);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [url]);

  const connectWebSocket = () => {
    try {
      console.log("WebSocket 연결 시도:", url);

      const socket = new SockJS(url);
      const stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
          console.log("STOMP Debug:", str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        connectHeaders: {
          "heart-beat": "10000,10000",
        },
      });

      stompClient.onConnect = (frame) => {
        console.log("STOMP 연결됨:", frame);
        setIsConnected(true);
        setConnectionStatus("연결됨");

        // 실시간 주식 데이터 구독
        stompClient.subscribe("/topic/stock-data", (message) => {
          try {
            let data = JSON.parse(message.body);
            // 항상 배열로 변환
            if (!Array.isArray(data)) {
              data = [data];
            }
            // 6개 종목만 필터
            const allowedCodes = [
              "005930",
              "000660",
              "035420",
              "105560",
              "181710",
              "003550",
            ];
            const filtered = data.filter((item) =>
              allowedCodes.includes(item.stockCode?.toString())
            );
            if (filtered.length > 0) {
              setStockData(filtered);
            }
          } catch (error) {
            console.error("메시지 파싱 오류:", error);
          }
        });

        // 백엔드 상태 구독
        stompClient.subscribe("/topic/backend-status", (message) => {
          try {
            const status = JSON.parse(message.body);
            console.log("백엔드 상태:", status);
          } catch (error) {
            console.error("상태 메시지 파싱 오류:", error);
          }
        });

        // 연결 상태 구독
        stompClient.subscribe("/user/queue/connection-status", (message) => {
          try {
            const status = JSON.parse(message.body);
            console.log("연결 상태:", status);
          } catch (error) {
            console.error("연결 상태 메시지 파싱 오류:", error);
          }
        });

        // 연결 요청
        stompClient.publish({
          destination: "/app/proxy/connect",
          body: JSON.stringify({}),
        });
      };

      stompClient.onStompError = (frame) => {
        console.error("STOMP 오류:", frame);
        setConnectionStatus("STOMP 오류: " + frame.headers.message);
        setIsConnected(false);
      };

      stompClient.onWebSocketError = (error) => {
        console.error("WebSocket 오류:", error);
        setConnectionStatus("WebSocket 오류: " + error.message);
        setIsConnected(false);
      };

      stompClient.onWebSocketClose = (event) => {
        console.log("WebSocket 연결 종료:", event);
        setIsConnected(false);
        setConnectionStatus("연결 끊김");

        // 재연결 시도
        if (event.code !== 1000) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("WebSocket 재연결 시도...");
            connectWebSocket();
          }, 5000);
        }
      };

      stompClient.activate();
      stompClientRef.current = stompClient;
    } catch (error) {
      console.error("WebSocket 연결 실패:", error);
      setConnectionStatus("연결 실패: " + error.message);
      setIsConnected(false);
    }
  };

  const disconnect = () => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
    }
  };

  const subscribeToStock = (stockCode) => {
    if (stompClientRef.current && isConnected) {
      stompClientRef.current.publish({
        destination: "/app/proxy/subscribe",
        body: JSON.stringify({ stockCode }),
      });
    }
  };

  const unsubscribeFromStock = (stockCode) => {
    if (stompClientRef.current && isConnected) {
      stompClientRef.current.publish({
        destination: "/app/proxy/unsubscribe",
        body: JSON.stringify({ stockCode }),
      });
    }
  };

  return {
    isConnected,
    connectionStatus,
    disconnect,
    subscribeToStock,
    unsubscribeFromStock,
  };
};

export default useWebSocket;
