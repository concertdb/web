angular.module('portfolio',['ngMaterial']);

angular.module('portfolio')
.config(function($mdIconProvider) {
    $mdIconProvider
        .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
        .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
})
.controller('PortfolioController', function($scope, $mdDialog){

    $scope.portfolio = [
        {
            title: 'San Franpsycho',
            image: '/portfolio/images/sanfranpsycho.png',
            sitelink: 'http://sanfranpsycho.com',
            description: 'Ecommerce apparel store. Helped to customize their theme.',
            technologies: 'Bigcommerce, HTML, CSS, Javascript, YAML'
        },
        {
            title: 'CSV ag-Grid',
            image: '/portfolio/images/csvaggrid.png',
            sitelink: 'https://github.com/matthewvilhauer/csv-ag-grid',
            githublink: 'https://github.com/matthewvilhauer/csv-ag-grid',
            description: 'An app that allows you to upload a csv and edit, transform, filter, and download the results using ag-Grid. Data is visualized using Highcharts\' scatter plot function.',
            technologies: 'Javascript, JQuery, JQuery UI, ag-Grid, Highcharts, pouchDB'
        },
        {
            title: 'ConcertDB',
            image: '/portfolio/images/concertdb.png',
            sitelink: 'http://matthewvilhauer.com/concertdb',
            githublink: 'https://github.com/concertdb/web',
            description: 'ConcertDB is my true passion project. It allows you to stream audio recordings of concerts from Archive.org and make custom playlists of songs from different concerts.',
            technologies: 'Node, Express, Angular, Angular-material, ES6, NG6-Starter-kit, PouchDB, Webpack, Babel, 3rd Party APIs, Component-driven Architecture'
        },
        {
            title: 'Nomad',
            image: '/portfolio/images/nomad.png',
            sitelink: 'https://travel-nomad.herokuapp.com/',
            githublink: 'https://github.com/WDI28-Nomad/nomad',
            description: 'Nomad is a budgeting app that allows you to estimate your expenses for upcoming trips. This was a group project. My primary contribution to this project was building the interactive budget graph.',
            technologies: 'Ruby on Rails, PostgreSQL, Active Record, HTML/CSS, Rspec, JQuery, Highcharts, Google Maps API, Carrierwave, HTTParty'
        },
        {
            title: 'Concert Tracker',
            image: '/portfolio/images/concert-tracker.png',
            sitelink: 'https://github.com/matthewvilhauer/concert-tracker',
            githublink: 'https://github.com/matthewvilhauer/concert-tracker',
            description: 'My first attempt at building a web app from the ground up. Concert Tracker allows you to create and save lists of your favorite concerts.',
            technologies: 'Node, Express, MongoDB, Handlebars, JQuery'
        }
    ];


    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

});
