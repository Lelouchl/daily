// react hooks

// 存放所有的hooks  此处用数组，react里使用的是链表
const memoizedHooks = [];
// hook索引
let hooksIndex = 0;

// usestate
function useState (initVal) {
  // 初始化state
  memoizedHooks[hooksIndex] = memoizedHooks[hooksIndex] || initVal;
  let index = hooksIndex;
  function setVal(val) {
    memoizedHooks[index] = val;
    render();
  }
  return [memoizedHooks[hooksIndex++],setVal]
}

// useEffect 
function useEffect(callback,dep) {
  const isChange = memoizedHooks[hooksIndex] ?
    !dep.every((val,ind)=> {
      return val === memoizedHooks[hooksIndex][ind]
    })
    : true;
  if (isChange) {
    callback();
    memoizedHooks[hooksIndex] = dep;
  }
  hooksIndex++
}

function App () {

  const [count,setcount] = useState(1)
  const [countCopy,setcountCopy] = useState(1)

  useEffect(()=>{
    console.log('count',count);
  },[count])

  useEffect(()=>{
    console.log('countCopy',countCopy);
  },[countCopy])

  return <div>
    <button
      onClick={() => {
        setcount(count + 1);
      }}
    >{`当前点击次数：${count}`}</button>
    <button
      onClick={() => {
        setcountCopy(countCopy + 2);
      }}
    >{`当前点击次数：${countCopy}`}</button>
  </div>
}


render(); // 首次渲染
function render() {
  hooksIndex = 0; // 重新render时需要设置为 0
  ReactDOM.render(<App />, document.getElementById("root"));
}
