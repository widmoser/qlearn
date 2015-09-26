(() => {
    var mod = angular.module('qlearn.dd', []);

    mod.controller('qlearndd', ['$scope', ($scope) => {

        $scope.text = "Hello my Name is Hannes!";
        $scope.solution = $scope.text.split(' ');
        $scope.words = _.shuffle($scope.solution);

        $scope.slots = Array($scope.words.length).fill(null);

        $scope.orderedWords = [];

        $scope.onDragComplete = (index) => {
            $scope.words.splice(index, 1);
        };

        $scope.onDragCompleteFromSlot = (index) => {
            $scope.slots[index] = null;
        };

        $scope.onDropComplete = (data, index) => {
            console.log(data, index);

            if ($scope.slots[index] != null) {
                $scope.words.push($scope.slots[index]);
            }

            $scope.slots[index] = data;
            if (_.isEqual($scope.solution, $scope.slots)) {
                $scope.solved = true;
            }
        };

        $scope.onDragMove = (data, index) => {
            //console.log($scope.orderedWords, data, event);

            if (index !== undefined) {
                $scope.insertBefore = index;
            } else {
                $scope.insertBefore = $scope.orderedWords.length;
            }

            console.log(index);
        };



    }]);

})();