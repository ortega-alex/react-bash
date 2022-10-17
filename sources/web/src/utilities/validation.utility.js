export const cuiIsValid = (cui, callback) => {
    if (!cui) return callback('CUI vacío');
    const cuiRegExp = /^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/;

    if (!cuiRegExp.test(cui)) return callback('CUI con formato inválido');

    cui = String(cui).replace(/\s/, '').replace(/ /g, '');
    const depto = parseInt(cui.substring(9, 11), 10);
    const muni = parseInt(cui.substring(11, 13));
    const numero = cui.substring(0, 8);
    const verificador = parseInt(cui.substring(8, 9));

    // Se asume que la codificación de Municipios y
    // departamentos es la misma que esta publicada en
    // http://goo.gl/EsxN1a

    // Listado de municipios actualizado segun:
    // http://goo.gl/QLNglm

    // Este listado contiene la cantidad de municipios
    // existentes en cada departamento para poder
    // determinar el código máximo aceptado por cada
    // uno de los departamentos.
    const munisPorDepto = [
        /* 01 - Guatemala tiene:      */ 17 /* municipios. */, /* 02 - El Progreso tiene:    */ 8 /* municipios. */,
        /* 03 - Sacatepéquez tiene:   */ 16 /* municipios. */, /* 04 - Chimaltenango tiene:  */ 16 /* municipios. */,
        /* 05 - Escuintla tiene:      */ 13 /* municipios. */, /* 06 - Santa Rosa tiene:     */ 14 /* municipios. */,
        /* 07 - Sololá tiene:         */ 19 /* municipios. */, /* 08 - Totonicapán tiene:    */ 8 /* municipios. */,
        /* 09 - Quetzaltenango tiene: */ 24 /* municipios. */, /* 10 - Suchitepéquez tiene:  */ 21 /* municipios. */,
        /* 11 - Retalhuleu tiene:     */ 9 /* municipios. */, /* 12 - San Marcos tiene:     */ 30 /* municipios. */,
        /* 13 - Huehuetenango tiene:  */ 32 /* municipios. */, /* 14 - Quiché tiene:         */ 21 /* municipios. */,
        /* 15 - Baja Verapaz tiene:   */ 8 /* municipios. */, /* 16 - Alta Verapaz tiene:   */ 17 /* municipios. */,
        /* 17 - Petén tiene:          */ 14 /* municipios. */, /* 18 - Izabal tiene:         */ 5 /* municipios. */,
        /* 19 - Zacapa tiene:         */ 11 /* municipios. */, /* 20 - Chiquimula tiene:     */ 11 /* municipios. */,
        /* 21 - Jalapa tiene:         */ 7 /* municipios. */, /* 22 - Jutiapa tiene:        */ 17 /* municipios. */
    ];

    if (depto === 0 || muni === 0) return callback('CUI con código de municipio o departamento inválido.');
    if (depto > munisPorDepto.length) return callback('CUI con código de departamento inválido.');
    if (muni > munisPorDepto[depto - 1]) return callback('CUI con código de municipio inválido.');

    // Se verifica el correlativo con base
    // en el algoritmo del complemento 11.
    let total = 0;
    for (let i = 0; i < numero.length; i++) {
        total += numero[i] * (i + 2);
    }

    const modulo = total % 11;
    return callback(!(modulo === verificador) ? 'No valido' : null);
};

export const nitIsValid = (nit, callback) => {
    if (!nit) return callback('NIT vacío');

    const nitRegExp = new RegExp('^[0-9]+(-?[0-9kK])?$');
    if (!nitRegExp.test(nit)) return callback('Nit con formato invalido');

    nit = String(nit).replace(/-/, '');
    const lastChar = nit.length - 1;
    const number = nit.substring(0, lastChar);
    const expectedCheker = nit.substring(lastChar, lastChar + 1).toLowerCase();

    let factor = number.length + 1;
    let total = 0;

    for (let i = 0; i < number.length; i++) {
        const character = number.substring(i, i + 1);
        const digit = parseInt(character, 10);
        total += digit * factor;
        factor = factor - 1;
    }

    const modulus = (11 - (total % 11)) % 11;
    const computedChecker = modulus == 10 ? 'k' : modulus.toString();

    if (/\s/.test(nit) || nit.includes('-')) return callback('No se aceptan espacios ni guiones.');
    return callback(expectedCheker === computedChecker ? null : 'NIT Inválido.');
};

export const mailIsValied = (mail, callback) => {
    const emailRegExp = /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/;
    if (!emailRegExp.test(mail.trim())) return callback('Correo no valido.');
    return callback(null);
};

export const passwordIsValid = (password, currentPass, callback) => {
    const passRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/g;
    if (password.length < 6) return callback('La contraseña debe tener al menos 6 caracteres');
    if (password.trim() === '') return callback('La contraseña no puede estar vacía');
    if (currentPass && password === currentPass) return callback('La nueva contraseña no puede ser igual a la actual');
    if (!passRegExp.test(password))
        return callback('La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número');
    return callback(null);
};

export const phoneNumberIsValid = (number, callback) => {
    const phoneNumberRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im;
    if (!phoneNumberRegExp.test(number)) return callback('Número de teléfono no es valido');
    return callback(null);
};
