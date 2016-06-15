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
            title: 'ConcertDB',
            image: 'http://i.imgur.com/Ypl3MSb.jpg',
            githublink: 'https://github.com/concertdb/web',
            description: 'ConcertDB is a true passion project. It allows you to stream audio recordings of concerts from Archive.org and make custom playlists of songs from different concerts.',
            technologies: 'Node, Express, Angular, Angular-material, ES6, NG6-Starter-kit, PouchDB, Webpack, Babel, 3rd Party APIs, Component-driven Architecture'
        },
        {
            title: 'Nomad',
            image: 'http://i.imgur.com/26nsA7U.jpg',
            githublink: 'https://github.com/WDI28-Nomad/nomad',
            description: 'Nomad is a budgeting app that allows you to estimate your expenses for upcoming trips.',
            technologies: 'Ruby on Rails, PostgreSQL, Active Record, HTML/CSS, Rspec, JQuery, Highcharts, Google Maps API, Carrierwave, HTTParty'
        },
        {
            title: 'Concert Tracker',
            image: 'http://i.imgur.com/Fo9di1V.jpg',
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
    this.notificationsEnabled = true;
    this.toggleNotifications = function() {
      this.notificationsEnabled = !this.notificationsEnabled;
    };
    this.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );
      originatorEv = null;
    };
    this.checkVoicemail = function() {
      // This never happens.
    };

});
