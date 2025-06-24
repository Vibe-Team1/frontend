import { useEffect } from "react";
import useWebSocket from "../../hooks/useWebSocket";
import useStockStore from "../../store/useStockStore";

const WebSocketProvider = ({ children }) => {
  const { isConnected, connectionStatus } = useWebSocket(
    "http://43.203.58.77:8080/ws"
  );
  const { setConnectionStatus } = useStockStore();

  useEffect(() => {
    setConnectionStatus(isConnected, connectionStatus);
  }, [isConnected, connectionStatus, setConnectionStatus]);

  return children;
};

export default WebSocketProvider;
