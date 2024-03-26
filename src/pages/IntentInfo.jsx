import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useNavigate, useParams } from "react-router-dom";
import PagingList from "../components/PagingList";
import Button from "../components/Button";
import { alertConfirm } from "../utils/alert";

const IntentInfo = () => {
  //const intent = useSelector((state) => state.intentReducer.selectedIndent);

  const navigate = useNavigate();

  const { intentId } = useParams();

  const [예시문구, set예시문구] = useState([]);

  //진입시 intent값이 null이면 메인페이지로 이동
  useEffect(() => {
    intentId == null ? navigate("/") : null;
  }, []);

  const [rowData, setRowData] = useState([
    { Parameter: "Tesla", Entity: "gg", Value: 64950, Prompt: true },
    { Parameter: "Ford", Entity: "gg", Value: 33850, Prompt: false }
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "Parameter" },
    {
      field: "Entity",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["English", "Spanish", "French", "Portuguese", "(other)"]
        // valueListGap: 10
      }
    },
    { field: "Value" },
    { field: "Prompt" }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      width: 200,
      editable: true
    };
  }, []);

  const onCellClicked = (e) => {
    console.log(e);

    const value = e.value;

    // api 통신으로 해당 required 조회
  };

  const [trainingPhrases, setTrainingPhrase] = useState([
    { text: "1aaaaa" },
    { text: "2aaaaa" },
    { text: "3aaaaa" },
    { text: "4aaaaa" },
    { text: "5aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" },
    { text: "aaaaa" }
  ]);

  const traningHandleUpdate = (e) => {
    if (e.target !== e.currentTarget) return;
    e.stopPropagation();

    if (e.key !== "Enter") return;

    const value = { text: e.target.value };

    setTrainingPhrase([value, ...trainingPhrases]);
    e.target.value = "";
  };

  const [responesPhrases, setResponesPhrases] = useState([
    { text: "1aaaaa" },
    { text: "2aaaaa" },
    { text: "3aaaaa" },
    { text: "4aaaaa" },
    { text: "5aaaaa" }
  ]);

  const responesHandleUpdate = (e) => {
    if (e.target !== e.currentTarget) return;
    e.stopPropagation();

    if (e.key !== "Enter") return;

    const value = { text: e.target.value };

    setResponesPhrases([value, ...responesPhrases]);
    e.target.value = "";
  };

  const handleSave = () => {
    alertConfirm({
      icon: "question",
      title: "저장",
      text: "저장하시겠습니까?"
    });
  };

  return (
    <div className="info_wrap">
      <div className="info_button_Wrap">
        <Button onClick={handleSave}>저장</Button>
      </div>
      <div className="item_wrap">
        <h4 className="item_title">Intent Name</h4>
        <input
          className="item_input"
          type="text"
          placeholder="인텐트명을 입력해주세요"
        />
      </div>
      <div className="item_wrap">
        <h4 className="item_title">Intent Description</h4>
        <input
          className="item_input"
          type="text"
          placeholder="인텐트 설명을 입력해주세요"
        />
      </div>

      <div className="item_wrap">
        <h4 className="item_title">Traning Phrases</h4>
        <PagingList
          list={trainingPhrases}
          input={true}
          handleUpdate={traningHandleUpdate}
          inputPlaceHolder={"학습 문구를 등록해주세요"}
        />
      </div>
      <div className="item_wrap">
        <div className="ag-theme-quartz" style={{ height: 300 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onCellClicked={onCellClicked}
          />
        </div>
      </div>
      <div className="item_wrap">
        <h4 className="item_title">Response Phrases</h4>
        <PagingList
          list={responesPhrases}
          input={true}
          handleUpdate={responesHandleUpdate}
          inputPlaceHolder={"전송 문구를 입력해주세요"}
        />
      </div>
    </div>
  );
};

export default IntentInfo;
