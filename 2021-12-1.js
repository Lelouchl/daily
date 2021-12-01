// 1.reduce
// callback 
  // 1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
  // 2、currentValue （数组中当前被处理的元素）
  // 3、index （当前元素在数组中的索引）
  // 4、array （调用 reduce 的数组）
// var  arr = [1, 2, 3, 4];
// var sum = arr.reduce(function(prev, cur, index, arr) {
//   console.log(prev, cur, index);
//   return prev + cur;
// },0) // 注意这里设置了初始值



// reduce高级用法
// 1.计算数组中每个元素出现的次数   初始值为对象
// let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

// let nameNum = names.reduce((pre,cur)=>{
//   if(cur in pre){
//     pre[cur]++
//   }else{
//     pre[cur] = 1 
//   }
//   return pre
// },{})
// console.log(nameNum);

// 将多维数组转化为一维
// let arr = [[0, 1], [2, 3], [4,[5,6,7]]];
// const newArr = function(arr){
//   return arr.reduce((pre,cur)=>{
//     console.log('pre',pre,cur);
//     return pre.concat(Array.isArray(cur)?newArr(cur):cur)
//   },[])
// }
// console.log(newArr(arr));

// 对象里的属性求和
// var result = [
//   {
//       subject: 'math',
//       score: 10
//   },
//   {
//       subject: 'chinese',
//       score: 20
//   },
//   {
//       subject: 'english',
//       score: 30
//   }
// ];

// var sum = result.reduce(function(prev, cur) {
//   return cur.score + prev;
// }, 0);
// console.log(sum) 


// 函数柯里化：指封装一个函数，接收原始函数作为参数传入，并返回一个能够接收并处理剩余参数的函数
// https://segmentfault.com/a/1190000017981474
// 1.参数复用
// 2.提前确认
// 3.延迟运行  （bind实现）

// let curry = function (fn,args) {
//   let args = Array.prototype.slice.call(arguments)

//   let _this = this;
//   let len = fn.length
// }

function createCurry(fn) {

  let _args = [].slice.call(arguments,1) || [];
  let length = fn.length;  // fn的形参数量

  return function() {
    let _allArgs = _args.slice();  
    // 深拷贝闭包共用对象_args，避免后续操作影响（引用类型）
    _allArgs.push(...arguments);
    if (_allArgs.length < length) {
      // 参数数量不满足原始函数数量，返回curry函数
      return createCurry.call(this, fn, ..._allArgs);
    } else {
      // 参数数量满足原始函数数量，触发执行
      return fn.call(this, ..._allArgs);
    }
}
  
}
function add(a, b, c, d) {
  return a + b + c + d;
};
const curryAdd = createCurry(add, 2);
let sum = curryAdd(3)(4)(5);    // 14
console.log(sum);
// function add() {
//   // 第一次执行时，定义一个数组专门用来存储所有的参数
//   var _args = Array.prototype.slice.call(arguments);
// console.log('arguments',arguments);
//   // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
//   var _adder = function() {
//     console.log('innerarguments',arguments);
//     debugger

//       _args.push(...arguments);
//       return _adder;
//   };

//   // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
//   _adder.toString = function () {
//       return _args.reduce(function (a, b) {
//           return a + b;
//       });
//   }
//   return _adder;
// }

// // add(1, 2, 3)(4)