(() => {
    var mod = angular.module('qlearn.dd', []);

    mod.controller('qlearndd', ['$scope', ($scope) => {

        $scope.text = "Bei der Gerechtigkeit Gottes! Wer an diesem Tage seine Lippen öffnet und den Namen seines Herrn erwähnt, auf den werden die Scharen göttlicher Eingebung aus dem Himmel Meines Namens, der Allwissende, der Allweise, herabkommen. Zu ihm wird auch die Versammlung der Höhe herabsteigen, und jeder aus ihr wird einen Kelch reinen Lichtes vorantragen. So wurde es vorherbestimmt im Reiche der Offenbarung Gottes, auf Befehl des Allherrlichen, des Machtvollsten.";
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
            $scope.solved = _.isEqual($scope.solution, $scope.slots);
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