import React, { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";

const Container = styled.div`
  position: relative;

  & > textarea {
    position: absolute;
    left: 0;
    top: 0;
    resize: none;
    outline: none;
    border: 0;
  }

  & > textarea:focus {
    outline: none;
    border: 0;
    box-shadow: none;
  }

  & > div {
    position: relative;
    visibility: hidden;
    word-wrap: break-word;
  }
`;

const AptiveHeightTextarea: React.FC<AptiveHeightTextareaProps> = ({
  className,
  value,
  onChange,
  ...restProps
}) => {
  const classes = classNames(className);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    onChange && onChange(value);
  }

  return (
    <Container className={classes}>
      <div className="p-0">{value ? value : "a"}</div>
      <textarea
        className="pt-0 pb-0 pl-2 pr-2 bg-transparent w-full h-full"
        value={value}
        onChange={handleChange}
        {...restProps}
      />
    </Container>
  );
};

export interface AptiveHeightTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLElement>, "onChange"> {
  onChange?: (value: string) => void;
}

export default AptiveHeightTextarea;
