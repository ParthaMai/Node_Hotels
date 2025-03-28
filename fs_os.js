var fs=require('fs');
var os=require('os');

var user=os.userInfo();
console.log(user);
console.log(user.name);

fs.appendFile('greeting.txt', 'Hi '+ 'Partha' + '!\n', ()=>{
    console.log("file is created");
});

console.log(fs);