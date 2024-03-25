import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { selectIndent, getIntentList } from "../reducers/action";
import { useNavigate } from "react-router-dom";
import { deletedIntend } from "../api/api";

const IntentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {}, []);
  // useSelector((state) => console.log(state));

  const intents = useSelector((state) => state.intentReducer.indentList);
  // console.log(intents);

  const clickHandler = async (e) => {
    const intentId = e.currentTarget.dataset.itemid;
    dispatch(selectIndent(intentId));

    const link = `/intent/${intentId}`;
    navigate(link);
  };

  const deletHandler = (e) => {
    const intentId = e.currentTarget.previousElementSibling.dataset.itemid;
    deletedIntend(intentId);

    dispatch(getIntentList());
  };

  return (
    <>
      <div className="card_grid">
        {intents.map((item, idx) => {
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
