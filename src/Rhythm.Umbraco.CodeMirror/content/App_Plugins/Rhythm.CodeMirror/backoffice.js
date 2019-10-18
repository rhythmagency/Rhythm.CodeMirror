(function () {

    const codeMirrorEditorController = function ($scope, $element, $sce, $routeParams, contentResource, editorService, editorState, entityResource) {

        const valueField = $element.find('.rcm-editor__value');
        const editorFrame = $element.find('.rcm-editor__editor-frame');

        // set value field to current model value
        valueField.val($scope.model.value);

        // set up events to map content changes into model changes
        const updateValue = _.debounce(function () {
            $scope.model.value = valueField.val();
            $scope.$apply();
        }, 500);
        valueField.on('value-updated', updateValue);

        // set up editor appearance
        $scope.showToolbar = $scope.model.config.enableImportButton;
        $scope.editorHeight = ($scope.model.config.rows * 16) + 4;
        $scope.frameUrl = $sce.trustAsResourceUrl("/App_Plugins/Rhythm.CodeMirror/codemirror/codemirror.html?lang=" + $scope.model.config.language);

        // set up Import button functionality
        const pickerTemplate = {
            multiPicker: false,
            entityType: 'Content',
            filterCssClass: 'not-allowed not-published',
            startNodeId: null,
            treeAlias: "content",
            section: "content",
            idType: 'id',

            submit: function (model) {
                var snippetSource = null;
                if (angular.isArray(model.selection)) {
                    snippetSource = model.selection[0];
                }
                else {
                    snippetSource = model.selection;
                }

                contentResource.getById(snippetSource.id).then(function (content) {
                    var variant = content.variants[0];
                    if (!variant) {
                        console.error(`Content item #${content.id} has no variants.`);
                        return;
                    }

                    var contentTab = _.find(variant.tabs, function (e) {
                        return e.alias === 'Content';
                    });
                    if (!contentTab) {
                        console.error(`Content item #${content.id} does not have a Content tab.`);
                        return;
                    }

                    var markupProperty = _.find(contentTab.properties, function (e) {
                        return e.alias === 'markup';
                    });
                    if (!markupProperty) {
                        console.error(`Content item #${content.id} does not have a Markup property in its Content tab.`);
                        return;
                    }

                    valueField.val(markupProperty.value);
                    editorFrame[0].contentDocument.dispatchEvent(new Event('value-imported'));
                    $scope.model.value = valueField.val();
                });

                editorService.close();
            },

            close: function () {
                editorService.close();
            }
        };
        entityResource.getByQuery('$site/snippetLibrary', $routeParams.id, 'Document').then(function (ent) {
            pickerTemplate.startNodeId = ent.id;
        });
        $scope.openPicker = function () {
            editorService.contentPicker(pickerTemplate);
        };
    };
    angular.module("umbraco").controller("Rhythm.PropertyEditors.CodeMirrorController", codeMirrorEditorController);

    const codeMirrorLanguageController = function ($scope) {
    };
    angular.module("umbraco").controller("Rhythm.PrevalueEditors.CodeMirrorLanguageController", codeMirrorLanguageController);

})();