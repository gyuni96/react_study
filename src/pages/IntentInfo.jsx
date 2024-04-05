import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PagingList from "../components/PagingList";
import { alertConfirm, alertSuccess, alertWarning } from "../hooks/useAlert";
import Item from "../components/Item";
import {
  getIntentInfoApi,
  saveIntentInfoApi,
  getEntityApi,
  getEntitySlotPromptApi
} from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import PagingGrid from "../components/PagingGrid";
import Modal from "../components/Modal";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import Select from "react-select";

const IntentInfo = () => {
  const navigate = useNavigate();
  const { intentId } = useParams();
  const [intentName, setIntentName] = useState("");
  const [intentDesc, setIntentDesc] = useState("");
  const [trainingPhrases, setTrainingPhrase] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [modalRowData, setModalRowData] = useState([]);
  const [responesPhrases, setResponesPhrases] = useState("");

  const [deleteTrainingPhrases, setDeleteTrainingPhrases] = useState([]);
  const [deleteSlot, setDeleteSlot] = useState([]);
  const [deleteSlotPrompt, setDeleteSlotPrompt] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const selectRow = useRef({});
  const [entityEnum, setEntityEnum] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // 렌더링 확인용
  useEffect(() => console.log("render"));

  // 페이지 진입시
  useEffect(() => {
    const fetchData = async () => {
      const data = await getIntentInfoApi(intentId);

      const newData = {
        intentName: data.intentNm,
        intentDesc: data.intentDesc,
        trainingPhrase: data.intentExamples
          ? JSON.parse(data.intentExamples)
          : [],
        rowData: data.entityIds ? JSON.parse(data.entityIds) : [],
        responesPhrases: data.answerPhrase
      };

      const entityData = await getEntityApi();
      const entityEnum = entityData.map((item) => ({
        value: item.text,
        label: item.text
      }));

      setIntentName(newData.intentName);
      setIntentDesc(newData.intentDesc);
      setTrainingPhrase(newData.trainingPhrase);
      setRowData(newData.rowData);
      setResponesPhrases(newData.responesPhrases);

      setEntityEnum(entityEnum);
    };

    if (intentId !== "new") {
      fetchData();
    }
  }, []);

  // 컬럼 속성
  const [colDefs, setColDefs] = useState([
    {
      field: "entityId",
      headerName: "Entity",
      width: 200,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: []
      }
    },
    {
      field: "slotPrompt",
      headerName: "Prompt",
      flex: 1,
      cellRenderer: (props) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%"
            }}
          >
            <p>
              {props.value} {props.data.cnt && `(${props.data.cnt})`}
            </p>

            <ContextMenuTrigger id={`contextMenu`} mouseButton={0}>
              <div
                style={{
                  padding: "5px 10px",
                  cursor: "pointer"
                }}
                onClick={() => {
                  selectRow.current = {
                    entityId: props.data.entityId,
                    cnt: props.data.cnt
                  };
                }}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </ContextMenuTrigger>
          </div>
        );
      }
    },
    { field: "cnt", hide: true }
  ]);

  const [modalColDefs, setModalColDefs] = useState([
    {
      field: "slotPrompt",
      headerName: "Prompt",
      flex: 1,
      editable: true,
      cellRenderer: (props) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%"
            }}
          >
            <p>{props.value}</p>
            <div
              style={{
                padding: "5px 10px",
                cursor: "pointer"
              }}
              onClick={() => handleModalDeleteRow(props)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        );
      }
    },
    { field: "slotSeq", hide: true }
  ]);

  // 저장
  const handleSave = () => {
    alertConfirm({
      icon: "question",
      title: "저장",
      text: "저장하시겠습니까?",
      callback: async () => {
        const set = new Set(rowData.map((item) => item.entityId));
        const uniqueSlotMappingEntityId = [...set].map((item) => ({
          entityId: item
        }));

        const param = {
          intentId: intentId,
          intentNm: intentName,
          intentDesc: intentDesc,
          intentExample: trainingPhrases,
          slotMapping: uniqueSlotMappingEntityId,
          slotPrompt: rowData,
          answerPhrase: responesPhrases,
          deleteTrainingPhrases: deleteTrainingPhrases,
          deleteSlot: deleteSlot
        };

        console.log(param);
        const respone = await saveIntentInfoApi(param);
        navigate(`/intent/${respone}`);
      }
    });
  };

  // 인텐트 제목 수정
  const handleIntentNameUpdate = (e) => {
    let value = e.target.value.toLowerCase();
    setTimeout(() => {
      if (value === e.target.value.toLowerCase()) {
        setIntentName(value);
      }
    }, 400);
  };

  // 인텐트 설명 수정
  const handleIntentDescUpdate = (e) => {
    let value = e.target.value.toLowerCase();
    setTimeout(() => {
      if (value === e.target.value.toLowerCase()) {
        setIntentDesc(value);
      }
    }, 400);
  };

  // 리스트 추가
  const handleTraningAdd = (e) => {
    if (e.target !== e.currentTarget) return;
    e.stopPropagation();

    if (e.key !== "Enter" || e.target.value === "") return;

    const value = { text: e.target.value, seq: null };
    setTrainingPhrase([value, ...trainingPhrases]);

    e.target.value = "";
  };

  // 리스트 수정
  const handleTraingUpdate = (e, index) => {
    const seq = e.currentTarget.dataset.seq;
    const value = e.currentTarget.value;
    const updateTrainingPhrase = [...trainingPhrases];

    if (seq == undefined) {
      updateTrainingPhrase[index].text = value;
    } else {
      updateTrainingPhrase.filter((item) =>
        item.seq == seq ? (item.text = value) : null
      );
    }
    setTrainingPhrase(updateTrainingPhrase);
  };

  // 리스트 클릭시 추가
  const handleTraingAddClick = (e) => {
    const value = {
      text: e.currentTarget.previousElementSibling.value,
      seq: null
    };
    setTrainingPhrase([value, ...trainingPhrases]);

    e.currentTarget.previousElementSibling.value = "";
  };

  // 리스트 클릭시 삭제
  const handleTraingDeleteClick = (e, index) => {
    const seq = e.currentTarget.previousElementSibling.dataset.seq;

    if (trainingPhrases[index].seq !== null) {
      const copyTraing = [...trainingPhrases].filter(
        (item) => item.seq == seq
      )[0];
      setDeleteTrainingPhrases((prevState) => [...prevState, copyTraing]);

      setTrainingPhrase((preState) =>
        preState.filter((item) => item.seq != seq)
      );
    } else {
      setTrainingPhrase((preState) =>
        preState.filter((item, idx) => idx != index)
      );
    }
  };

  // 그리드 행추가
  const handleAddRow = () => {
    test();
    // setRowData([{ entityId: "", slotPrompt: "", slotSeq: null }, ...rowData]);
  };

  const handleDeletRow = (props) => {
    const seq = props.data.slotSeq;
    const entityId = props.data.entityId;
    if (seq === null) {
      setRowData((prevState) =>
        prevState.filter((_, idx) => idx !== props.rowIndex)
      );
    } else {
      setRowData((prevState) =>
        prevState.filter(
          (item) => !(item.slotSeq === seq && item.entityId === entityId)
        )
      );
      setDeleteSlot((prevData) => [...prevData, props.data]);
    }
  };

  // 모달 행추가
  const handleModalAddRow = (e) => {
    if (e.key === "Enter") {
      if (modalRowData.length >= 5) {
        e.preventDefault();
        alertWarning({
          title: "알림",
          text: "5개 이상 등록할 수 없습니다."
        });
        return;
      }

      const value = {
        slotPrompt: e.target.value,
        slotSeq: null,
        entityId: selectRow.current.entityId
      };
      setModalRowData([value, ...modalRowData]);
    }
  };

  // 모달 행삭제
  const handleModalDeleteRow = (props) => {
    if (props.data.slotSeq === null) {
      setModalRowData((prevState) =>
        prevState.filter((_, idx) => idx !== props.rowIndex)
      );
    } else {
      setModalRowData((prevState) =>
        prevState.filter((item) => item.slotSeq !== props.data.slotSeq)
      );
      setDeleteSlotPrompt((prevData) => [...prevData, props.data]);
    }
  };

  // textarea 수정
  const handleResponesPhrasesUpdate = (e) => {
    let value = e.target.value.toLowerCase();
    setTimeout(() => {
      if (value === e.target.value.toLowerCase()) {
        setResponesPhrases(value);
      }
    }, 400);
  };

  const test = async () => {
    const selectRowData = selectRow.current;
    console.log(selectRowData);
    if (selectRowData.cnt > 1) {
      const res = await getEntitySlotPromptApi(selectRowData);
      setModalRowData(res);
    }
    setModalOpen(true);
  };

  const test2 = () => {
    const selectRowData = selectRow.current;

    alertConfirm({
      icon: "question",
      title: "삭제",
      text: "해당 Entity Mapping을 삭제하시겠습니까?",
      callback: async () => {
        setRowData((prevState) =>
          prevState.filter((item) => item.entityId !== selectRowData.entityId)
        );
        if (selectRowData.cnt > 1) {
          const deleteData = {
            entityId: selectRowData.entityId,
            intentId: intentId
          };
          const newDeleteSlot = [...deleteSlot, deleteData];
          setDeleteSlot(newDeleteSlot);
        }
      }
    });
  };

  // 모달 셀렉트 값 변경
  const handleChange = async (item) => {
    const entityId = rowData.map((item) => item.entityId);

    const isValueExist = entityId.includes(item.value);

    if (isValueExist) {
      // 등록된 entity 체크
      alertWarning({
        title: "알림",
        text: "이미 등록된 Entity입니다."
      });
      return;
    } else {
      setSelectedOption(item);
      const res = await getEntitySlotPromptApi(item.value);
      setModalRowData(res);
    }
  };

  return (
    <div className="info_wrap">
      <ContextMenu id={`contextMenu`} className="contextMenu">
        <MenuItem className="contextItem" onClick={test2}>
          삭제
        </MenuItem>
        <MenuItem className="contextItem" onClick={test}>
          메시지 추가
        </MenuItem>
      </ContextMenu>
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
          input={true}
          inputPlaceHolder={"학습 문구를 등록해주세요"}
          postPage={5}
          paging={true}
          handleAdd={handleTraningAdd}
          handleUpdate={handleTraingUpdate}
          handleClickAdd={handleTraingAddClick}
          handleClickDelete={handleTraingDeleteClick}
        />
      </Item>

      <Item
        title="Required"
        buttonList={[{ buttonName: "행추가", onClick: handleAddRow }]}
      >
        <PagingGrid
          rowData={rowData}
          columnDefs={colDefs}
          gridHeigth={300}
          postPage={5}
        />
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

      <Modal
        isOpen={modalOpen}
        title={"Message"}
        handleClick={() => {
          console.log(deleteSlotPrompt);
        }}
        closeModal={() => {
          setModalOpen(false);
          setSelectedOption(null);
          setModalRowData([]);
          selectRow.current = {};
        }}
        modalBackground={modalBackground}
      >
        <div className="item_table_wrap">
          <table className="item_table">
            <thead>
              <tr>
                <th className="item_table_head">Entity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="item_table_td">
                  <Select
                    options={entityEnum}
                    onChange={handleChange}
                    value={selectedOption}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className="ag-theme-quartz"
          style={{ height: "260.5px", marginBottom: "10px" }}
        >
          <AgGridReact rowData={modalRowData} columnDefs={modalColDefs} />
        </div>
        <input
          className="item_input"
          type="text"
          placeholder="신규 Prompt 를 입력해주세요"
          onKeyDown={handleModalAddRow}
        />
      </Modal>
    </div>
  );
};

export default IntentInfo;
