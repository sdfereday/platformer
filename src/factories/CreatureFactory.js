import Bug from '../entities/npcs/Bug';

class CreatureFactory {

    static create(options) {
        
        let CreatureClass = null;

        switch(options.id) {
            case "bug":
                CreatureClass = Bug;
                break;
        }

        return new CreatureClass(options);

    }

}

export default CreatureFactory;