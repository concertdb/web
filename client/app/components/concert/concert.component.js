import template from './concert.html';
import controller from './concert.controller';
import './concert.less';

let concertComponent = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default concertComponent;
