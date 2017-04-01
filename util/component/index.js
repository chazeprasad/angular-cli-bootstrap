let moduleName;
//-----------------------------------------------------------------//
import angular from 'angular';
import AppUtil from '../util/app.util'
//-----------------------------------------------------------------//
import '../app.core.module';
import '../app.lib.module';
const requires = [
    'app.core',
    'app.lib'

];
//-----------------------------------------------------------------//
const bulk = require('bulk-require');
const controllers           = bulk(__dirname, ['./**/*.controller.js']);
const components            = bulk(__dirname, ['./**/*.component.js']);
const directives            = bulk(__dirname, ['./**/*.directive.js']);
const services              = bulk(__dirname, ['./**/*.service.js']);
const filters               = bulk(__dirname, ['./**/*.filter.js']);
const providers             = bulk(__dirname, ['./**/*.provider.js']);
const routes                = bulk(__dirname, ['./**/*.route.js']);
//-----------------------------------------------------------------//
moduleName = AppUtil.GetAppName(__dirname, 'app.');
const module = angular.module(moduleName, requires);
//-----------------------------------------------------------------//

AppUtil.ConfigureControllers(controllers, module);
AppUtil.ConfigureComponent(components, module);
AppUtil.ConfigureDirective(directives, module);
AppUtil.ConfigureServices(services, module);
AppUtil.ConfigureFilters(filters, module);
AppUtil.ConfigureProviders(providers, module);
//-----------------------------------------------------------------//
module.config(function ($stateProvider) {
    'ngInject';

    AppUtil.ConfigRoute(routes, $stateProvider)
});
//-----------------------------------------------------------------//

export default module;
