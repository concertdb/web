import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Concert from './concert/concert';

let componentModule = angular.module('app.components', [
    Home.name,
    About.name,
    Concert.name
]);

export default componentModule;
