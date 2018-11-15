
const socket = io();


$(document).on('click', '.changeTodo', checkToggle);
$(document).on('click', '.deleteTodo',deleteTodo);

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
                if (e.complete === true) {
                    falseRender(e);
                } else {
                    trueRender(e);
                }
            })
        })
}

function falseRender(data) {
    $('.todoGrid').append(
        $('<div>').addClass('textButton').append(
            $('<div>')
                .addClass('todoContent textChild')
                .append(
                    $('<p>').text(data.text)
                        .addClass('changeTodo ')
                        .addClass('grey')
                        .attr('data-id', data.id)
                        .attr('data-whole', data.complete)
                ),
            $('<div>').addClass('todoContent buttonChild').append(
                $('<button>')
                    .addClass("change")
                    .addClass("far fa-times-circle fa-2x deleteTodo")
                    .attr('data-id', data.id)
            )
        )
    );
}

function trueRender(data) {
    $('.todoGrid').append(
        $('<div>').addClass('textButton').append(
            $('<div>')
                .addClass('todoContent textChild')
                .append(
                    $('<p>').text(data.text)
                        .addClass('changeTodo ')
                        .attr('data-id', data.id)
                        .attr('data-whole', data.complete)
                ),
            $('<div>').addClass('todoContent buttonChild').append(
                $('<button>')
                    .addClass("change")
                    .addClass("far fa-circle fa-2x nothingTodo")
                    .attr('data-id', data.id)
            )
        )
    );
}

function checkToggle() {
    const toggBool = $(this).data('whole');
    const toggId = $(this).data('id');
    console.log(toggBool);
    console.log(!toggBool);
    const newData = {
        id: toggId,
        complete: !toggBool
    }
    $.ajax({ url: '/api/todos', method: 'PUT', data: newData })
        .then(function () {
            socket.emit('new-change');
        })
};

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

function deleteTodo(e){
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
}
socket.on('emit-change', function () {
    render();
})
render();
date();
