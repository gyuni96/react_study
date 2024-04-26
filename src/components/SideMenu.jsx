import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu as activeMenu } from "../reducers/action";
import TreeNode from "./TreeNode";
import { menuApi } from "../api/api";

const SideMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectMenu, theme, isLogin } = useSelector((state) => state);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    const menuLi = document.querySelectorAll(".menu_list li");

    menuLi.forEach((menu) => {
      menu.classList.remove("active");
      if (menu.textContent.toLowerCase() === selectMenu.toLowerCase()) {
        menu.parentElement.classList.add("active");
        menu.classList.add("active");
      }
    });
  }, [selectMenu, theme, menuList]);

  useEffect(() => {
    const fetchMenu = async () => {
      const userInfo = JSON.parse(localStorage.getItem("user"));

      const param = {
        userId: userInfo.userId,
        authCd: userInfo.authCd
      };
      const respone = await menuApi(param);
      isLogin && setMenuList(convertToTree(respone));
    };

    fetchMenu();
  }, []);

  const convertToTree = (data) => {
    const map = {}; // 각 노드의 ID를 키로 사용하여 빠르게 접근하기 위한 맵
    const tree = []; // 최상위 노드들을 담을 배열

    // 데이터를 맵에 저장
    data.forEach((node) => {
      map[node.menuId] = { ...node, children: [] };
    });

    // 데이터를 순회하면서 부모 노드에 자식 노드를 연결
    data.forEach((node) => {
      if (node.parentMenuId !== null && map[node.parentMenuId]) {
        map[node.parentMenuId].children.push(map[node.menuId]);
      } else {
        // 최상위 노드일 경우 트리에 추가
        tree.push(map[node.menuId]);
      }
    });

    return tree;
  };

  const clickHandler = (e) => {
    dispatch(activeMenu("INTENT"));
    navigate(`/intent`);
  };

  return (
    <MenuWrap>
      <LogoWrap onClick={clickHandler}>
        <p>CHATBOT</p>
      </LogoWrap>

      <Ul className="menu_list">
        {menuList.map((node, index) => (
          <TreeNode key={index} node={node} />
        ))}
      </Ul>
    </MenuWrap>
  );
};

const MenuWrap = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-left: 15px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const LogoWrap = styled.div`
  width: 100%;
  height: 100px;
  padding-top: 50px;
  cursor: pointer;
`;

const Ul = styled.ul`
  /* color: "#626b79";   */
  color: "#3f4049";
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* 인터넷익스플로러 */
  user-select: none;
`;

const MenuItem = styled.div`
  padding: 8px 10px;
  border-radius: 10px;
  transition: 0.3s ease;

  &:hover {
    background-color: #f2f5f9;
  }
`;

const MenuList = styled.li`
  margin-bottom: 10px;
  width: 100%;
  padding-right: 15px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: 0.1s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &.active {
    border-right: 3px solid ${(props) => props.theme.hoverColor};

    ${MenuItem} {
      background-color: ${(props) => props.theme.themeColor};
      color: ${(props) => props.theme.hoverColor};
    }
  }
`;

const ListName = styled.span`
  margin-left: 10px;
`;

export default SideMenu;
