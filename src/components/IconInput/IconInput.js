import React, { useRef } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const STYLES = {
  small: {
    height: 24,
    fontSize: 14,
    iconSize: 16,
    paddingLeft: 24,
  },
  large: {
    height: 36,
    fontSize: 18,
    iconSize: 24,
    paddingLeft: 36,
  },
};

const Wrapper = styled.label`
  position: relative;
  display: block;
  width: ${p => p.width}px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: ${p => p.height}px;
  font-size: ${p => p.fontSize}px;
  color: ${COLORS.gray700};
  background: ${COLORS.transparent};
  border: none;
  border-bottom: 2px solid ${COLORS.black};
  padding-left: ${p => p.paddingLeft}px;
  outline-offset: 2px;

  &::placeholder {
    color: ${COLORS.gray500};
    font-weight: 400;
    font-family: inherit;
  }

  &:hover {
    color: ${COLORS.black};
  }

  &:focus {
    outline: auto;
    outline-offset: 2px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${COLORS.gray700};
  transition: color 0.2s;

  ${Wrapper}:hover & {
    color: ${COLORS.black};
  }
`;

const IconInput = ({
  label,
  icon,
  width = 250,
  size,
  placeholder,
  ...delegated
}) => {
  const styles = STYLES[size];
  const inputRef = useRef();

  if (!styles) {
    throw new Error(`Unknown size passed to IconInput: ${size}`);
  }

  const handleIconClick = () => {
    inputRef.current && inputRef.current.focus();
  };

  return (
    <Wrapper width={width}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <IconWrapper onClick={handleIconClick} style={{cursor: 'pointer'}}>
        <Icon id={icon} size={styles.iconSize} />
      </IconWrapper>
      <StyledInput
        ref={inputRef}
        height={styles.height}
        fontSize={styles.fontSize}
        paddingLeft={styles.paddingLeft}
        placeholder={placeholder}
        {...delegated}
      />
    </Wrapper>
  );
};

export default IconInput;