function PlayerController($log, $scope, $window, $stateParams, angularPlayer, ConcertService){
    "ngInject";

    const vm = this;
    vm.songs = ConcertService.concertSongs[$stateParams.id];
    vm.showSoundBar = false;
    vm.ConcertService = ConcertService;

    // Event listener for soundmanager2 `isPlaying` event
    $scope.$on('music:isPlaying', function(event, isPlaying) {
        ConcertService.current.isPlaying = isPlaying;
    });
    $scope.$watch('currentPlaying', function(newValue, oldValue){
        if (newValue) {
            ConcertService.current.currentPlaying = newValue;
        }
    });
    $scope.showPlayer = function showPlayer(){
        //Once a song is playing, then the soundBar will always be displayed in UI.
        var isPlaying = angularPlayer.isPlayingStatus();
        if (isPlaying) {
            vm.showSoundBar = true;
        }
        return vm.showSoundBar;
    };

    //Prevent scrollbar from scrolling down
    $window.onkeydown = function(e) {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    }
    // 37- left
    // 39- right
    //Toggle play/pause when the spacebar is pressed
    $window.onkeyup = function(e){
        if(e.keyCode === 32){
            e.preventDefault();
            toggleIsPlaying();
            // vm.ConcertService.current.isPlaying = !vm.ConcertService.current.isPlaying;
            // @todo: Figure out how to toggle isPlaying
        }
    };
    function toggleIsPlaying() {
        if ($scope.isPlaying) {
            angularPlayer.pause();
        } else {
            angularPlayer.play()
        }
    }

}

export default PlayerController;
