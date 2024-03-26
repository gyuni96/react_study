import React, { useState } from "react";
import Pagination from "react-js-pagination";

const PagingList = ({ list, input, handleUpdate, inputPlaceHolder }) => {
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
              onKeyDown={handleUpdate}
              autoFocus={false}
              placeholder={inputPlaceHolder}
            />
            <div className="paging_list_btn">
              <i className="fa-solid fa-check"></i>
            </div>
          </li>
        ) : null}
        {currentPosts(list).map((item, idx) => (
          <li className="paging_list" key={idx}>
            <p>{item.text}</p>
            <div className="paging_list_btn">
              <i className="fa-solid fa-trash"></i>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={list.length} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        // CSS 클래스명 설정
        itemClass="pagingation_item"
        // innerClass="pagination__list"
        // activeLinkClass="pagination__link--active"
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      />
    </>
  );
};

export default PagingList;
