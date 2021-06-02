var array = ['a', 'b'];
var elements = [0, 1, 2];
let arr = array.concat(elements)
// array = arr
// console.log(arr, array)
array.push.apply(array, elements);
// console.info(array); // ["a", "b", 0, 1, 2]
function combine() {
    // console.log(typeof arguments)
    // console.log(arguments)
    // 将多个数组合并为同一个数组
    let arr = [].concat.apply([], arguments)
    // console.log(arr)
    // 对单个数组进行去重处理
    return Array.from(new Set(arr))
}
var m = [1, 2, 2, 3, 4], n = [2, 2, 3], p = [2, 3, 4]
// console.log(combine(m, n, p))
// combine(m, n, p)
function list() {
    // console.log(Object.prototype.toString.call(arguments))
    console.log(arguments)
    // return Array.prototype.slice.call(arguments);
    return [].slice.call(arguments)
}

var list1 = list(1, 2, 3); // [1, 2, 3]
console.log(list1)

console.log(Object.prototype.toString.call(list1))
// var list2 = list1.slice()
// console.log(list2, '---')
