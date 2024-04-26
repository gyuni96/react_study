import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PagingList from "../components/PagingList";
import { alertConfirm, alertSuccess, alertWarning } from "../hooks/useAlert";
import Item from "../components/Item";
import {
  getIntentInfoApi,
  saveIntentInfoApi,
  getEntityApi,
  getEntitySlotPromptApi,
  savePropmptApi
} from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import PagingGrid from "../components/PagingGrid";
import Modal from "../components/Modal";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import _ from "lodash";
// import {
//   ContextMenu,
//   MenuItem,
//   ContextMenuTrigger,
//   hideMenu
// } from "react-contextmenu";

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
  const modalBackground = useRef("");
  const selectRow = useRef({});
  const [entityEnum, setEntityEnum] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // 렌더링 확인용
  // useEffect(() => console.log("render"));

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      if (menuVisible) {
        setMenuVisible(false); // 스크롤 시 메뉴 숨기기
        hideMenu();
      }
      console.log("실행");
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuVisible]); // menuVisible 상태에 따라 effect 재실행

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // 페이지 진입시
  useEffect(() => {
    const fetchData = async () => {
      const data = await getIntentInfoApi(intentId);

      const newData = {
        intentName: data.intentNm ?? "",
        intentDesc: data.intentDesc ?? "",
        trainingPhrase: data.intentExamples
          ? JSON.parse(data.intentExamples)
          : [],
        rowData: data.entityIds ? JSON.parse(data.entityIds) : [],
        responesPhrases: data.answerPhrase ?? ""
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
  }, [intentId]);

  // 컬럼 속성
  const [colDefs, setColDefs] = useState([
    {
      field: "entityId",
      headerName: "Entity",
      width: 200,
      editable: false
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

            {/* <ContextMenuTrigger id={`contextMenu`} mouseButton={0}>
              <div
                style={{
                  padding: "5px 10px",
                  cursor: "pointer"
                }}
                onClick={() => {
                  selectRow.current = {
                    entityId: props.data.entityId,
                    cnt: props.data.cnt,
                    slotSeq: props.data.slotSeq
                  };
                }}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </ContextMenuTrigger> */}
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
        const param = {
          intentId: intentId,
          intentNm: intentName,
          intentDesc: intentDesc,
          intentExample: trainingPhrases,
          answerPhrase: responesPhrases,
          deleteTrainingPhrases: deleteTrainingPhrases,
          deleteSlot: deleteSlot
        };

        const respone = await saveIntentInfoApi(param);

        setDeleteSlot([]);
        setDeleteTrainingPhrases([]);
        setSelectedOption(null);
        navigate(`/intent/${respone}`);
      }
    });
  };

  // 인텐트 제목 수정
  const handleIntentNameUpdate = (e) => {
    e.persist(); // 이벤트 객체 해제 방지
    let value = e.target.value.toLowerCase();
    setTimeout(() => {
      if (value === e.target.value.toLowerCase()) {
        setIntentName(value);
      }
    }, 400);
  };

  // 인텐트 설명 수정
  const handleIntentDescUpdate = (e) => {
    e.persist();
    let value = e.target.value.toLowerCase();
    setTimeout(() => {
      if (value === e.target.value.toLowerCase()) {
        setIntentDesc(value);
      }
    }, 400);
  };

  // 그리드 행추가
  const handleAddRow = () => {
    handleMsgAdd();
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

      e.target.value = "";
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
    e.persist();
    let value = e.target.value.toLowerCase();
    setTimeout(() => {
      if (value === e.target.value.toLowerCase()) {
        setResponesPhrases(value);
      }
    }, 400);
  };

  // contextMenu 메시지 추가
  const handleMsgAdd = async () => {
    const selectRowData = selectRow.current;
    if (selectRowData.cnt > 0) {
      const res = await getEntitySlotPromptApi(selectRowData);
      setModalRowData(res);
    }
    setModalOpen(true);
    setSelectedOption({
      value: selectRowData.entityId,
      label: selectRowData.entityId
    });
  };

  // contextMenu 행삭제
  const handleRowDelete = () => {
    const selectRowData = selectRow.current;

    alertConfirm({
      icon: "question",
      title: "삭제",
      text: "해당 Entity Mapping을 삭제하시겠습니까?",
      callback: async () => {
        setRowData((prevState) =>
          prevState.filter((item) => item.entityId !== selectRowData.entityId)
        );
        selectRowData;
        if (selectRowData.cnt > 0) {
          const deleteData = {
            entityId: selectRowData.entityId,
            intentId: intentId,
            slotSeq: selectRowData.slotSeq
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
      const res = await getEntitySlotPromptApi({ entityId: item.value });
      setModalRowData(res);
    }
  };

  // 모달 저장
  const handleModalSave = () => {
    alertConfirm({
      icon: "question",
      title: "저장",
      text: "저장하시겠습니까?",
      callback: async () => {
        const param = {
          intentId: intentId,
          entityId: selectedOption.value,
          deleteSlotPrompt: deleteSlotPrompt,
          slotPrompt: modalRowData
        };

        const respone = await savePropmptApi(param);

        setRowData(JSON.parse(respone.entityIds));

        handleModalColse();
      }
    });
  };

  // 모달 창닫기
  const handleModalColse = () => {
    setModalOpen(false);
    setSelectedOption(null);
    setModalRowData([]);
    setDeleteSlotPrompt([]);
    selectRow.current = {};
  };

  return (
    <div className="info_wrap">
      {/* <ContextMenu
        id={`contextMenu`}
        className="contextMenu"
        onHide={toggleMenu}
        onShow={toggleMenu}
      >
        <MenuItem className="contextItem" onClick={handleRowDelete}>
          삭제
        </MenuItem>
        <MenuItem className="contextItem" onClick={handleMsgAdd}>
          메시지 추가
        </MenuItem>
      </ContextMenu> */}
      <div className="item_wrap">
        <div className="item">
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
              setList={setTrainingPhrase}
              setDeletList={setDeleteTrainingPhrases}
              input={true}
              inputPlaceHolder={"학습 문구를 등록해주세요"}
              postPage={5}
              paging={true}
            />
          </Item>

          <Item
            title="Required"
            buttonList={[
              { buttonName: "행추가", onClick: handleAddRow, variant: "normal" }
            ]}
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
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        title={"Message"}
        handleClick={handleModalSave}
        buttonText={"저장"}
        closeModal={handleModalColse}
        modalBackground={modalBackground}
        width={"700px"}
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
          className="item_input mb-10"
          type="text"
          placeholder="신규 Prompt 를 입력해주세요"
          onKeyDown={handleModalAddRow}
        />

        {/* <div className="item_table_wrap">
          <table className="item_table">
            <thead>
              <tr>
                <th className="item_table_head">ViewType</th>
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
        </div> */}
      </Modal>
    </div>
  );
};

export default IntentInfo;
