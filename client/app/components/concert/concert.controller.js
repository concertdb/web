function concertController($rootScope, $log, $http, $state, ConcertService){
    "ngInject";

    const http = $http;
    const vm = this;
    vm.searchResults = ConcertService.current.searchResults;

    function initializeConcertController(){
        vm.name = 'concert';
        vm.currentArtist = ConcertService.current.artist.name;
        vm.currentYear = ConcertService.current.year.name;
    }
    initializeConcertController();

    vm.noConcertList = (vm.currentYear === undefined);

    //@todo: refactor component-to-component communication. $broadcast not in ng2.
    // set scope watches and event listeners
    $rootScope
        .$on('update:searchResults', function(){
            vm.searchResults = ConcertService.current.searchResults;
            initializeConcertController();
        });


    // component interaction methods
    vm.clickConcertFromIndex = function(concertIdentifier) {
        //@todo: concertId manipulation. Figure out different way to get unique id for concert. This was done to prevent issue #53.
        //@todo: refactor. make conversion between concertIdentifier and concertId a ConcertService method.
        let concertId = concertIdentifier.replace(/([.]+)/g, '+');
        
        $state.go('concert.show', {
            artist: vm.currentArtist,
            year: vm.currentYear,
            id: concertId
        });
    };

}

export default concertController;
