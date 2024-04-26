import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PagingGrid from "../components/PagingGrid";
import Item from "../components/Item";
import SearchInput from "../components/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import Button from "../components/Button";
import {
  getAnalyzeInitApi,
  getAnswerFailedApi,
  deleteAnswerFailedApi
} from "../api/api";
import { alertConfirm } from "../hooks/useAlert";

const AnswerFailed = () => {
  const [answerFailed, setAnswerFailed] = useState([]);

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
    { field: "answerSeq", headerName: "순번", width: 100 },
    { field: "userNm", headerName: "이용자명", width: 150 },
    { field: "userId", hide: true },
    {
      field: "intentId",
      headerName: "인텐트",
      width: 150,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {}
    },
    { field: "answerPrompt", headerName: "문구", flex: 1 }
  ]);
  const [schIntentEnum, setSchIntentEnum] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef("");

  const gridRef = useRef();
  const userNmRef = useRef();
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
      userNm: userNmRef.current.value
    };
    const respone = await getAnswerFailedApi(param);
    setAnswerFailed(respone);
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
          deleteAnswerFailed: selectRows
        };

        const respone = await deleteAnswerFailedApi(param);

        if (respone === "OK") {
          const copyAnswerFailed = [...answerFailed].filter((item) => {
            return !selectRows.some(
              (selectItem) => selectItem.answerSeq === item.answerSeq
            );
          });
          setAnswerFailed(copyAnswerFailed);
        }
      }
    });
  };

  // 모달 핸들러
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  //그리드 클릭시 이벤트
  const onRowClicked = (event) => {
    const selectAnswerPrompt = event.api.getSelectedRows()[0].answerPrompt;
    answerPromptRef.current.value = selectAnswerPrompt;
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
            </InputWrap>
            <ButtonWrap>
              <Button onClick={handleDelete}>삭제</Button>
              <Button onClick={handleSearch}>조회</Button>
            </ButtonWrap>
          </SchWrap>
          <PagingGrid
            rowData={answerFailed}
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

export default AnswerFailed;

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
