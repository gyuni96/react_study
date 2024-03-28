import React, { useState } from "react";
import styled from "styled-components";
import PagingList from "../components/PagingList";

const EntityInfo = () => {
  const [entityList, setEntityList] = useState([
    { text: "aaaaaaaaaaaaaaa", seq: 1 },
    { text: "bbbbbbbbbbbbb", seq: 2 },
    { text: "ccccccccccccccc", seq: 3 },
    { text: "ddddddddddddd", seq: 4 },
    { text: "eeeeeeeeeeeeeeeeee", seq: 5 },
    { text: "ffffffffffffffffffff", seq: 6 }
  ]);

  return (
    <>
      <div className="info_wrap flex">
        <ListWrap>
          <PagingList
            list={entityList}
            listCnt={entityList.length}
            postPage={10}
          />
        </ListWrap>
        <ContentWrap>컨텐츠 영역</ContentWrap>
      </div>
    </>
  );
};

export default EntityInfo;

const ListWrap = styled.div`
  width: 300px;
  background-color: yellow;
  padding-right: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.4);
`;

const ContentWrap = styled.div`
  padding-left: 10px;
  width: calc(100% - 300px);
  background-color: aqua;
`;
