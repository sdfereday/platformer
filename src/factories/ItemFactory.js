import Item from '../entities/items/Item';

class ItemFactory {

    static create(options) {
        return new Item(options);
    }

}

export default ItemFactory;