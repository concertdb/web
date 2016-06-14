import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';

angular.module('app', [
        uiRouter,
        Common.name,
        Components.name
    ])
    .config(($locationProvider) => {
        "ngInject";
        // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
        // #how-to-configure-your-server-to-work-with-html5mode
        //@todo: html5Mode. Configure server rewrites to allow for html5 mode.
        $locationProvider.html5Mode(false);
        // $locationProvider.html5Mode(true).hashPrefix('!');
    })
    //PouchDb service. Put in as part of configuration required for `angular-pouchdb`.
    // See: https://www.npmjs.com/package/angular-pouchdb
    // .service('service', function(pouchDB) {
    //     var db = pouchDB('name');
    // })

    .component('app', AppComponent);
