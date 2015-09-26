(() => {
    var mod = angular.module('qlearn.dd');

    mod.directive('board', [() => {

        return {
            restrict: 'E',
            templateUrl: 'app/modules/main/board.tpl.html',
            scope: {
            },
            link: function (scope, element, attr) {

                var content = element.children();

                scope.onDragComplete = (data, event) => {
                    console.log(data, event);

                    content.append('<div class="word">' + data + '</div>');

                }

            }
        };
    }]);

})();

