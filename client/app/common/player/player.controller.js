function PlayerController($log, $scope, $stateParams, ConcertService){
    "ngInject";

    const vm = this;
    vm.songs = ConcertService.concertSongs[$stateParams.id];
    vm.showSoundBar = false;
    vm.ConcertService = ConcertService;

    // Event listener for soundmanager2 `isPlaying` event
    $scope.$on('music:isPlaying', function(event, isPlaying) {
        ConcertService.current.isPlaying = isPlaying;
        console.log(isPlaying);
    });
    $scope.$watch('currentPlaying', function(newValue, oldValue){
        if (newValue) {
            ConcertService.current.currentPlaying = newValue;
        }
    });

}

export default PlayerController;
