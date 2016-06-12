function concertItemController($log, $rootScope, $scope, $window, $state, $stateParams, ArchiveOrgService, ConcertService){
    "ngInject";

    const concertId = $stateParams.id;
    const db = $window.PouchDB('concertDbLocal');
    const vm = this;

    vm.name = 'concertItem';

    // GET concertAndPlaylist {} from PouchDb
    db.get(concertId).then(function (concertAndPlaylist) {
        let concert = concertAndPlaylist.concert;
        let playlist = concertAndPlaylist.playlist;

        //update service cache (maintain current functionality until refactor complete)
        ConcertService.currentConcert[concert.concertId] = concert;
        ConcertService.concertSongs[concert.concertId] = playlist;

        //@todo: remove $scope.apply.
        $scope.$apply(function() {
            // Value has been bound within Angular's context, so a digest will be triggered and the DOM updated
            vm.currentArtist = decodeURIComponent($stateParams.artist);
            vm.currentConcert = concert;
            vm.concertSongs = playlist;
            vm.noConcertFound = (vm.concertSongs === undefined);
        });

    }).catch(function (error) {
        if (error.name === 'not_found'){
            getConcertFromArchiveOrg();
        } else {
            $log.error(error);
        }
    });

    function getConcertFromArchiveOrg(){
        // Use the getConcertById method to query archive.org's db for the concert
        let concertIdentifier = $stateParams.id.replace(/([+]+)/g, '.');
        ArchiveOrgService.getConcertById(concertIdentifier)
            .then(function(data){
                let concert = data.data;
                //@todo: Promises. Refactor existing IO strategy to ensure control-flow and maintainability.
                //pass the returned concert to the parseArchiveOrgConcert method for parsing and caching of the concert and its songs
                ArchiveOrgService.parseArchiveOrgConcert(concert);

            }, function (error){ 
                $log.error('Error in concertItemController#getConcertFromArchiveOrg: ', error);
            });
    }

    ////@todo: refactor component-to-component communication. $broadcast not in ng2.
    $rootScope
        .$on('update:searchResults', function(){
            $state.go('concert.index');
        });
}

export default concertItemController;

