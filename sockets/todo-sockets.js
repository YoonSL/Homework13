const todo = {};

module.exports = function(io){
    io.on('connection',function(socket){
        socket.on('new-change',function(){
            io.emit('emit-change');
        })
        socket.on('new-color',function(){
            io.emit('emit-color');
        })
        console.log('connected');
    })
}