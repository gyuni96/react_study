import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { deletedIntendCall, getIntentsCall } from "../api/api";
import { alertConfirm, alertSuccess, alertError } from "../utils/alert";
const EntityList = () => {
  const [entityList, setEntityList] = useState([]);
  const navigate = useNavigate();

  // 페이지 진입시
  useEffect(() => {
    const setData = async () => {
      // const data = await getIntentsCall();
      // setEntityList(data);
      console.log("데이터 로드");
    };
    setData();
  }, []);

  // 클릭 이벤트
  const clickHandler = async (e) => {
    const entityId = e.currentTarget.dataset.itemid;
    navigate(`/entity/${entityId}`);
  };
  // 삭제 이벤트
  const deletHandler = (e) => {
    const entityId = e.currentTarget.previousElementSibling.dataset.itemid;

    alertConfirm({
      icon: "question",
      title: "삭제",
      text: "삭제하시겠습니까?",
      callback: () => {
        //state 변경
        setEntityList((prevEntityList) =>
          prevEntityList.filter((entity) => entity.entityId !== entityId)
        );
        //삭제 API call
        // deletedIntendCall(entityId)
        //   .then((res) => {
        //     if (res.data === "deleted successfully") {
        //       alertSuccess({
        //         title: "삭제",
        //         text: "정상적으로 삭제되었습니다"
        //       });
        //     }
        //   })
        //   .catch((err) => alertError(err));
      }
    });
  };

  return (
    <>
      <div className="card_grid">
        {entityList.map((item, idx) => {
          return (
            <Card
              name={item.entityNm}
              desc={item.desc}
              id={item.entityId}
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

export default EntityList;
