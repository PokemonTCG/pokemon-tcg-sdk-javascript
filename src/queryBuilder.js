import axios from 'axios';
import qs from 'qs';

import configuration from './configure';

const getOptions = () => {
    const options = {
        headers: {}
    };

    if (configuration.apiKey)
        options.headers['X-Api-Key'] = configuration.apiKey;

    return options;
}

const get = (type, args) => {
    return axios.get(`${configuration.host}/${type}${args && '?' + qs.stringify(args)}`, getOptions())
        .then(response => response.data);
}

export default (type) => ({
    find: id => {
        return axios(`${configuration.host}/${type}/${id}`, getOptions())
            .then(response => response.data.data);
    },
    where: (args) => get(type, args),
    all: (args={}, data=[]) => {
        const getAll = (type, args) => {
            const page = args.page ? args.page + 1 : 1;

            return get(type, {...args, page})
                .then(response => {
                    data.push(...response.data);

                    if (!response.totalCount || (response.pageSize * response.page) >= response.totalCount) {
                        return data;
                    }

                    return getAll(type, {...args, page})
                })
                .catch(error => console.error(error));
        }
        return getAll(type, args);
    }
})