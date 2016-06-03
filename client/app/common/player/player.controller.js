function PlayerController($log, $scope, $stateParams, ConcertService){
    "ngInject";

    const vm = this;
    vm.songs = ConcertService.concertSongs[$stateParams.id];
    vm.showSoundBar = false;
    // Event listener for soundmanager2 `isPlaying` event
    $scope.$on('music:isPlaying', function(event, isPlaying) {
        vm.showSoundBar = true;
        console.log(isPlaying);
    });
}

export default PlayerController;
