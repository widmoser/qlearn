(() => { angular.module("qlearn.templates.gen", []).run(["$templateCache", function($templateCache) {$templateCache.put("app/modules/main/main.tpl.html","<div ng-controller=\"qlearndd\">\n    <div class=\"words\">\n        <div class=\"word inline\" ng-repeat=\"w in words track by $index\" ng-drag=\"true\" ng-drag-data=\"w\" ng-drag-success=\"onDragComplete($index)\">{{ w }}</div>\n    </div>\n    <div class=\"board row\" ng-class=\"{ \'solved\' : solved }\">\n        <div class=\"slot-container col-lg-1 col-xs-3 col-sm-2 col-md-2\" ng-class=\"{ filled: w != null }\" ng-repeat=\"w in slots track by $index\" ng-drop=\"true\" ng-drop-success=\"onDropComplete($data, $index)\">\n            <div class=\"slot\">\n                <div class=\"word\" ng-show=\"w != null\" ng-drag=\"true\" ng-drag-data=\"w\" ng-drag-success=\"onDragCompleteFromSlot($index)\">{{ w }}</div>\n            </div>\n        </div>\n    </div>\n</div>");}]); })();