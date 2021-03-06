// const resolveAfter2Seconds = () => {
//   console.log('Starting slow promise')
//   return  new Promise(resolve => {
//     setTimeout(() => {
//       resolve(20)
//       console.log('Slow promise is done')
//     }, 2e3);
//   })
// }

// const resolveAfter1Second = () => {
//   console.log('Starting fast promise')
//   return  new Promise(resolve => {
//     setTimeout(() => {
//       resolve(10)
//       console.log('Fast promise is done')
//     }, 1e3);
//   })
// }

// const sequentialStart = async () => {
//   console.log('==SEQUENTIAL START==')

//   // 如果 await 操作符后的表达式不是一个 Promise 对象, 则它会被转换成一个 resolved 状态的 Promise 对象
//   const slow = await resolveAfter2Seconds()
//   const fast = await resolveAfter1Second()

//   console.log(slow)
//   console.log(fast)
// }

// const concurrentStart = async () => {
//   console.log('==CONCURRENT START with await==')

//   const slow = resolveAfter2Seconds() // 立即启动计时器
//   const fast = resolveAfter1Second()

//   console.log(await slow)
//   console.log(await fast) // 等待 slow 完成, fast 也已经完成。
// }

// const stillSerial = () => {
//   console.log('==CONCURRENT START with Promise.all==')

//   Promise.all([resolveAfter2Seconds(), resolveAfter1Second()])
//     .then(([slow, fast]) => {
//       console.log(slow)
//       console.log(fast)
//     })
// }

// const parallel = () => {
//   console.log('==PARALLEL with Promise.then==')

//   resolveAfter2Seconds().then(console.log)
//   resolveAfter1Second().then(console.log)
// }

// sequentialStart(); // 两秒后，输出 “slow”，1秒之后，输出“fast”
// // 等到 sequentialStart() 完成
// setTimeout(concurrentStart, 4000); // 两秒之后，输出“slow”，然后输出“fast”
// // 等到 setTimeout(concurrentStart, 4000) 完成
// setTimeout(stillSerial, 7000); // 和concurrentStart一样
// // 等到 setTimeout(stillSerial, 7000) 完成
// setTimeout(parallel, 10000); // 真正的并行运行：一秒之后，输出“fast”，然后1秒之后，输出“slow”
