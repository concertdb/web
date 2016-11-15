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
            githublink: '',
            description: 'Customized the design of an Ecommerce store for local screen printing and apparel company.',
            technologies: 'Bigcommerce, Javascript, HTML/CSS'
        },
        {
            title: 'CSV ag-Grid',
            image: '/portfolio/images/csvaggrid.png',
            sitelink: 'https://matthewvilhauer.github.io/csv-ag-grid/',
            githublink: 'https://github.com/matthewvilhauer/csv-ag-grid',
            description: 'An app that allows you to upload a CSV then edit, transform, filter, and download the results using ag-Grid. Data is visualized using Highcharts\' scatter plot function.',
            technologies: 'Javascript, JQuery, JQuery UI, ag-Grid, Highcharts, pouchDB, HTML/CSS'
        },
        {
            title: 'ConcertDB',
            image: '/portfolio/images/concertdb.png',
            sitelink: 'http://matthewvilhauer.com/concertdb',
            githublink: 'https://github.com/concertdb/web',
            description: 'ConcertDB is my true passion project. It allows you to stream audio recordings of concerts from Archive.org and make a custom playlist of songs from different concerts.',
            technologies: 'Node, Express, Angular, Angular-material, ES6, NG6-Starter-kit, PouchDB, Webpack, Babel, HTML/CSS'
        },
        {
            title: 'Nomad',
            image: '/portfolio/images/nomad.png',
            sitelink: 'https://travel-nomad.herokuapp.com/',
            githublink: 'https://github.com/WDI28-Nomad/nomad',
            description: 'Nomad is a budgeting app that allows you to estimate your expenses for upcoming trips. This was a group project. My primary contribution to this project was building the interactive budget graph.',
            technologies: 'Ruby on Rails, PostgreSQL, Active Record, Rspec, JQuery, Highcharts, Google Maps API, HTML/CSS,'
        },
        {
            title: 'Concert Tracker',
            image: '/portfolio/images/concert-tracker.png',
            sitelink: 'https://github.com/matthewvilhauer/concert-tracker',
            githublink: 'https://github.com/matthewvilhauer/concert-tracker',
            description: 'My first attempt at building a web app from the ground up. Concert Tracker allows you to create and save lists of your favorite concerts.',
            technologies: 'Node, Express, MongoDB, Handlebars, JQuery, HTML/CSS'
        },
        {
            title: 'AcademyNet',
            image: '/portfolio/images/academynet.png',
            sitelink: 'http://academynet.com',
            githublink: '',
            description: 'Technical lead that developed the data integration between HMA\'s digital content platform, marketing system, and CRM.',
            technologies: 'Drupal, Eloqua, Oracle Sales Cloud, PHP, Groovy'
        },
        {
            title: 'The Health Management Academy App',
            image: '/portfolio/images/hma-app.png',
            sitelink: 'https://itunes.apple.com/us/app/health-management-academy/id705696985?mt=8',
            githublink: '',
            description: 'Helped design the layout and content upload workflow for HMA\'s mobile app.',
            technologies: 'QuickMobile, HTML/CSS, Excel'
        },
        {
            title: 'The Dog Stay',
            image: '/portfolio/images/thedogstay.png',
            sitelink: 'http://thedogstay.com',
            githublink: '',
            description: 'Wordpress site built for a family operated dog care facility in Silver Spring Maryland.',
            technologies: 'Wordpress, HTML/CSS'
        }
    ];

    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

});
