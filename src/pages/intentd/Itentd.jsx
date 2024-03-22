import React from "react";
import styled from "styled-components";
import Content from "../../components/Content";

const Intentd = () => {
  const dumyData = [
    {
      name: "서비스이용하기",
      id: 1,
      desc: "서비스 이용하기 위한 인텐트입니다."
    },
    {
      name: "서비스 소개하기",
      id: 2,
      desc: "서비스 안내를 위한 인텐트입니다."
    },
    {
      name: "서비스 소개하기",
      id: 2,
      desc: "서비스 안내를 위한 인텐트입니다."
    },
    {
      name: "서비스 소개하기",
      id: 2,
      desc: "서비스 안내를 위한 인텐트입니다."
    },
    {
      name: "서비스 소개하기",
      id: 2,
      desc: "서비스 안내를 위한 인텐트입니다."
    },
    {
      name: "서비스 소개하기",
      id: 2,
      desc: "서비스 안내를 위한 인텐트입니다."
    }
  ];

  const clickHandler = (id) => {
    console.log(id);
  };

  return (
    <>
      <IntentdGrid>
        {dumyData.map((item, idx) => {
          return (
            <Content name={item.name} desc={item.desc} id={item.id} key={idx} />
          );
        })}
      </IntentdGrid>
    </>
  );
};

const IntentdGrid = styled.div`
  padding: 20px 10px;
  background-color: #eff2f8;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  max-width: 1500px;
`;

export default Intentd;
