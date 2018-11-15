
const socket = io();

function date() {
    const month = moment().format('MMM');
    const day = moment().format('D');
    const whichDay = moment().format('ddd');
    const year = moment().format('YYYY');
    $('#whichDayLoc').html(whichDay);
    $('#monthLoc').html(month);
    $('#dayLoc').html(day);
    $('#yearLoc').html(year);
}

const render = function () {
    $('.todoGrid').html('');
    $.ajax({ url: '/api/todos', method: 'GET' })
        .then(function (data) {
            data.forEach(e => {
                $('.todoGrid').append(
                    $('<div>').addClass('textButton').append(
                        $('<div>')
                            .addClass('todoContent textChild')
                            .append(
                                $('<p>').text(e.text)
                                    .addClass('changeTodo ')
                                    .attr('data-id', e.id)
                                    .attr('data-whole',e.complete)
                            ),
                        $('<div>').addClass('todoContent buttonChild').append(
                            $('<button>')
                                .addClass("change")
                                // .addClass("far fa-circle fa-2x nothingTodo")
                                .attr('data-id', e.id)
                        )
                    )
                ); 
                if(e.complete === true){
                    console.log($(this))
                    $(".change").addClass("far fa-times-circle deleteTodo grey");
                    $(".change").removeClass("far fa-circle fa-2x nothingTodo");
                    $("<p>").addClass('grey')
                }else{
                    console.log(e.complete);
                    $(".change").removeClass("far fa-times-circle deleteTodo grey");
                    $(".change").addClass("far fa-circle fa-2x nothingTodo");
                    $("<p>").removeClass('grey')
                }
            })
        })
}

$(document).on('click', '.changeTodo', checkToggle);

    function checkToggle() {
        const toggBool = $(this).data('whole');
        const toggId = $(this).data('id');
        console.log(toggBool);
        console.log(!toggBool);
        const newData = {
            id : toggId,
            complete : !toggBool
        }
        $.ajax({url:'/api/todos',method:'PUT', data : newData})
        .then(function(){
            render();
        })
        
        
        // let start = $(this);
        // const parent = start.parent().parent();
        // const buttonParent = parent.children('div.buttonChild');
        // let buttonChange = buttonParent.children();
        // socket.emit('new-color');
    };

    // socket.on('emit-color', function () {
    //     $(buttonChange).toggleClass("fa-circle fa-times-circle");
    //     $(buttonChange).toggleClass("nothingTodo deleteTodo");
    //     $(start).toggleClass("grey");


 


$('#todoInput').keypress(function (e) {
    if (e.keyCode === 13) {
        const todo = $('#todoInput').val();
        const newData = {
            text: todo
        }

        $.ajax({ url: '/api/todos', method: 'POST', data: newData })
            .then(function () {
                socket.emit('new-change');
            })

        $('#todoInput').val('')
    }
})

$(document).on('click', '.deleteTodo', function (e) {
    e.preventDefault();
    const deleteId = $(this).data('id');
    console.log(deleteId);
    const deleteTodo = {
        id: deleteId
    }

    $.ajax({ url: `/api/todos/`, method: 'DELETE', data: deleteTodo })
        .then(function () {
            socket.emit('new-change');
        })
})
socket.on('emit-change', function () {
    render();
})

render();
date();
