import angular from 'angular';
import Concert from './concert/concert';

let componentModule = angular.module('app.components', [
    Concert.name
]);

export default componentModule;
