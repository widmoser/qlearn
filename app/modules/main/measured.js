(() => {
    var mod = angular.module('qlearn.dd');

    mod.directive('measured', [() => {

        return {
            restrict: 'AC',
            scope: {
                object: '=measured'
            },
            link: function (scope, element, attr) {

                scope.object.metrics = element.metrics();

                console.log(scope.object.metrics, scope.object.metrics.offset.x, scope.object.metrics.offset.y);
            }
        };
    }]);

})();

