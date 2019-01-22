import { inject } from 'aurelia-framework';

export class App {
  constructor() {
  }

  configureRouter(config, router) {
    config.title = 'AdminLTE 2 | Fixed Layout';
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: 'auth/login', nav: true, title: 'Login' }
    ]);

    this.router = router;
  }
}
