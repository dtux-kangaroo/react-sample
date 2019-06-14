import React, {useRef } from 'react';
const InputRef=()=> {
    const inputEl = useRef(null);
    const focusClick = () => {
      // `current` 指向已挂载到 DOM 上的文本输入元素
      inputEl.current.focus();
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={focusClick}>获取焦点</button>
      </>
    );
  }

  export default InputRef