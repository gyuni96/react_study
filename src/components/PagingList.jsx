import React, { useState } from "react";
import Pagination from "react-js-pagination";

const PagingList = ({
  list,
  listCnt,
  input,
  handleUpdate,
  inputPlaceHolder
}) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(4); // 페이지내 리스트 갯수

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

  return (
    <>
      <ul className="paging_list_wrap">
        {input ? (
          <li className="paging_list">
            <input
              className="paging_list_input"
              type="text"
              onKeyDown={(e) => {
                if (e.target !== e.currentTarget) return;
                e.stopPropagation();

                if (e.key !== "Enter") return;

                handleUpdate(e);

                setCurrentPage(1);
              }}
              autoFocus={false}
              placeholder={inputPlaceHolder}
            />
            <div className="paging_list_btn">
              <i className="fa-solid fa-check"></i>
            </div>
          </li>
        ) : null}
        {currentPosts(list).map((item, idx) => (
          <li className="paging_list" key={idx} data-seq={item.seq}>
            <p>{item.text}</p>
            <div className="paging_list_btn">
              <i className="fa-solid fa-trash"></i>
            </div>
          </li>
        ))}
      </ul>

      {/* 페이징 영역 */}
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={postsPerPage} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={listCnt} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        itemClass="pagingation_item" // CSS 클래스명 설정
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      />
    </>
  );
};

export default PagingList;
