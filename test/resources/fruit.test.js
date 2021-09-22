jest.mock('../../util/create_food');
const createFood = require('../../util/create_food');
const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('resources.fruit', () => {
  it('should run', async () => {
    createFood.mockReturnValue({
      foo: 'bar',
    });
    const bundle = { inputData: {} };

    const results = await appTester(App.resources.fruit.create.operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
