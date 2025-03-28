function callback(){
    console.log("Adding is successfully");
}

const add=function(a,b,callback)
{
    var result=a+b;
    console.log("result : "+result);
    callback();
}
add(3,4,callback);