import configuration from './configure';
import queryBuilder from './queryBuilder';

const configure = ({apiKey}) => {
    configuration.apiKey = apiKey;
};

export default {
    configure,
    card: queryBuilder('cards'),
    set: queryBuilder('sets'),
    type: queryBuilder('types'),
    subtype: queryBuilder('subtypes'),
    rarity: queryBuilder('rarities'),
    supertype: queryBuilder('supertypes')
}