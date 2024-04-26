import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectMenu } from "../reducers/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faSitemap } from "@fortawesome/free-solid-svg-icons";

const TreeNode = ({ node }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [icon, setIcon] = useState(faMessage);

  useEffect(() => {
    switch (node.menuNm) {
      case "Intent":
        setIcon(faMessage);
        break;
      case "Entity":
        setIcon(faSitemap);
        break;
      case "Analyze":
        break;
      case "History":
        break;
      case "Answer Failed":
        break;
      case "Menu":
        break;
      case "Menu Setting":
        break;
      case "Auth":
        break;
      case "Auth Setting":
        break;
      case "User Auth Setting":
        break;
      case "Menu Auth Setting":
        break;
      default:
        break;
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    if (e.currentTarget.dataset.menuyn === "Y") {
      const menu = e.currentTarget.textContent.toLowerCase();

      dispatch(selectMenu(menu.toUpperCase()));
      navigate(`/${menu.replace(/\s/g, "")}`);
    }

    if (e.currentTarget.nextElementSibling?.tagName === "UL") {
      e.currentTarget.nextElementSibling.classList.toggle("active");
    }
  };

  // 자식 노드가 있을 경우 렌더링
  const renderChildren = (children) => {
    return (
      <ChildrenUl>
        {children.map((child, index) => (
          <TreeNode key={index} node={child} />
        ))}
      </ChildrenUl>
    );
  };

  return (
    <MenuList>
      <MenuItem onClick={handleClick} data-menuyn={node.menuYn}>
        <FontAwesomeIcon icon={icon} />
        <MenuName>{node.menuNm}</MenuName>
      </MenuItem>
      {node.children.length > 0 && renderChildren(node.children)}
    </MenuList>
  );
};

export default TreeNode;

const MenuItem = styled.div`
  padding: 8px 10px;
  border-radius: 10px;
  transition: 0.3s ease;

  &:hover {
    background-color: #f2f5f9;
  }
`;

const MenuName = styled.span`
  margin-left: 10px;
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

const ChildrenUl = styled.ul`
  padding-left: 20px;
  height: 0;
  overflow-y: hidden;
  transition: 0.3s ease;
  &.active {
    height: auto;
  }
  ${MenuList} {
    font-size: 0.9rem;
  }
  /* border-left: 1px solid rgba(0, 0, 0, 0.1); */
`;
