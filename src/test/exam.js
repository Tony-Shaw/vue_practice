let nums = [3, 30, 34, 5, 9]
// 9534330
let num = nums.length
function getMax() {
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        if (String(nums[i]).split('')[0] > max) {
            max = nums[i]
        }
    }
    return max
}
function getMaxtwo(){
    // for(let i = 0;i<num ;i++){
    //     // console.log(getMax())
    //     let maxNum = getMax()
    //     console.log(nums.splice(1,nums.indexOf(maxNum)))
    //     // return maxNum
    // }
    let maxNum = getMax()
    // console.log(maxNum)
    let 
    // console.log(nums.splice(nums.indexOf(maxNum)))
}
getMaxtwo()
console.log(nums)

