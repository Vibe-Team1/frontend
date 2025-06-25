import { useState } from "react";
import styled, { keyframes } from "styled-components";
import useUserStore from "../../store/useUserStore";
import ShopItemCard from "./ShopItemCard";
import ReceiptComponent from "../stockList/Receipt";
import NotificationModal from "../common/NotificationModal";
import GachaResultModal from "./GachaResultModal";
import ConfirmModal from "../common/ConfirmModal";
import { shopDraw } from "../../api/accountApi";

const scaleUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 85%;
  height: 85%;
  background-color: #f3e9d3;
  border: 10px solid #4a2e2a;
  border-radius: 15px;
  box-shadow: inset 0 0 0 5px #8d6e63;
  padding: 25px;
  box-sizing: border-box;
  position: relative;
  animation: ${scaleUp} 0.25s ease-out forwards;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #e57373;
  color: white;
  border: 3px solid #c62828;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &:hover {
    background-color: #ef5350;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-family: "DNFBitBitv2", sans-serif;
  font-size: 2.5rem;
  color: #5d4037;
  margin-top: 0;
  margin-bottom: 20px;
`;

const TopInfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #d8c8b0;
  border-radius: 8px;
  margin-bottom: 20px;
  font-family: "DNFBitBitv2", sans-serif;
  color: #5d4037;
`;

const InfoItem = styled.div`
  font-size: 1rem;
  & span {
    font-weight: bold;
    margin-left: 10px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  height: calc(100% - 130px);
  gap: 20px;
`;

const LeftNav = styled.nav`
  width: 150px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Tab = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: ${({ $active }) => ($active ? "white" : "transparent")};
  border: none;
  border-bottom: 5px solid
    ${({ $active }) => ($active ? "#8d6e63" : "transparent")};
  color: #5d4037;
  font-family: "DNFBitBitv2", sans-serif;

  &:hover {
    background-color: ${({ $active }) => ($active ? "white" : "#f7f2e9")};
  }
`;

const ItemList = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  overflow-y: auto;
  padding: 10px;
  align-content: flex-start;
`;

const characterItems = Array.from({ length: 12 }, (_, i) => {
  const numbers = [
    '001', '016', '031', '046', '061', '076', '091', '106', '121', '136', '151', '166'
  ];
  const gifNumStr = numbers[i];

  return {
    id: `slime_${gifNumStr}`,
    name: `슬라임 ${i + 1}`,
    description: "새로운 슬라임 캐릭터를 잠금 해제합니다.",
    price: 2000000 * (i + 1),
    icon: `https://cy-stock-s3.s3.ap-northeast-2.amazonaws.com/char/${gifNumStr}.gif`,
  };
});

const gachaItems = [
  {
    id: "normal_ticket",
    name: "일반 티켓",
    description: "일반 등급의 뽑기를 할 수 있는 티켓입니다.",
    price: 5,
    icon: "/etcIcon/pixel-ticket.jpg",
  },
  {
    id: "rare_ticket",
    name: "레어 티켓",
    description: "레어 등급의 뽑기를 할 수 있는 티켓입니다.",
    price: 10,
    icon: "/etcIcon/pixel-ticket.jpg",
  },
  {
    id: "legend_ticket",
    name: "레전드 티켓",
    description: "레전드 등급의 뽑기를 할 수 있는 티켓입니다.",
    price: 20,
    icon: "/etcIcon/pixel-ticket.jpg",
  },
];

const itemLists = {
  character: characterItems,
  item: gachaItems,
};

const ShopModal = ({ onClose }) => {
  const [cart, setCart] = useState({});
  const [activeTab, setActiveTab] = useState("item");
  const [resetKey, setResetKey] = useState(0);
  const [notification, setNotification] = useState("");
  const [gachaResult, setGachaResult] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const gachaInCart = Object.keys(cart).find((key) =>
    key.startsWith("random_")
  );

  const { cash, acorn } = useUserStore((state) => state.assets);
  const { inventory, updateCash, setInventory, setAcorn } = useUserStore();
  const fetchCustomization = useUserStore((state) => state.fetchCustomization);

  const handleCartChange = (item, quantity) => {
    const isGachaItem = item.id.startsWith("random_");
    if (isGachaItem && quantity > 1) {
      setNotification("뽑기 아이템은 하나만 구매할 수 있습니다.");
      return;
    }

    setCart((prevCart) => {
      const newCart = { ...prevCart };

      if (isGachaItem) {
        // 다른 뽑기 아이템이 카트에 있는지 확인
        const otherGachaInCart = Object.keys(prevCart).find(
          (key) => key.startsWith("random_") && key !== item.id
        );
        if (otherGachaInCart) {
          setNotification(
            "한 번에 한 종류의 뽑기 아이템만 구매할 수 있습니다."
          );
          return prevCart; // 변경하지 않음
        }
      }

      if (quantity > 0) {
        newCart[item.id] = { item, quantity };
      } else {
        delete newCart[item.id];
      }
      return newCart;
    });
  };

  const initiatePurchase = () => {
    if (Object.keys(cart).length === 0) {
      setNotification("구매할 상품을 선택해주세요.");
      return;
    }
    setIsConfirmOpen(true);
  };

  const executePurchase = async () => {
    let totalCost = 0;
    Object.values(cart).forEach(({ item, quantity }) => {
      totalCost += item.price * quantity;
    });

    if (totalCost > cash) {
      setNotification("현금이 부족합니다!");
      return;
    }

    updateCash(-totalCost);

    const purchasedItem = Object.values(cart)[0].item;
    const isTicket = ticketIds.includes(purchasedItem.id);

    // 티켓 뽑기 로직
    if (isTicket) {
      let type = "";
      let acornCost = 0;
      if (purchasedItem.id === "normal_ticket") { type = "NORMAL"; acornCost = 5; }
      else if (purchasedItem.id === "rare_ticket") { type = "PREMIUM"; acornCost = 10; }
      else if (purchasedItem.id === "legend_ticket") { type = "SUPREME"; acornCost = 20; }
      try {
        // 도토리 차감
        if (acorn < acornCost) {
          setNotification("도토리가 부족합니다!");
          return;
        }
        setAcorn(acorn - acornCost);
        // localStorage에도 직접 반영(혹시 zustand 미동기화 대비)
        const userStorage = JSON.parse(localStorage.getItem('user-storage'));
        if (userStorage && userStorage.state && userStorage.state.assets) {
          userStorage.state.assets.acorn = acorn - acornCost;
          localStorage.setItem('user-storage', JSON.stringify(userStorage));
        }
        const res = await shopDraw({ type });
        if (res.data && res.data.success) {
          const { characterCode, isNew } = res.data.data;
          // 캐릭터 코드 범위 체크 및 알림
          let valid = false;
          if (
            type === "NORMAL" &&
            Number(characterCode) >= 1 &&
            Number(characterCode) <= 120
          )
            valid = true;
          if (
            type === "PREMIUM" &&
            Number(characterCode) >= 121 &&
            Number(characterCode) <= 180
          )
            valid = true;
          if (
            type === "SUPREME" &&
            Number(characterCode) >= 151 &&
            Number(characterCode) <= 180
          )
            valid = true;
          if (!valid) {
            setNotification(
              "잘못된 캐릭터 코드가 뽑혔습니다: " + characterCode
            );
            setIsConfirmOpen(false);
          } else {
            const reward = {
              name: `캐릭터 ${characterCode}`,
              icon: `https://cy-stock-s3.s3.ap-northeast-2.amazonaws.com/char/${characterCode}.gif`,
              code: characterCode,
              isNew,
            };
            console.log('setGachaResult 호출:', reward);
            setGachaResult(reward);
            console.log('setGachaResult 완료:', reward);
            setIsConfirmOpen(false);
            setCart({});
            setResetKey((prev) => prev + 1);
            // 캐릭터 정보 즉시 갱신
            await fetchCustomization();
          }
        } else {
          setNotification(res.data?.error?.message || "뽑기 실패");
        }
      } catch (e) {
        setNotification("뽑기 API 호출 실패");
      }
      return;
    }

    // 기존 아이템 구매 로직
    const newInventory = { ...inventory };
    Object.values(cart).forEach(({ item, quantity }) => {
      newInventory[item.id] = (newInventory[item.id] || 0) + quantity;
    });
    setInventory(newInventory);
    setNotification("구매가 완료되었습니다.");
    setCart({});
    setResetKey((prev) => prev + 1);
    setIsConfirmOpen(false);
  };

  const handleCloseNotification = () => {
    setNotification("");
  };

  const ticketIds = ["normal_ticket", "rare_ticket", "legend_ticket"];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>상점</Title>

        <TopInfoBar>
          <InfoItem>
            현재 소지 금액<span>{cash.toLocaleString()} G</span>
          </InfoItem>
        </TopInfoBar>

        <ModalContent>
          <LeftNav>
            <Tab
              $active={activeTab === "item"}
              onClick={() => setActiveTab("item")}
            >
              아이템
            </Tab>
            <Tab
              $active={activeTab === "character"}
              onClick={() => setActiveTab("character")}
            >
              캐릭터
            </Tab>
          </LeftNav>

          <>
            <ItemList>
              {itemLists[activeTab].map((item) => {
                const isGachaItem = item.id.startsWith("random_");
                const isTicket = ticketIds.includes(item.id);
                const canAddGacha = !gachaInCart || gachaInCart === item.id;
                let disablePlus = false;
                if (isTicket) {
                  const totalTicketCount = Object.keys(cart)
                    .filter((key) => ticketIds.includes(key))
                    .reduce((acc, key) => acc + cart[key].quantity, 0);
                  if (
                    totalTicketCount > 0 &&
                    (!cart[item.id] || cart[item.id].quantity === 0)
                  ) {
                    disablePlus = true;
                  }
                  if (cart[item.id] && cart[item.id].quantity >= 1) {
                    disablePlus = true;
                  }
                }
                return (
                  <ShopItemCard
                    key={`${item.id}-${resetKey}`}
                    item={item}
                    onCartChange={handleCartChange}
                    maxQuantity={isGachaItem ? 1 : undefined}
                    disabled={isGachaItem && !canAddGacha}
                    disablePlus={disablePlus}
                  />
                );
              })}
            </ItemList>

            <ReceiptComponent
              cart={cart}
              onPurchase={initiatePurchase}
              mode="buy"
              isShop={true}
            />
          </>
        </ModalContent>
      </ModalContainer>
      {notification && (
        <NotificationModal
          message={notification}
          onClose={handleCloseNotification}
        />
      )}
      {gachaResult !== null && (
        <GachaResultModal
          rewardItem={gachaResult}
          onClose={() => setGachaResult(null)}
        />
      )}
      {isConfirmOpen && (
        <ConfirmModal
          message="정말 구매하시겠습니까?"
          onConfirm={executePurchase}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </ModalOverlay>
  );
};

export default ShopModal;
