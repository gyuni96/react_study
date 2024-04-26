import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import PagingList from "../components/PagingList";
import { getFallbackApi, saveFallbackApi } from "../api/api";
import { alertConfirm } from "../hooks/useAlert";

const Fallback = () => {
  const [fallbackList, setFallbackList] = useState([]);
  const [delectList, setDelectList] = useState([]);

  // 페이지 진입시
  useEffect(() => {
    const fetchData = async () => {
      const fallbackRespone = await getFallbackApi();

      setFallbackList(fallbackRespone);
    };
    // API call
    fetchData();
  }, []);

  //저장
  const handleSave = async () => {
    alertConfirm({
      icon: "question",
      title: "저장",
      text: "저장하시겠습니까?",
      callback: async () => {
        const param = {
          fallbackList: fallbackList,
          deleteFallbackList: delectList
        };
        const respone = await saveFallbackApi(param);

        respone && setDelectList([]);
      }
    });
  };

  return (
    <>
      <div className="item_wrap">
        <div className="item">
          <Item
            title="Fallback Phrases"
            buttonList={[{ buttonName: "저장", onClick: handleSave }]}
          >
            <PagingList
              list={fallbackList}
              setList={setFallbackList}
              setDeletList={setDelectList}
              input={true}
              inputPlaceHolder={"학습 문구를 등록해주세요"}
              postPage={15}
              paging={true}
            />
          </Item>
        </div>
      </div>
    </>
  );
};

export default Fallback;
