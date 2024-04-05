import React, { useState } from "react";
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  showMenu
} from "react-contextmenu";

const style = {
  backgroundColor: "red",
  height: "100%"
};

const NotFound = ({ test }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleMenuOpen = (event) => {
    event.preventDefault(); // 기본 이벤트 방지
    showMenu("myMenu");

    setMenuPosition({ x: event.clientX, y: event.clientY });
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuItemClick = (e, data) => {
    console.log(`Clicked on menu item "${data.item}"`);
    // 이벤트에서 컨텍스트 메뉴를 닫습니다.
    setMenuOpen(false);
  };

  return (
    <div>
      {/* 메뉴를 열고자 하는 요소에 onClick 이벤트를 추가합니다. */}
      <div onClick={handleMenuOpen}>Open Menu</div>

      {/* 메뉴 */}
      <ContextMenu
        id="myMenu"
        onContextMenu={handleMenuClose} // 컨텍스트 메뉴가 열리지 않도록 방지
        onHide={handleMenuClose} // ESC 키를 누를 때 메뉴 닫기
        style={{
          top: menuPosition.y,
          left: menuPosition.x,
          position: "absolute"
        }}
      >
        <MenuItem data={{ item: "item 1" }} onClick={handleMenuItemClick}>
          Item 1
        </MenuItem>
        <MenuItem data={{ item: "item 2" }} onClick={handleMenuItemClick}>
          Item 2
        </MenuItem>
        <MenuItem data={{ item: "item 3" }} onClick={handleMenuItemClick}>
          Item 3
        </MenuItem>
      </ContextMenu>
    </div>
  );

  // return (
  //   <>
  //     <h3 style={style}>404ERROR</h3>
  //   </>
  // );
};

export default NotFound;
