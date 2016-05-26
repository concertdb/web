import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';
import Player from './player/player';

let commonModule = angular.module('app.common', [
    Navbar.name,
    Hero.name,
    User.name,
    Player.name
]);

export default commonModule;
