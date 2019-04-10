import React from 'react';

// 同构：一套React 代码，在服务端执行一次，在客户端再执行一次
const Home = () => {
  return (
    <div>
      <div> Welcome to home!</div>
      <button onClick={()=>alert('click!')}>click</button>
    </div>
  )
}

export default Home;