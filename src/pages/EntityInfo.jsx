import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PagingList from "../components/PagingList";
import {
  getEntityApi,
  getEntityWordApi,
  saveEntityIdApi,
  saveEntityInfoApi,
  deleteEntityIdApi
} from "../api/api";
import Item from "../components/Item";
import {
  alertConfirm,
  alertSuccess,
  alertWarning,
  alertError
} from "../hooks/useAlert";

const EntityInfo = () => {
  const navigate = useNavigate();
  const [entityList, setEntityList] = useState([]);
  const [entityLength, setEntityLength] = useState(0);
  const [entityId, setEntityId] = useState("");
  const [entityNm, setEntityNm] = useState("");
  const [deleteValue, setDeleteValue] = useState([]);
  const [entityValue, setEntityValue] = useState([]);
  const [eventScript, setEventScript] = useState("");
  const compCd = JSON.parse(localStorage.getItem("user"))?.compCd;
  const IdList = document.querySelectorAll(
    ".paging_list_wrap .paging_list_input"
  );

  useEffect(() => {
    const setData = async () => {
      // entity정보 가져오기
      const data = await getEntityApi();
      setEntityList(data);
      setEntityLength(data.length);
    };
    setData();
  }, []);

  // entityId 클릭 시 Value들 가져오기
  const clickHandler = (e) => {
    const entityId = e.currentTarget.value;
    IdList.forEach((ID) => {
      const clicked = ID.parentElement;
      if (ID.value == entityId) {
        clicked.classList.add("active");
      } else {
        clicked.classList.remove("active");
      }
    });

    const setData = async () => {
      const data = await getEntityWordApi(entityId);
      setEntityId(data.entityId);
      setEntityNm(data.entityNm);
      setEventScript(data.eventScript ? data.eventScript : "");
      const valueList = data.entityValue ? JSON.parse(data.entityValue) : [];
      setEntityValue(valueList);
      //console.log("valueList", valueList)
    };

    if (entityId) {
      setData();
    } else {
      setEntityId("");
      setEntityNm("");
      setEntityValue([]);
      setEventScript("");
    }
  };

  // entityList 변경 감지
  useEffect(() => {
    // 변경된 entityList길이
    const length = entityList.length;

    // 렌더링 제외
    if (entityLength == 0 || length == 0 || entityLength == length) {
      return;
    }

    // 추가된 entityId 저장
    if (length > entityLength) {
      const ids = entityList.filter((item) => item.seq === null);
      const newId = { entityId: ids[0].text };

      saveEntityIdApi(newId)
        .then((res) => {
          if (res.status == "OK")
            alertSuccess({
              title: "저장",
              text: res.message,
              callback: () => {
                setEntityLength(length);
                navigate(0);
              }
            });
        })
        .catch((err) => alertError(err));
    }
  }, [entityList]);

  // entity 삭제
  const handleEntityDelete = (e, idx) => {
    const entityId = e.currentTarget.previousElementSibling.value;
    const seq = idx;

    alertConfirm({
      icon: "question",
      titile: "삭제",
      text: "삭제하시겠습니까?",
      callback: () => {
        setEntityList((prevState) =>
          prevState.filter((item) => item.seq != seq)
        );
        // entityId 삭제 api 호출
        deleteEntityIdApi(entityId)
          .then((res) => {
            if (res.status === "OK")
              alertSuccess({
                title: "삭제",
                text: res.message,
                callback: () => {
                  navigate(0);
                }
              });
          })
          .catch((err) => alertError(err));
      }
    });
  };

  // ************************** entityId end **************************

  // entityName 수정
  const handleNameUpdate = (e) => {
    const value = e.currentTarget.value;
    setEntityNm(value);
  };

  // eventScript 수정
  const handleEventUpdate = (e, idx) => {
    const value = e.currentTarget.value;
    setEventScript(value);
  };

  // compCd 넣어주기
  const insertCompCd = (values) => {
    if (values.length != 0) {
      values.forEach((value) => {
        value.compCd = compCd;
      });
      return values;
    }
  };

  // 저장
  const handleSaveAll = () => {
    if (entityId === "") {
      alertWarning({
        title: "Entity 확인불가",
        text: "Entity를 선택해주세요"
      });
    } else {
      alertConfirm({
        icon: "question",
        titile: "저장",
        text: "저장하시겠습니까?",
        callback: () => {
          console.log(entityValue.length);
          const param = {
            entityId: entityId,
            entityInfo: {
              entityNm: entityNm,
              eventScript: eventScript,
              compCd: compCd
            },
            entityValue: insertCompCd(entityValue),
            deleteValue: insertCompCd(deleteValue)
          };
          //console.log("param : ", param);
          saveEntityInfoApi(param)
            .then((res) => {
              if (res.status === "OK")
                alertSuccess({
                  title: "저장",
                  text: res.message,
                  callback: () => {
                    setEntityValue(entityValue);
                    navigate(0);
                  }
                });
            })
            .catch((err) => alertError(err));
          navigate(0);
        }
      });
    }
  };

  return (
    <>
      <div className="info_wrap flex">
        {/* entityId */}
        <EntityWrap>
          <div className="item_wrap">
            <Item title={`${entityId}`}>
              <PagingList
                list={entityList}
                setList={setEntityList}
                postPage={10}
                input={true}
                inputPlaceHolder="entity id 입력"
                handleClick={clickHandler}
                handleEntityDelete={handleEntityDelete}
              />
            </Item>
          </div>
        </EntityWrap>

        {/* entityValue */}
        <ContentWrap>
          <div className="item_wrap">
            <Item
              title="Name"
              buttonList={[{ buttonName: "저장", onClick: handleSaveAll }]}
            >
              <input
                className="item_input"
                type="text"
                defaultValue={entityNm}
                onChange={handleNameUpdate}
              />
            </Item>

            <Item title="Value">
              <PagingList
                list={entityValue}
                setList={setEntityValue}
                setDeletList={setDeleteValue}
                postPage={5}
                input={true}
                inputPlaceHolder="entity value 입력"
                paging={true}
              />
            </Item>

            <Item title="Event">
              <textarea
                className="item_textarea"
                cols="30"
                rows="10"
                defaultValue={eventScript}
                onChange={handleEventUpdate}
              />
            </Item>
          </div>
        </ContentWrap>
      </div>
    </>
  );
};

export default EntityInfo;

const EntityWrap = styled.div`
  width: 320px;

  & ul li.active {
    border: 4px solid gray;
    border-radius: 2px;
  }

  & ul li:first-child ~ li input {
    cursor: pointer;
    caret-color: transparent;
  }
`;

const ContentWrap = styled.div`
  padding-left: 30px;
  width: calc(100% - 320px);
`;
