import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PagingList from "../components/PagingList";
import { getEntityApi, getEntityWordApi, saveEntityIdApi, saveEntityInfoApi, deleteEntityIdApi } from "../api/api";
import Item from "../components/Item";
import { alertConfirm, alertSuccess, alertError } from "../hooks/useAlert";


const EntityInfo = () => {
  const navigate = useNavigate();
  const [entityList, setEntityList] = useState([]);

  const [entityId, setEntityId] = useState("");
  const [entityNm, setEntityNm] = useState("");
  const [entityValue, setEntityValue] = useState([]);
  const [deleteValue, setDeleteValue] = useState([]);
  const [eventScript, setEventScript] = useState("");
  ;

  useEffect(() => {
    const setData = async () => {
      // entity정보 가져오기
        const data = await getEntityApi();
        setEntityList(data);
    };
    setData();
  }, []);

  // entityId 클릭 시 Value들 가져오기
  const clickHandler = async (e) => {
    const entityId = e.currentTarget.value;
    setEntityId(e.currentTarget.value);
    setEntityNm("");
    setEntityValue([]);
    setEventScript("");
    const setData = async () => {
      const data = await getEntityWordApi(entityId);
  
        //console.log(data);
        setEntityId(data.entityId);
        setEntityNm(data.entityNm);
        setEventScript(data.eventScript);

        const valueList = JSON.parse(data.entityValue);

        setEntityValue(valueList);
        //console.log("valueList", valueList)
      };
      setData();
  };

  // entityId 추가(엔터)
  const handleIdAdd = (e) => {
    if (e.target !== e.currentTarget) return;
    e.stopPropagation();
    
    if (e.key === "Enter"){
      handleIdAddClick(e, 0);
    } return;
  }

  // entityId 추가
  const handleIdAddClick = (e, idx) => {
    const value = { text : null };
    if (idx === 0){
      value.text = e.target.value;
      setEntityList([value, ...entityList]);
      e.target.value = "";
    } else {
      value.text = e.currentTarget.previousElementSibling.value;
      setEntityList([value, ...entityList]);
      e.currentTarget.previousElementSibling.value = "";
    } 
    // entityId 저장 api 호출
    saveEntityIdApi(value)
      .then((res) => {
        if(res === "save successfully!")
          alertSuccess({
            title: "저장완료",
        });
      })
      .catch((err) => alertError(err));
  };

  // entity 삭제
  const handleIdDelete = (e, idx) => {
    const entityId = e.currentTarget.previousElementSibling.value
    const seq = idx;
    
    alertConfirm({
      icon: "question",
      titile: "삭제",
      text: '삭제하시겠습니까?',
      callback: () => {
        setEntityList((prevState) =>
          prevState.filter(item => item.seq != seq)
        );
        // entityId 삭제 api 호출
        deleteEntityIdApi(entityId)
        .then((res) => {
          if(res === "deleted successfully")
            alertSuccess({
              title: "삭제완료",
          });
        })
        .catch((err) => alertError(err));
        navigate(0);
      }
    }); 
  }

// ************************** entityId end **************************

// ************************ entityValue start ************************

  // entityName 수정
  const handleNameUpdate = (e) => {
    const value = e.currentTarget.value;
    setEntityNm(value);
  };

  // Value추가(엔터)
  const handleValueAdd = (e) => {
    if (e.target !== e.currentTarget) return;
    e.stopPropagation();

    if (e.key === "Enter"){
      const value = { text : e.target.value, seq: null };
      setEntityValue([value, ...entityValue]);
      e.target.value = "";
    }
  }

  // Value추가(버튼)
  const handleValueAddClick = (e, idx) => {
    const value = { text: e.currentTarget.previousElementSibling.value };
    setEntityValue([value, ...entityValue]);
    e.currentTarget.previousElementSibling.value = "";
  };

  // Value수정
  const handleValueUpdate = (e, idx) => {
    const UpdateValue = [...entityValue];
    UpdateValue[idx].text = e.currentTarget.value;
    setEntityValue(UpdateValue);
  }

  // Value삭제
  const handleValueDelete = (e, index) => {
    const seq = e.currentTarget.previousElementSibling.dataset.seq;

    if(entityValue[index].seq !== null){
      const delValue = [...entityValue].filter((item) => item.seq == seq);
      setDeleteValue(prevState => [...prevState, ...delValue]);

      setEntityValue((prevState) =>
        prevState.filter(item => item.seq != seq)
      );
    } else {
      setEntityValue((prevState) =>
      prevState.filter((item, idx) => idx != index)
    );
    }
  };

  // eventScript 수정
  const handleEventUpdate = (e, idx) => {
    const value = e.currentTarget.value;
    setEventScript(value);
  };

  // 저장
  const handleSaveAll = () => {
    
    if(entityId === ""){ 
      alertError(("ID입력필수"));
    } else {
    alertConfirm({
      icon: "question",
      titile: "저장",
      text: '저장하시겠습니까?',
      callback: () => {
        const param = {
          entityId : entityId,
          entityInfo : {entityNm : entityNm, eventScript : eventScript},
          entityValue : entityValue,
          deleteValue : deleteValue
        }
        console.log("param : ",  param);
        saveEntityInfoApi(param)
          .then((res) => {
            if(res === "save successfully!")
              alertSuccess({
                title: "성공",
                text: "정상적으로 처리되었습니다"
              });
              setEntityValue(entityValue);
              test(entityId);
          })
          .catch((err) => alertError(err));
          alert(entityId);
          navigate(0);
      }
    });
  }
  };

  return (
    <>
      <div className="info_wrap flex">
        {/* entityId */}
        <ListWrap>
          <Item title={`ID : ${entityId}`}>
            <PagingList
              list={entityList}
              listCnt={entityList.length}
              postPage={10}
              input={true}
              placeholder="ID 입력칸"
              defaultValue=""
              handleClick={clickHandler}
              handleAdd={handleIdAdd}
              handleClickAdd={handleIdAddClick}
              handleClickDelete={handleIdDelete}
            />
          </Item>
        </ListWrap>

        {/* entityValue */}
        <ContentWrap>
          <Item title="Name" buttonList={[{ buttonName: "저장", onClick: handleSaveAll}]}>
            <input
              className="item_input"
              type="text"
              defaultValue={entityNm}
              placeholder="entity Name 입력칸"
              onChange={handleNameUpdate}
            />
          </Item>

          <Item title="Value">
            <PagingList
              list={entityValue}
              listCnt={entityValue.length}
              postPage={5}
              input={true}
              placeholder="value 입력칸"
              paging={true}
              handleAdd={handleValueAdd}
              handleUpdate={handleValueUpdate}
              handleClickAdd={handleValueAddClick}
              handleClickDelete={handleValueDelete}
            />
          </Item>

          <Item title="Event">
            <textarea
              className="item_textarea"
              cols="30"
              rows="10"
              placeholder="event 입력칸"
              defaultValue={eventScript}
              onChange = {handleEventUpdate}
            />
          </Item>
        </ContentWrap>
      </div>
    </>
  );
};

export default EntityInfo;

const ListWrap = styled.div`
  width: 300px;
  padding-right: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const ContentWrap = styled.div`
  padding-left: 30px;
  width: calc(100% - 300px);
`;
