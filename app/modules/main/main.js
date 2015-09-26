(() => {
    var mod = angular.module('qlearn.dd', []);

    mod.controller('qlearndd', ['$scope', ($scope) => {

        $scope.offset = {
            x: -18,
            y: -4
        };

        $scope.words = [ 'Hello', 'Name', 'Hannes!', 'my', 'is' ];

        $scope.orderedWords = [];

        $scope.onDragComplete = (index) => {
            $scope.words.splice(index, 1);
        };

        $scope.onDragCompleteOrdered = (index) => {
            $scope.orderedWords.splice(index, 1);
        };

        $scope.onDropComplete = (data, event) => {
            console.log(data, event);

            // search for the correct index

            var obj = {
                text: data,
                //x: event.tx,
                //y: event.ty,
                cx: event.element.centerX,
                cy: event.element.centerY,
                width: event.element.centerX * 2,
                height: event.element.centerY * 2
            };
            $scope.orderedWords.push(obj);
            console.log(obj.x, obj.y);

            $scope.insertBefore = undefined;
        };

        $scope.onDragMove = (data, event) => {
            //console.log($scope.orderedWords, data, event);

            var i = $scope.orderedWords.findIndex((w) => {
                var x = w.metrics.client.x + $scope.offset.x;
                var y = w.metrics.client.y + $scope.offset.y;
                if (event.tx > x && event.tx < x + w.width && event.ty > y && event.ty < y + w.height) {
                    return true;
                } else {
                    return false;
                }
            });

            $scope.insertBefore = i;

            console.log(event.tx, event.ty, $scope.insertBefore);
        };



    }]);

})();