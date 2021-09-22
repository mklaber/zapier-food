const createFood = require('../util/create_food');
// get a list of vegetables
const performList = async (z, bundle) => {
  const response = await z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      order_by: 'id desc',
    },
  });
  return response.data;
};

// find a particular vegetable by name (or other search criteria)
const performSearch = async (z, bundle) => {
  const response = await z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      name: bundle.inputData.name,
    },
  });
  return response.data;
};

// creates a new vegetable
const performCreate = async (z, bundle) => {
  return await createFood(z, bundle);
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#resourceschema
  key: 'vegetable',
  noun: 'Vegetable',

  // If `get` is defined, it will be called after a `search` or `create`
  // useful if your `searches` and `creates` return sparse objects
  // get: {
  //   display: {
  //     label: 'Get Vegetable',
  //     description: 'Gets a vegetable.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'id', required: true}
  //     ],
  //     perform: defineMe
  //   }
  // },

  list: {
    display: {
      label: 'New Vegetable',
      description: 'Lists the vegetables.',
    },
    operation: {
      perform: performList,
      // `inputFields` defines the fields a user could provide
      // Zapier will pass them in as `bundle.inputData` later. They're optional on triggers, but required on searches and creates.
      inputFields: [],
    },
  },

  search: {
    display: {
      label: 'Find Vegetable',
      description: 'Finds a vegetable give.',
    },
    operation: {
      inputFields: [{ key: 'name', required: true }],
      perform: performSearch,
    },
  },

  create: {
    display: {
      label: 'Create Vegetable',
      description: 'Creates a new vegetable.',
    },
    operation: {
      inputFields: [{ key: 'name', required: true }],
      perform: performCreate,
    },
  },

  // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
  // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
  // returned records, and have obvious placeholder values that we can show to any user.
  // In this resource, the sample is reused across all methods
  sample: {
    id: 1,
    name: 'Test',
  },

  // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
  // For a more complete example of using dynamic fields see
  // https://github.com/zapier/zapier-platform/tree/master/packages/cli#customdynamic-fields
  // Alternatively, a static field definition can be provided, to specify labels for the fields
  // In this resource, these output fields are reused across all resources
  outputFields: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
  ],
};
