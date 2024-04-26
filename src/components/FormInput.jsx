import styled from "styled-components";

const FormInput = ({ id, label, icon, erroMsg, inputProps, children }) => {
  return (
    <FormInputWrap>
      <InputWrap>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        {icon && icon}
        <Input id={id} {...inputProps} />
        {children}
      </InputWrap>
      {erroMsg && <ErrorMsg>{erroMsg}</ErrorMsg>}
    </FormInputWrap>
  );
};

export default FormInput;

const FormInputWrap = styled.div`
  margin-bottom: 1rem;
  margin-left: 1rem;
`;

const InputWrap = styled.div`
  padding: 1rem 1.5rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  display: flex;
  align-items: center;
`;

const InputLabel = styled.label`
  padding-right: 1rem;
  margin-right: 1rem;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  width: 8rem;
  flex-shrink: 0;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 12px 16px;
  &::placeholder {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 0.9rem;
`;
