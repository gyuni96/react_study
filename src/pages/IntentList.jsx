import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { deletedIntendCall, getIntentsCall } from "../api/api";
import { alertConfirm, alertSuccess, alertError } from "../utils/alert";
const IntentList = () => {
  const [intentList, setIntentList] = useState([]);
  const navigate = useNavigate();

  // 페이지 진입시
  useEffect(() => {
    const setData = async () => {
      const data = await getIntentsCall();
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
        deletedIntendCall(intentId)
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
        {intentList.map((item, idx) => {
          return (
            <Card
              name={item.intentNm}
              desc={item.desc}
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
