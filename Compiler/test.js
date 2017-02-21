var fs = require("fs");

/**
 * [writeFile 异步写文件]
 * @param  {[type]} filePath [要写入文件的内容]
 * @param  {[type]} context  [要写入文件的内容]
 * @return {[type]}          [description]
 */
function writeFile(filePath,context){
  return new Promise(function(resolve,reject){
    fs.writeFile(filePath, context,  function(err) {
       if (err) {
          reject(err);
       } else{
         resolve();
       }
    });
  });
}
/**
 * [readFile 异步读取文件]
 * @param  {[type]} filePath [文件路径]
 * @return {[type]}          [description]
 */
function readFile(filePath) {
   return new Promise(function(resolve,rejec){
        fs.readFile(filePath, function(err, data) {
            if (err) {
                  reject(err);
            }
               resolve(data.toString());
        });
   });
}


// writeFile("./y.json","123").then(function(data){
//   console.log("写入成功");
// });
//
readFile("./y.json").then(function(data){
    console.log("读取的数据为",data);
});
