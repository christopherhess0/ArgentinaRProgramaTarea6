/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/


/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

// capturadores
const $input_people = document.querySelector("#numero-integrantes")
const $container = document.querySelector("#integrantes-container")
const $button_create_inputs = document.querySelector("#generar-inputs")
const $button_calculate = document.querySelector('#calcular-edades')
const $button_reset = document.querySelector('#resetear')
const $results_div = document.querySelector('#resultados')
const $span_max = document.querySelector('#mayor-edad')
const $span_min = document.querySelector('#menor-edad')
const $span_average = document.querySelector('#promedio-edad')
const $button_want_calculate_salary = document.querySelector('#salary')
const $salary_calculate = document.querySelector('#salary_calculate')


const capture_input_value = (input) => {
    const people = parseInt(input.value)
    return people
}
const render_quantity_members = () => {
    const people = capture_input_value($input_people)
    for (let i = 0; i < people; i++) {
        $container.innerHTML += `<div class="integrante_div">
            <input type="number" placeholder="Ingrese Edad">
            <span class="mensaje"></span>

        </div>`
        
    }
    
    
}
const show_item = (item) => {
    item.classList.remove('oculto')
}
const hide_item = (item) => {
    item.classList.add('oculto')
}

const generate_inputs = () => {
    render_quantity_members()
    show_item($button_calculate)
    show_item($button_reset)
    show_item($button_want_calculate_salary)

}
const calculate_average = () => {
    let sum = 0
    let count = 0
    const inputs = document.querySelectorAll('#integrantes-container input')
    inputs.forEach((input) => { 
        const value = parseFloat(input.value)
        if (!isNaN(value)) {
            sum += value;
            }
        count++
    })
    let average = sum / count
    return average
}
const calculate_Max = () => {
    let max = 0
    const inputs = document.querySelectorAll('#integrantes-container input')
    inputs.forEach((input) => {
        const value = parseFloat(input.value)
        if (!isNaN(value) && value > max) {
            max = value
            }
            })
    return max
}
const calculate_Min = () => {
    let min = Infinity
    const inputs = document.querySelectorAll('#integrantes-container input')
    inputs.forEach((input) => {
        const value = parseFloat(input.value)
        if (!isNaN(value) && value < min) {
            min = value
            }
            })
    return min
}
const render_results = () => {
    const average = calculate_average()
    const max = calculate_Max()
    const min = calculate_Min()
    $span_max.innerHTML = max
    $span_min.innerHTML = min
    $span_average.innerHTML = average

}

const reset = () => {
    $container.innerHTML = ''
    $input_people.value = ''
    hide_item($results_div);
}
const calculate_family_stats = () => {
    render_results()
    show_item($results_div)
    

    

}
const calculate_salaries = () => {
    show_item($salary_calculate)
    hide_item($button_want_calculate_salary)
    const inputs = document.querySelectorAll('#integrantes-container input');
    console.log(inputs);
    inputs.forEach((person) => {
        const age = parseInt(person.value); // Convertir el valor a número
        let label = person.nextElementSibling; // Suponiendo que hay un elemento <label> o <span> para mostrar mensajes
        if (age < 18) {
            label.textContent = 'Esta persona es menor de edad, No debería trabajar :)';
            person.disabled = true; // Deshabilitar el input
        } else {
            label.textContent = "Ingrese Salario de la persona";
            person.disabled = false; // Asegurar que esté habilitado para los mayores de edad
        }
    });
};





const init = () => {
    $button_create_inputs.addEventListener('click', generate_inputs)
    $button_calculate.addEventListener('click', calculate_family_stats)
    $button_reset.addEventListener('click', reset)
    $button_want_calculate_salary.addEventListener('click', calculate_salaries)
}


init()


