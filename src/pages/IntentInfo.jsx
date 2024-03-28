import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useParams } from "react-router-dom";
import PagingList from "../components/PagingList";
import { alertConfirm } from "../utils/alert";
import Item from "../components/Item";
import { getIntentInfoApi, saveIntentInfoApi } from "../api/api";

const IntentInfo = () => {
  const { intentId } = useParams();

  const [intentName, setIntentName] = useState("");
  const [intentDesc, setIntentDesc] = useState("");
  const [trainingPhrases, setTrainingPhrase] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [responesPhrases, setResponesPhrases] = useState("");

  // 페이지 진입시
  useEffect(() => {
    const setData = async () => {
      const data = await getIntentInfoApi(intentId);

      setIntentName(data.intentNm);
      setIntentDesc(data.intentDesc);

      if (data.intentExamples !== undefined) {
        const intentExamples = JSON.parse(data.intentExamples);
        setTrainingPhrase(intentExamples);
      }

      if (data.entityIds !== undefined) {
        const entityIds = JSON.parse(data.entityIds);
        setRowData(entityIds);

        // entity enum
        const uniqueEntities = entityIds.reduce((acc, cur) => {
          if (!acc.includes(cur.entityId)) {
            acc.push(cur.entityId);
          }
          return acc;
        }, []);

        setColDefs((prevState) => {
          const newState = [...prevState];
          newState[0].cellEditorParams.values = uniqueEntities;
          return newState;
        });
      }

      setResponesPhrases(data.answerPhrase);
    };

    intentId !== "new" ? setData() : null;
  }, []);

  // intentName 변경시 디바운싱
  useEffect(() => {
    const debounce = setTimeout(() => {
      return setIntentName(intentName);
    }, 300);
    return () => clearTimeout(debounce);
  }, [intentName]);

  // intentDesc 변경시 디바운싱
  useEffect(() => {
    const debounce = setTimeout(() => {
      return setIntentDesc(intentDesc);
    }, 300);
    return () => clearTimeout(debounce);
  }, [intentDesc]);

  // Response Phrases 변경시 디바운싱
  useEffect(() => {
    const debounce = setTimeout(() => {
      return setResponesPhrases(responesPhrases);
    }, 300);
    return () => clearTimeout(debounce);
  }, [responesPhrases]);

  const [colDefs, setColDefs] = useState([
    {
      field: "entityId",
      headerName: "Entity",
      width: 200,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: []
      }
    },
    { field: "slotPrompt", headerName: "Prompt", flex: 1 }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      editable: true
    };
  }, []);

  const handleSave = () => {
    alertConfirm({
      icon: "question",
      title: "저장",
      text: "저장하시겠습니까?",
      callback: () => {
        const param = {
          intentId: intentId,
          intentNm: intentName,
          intentDesc: intentDesc,
          intentExample: trainingPhrases,
          answerPhrase: responesPhrases
        };
        saveIntentInfoApi(param);
      }
    });
  };

  const handleIntentNameUpdate = (e) => {
    setIntentName(e.target.value);
  };
  const handleIntentDescUpdate = (e) => {
    setIntentDesc(e.target.value);
  };
  const handleTraningUpdate = (e) => {
    const value = { text: e.target.value, seq: trainingPhrases.length + 1 };
    setTrainingPhrase([value, ...trainingPhrases]);
    e.target.value = "";
  };
  const handleTraningClick = (e) => {
    if (e.target.tagName !== "LI" && e.target.tagName !== "P") {
      const seq = e.currentTarget.dataset.seq;

      setTrainingPhrase((prevState) =>
        prevState.filter((item) => item.seq != seq)
      );
    }
  };
  const handleAddRow = () => {
    setRowData([{ entityId: "", slotPrompt: "" }, ...rowData]);
  };
  const handleResponesPhrasesUpdate = (e) => {
    setResponesPhrases(e.target.value);
  };

  return (
    <div className="info_wrap">
      <Item
        title="Intent Name"
        buttonList={[{ buttonName: "저장", onClick: handleSave }]}
      >
        <input
          className="item_input"
          type="text"
          placeholder="인텐트명을 입력해주세요"
          defaultValue={intentName}
          onChange={handleIntentNameUpdate}
        />
      </Item>

      <Item title="Intent Description">
        <input
          className="item_input"
          type="text"
          placeholder="인텐트 설명을 입력해주세요"
          defaultValue={intentDesc}
          onChange={handleIntentDescUpdate}
        />
      </Item>

      <Item title="Traning Phrases">
        <PagingList
          list={trainingPhrases}
          listCnt={trainingPhrases.length}
          postPage={5}
          input={true}
          inputPlaceHolder={"학습 문구를 등록해주세요"}
          paging={true}
          handleUpdate={handleTraningUpdate}
          handleClick={handleTraningClick}
        />
      </Item>

      <Item
        title="Required"
        buttonList={[{ buttonName: "행추가", onClick: handleAddRow }]}
      >
        <div className="ag-theme-quartz" style={{ height: 310 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            pagination={true} // 페이징 여부
            paginationPageSize={5} // 페이징 로우갯수
            paginationPageSizeSelector={[5, 10, 20]} // 페이진 구분
          />
        </div>
      </Item>

      <Item title="Response Phrases">
        <textarea
          className="item_textarea"
          cols="30"
          rows="10"
          defaultValue={responesPhrases}
          onChange={handleResponesPhrasesUpdate}
        ></textarea>
      </Item>
    </div>
  );
};

export default IntentInfo;
