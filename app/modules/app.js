(() => {
    var app = angular.module('qlearn', [
        'ngRoute',
        'ngDraggable',
        'mgcrea.ngStrap',

        'qlearn.templates.gen'
    ]);

    app.config(['$routeProvider', ($routeProvider) => {
        $routeProvider
            .when('/', {
                controller: 'qlearn.dd',
                templateUrl: 'app/modules/main/main.tpl.html'
            })
            .otherwise({
                redirectTo: '/404'
            });
    }]);

    app.run(() => {
    });
})();