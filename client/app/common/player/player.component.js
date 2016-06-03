import template from './player.html';
import controller from './player.controller';
import './player.less';

let playerComponent = {
    restrict: 'E',
    bindings: {
        // songs: '='
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default playerComponent;
