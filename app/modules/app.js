(() => {
    var app = angular.module('qlearn', [
        'ngRoute',
        'ngDraggable',
        'mgcrea.ngStrap'
    ]);

    app.config(['$routeProvider', ($routeProvider) => {
        $routeProvider
            .when('/', {
                controller: 'MainController',
                templateUrl: 'app/modules/main/main.html'
            })
            .otherwise({
                redirectTo: '/404'
            });
    }]);

    app.run(($http, editableOptions) => {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });
})();