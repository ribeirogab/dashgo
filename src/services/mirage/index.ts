import { createServer, Model, Factory, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  createdAt: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name() {
          return `${faker.name.firstName()} ${faker.name.lastName()}`;
        },

        email() {
          return faker.internet.email().toLowerCase();
        },

        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList('user', 200);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function (schema, request) {
        const { page = 1, perPage = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(perPage);
        const pageEnd = pageStart + Number(perPage);

        const users = this.serialize(schema.all('user')).users.slice(
          pageStart,
          pageEnd,
        );

        const pageInfo = {
          total,
          perPage: Number(perPage),
          currentPage: page,
          lastPage: Math.ceil(total / Number(perPage)),
          hasNextPage: page < Math.ceil(total / Number(perPage)),
        };

        return { pageInfo, users };
      });

      this.get('/users/:id');

      this.post('/users');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}
