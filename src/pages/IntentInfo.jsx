import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import Pagination from "react-js-pagination";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IntentInfo = () => {
  const intent = useSelector((state) => state.intentReducer.selectedIndent);

  const navigate = useNavigate();

  //진입시 intent값이 null이면 메인페이지로 이동
  useEffect(() => {
    intent == null ? navigate("/") : null;
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

  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="info_wrap">
      <div>
        <div> {intent} </div>
        <ul>
          <li>동행 서비스이용</li>
        </ul>
      </div>
      <Pagination
        activePage={page}
        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={450} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      />
      <div>
        <div> Traning Phrases </div>
        <ul>
          <li>
            <input type="text" placeholder="학습 문구를 등록해주세요" />
          </li>
          <li>
            <p>동행 서비스 예약해줘</p>
          </li>
          <li>
            <p>동행 서비스 등록</p>
          </li>
          <li>
            <p>오늘 동행 서비스 이용할래</p>
          </li>
        </ul>
      </div>

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onCellClicked={onCellClicked}
        />
      </div>
    </div>
  );
};

export default IntentInfo;
