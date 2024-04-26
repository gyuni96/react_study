import styled, { css, StyleSheetManager } from "styled-components";

const SIZES = {
  sm: css`
    --button-font-size: 0.875rem;
    --button-padding: 8px 12px;
    --button-radius: 4px;
  `,
  md: css`
    --button-font-size: 1rem;
    --button-padding: 12px 16px;
    --button-radius: 8px;
  `,
  lg: css`
    --button-font-size: 1.25rem;
    --button-padding: 16px 20px;
    --button-radius: 12px;
  `
};

const VARIANTS = {
  normal: css`
    --button-color: #ffffff;
    --button-bg-color: #7b7b7b;
    --button-hover-bg-color: #717171;
  `,
  success: css`
    --button-color: #ffffff;
    --button-bg-color: #28a745;
    --button-hover-bg-color: #218838;
  `,
  error: css`
    --button-color: #ffffff;
    --button-bg-color: #dc3545;
    --button-hover-bg-color: #c82333;
  `,
  warning: css`
    --button-color: #212529;
    --button-bg-color: #ffc107;
    --button-hover-bg-color: #e0a800;
  `
};

const Button = ({ disabled, size, variant, children, onClick }) => {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "variantstyle"}>
      <StyledButton
        disabled={disabled}
        sizestyle={sizeStyle}
        variantstyle={variantStyle}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    </StyleSheetManager>
  );
};

export default Button;

const StyledButton = styled.button`
  ${(p) => p.sizestyle}
  ${(p) => p.variantstyle}

  flex-shrink: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 12px 16px);
  border-radius: var(--button-radius, 8px);
  background: var(--button-bg-color, ${(props) => props.theme.hoverColor});
  color: var(--button-color, #ffffff);
  margin-right: 10px;
  transition: 0.3s ease;

  &:last-child {
    margin-right: 0;
  }

  &:active,
  &:hover,
  &:focus {
    background: var(
      --button-hover-bg-color,
      ${(props) => props.theme.thickHoverColor}
    );
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(
      --button-bg-color,
      ${(props) => props.theme.thickHoverColor}
    );
  }
`;
