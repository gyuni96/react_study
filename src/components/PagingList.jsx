import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { alertWarning } from "../hooks/useAlert";

const PagingList = ({
  list,
  setList,
  setDeletList,
  input,
  inputPlaceHolder,
  paging,
  postPage,
  handleClick,
  handleEntityDelete
}) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(0); // 페이지내 리스트 갯수

  useEffect(() => {
    input === true ? setPostsPerPage(postPage - 1) : setPostsPerPage(postPage);
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 중복체크
  const duplicateCheck = (e, value) => {
    const index = list.findIndex((item) => item.text === value);

    if (index === -1) {
      const newList = { text: value, seq: null };
      setList([newList, ...list]);
    } else {
      e.preventDefault();

      alertWarning({
        title: "알림",
        text: "이미 등록된 학습 문구입니다."
      });
    }
  };
  // 리스트 추가
  const handleInputAdd = (e) => {
    const value = e.target.value;
    if (e.key !== "Enter" || value === "") return;
    duplicateCheck(e, value);
    e.target.value = "";
  };
  // 클릭시 추가
  const handleInputClickAdd = (e) => {
    const value = e.currentTarget.previousElementSibling.value;
    duplicateCheck(e, value);
    e.currentTarget.previousElementSibling.value = "";
  };
  // 클릭시 삭제
  const handleInputClickDelete = (e, index) => {
    const seq = e.currentTarget.previousElementSibling.dataset.seq;

    if (list[index].seq !== null) {
      const deletList = [...list].filter((item) => item.seq == seq)[0];
      setDeletList((prevState) => [...prevState, deletList]);

      setList((preState) => preState.filter((item) => item.seq != seq));
    } else {
      setList((preState) => preState.filter((_, idx) => idx != index));
    }
  };

  // 리스트 수정
  const handleInputUpdate = (e, index) => {
    const seq = e.currentTarget.dataset.seq;
    const value = e.currentTarget.value;
    const updateList = [...list];

    if (seq == undefined) {
      updateList[index].text = value;
    } else {
      updateList.filter((item) =>
        item.seq == seq ? (item.text = value) : null
      );
    }
    setList(updateList);
  };

  return (
    <>
      <ul className="paging_list_wrap">
        {input && (
          <li className="paging_list">
            <input
              className="paging_list_input"
              type="text"
              onKeyDown={handleInputAdd}
              placeholder={inputPlaceHolder}
            />
            <div className="paging_list_btn" onClick={handleInputClickAdd}>
              {/* <div className="paging_list_btn" onClick={handleClickAdd}> */}
              <FontAwesomeIcon icon={faCheck} size="lg" />
            </div>
          </li>
        )}
        {currentPosts(list).map((item, idx) => (
          <li className="paging_list" key={idx}>
            <input
              className="paging_list_input"
              type="text"
              value={item.text}
              onClick={handleClick}
              onChange={(e) => handleInputUpdate(e, idx)}
              required
              data-seq={item.seq}
            />
            <div
              className="paging_list_btn"
              onClick={(e) => 
                (typeof handleEntityDelete === 'function') ? handleEntityDelete(e, idx) : handleInputClickDelete(e, idx)}
            >
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </div>
          </li>
        ))}
      </ul>

      {/* 페이징 영역 */}
      {paging && list.length > 0 && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={postsPerPage} // 한 페이지랑 보여줄 아이템 갯수
          totalItemsCount={list.length} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator의 페이지 범위
          prevPageText={"‹"} // "이전"을 나타낼 텍스트
          nextPageText={"›"} // "다음"을 나타낼 텍스트
          itemClass="pagingation_item" // CSS 클래스명 설정
          onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
      )}
    </>
  );
};

export default PagingList;
