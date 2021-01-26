import React from "react";
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

  & > div {
    position: relative;
    visibility: hidden;
    word-wrap: break-word;
  }
`;

const Textarea: React.FC<TextareaProps> = ({
  className,
  value,
  onChange,
  adaptiveHeight = false,
  ...restProps
}) => {
  const classes = classNames(
    {
      "w-full h-full": adaptiveHeight,
    },
    className
  );

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    onChange && onChange(value);
  }

  const textarea = (
    <textarea className={classes} value={value} onChange={handleChange} {...restProps} />
  );

  return (
    <>
      {adaptiveHeight ? (
        <Container>
          <div className="p-0">{value ? value : "a"}</div>
          {textarea}
        </Container>
      ) : (
        { textarea }
      )}
    </>
  );
};

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLElement>, "onChange"> {
  onChange?: (value: string) => void;
  adaptiveHeight?: boolean;
}

export default Textarea;
