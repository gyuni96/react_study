import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { deletedIntendApi, getIntentsApi } from "../api/api";
import { alertConfirm, alertSuccess, alertError } from "../hooks/useAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const IntentList = () => {
  const [intentList, setIntentList] = useState([]);
  const navigate = useNavigate();

  // 페이지 진입시
  useEffect(() => {
    const setData = async () => {
      const data = await getIntentsApi();
      setIntentList(data);
    };
    setData();
  }, []);

  const clickHandler = async (e) => {
    const intentId = e.currentTarget.dataset.itemid;
    navigate(`/intent/${intentId}`);
  };

  const deletHandler = (e) => {
    const intentId = e.currentTarget.previousElementSibling.dataset.itemid;

    alertConfirm({
      icon: "question",
      title: "삭제",
      text: "삭제하시겠습니까?",
      callback: () => {
        //state 변경
        setIntentList((prevIntentList) =>
          prevIntentList.filter((intent) => intent.intentId !== intentId)
        );
        //삭제 API call
        deletedIntendApi(intentId)
          .then((res) => {
            if (res === "deleted successfully") {
              alertSuccess({
                title: "삭제",
                text: "정상적으로 삭제되었습니다"
              });
            }
          })
          .catch((err) => alertError(err));
      }
    });
  };

  return (
    <>
      <div className="card_grid">
        <AddCard onClick={clickHandler} data-itemid="new">
          <FontAwesomeIcon icon={faFolderPlus} size="4x" />
        </AddCard>
        <Card
          name={"fallback"}
          id={"fallback"}
          desc={"fallback 메시지"}
          clickHandler={(e) => {
            const intentId = e.currentTarget.dataset.itemid;
            navigate(`/${intentId}`);
          }}
        />
        {intentList.map((item, idx) => {
          return (
            <Card
              name={item.intentNm}
              desc={item.intentDesc}
              id={item.intentId}
              key={idx}
              clickHandler={clickHandler}
              deletHandler={deletHandler}
            />
          );
        })}
      </div>
    </>
  );
};

export default IntentList;

const AddCard = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.themeColor};
  color: ${(props) => props.theme.hoverColor};
  /* background-color: #e1e1e1; */
  /* color: #747474; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 170px;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: 0.3s ease;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.15),
    0 10px 10px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: #fff;
  }
`;
