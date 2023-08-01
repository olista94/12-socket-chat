
class Usuarios {

    constructor() {

        this.personsas = [];

    }

    agregarPersona( id, nombre, sala ) {

        let personsa = { id, nombre, sala };

        this.personsas.push( personsa );

        return this.personsas;

    }

    getPersona( id ) {

        let persona = this.personsas.filter( persona => persona.id === id )[0];

        return persona;

    }

    getPersonas() {

        return this.personsas;

    }

    getPersonasPorSala( sala ) {
       
        let personasEnSala = this.personsas.filter( persona => persona.sala === sala );
        return personasEnSala;
        
    }

    borrarPersona( id ){

        let personaBorrada = this.getPersona( id );

        this.personsas = this.personsas.filter( persona => persona.id != id );

        return personaBorrada;

    }
}

module.exports = {
    Usuarios
}
