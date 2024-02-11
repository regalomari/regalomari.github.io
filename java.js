document.addEventListener('DOMContentLoaded', function() {
    var textarea = document.getElementById('miTextarea');

    var mensajeCompleto = '¡Hola Mari! Gracias por ser mi mejor amiga por estar ahí cuando te necesito y aguantar mis payasadas y dramas. ¡Feliz Día de la Amistad! Te quiero!!! click para continuar';
    var redireccionarMensaje = 'hacer clic aquí para recordar la canción';

    textarea.addEventListener('click', function() {
        if (textarea.value.trim() === mensajeCompleto.trim()) {
            // Si el mensaje completo está presente, lo eliminamos
            borrarContenido(textarea.value, 30, function() {
                // Después de borrar el contenido, agregamos el mensaje de redireccionamiento
                agregarTexto(textarea, redireccionarMensaje, 0, 100, function() {
                    // Cuando aparezca el mensaje de redireccionamiento, redirigir al enlace
                    textarea.addEventListener('click', function redirectToLink() {
                        if (textarea.value === redireccionarMensaje) {
                            window.location.href = 'https://www.youtube.com/watch?v=SUL79zqyYwM';
                            // Eliminar el listener después de la redirección para evitar redirigir repetidamente
                            textarea.removeEventListener('click', redirectToLink);
                        }
                    });
                });
            });
        } else {
            // Si el mensaje no está completo, mostramos el mensaje completo
            borrarContenido(textarea.value, 30, function() {
                agregarTexto(textarea, mensajeCompleto, 0, 100);
            });
        }
    });

    function borrarContenido(texto, velocidad, callback) {
        var i = texto.length;
        var interval = setInterval(function() {
            if (i == 0) {
                clearInterval(interval);
                callback();
            } else {
                textarea.value = texto.substring(0, i - 1);
                i--;
            }
        }, velocidad);
    }

    function agregarTexto(textarea, texto, index, velocidad, callback) {
        if (index < texto.length) {
            textarea.value += texto[index];
            index++;
            setTimeout(function() {
                agregarTexto(textarea, texto, index, velocidad, callback);
            }, velocidad);
        } else {
            if (callback) callback();
        }
    }
});
