
var params = new URLSearchParams(window.location.search);

var nombre = params.get( 'nombre' );
var sala = params.get( 'sala' );

// Referencias de jQuery
var divUsuarios = $( '#divUsuarios' );
var formEnviar = $( '#formEnviar' );
var txtMensaje = $( '#txtMensaje' );
var divChatbox = $( '#divChatbox' );

// Funciones para renderizar usuarios
function renderizarUsuarios( personas ) {

    console.log( personas );

    var html = '';

    html += '<li>';
    html +=  '  <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get( 'sala' ) + '</span></a>';
    html += '</li>';

    for( var i = 0; i < personas.length; i++ ) {
        html += '<li>';
        html += '   <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';

    }
    
    divUsuarios.html( html );

}

function renderizarMensajes( mensaje, yo ) {

    var html = '';
    var fecha = new Date( mensaje.fecha );
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if( mensaje.nombre === 'Administrador' ) {
        adminClass = 'danger';
    }

    if( yo ) {

        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {

        html += '<li class="animated fadeIn">';

        if( mensaje.nombre !== 'Administrador'  ) {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listener de jQuery
divUsuarios.on( 'click', 'a', function() {

    var id = $( this ).data( 'id' );

    if( id ) console.log( id );

} );

formEnviar.on( 'submit', function ( event ) {

    event.preventDefault();

    if( txtMensaje.val().trim().length === 0 ) {
        return;
    }

    // Enviar mensaje
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function( mensaje ) {
        renderizarMensajes( mensaje, true );
        scrollBottom()
    });

} );

// // Función para formatear la hora en formato hh:mm:ss AM/PM
// function formatTime(date) {
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var seconds = date.getSeconds();
//     var ampm = hours >= 12 ? 'PM' : 'AM';
// 
//     // Asegurarse de que las horas, minutos y segundos tengan dos dígitos
//     hours = hours % 12 || 12;
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     seconds = seconds < 10 ? '0' + seconds : seconds;
// 
//     return hours + ':' + minutes + ':' + seconds + ' ' + ampm;
// }
