import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PagingList from "../components/PagingList";
import { getEntityApi, getEntityWordApi } from "../api/api";
import Item from "../components/Item";
import Button from "../components/Button";

const EntityInfo = () => {
  const [entityList, setEntityList] = useState([]);

  const [entityId, setEntityId] = useState("");
  const [entityNm, setEntityNm] = useState("");
  const [entityValue, setEntityValue] = useState([]);
  const [eventScript, setEventScript] = useState("");

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
    const entityId = e.currentTarget.innerText;
    setEntityNm("");
    setEntityValue([]);
    setEventScript("");

    const setData = async () => {
      const data = await getEntityWordApi(entityId);

      console.log(data);
      setEntityId(data.entityId);
      setEntityNm(data.entityNm);
      setEventScript(data.eventScript);

      const valueList = JSON.parse(data.entityValue);
      console.log(valueList);
      setEntityValue(valueList);
    };
    setData();
  };

  const ValueHandleUpdate = (e) => {
    const value = { text: e.target.value };
    setEntityValue([value, ...entityValue]);
    e.target.value = "";
  };

  const IdHandleUpdate = (e) => {
    const value = { text: e.target.value };
    setEntityList([value, ...entityList]);
    e.target.value = "";
  };

  return (
    <>
      <div className="info_wrap flex">
        <ListWrap>
          <Item title="ID">
            <PagingList
              list={entityList}
              listCnt={entityList.length}
              postPage={10}
              input={true}
              placeholder="ID 입력칸"
              handleClick={clickHandler}
              handleUpdate={IdHandleUpdate}
            />
          </Item>
        </ListWrap>

        <ContentWrap>
          <Item title="Name" buttonList={[{ buttonName: "저장" }]}>
            <input
              className="item_input"
              type="text"
              defaultValue={entityNm}
              placeholder="entity Name 입력칸"
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
              handleUpdate={ValueHandleUpdate}
            />
          </Item>

          <Item title="Event">
            <textarea
              className="item_textarea"
              cols="30"
              rows="10"
              placeholder="event 입력칸"
              defaultValue={eventScript}
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
