function concertController($rootScope, $log, $http, $state, $stateParams, ArchiveOrgService, ConcertService){
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
        //@todo: concertId manipulation. Figure out different way to get unique id for concert. This was done to prevent issue #XXXX.
        let concertId = concertIdentifier.replace(/([^a-z0-9]+)/gi, '');

        // Use the getConcertById method to query archive.org's db for the concert
        ArchiveOrgService.getConcertById(concertIdentifier)
            .then(function(data){

                //return the concert object recieved back from archive.org
                let concert = data.data;

                return concert;

            }, concertControllerErrorHandler)
            //pass the returned concert to the parseArchiveOrgConcert method for parsing and caching of the concert and its songs
            .then(function(concert){
                ArchiveOrgService.parseArchiveOrgConcert(concert);
                $state.go('concert.show', {id: concertId});

            }, concertControllerErrorHandler);
    };

    function concertControllerErrorHandler(error){
        $log.error('Error in concertController#clickConcertFromIndex: ', error);
    }

}

export default concertController;
