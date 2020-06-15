import React from "react";
import styled from "styled-components";

const Dropdown = ({ handleDDOutside, children }) => {
  return (
    <Container id="outside" onClick={(e) => handleDDOutside(e)}>
      <Wrapper>
        <Box>
          <Content>{children}</Content>
          <BtnContainer>
            <div>지우기</div>
            <Btn>저장</Btn>
          </BtnContainer>
        </Box>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const Wrapper = styled.div`
  position: absolute;
`;

const Box = styled.div`
  position: absolute;
  width: 360px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  top: 150px;
  left: 20px;
`;

const Content = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 2em 1.5em;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.5em;
`;

const Btn = styled.button`
  background-color: black;
  color: white;
  border-radius: 0.5em;
  border: none;
  padding: 0.75em 1.25em;
  cursor: pointer;
`;

export default Dropdown;