import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useNavigate, useParams } from "react-router-dom";
import PagingList from "../components/PagingList";
import Button from "../components/Button";
import { alertConfirm } from "../utils/alert";
import Item from "../components/Item";
import { getIntentInfoApi } from "../api/api";

const IntentInfo = () => {
  //const intent = useSelector((state) => state.intentReducer.selectedIndent);

  const navigate = useNavigate();

  const { intentId } = useParams();

  const [intentName, setIntentName] = useState("");
  const [intentDesc, setIntentDesc] = useState("");
  const [trainingPhrases, setTrainingPhrase] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [entityEnum, setEntityEnum] = useState([]);
  const [responesPhrases, setResponesPhrases] = useState("");

  //진입시 intent값이 null이면 메인페이지로 이동
  useEffect(() => {
    intentId == null ? navigate("/") : null;

    const setData = async () => {
      const data = await getIntentInfoApi(intentId);

      console.log(data);

      setIntentName(data.intentNm);
      setIntentDesc(data.intentDesc);

      const intentExamples = JSON.parse(data.intentExamples);
      setTrainingPhrase(intentExamples);

      const entityIds = JSON.parse(data.entityIds);
      setRowData(entityIds);

      // entity enum
      const uniqueEntities = entityIds.reduce((acc, cur) => {
        if (!acc.includes(cur.entityId)) {
          acc.push(cur.entityId);
        }
        return acc;
      }, []);
      setEntityEnum(uniqueEntities);

      setResponesPhrases(data.answerPhrase);
    };
    setData();
  }, []);

  const [colDefs, setColDefs] = useState([
    {
      field: "entityId",
      headerName: "Entity",
      width: 200,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Name", "Service"]
      }
    },
    { field: "slotPrompt", headerName: "Prompt", flex: 1 }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      editable: true
    };
  }, []);

  const traningHandleUpdate = (e) => {
    const value = { text: e.target.value };
    setTrainingPhrase([value, ...trainingPhrases]);
    e.target.value = "";
  };

  const handleSave = () => {
    alertConfirm({
      icon: "question",
      title: "저장",
      text: "저장하시겠습니까?"
    });
  };

  const handleAddRow = () => {
    setRowData([{ entityId: "", slotPrompt: "" }, ...rowData]);
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
        />
      </Item>

      <Item title="Intent Description">
        <input
          className="item_input"
          type="text"
          placeholder="인텐트 설명을 입력해주세요"
          defaultValue={intentDesc}
        />
      </Item>

      <Item title="Traning Phrases">
        <PagingList
          list={trainingPhrases}
          listCnt={trainingPhrases.length}
          input={true}
          handleUpdate={traningHandleUpdate}
          inputPlaceHolder={"학습 문구를 등록해주세요"}
        />
      </Item>

      <Item
        title="Required"
        buttonList={[{ buttonName: "행추가", onClick: handleAddRow }]}
      >
        {/* <div className="info_button_Wrap">
          <Button onClick={handleAddRow}>행추가</Button>
        </div> */}
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
          className="text_area"
          cols="30"
          rows="10"
          defaultValue={responesPhrases}
        ></textarea>
      </Item>
    </div>
  );
};

export default IntentInfo;
