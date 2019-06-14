import React, { useState,useEffect } from 'react';

function Count() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);
  const [count, setCount] = useState(0);
  const [ pager,setPage]=useState({pageNo:1,pageSize:10});
  useEffect(() => {
    
    document.title = `You clicked ${count} times`;
  });
  function handleOrangeClick() {
    setCount(30);
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p onClick={handleOrangeClick}>dd</p>
      <div onClick={()=>setPage({pageNo:pager.pageNo+1,pageSize:pager.pageSize})}> 模拟分页{JSON.stringify(pager)}</div>
    </div>
  );
}

export default Count