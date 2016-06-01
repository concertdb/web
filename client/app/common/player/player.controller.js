function PlayerController($log, $stateParams, ConcertService){
    "ngInject";

    const vm = this;
    vm.songs = ConcertService.concertSongs[$stateParams.id];
}

export default PlayerController;
