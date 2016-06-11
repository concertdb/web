function concertItemController($log, $rootScope, $scope, $window, $state, $stateParams, ConcertService){
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
            vm.currentConcert = concert;
            vm.concertSongs = playlist;
            vm.noConcertFound = (vm.concertSongs === undefined);
        });

    }).catch(function (err) {
        //@todo: Add archiveOrg search fn here. Also, refactor $stateParams to have necessary values for search.
        $log.error(err);
    });

    ////@todo: refactor component-to-component communication. $broadcast not in ng2.
    $rootScope
        .$on('update:searchResults', function(){
            $state.go('concert.index');
        });
}

export default concertItemController;

