import angular from 'angular';
import Navbar from './navbar/navbar';
import Player from './player/player';
import ConcertItem from './concertItem/concertItem';

let commonModule = angular.module('app.common', [
    Navbar.name,
    Player.name,
    ConcertItem.name
]);

export default commonModule;
