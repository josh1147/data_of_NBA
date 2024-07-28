var ex1 = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
                            
function generateRandomNumber(num) {
    {
        var tmpdata = [];
        var xRange = Math.random() * 100;
        for (var i = 0; i < num; i++){
            var newNum = Math.floor(Math.random() * xRange);
            tmpdata.push(newNum);
        }
        return tmpdata;
    }
}
    
var ex2 = generateRandomNumber(20);