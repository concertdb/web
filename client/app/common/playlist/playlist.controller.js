function PlaylistController($log, $scope, $timeout, $stateParams, angularPlayer, ConcertService){
    "ngInject";

    const vm = this;
    vm.songs = ConcertService.concertSongs[$stateParams.id];
    vm.showSoundBar = false;
    vm.ConcertService = ConcertService;
    var isDeleting;

    // Expose soundmanager2 `playlist` on this scope
    $scope.playlist = angularPlayer.getPlaylist();

    // Event listener for soundmanager2 `isPlaying` event
    $scope.$on('music:isPlaying', function(event, isPlaying) {
        ConcertService.current.isPlaying = isPlaying;
    });
    $scope.$watch('currentPlaying', function(newValue, oldValue){
        if (newValue) {
            ConcertService.current.currentPlaying = newValue;
        }
    });

    // $scope.$watch('playlist', function(newSoundManagerPlaylist, oldValue){
    //     debugger;
    //
    //     if (newSoundManagerPlaylist && newSoundManagerPlaylist) {
    //         debugger;
    //     }
    // });
    vm.removeSongFromPlaylist = function (song, index) {
        $timeout(function(){
            // isDeleting = false;
            angularPlayer.removeSong(song.id, index);
            angularPlayer.nextTrack();
        })

    }

}

export default PlaylistController;
