import template from './concertItem.html';
import controller from './concertItem.controller';
import './concertItem.less';

let concertItemComponent = {
    restrict: 'E',
    bindings: {
        // songs: '='
    },
    template,
    controller,
    controllerAs: 'vm'
};

export default concertItemComponent;
