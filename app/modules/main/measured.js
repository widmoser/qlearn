(() => {
    var mod = angular.module('qlearn.dd');

    mod.directive('measured', [() => {

        return {
            restrict: 'AC',
            scope: {
                object: '=measured',
                list: '='
            },
            link: function (scope, element, attr) {
                scope.object.element = element;
                element.css('width', scope.object.width);
                scope.list.forEach((o) => {
                    o.metrics = o.element.metrics();
                    console.log(o.metrics.client.x, o.metrics.client.y, o.metrics.offset.width);
                });
            }
        };
    }]);

})();

