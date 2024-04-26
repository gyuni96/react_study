import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import SearchInput from "../components/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import PagingGrid from "../components/PagingGrid";
import Item from "../components/Item";
import Modal from "../components/Modal";
import {
  getAnalyzeInitApi,
  getHistoryApi,
  deleteConversationApi
} from "../api/api";
import { alertConfirm, alertWarning } from "../hooks/useAlert";

const History = () => {
  const [answerHistory, setAnswerHistory] = useState([]);
  // 컬럼 속성
  const [colDefs, setColDefs] = useState([
    {
      field: "checkbox",
      headerName: "",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      maxWidth: 50,
      filter: false,
      sortable: false
    },
    { field: "userSeq", headerName: "순번", width: 100 },
    { field: "userNm", headerName: "이용자명", width: 200 },
    { field: "userId", hide: true },
    {
      field: "intentId",
      headerName: "인텐트",
      flex: 1,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {}
    },
    { field: "startDate", headerName: "시작일시", flex: 1 },
    { field: "endDate", headerName: "종료일시", flex: 1 },
    { field: "conversation", hide: true }
  ]);

  const [schIntentEnum, setSchIntentEnum] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef("");

  const gridRef = useRef();
  const userNmRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const answerPromptRef = useRef();

  useEffect(() => {
    //api 호출
    const fetchData = async () => {
      const respone = await getAnalyzeInitApi();

      const intentMapping = respone.intent.reduce((aac, cur) => {
        aac[cur.intentId] = cur.intentNm;
        return aac;
      }, {});

      const extractKeys = (mappings) => Object.keys(mappings);

      const intentCd = extractKeys(intentMapping);

      setColDefs((prev) => {
        const newColDefs = prev.map((col) => {
          if (col.field === "intentId") {
            col.cellEditorParams.values = intentCd;
            col.refData = intentMapping;
          }
          return col;
        });
        return newColDefs;
      });

      const intentEnum = respone.intent.map((intent) => {
        return { value: intent.intentId, label: intent.intentNm };
      });
      intentEnum.unshift({ value: null, label: "선택" });
      setSchIntentEnum(intentEnum);
    };

    fetchData();
  }, []);

  // 조회
  const handleSearch = async () => {
    const param = {
      intentId: selectedOption?.value,
      userNm: userNmRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value
    };

    if (!searchVaildation(param)) return;

    const respone = await getHistoryApi(param);
    setAnswerHistory(respone);
  };

  //삭제
  const handleDelete = () => {
    alertConfirm({
      icon: "question",
      title: "삭제",
      text: "삭제하시겠습니까?",
      callback: async () => {
        const selectRows = gridRef.current.api.getSelectedRows();

        const param = {
          deleteConversation: selectRows
        };

        const respone = await deleteConversationApi(param);

        if (respone === "OK") {
          const copyAnswerHistory = [...answerHistory].filter((item) => {
            return !selectRows.some(
              (selectItem) =>
                selectItem.userSeq === item.userSeq &&
                selectItem.userId === item.userId
            );
          });
          setAnswerHistory(copyAnswerHistory);
        }
      }
    });
  };

  // 유효성 검사
  const searchVaildation = (param) => {
    if (param.startDate === "" && param.endDate === "") {
      return true;
    }

    if (param.startDate === "" || param.endDate === "") {
      alertWarning({
        title: "검색",
        text: "시작일시와 종료일시 모두 입력해주세요."
      });
      return false;
    }

    if (param.startDate > param.endDate) {
      alertWarning({
        title: "검색",
        text: "시작일시가 종료일시보다 큽니다."
      });
      return false;
    }

    return true;
  };

  // 모달 핸들러
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  //그리드 클릭시 이벤트
  const onRowClicked = (event) => {
    const conversation = event.api.getSelectedRows()[0].conversation;
    console.log(event.api.getSelectedRows()[0]);
    answerPromptRef.current.value = conversation;
  };

  return (
    <>
      <div className="info_wrap">
        <div className="item_wrap">
          <SchWrap>
            <InputWrap>
              <SearchInput
                type={"text"}
                label={"이용자"}
                button={<FontAwesomeIcon icon={faSearch} />}
                handleButton={handleModal}
                inputProps={{ ref: userNmRef }}
              />
              <SearchInput
                type={"select"}
                label={"인텐트"}
                setSelectedOption={setSelectedOption}
                inputProps={{
                  options: schIntentEnum,
                  value: selectedOption
                }}
              />
              <SearchInput
                type={"date"}
                label={"대화시간"}
                inputProps={{ ref: startDateRef }}
              />
              <SearchInput type={"date"} inputProps={{ ref: endDateRef }} />
            </InputWrap>
            <ButtonWrap>
              <Button onClick={handleDelete}>삭제</Button>
              <Button onClick={handleSearch}>조회</Button>
            </ButtonWrap>
          </SchWrap>
          <PagingGrid
            rowData={answerHistory}
            columnDefs={colDefs}
            // defaultColDef={}
            gridHeigth={300}
            postPage={5}
            gridProps={{
              rowSelection: "multiple", //  multiple :여러행 선택 // single: 한행만 선택
              enableCellTextSelection: false, // 그리드가 일반 테이블인 것처럼 드래그시 일반 텍스트 선택
              onRowClicked: onRowClicked, // 클릭시 이벤트
              ref: gridRef // 그리드 참조
            }}
          />
          <Item title="Answer Failed Prompt">
            <textarea
              className="item_textarea"
              cols="30"
              rows="10"
              ref={answerPromptRef}
              readOnly={true}
            ></textarea>
          </Item>
        </div>
      </div>
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          title={"이용자"}
          buttonText={"저장"}
          closeModal={handleModal}
          modalBackground={modalBackground}
        ></Modal>
      )}
    </>
  );
};

export default History;
const SchWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
`;

const InputWrap = styled.div`
  display: flex;
`;
const ButtonWrap = styled.div`
  display: flex;
`;
