import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sidebar from './sidebar.component';

// Styles
import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';


let sidebarModule = angular.module('sidebar', [
    uiRouter,
    angularMaterial
])

.component('sidebar', sidebar);

export default sidebarModule;
