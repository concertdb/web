function NavbarController($log, $scope, $mdSidenav){
    "ngInject";

    const vm = this;
    this.name = 'navbar';

    $scope.toggleSidenav = function toggleSidenav(menuId) {
        $mdSidenav(menuId).toggle();
    };
}

export default NavbarController;
