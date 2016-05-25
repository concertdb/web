import angular from 'angular';
import uiRouter from 'angular-ui-router';

// Styles
import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import aboutComponent from './about.component';

let aboutModule = angular.module('about', [
    uiRouter,
    angularMaterial
])

    .config(($stateProvider) => {
        "ngInject";
        $stateProvider
            .state('about', {
                url: '/about',
                template: '<about></about>'
            });
    })

    .component('about', aboutComponent);

export default aboutModule;
