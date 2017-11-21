'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminTeamCtrl($scope, $rootScope, $stateParams, $sce, TeamService, ErrorHandling) {

    $scope.alerts = [];
    $scope.previousState = $rootScope.previousState;
    $scope.previousStateParams = $rootScope.previousStateParams;

    $scope.cancel = function() {
        console.log('Cancel ckicked');
    }

    // var nullify

    $scope.save = function() {
        console.log('Save clicked');
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };


    //html editor options
    var editorOptions = function(options, inline, onChange) {
        options.inline = inline;
        options.language = $stateParams.lang || 'bg',
            options.skin = 'lightgray';
        options.theme = 'modern';
        options.browser_spellcheck = true;
        options.init_instance_callback = function(editor) {
            var textContentTrigger = function() {
                if (onChange) onChange(editor);
            };

            editor.on('KeyUp', textContentTrigger);
            editor.on('ExecCommand', textContentTrigger);
            editor.on('SetContent', function(e) {
                if (!e.initial)
                    textContentTrigger();
            });
        };
        return options;
    }

    // Bio Html options
    var htmlOptions = function(updateProperty) {
        return editorOptions({
                plugins: [
                    'google_tools advlist autolink lists link image charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'template textcolor colorpicker textpattern'
                ],
                toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link google_tools image | print preview media | forecolor',
                image_caption: true,
                image_advtab: true,
                language: "bg",
                paste_data_images: true
            },
            false
        );
    }

    $scope.bioBgOptions = htmlOptions(function(bio) {
        $scope.team.bio.bg = bio;
        $scope.bgBio = $sce.trustAsHtml(bio);
    });
    $scope.bioEnOptions = htmlOptions(function(bio) {
        $scope.team.bio.en = bio;
        $scope.enBio = $sce.trustAsHtml(bio);
    });


    var init = function(team) {
        $scope.team = team;

        $scope.bgBio = $sce.trustAsHtml(team.bio.bg);
        $scope.enBio = $sce.trustAsHtml(team.bio.en);
        var bio = angular.copy(team.bio);
        $scope.bio = bio;
    }

    if ($stateParams.id) {
        TeamService.team($stateParams.id)
            .then(init)
            .catch(err => $scope.alerts.push({ type: 'danger', msg: err + "" }));
    } else {
        init({
            name: { bg: '', en: '' },
            job: { bg: '', en: '' },
            phone: { bg: '', en: '' },
            bio: { bg: '', en: '' },
            localId: '',
            email: '',
            // image: {
            //     config: {
            //         fill: true,
            //         horizontalalign: "center",
            //         verticalalign: "center"
            //     }
            // },
            published: false,
            deleted: false
        });
    }
}

controllersModule.controller('AdminTeamCtrl', AdminTeamCtrl);