function makeBuffer(){
    var stringBuffer = [];
    return function(str){
        if(!arguments.length){
            return stringBuffer.join('');
        }
        stringBuffer.push(str);
    }
}

var buffer1 = makeBuffer();

buffer1('Замыкание');
buffer1(' Использовать');
buffer1(' Нужно!');

console.log(buffer1());

var buffer2 = makeBuffer();

buffer2(0);
buffer2(1);
buffer2(0);

console.log(buffer2());
