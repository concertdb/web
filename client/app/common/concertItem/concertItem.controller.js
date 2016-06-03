function concertItemController($rootScope, $scope, $state, $stateParams, ConcertService){
    "ngInject";
    const vm = this;
    vm.name = 'concertItem';
    vm.concertSongs = ConcertService.concertSongs[$stateParams.id];
    vm.currentConcert = ConcertService.currentConcert[$stateParams.id];
    vm.noConcertFound = (vm.concertSongs === undefined);

    ////@todo: refactor component-to-component communication. $broadcast not in ng2.
    $rootScope
        .$on('update:searchResults', function(){
            $state.go('concert.index');
        });
}

export default concertItemController;

