
function verificarNombre(nombre){
    let especiales = String(".-,_<>#$%&/@=+*?¡¿?!{}[]\\|\"'`~`×¥¥¥´¶öµ;:ü®åäßð©æ¾");
    for(let i=0;i<especiales.length;i++){
    if (nombre.indexOf(especiales.charAt(i))!=-1) {
        return true;
    }
  }
  return false;
}

var inputNombre = document.getElementById('nombre');
var spanErrorNombre = document.getElementById('errorNombre');
function validarNombre(){
    if(verificarNombre(inputNombre.value)){
        spanErrorNombre.classList.remove('hidden');
        return false;
    } else {
        spanErrorNombre.classList.add('hidden');
        return true;
    }
}

var inputResponsable = document.getElementById('responsable');
var spanErrorResponsable = document.getElementById('errorResponsable');
function validarResponsable(){
    if(verificarNombre(inputResponsable.value)){
        spanErrorResponsable.classList.remove('hidden');
        return false;
    } else {
        spanErrorResponsable.classList.add('hidden');
        return true;
    }
}

var inputPresupuesto = document.getElementById('presupuesto');
function validarPresupuesto(){
    let error = document.getElementById('errorPresupuesto');
    let estado = false;
    if(inputPresupuesto.value<1000000){
        error.classList.remove('hidden');
        error.innerText = 'El presupuesto es menor de $5.000.000';
    } else if(inputPresupuesto.value>50000000){
        error.classList.remove('hidden');
        error.innerText = 'El presupuesto es mayor a $50.000.000';
    } else {
        error.classList.add('hidden');
        estado = true;
    }
    return estado;
}
var fecha = new Date();
document.getElementById('fecha_ini').max = fecha.toISOString().split('T')[0];

var TEstudiante = document.getElementById('TEstudiante');
var TProfesor = document.getElementById('TProfesor');
var datosEstudiante = document.getElementById('datosEstudiante');
var datosProfesor = document.getElementById('datosProfesor');
var inputTipoPersona = null;
var inputDatoPersona = null;

TEstudiante.addEventListener('input', (e) => {
    inputTipoPersona = TEstudiante;
    inputDatoPersona = document.getElementById('semestre');
    datosEstudiante.classList.remove('hidden');
    datosProfesor.classList.add('hidden');
});

TProfesor.addEventListener('input', (e)=>{
    inputTipoPersona = TProfesor;
    inputDatoPersona = document.getElementById('tipo_profesor');
    datosEstudiante.classList.add('hidden');
    datosProfesor.classList.remove('hidden');
});


Proyectos = [];
var ubicacion = 0;


var inputCodigo = document.getElementById('codigo');
var inputTipo = document.getElementById('tipo');
var inputFechaIni = document.getElementById('fecha_ini');
var inputFechaFin = document.getElementById('fecha_fin');

function contarDias(pos){
    let inicio = new Date(Proyectos[pos].fechaInicio);
    let fin = new Date(Proyectos[pos].fechaFin);
    let diasDif = fin.getTime()-inicio.getTime();
    console.log(diasDif);
    
    return Math.round(diasDif/(1000*60*60*24))
}


function listarProyectos(){
    let texto = "";
    for (i in Proyectos) {
        texto += `
            <tr class="odd:bg-white even:bg-slate-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    ${Proyectos[i].nom}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${Proyectos[i].responsable}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${Proyectos[i].fechaInicio}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${Proyectos[i].fechaFin}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${contarDias(i)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">                                    
                    <input type="button" onclick="editar(${i})" value="Editar" class="cursor-pointer bg-green-600 text-green-200 text-sm p-1 border border-green-800">
                    <input type="button" onclick="eliminar(${i})" value="Eliminar" class="cursor-pointer bg-red-600 text-red-200 text-sm p-1 border border-red-800">
                    <input type="button" onclick="mostrar(${i})" value="Vista Rápida" class="cursor-pointer bg-yellow-600 text-yellow-200 text-sm p-1 border border-yellow-800">
                </td>
            </tr>
        `
    }

    document.getElementById('cuerpo').innerHTML = texto;
}

function limpiar(){
        inputCodigo.value = "";
        inputNombre.value = "";
        inputTipo.value = "";
        inputFechaIni.value = "";
        inputFechaFin.value = "";
        inputResponsable.value = "";
        inputPresupuesto.value = "";
        inputTipoPersona.value = "";
        inputDatoPersona.value = "";
}

function agregarProyecto() {
    persona = {
        cod: '',
        nom: '',
        tipo: '',
        fechaInicio: '',
        fechaFin: '',
        responsable: '',
        presupuesto: 0,
        tipo_persona: '',
        dato_persona: ''
    }
    if(validarNombre() && validarResponsable() && validarPresupuesto()){
        persona.cod = inputCodigo.value;
        persona.nom = inputNombre.value;
        persona.tipo = inputTipo.value;
        persona.fechaInicio = inputFechaIni.value;
        persona.fechaFin = inputFechaFin.value;
        persona.responsable = inputResponsable.value;
        persona.presupuesto = inputPresupuesto.value;
        persona.tipo_persona = inputTipoPersona.value;
        persona.dato_persona = inputDatoPersona.value;
        Proyectos.push(persona);
        listarProyectos();
        limpiar();
        alert('Proyecto regsitrado con exito.')
    }
}
var btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener('click', agregarProyecto);

var btnActualizar = document.getElementById("btnActualizar");
function editar(pos){
    ubicacion = pos;
    inputCodigo.value = Proyectos[pos].cod;
    inputNombre.value = Proyectos[pos].nom;
    inputTipo.value = Proyectos[pos].tipo;
    inputFechaIni.value = Proyectos[pos].fechaInicio;
    inputFechaFin.value = Proyectos[pos].fechaFin;
    inputResponsable.value = Proyectos[pos].responsable;
    inputPresupuesto.value = Proyectos[pos].presupuesto;
    inputTipoPersona.value = Proyectos[pos].tipo_persona;
    inputDatoPersona.value = Proyectos[pos].dato_persona;
    btnActualizar.classList.remove('hidden');
    btnAgregar.classList.add('hidden');
}

function actualizarDatos(){
    Proyectos[ubicacion].cod = inputCodigo.value;
    Proyectos[ubicacion].nom = inputNombre.value;
    Proyectos[ubicacion].tipo = inputTipo.value;
    Proyectos[ubicacion].fechaInicio = inputFechaIni.value;
    Proyectos[ubicacion].fechaFin = inputFechaFin.value;
    Proyectos[ubicacion].responsable = inputResponsable.value;
    Proyectos[ubicacion].presupuesto = inputPresupuesto.value;
    Proyectos[ubicacion].tipo_persona = inputTipoPersona.value;
    Proyectos[ubicacion].dato_persona = inputDatoPersona.value;
    btnActualizar.classList.add('hidden');
    btnAgregar.classList.remove('hidden');
    listarProyectos();
    limpiar();
}
btnActualizar.addEventListener('click', actualizarDatos);

function eliminar(pos){
    Proyectos.splice(pos, 1);
    listarProyectos();
}

function mostrar(pos){
    let texto = `
        Código: ${Proyectos[pos].cod}
        Nombre: ${Proyectos[pos].nom}
        Tipo: ${Proyectos[pos].tipo}
        Fecha Inicio: ${Proyectos[pos].fechaInicio}
        Fecha Fin: ${Proyectos[pos].fechaFin}
        Responsable: ${Proyectos[pos].responsable}
        Presupuesto: ${Proyectos[pos].presupuesto}
        Tipo persona: ${Proyectos[pos].tipo_persona}
    `;
    if(Proyectos[pos].tipo_persona=="estudiante"){
        texto += '   Semestre: '+ Proyectos[pos].dato_persona;
    } else {
        texto += '   Tipo profesor: '+ Proyectos[pos].dato_persona;
    }

    alert(texto);
}