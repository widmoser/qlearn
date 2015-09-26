(() => {
    var app = angular.module('qlearn', [
        'ngRoute',
        'ngDraggable',
        'mgcrea.ngStrap',

        'qlearn.templates.gen',
        'qlearn.dd'
    ]);

    app.config(['$routeProvider', ($routeProvider) => {
        $routeProvider
            .when('/', {
                controller: 'qlearndd',
                templateUrl: 'app/modules/main/main.tpl.html'
            })
            .otherwise({
                redirectTo: '/404'
            });
    }]);

    app.run(() => {
    });
})();