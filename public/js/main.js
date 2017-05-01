$(document)
    .ready(function () {
        $('.deleteUser').on('click', deleteUser);
    });

function deleteUser() {
    var comfirmation = confirm('Are You Sure?');

    if (comfirmation) {
        $
            .ajax({
                type: 'DELETE',
                url: '/users/delete/' + $(this).data('id')
            })
            .done(function (res) {
                window
                    .location
                    .replace('/');
            });
        window
            .location
            .replace('/');
    } else {
        return false;
    }
}