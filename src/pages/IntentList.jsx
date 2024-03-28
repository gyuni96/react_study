import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { deletedIntendApi, getIntentsApi } from "../api/api";
import { alertConfirm, alertSuccess, alertError } from "../utils/alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

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
            if (res.data === "deleted successfully") {
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
        <div className="card_add" onClick={clickHandler} data-itemid="new">
          <FontAwesomeIcon icon={faFolderPlus} size="5x" />
        </div>
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
