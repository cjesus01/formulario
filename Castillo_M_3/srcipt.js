document.addEventListener('DOMContentLoaded', function(){
    
    //Se toma el contenido de el formulario, se le agrega un EventListener y luego evita el comportamiento de enviar al formulario, ingresa al if
    //donde si la function returna true ingresa y va hacia la funcion de crear animacion
    let formulario = document.querySelector('.formulario');
    
    formulario.addEventListener('submit', function(e){
        e.preventDefault();
        if(validacionDeFormulario()){
            realizarAnimacion();
        }
    })

    //Obtiene los etiquetas mencionadas las recorre por un forEach asignando un EventListener con el evento change el cual cambia el valor de la 
    //propiedad value y se dirije hacia la funcion del formulario
    document.querySelectorAll('input', 'textarea').forEach( function(input) {
            input.addEventListener('change', function(){
                validacionDeFormulario();
            })
        });
    
    //Toma todos los valores del formulario y luego se envia a la funcion validar campo enviando el nombre, la condicion y el mensaje y guardando 
    //true o false dependiendo lo que retornala funcion. En el caso del telefono valida uno o otro si cumple con las condiciones
    //en caso de que uno de los dos cumple se retira los mensaje y classList. Al salir returna true o false dependiendo si valido todos los campos
    function validacionDeFormulario(){
        let validar = true;
        let nombre = document.querySelector('#nombre').value;
        let apellido = document.querySelector('#apellido').value;
        let email = document.querySelector('#email').value;
        let telefono = document.querySelector('#telefono').value;
        let producto = document.querySelector('#opciones').value; // ya se encuentran los valores cargados por tal motivo es que no se puede enviar el campo vacio
        let mensaje = document.querySelector('#mensaje').value;
        
        validar &= validarCampo(document.querySelector('#nombre'), nombre === '', 'El nombre es obligatorio');
        validar &= validarCampo(document.querySelector('#apellido'), apellido === '', 'El apellido es obligatorio');
        validar &= validarCampo(document.querySelector('#mensaje'), mensaje === '' || mensaje.length < 10, 'El mensaje es obligatorio y debe contener al menos 10 palabras');

        if (email === '' && telefono === '') {
            validar |= validarCampo(document.querySelector('#email'), true, 'El email es obligatorio');
            validar |= validarCampo(document.querySelector('#telefono'), true, 'El teléfono es obligatorio');
        } else {
            validar |= validarCampo(document.querySelector('#email'), email === '' || !email.includes("@"), 'El email no es valido');
            validar |= validarCampo(document.querySelector('#telefono'), telefono === '' || telefono < 0, 'El teléfono no es valido');
            if (email.includes("@")) {
                document.querySelector('#telefono').classList.remove('error');
                document.getElementById('error_telefono').innerHTML = '';
            } else if (telefono > 0) {
                document.querySelector('#email').classList.remove('error');
                document.getElementById('error_email').innerHTML = '';
            }
        }
        return !!validar;
    }

    //Trae por parametro el campo, condicion y mensaje. Se guarda el campo donde se va a enviar el msj si la condicion es true agrega la clase error
    //y el mensaje retornardo false. Si ingresa en else se remueve la clase error se elimina el mensaje retornando true.
    function validarCampo(campo, condicion, errorMessage) {
        let msjError = document.getElementById(`error_${campo.id}`);
        if (condicion) {
            campo.classList.add('error');
            msjError.innerHTML = errorMessage;
            return false;
        } else {
            campo.classList.remove('error');
            msjError.innerHTML = '';
            return true;
        }
    }

    //Se encarga de realizar la animacion, donde toma por el id y removiendo la class animacion y aplicando un flex al elemento tomado
    //Ejecutandose la recarga de la pagina luego de los 2 segundos.
    function realizarAnimacion(){
        let aniExitosa = document.getElementById('mensajeEnviado');
        aniExitosa.classList.remove('animacion');
        aniExitosa.style.display = 'flex';
        setTimeout(function(){
            window.location.reload();
        }, 2000);
    }
})

