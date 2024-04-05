import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import Pagination from "react-js-pagination";

const PagingGrid = ({
  rowData,
  columnDefs,
  defaultColDef,
  gridHeigth,
  postPage
}) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(0); // 페이지내 리스트 갯수

  useEffect(() => {
    setPostsPerPage(postPage);
  });

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
      <div className="ag-theme-quartz" style={{ height: gridHeigth }}>
        <AgGridReact
          rowData={currentPosts(rowData)}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={postsPerPage} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={rowData.length} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        itemClass="pagingation_item" // CSS 클래스명 설정
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      />
    </>
  );
};

export default PagingGrid;
