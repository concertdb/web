function concertItemController($stateParams, ConcertService){
    "ngInject";
    const vm = this;
    vm.name = 'concertItem';
    vm.concertSongs = ConcertService.concertSongs[$stateParams.id];
    vm.currentConcert = ConcertService.currentConcert[$stateParams.id];
}

export default concertItemController;

