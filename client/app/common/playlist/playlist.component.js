import template from './playlist.html';
import controller from './playlist.controller';
import './playlist.less';

let playlistComponent = {
    restrict: 'E',
    bindings: {
        // songs: '='
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default playlistComponent;
