const todo = {};

module.exports = function(io){
    io.on('connection',function(socket){
        socket.on('new-change',function(){
            io.emit('emit-change');
        })
        console.log('connected');
    })
}