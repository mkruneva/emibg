'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminTeamCtrl($scope, $rootScope, $stateParams, $http, $state, $sce, TeamService, EmiAuth, ErrorHandling) {

    $scope.alerts = [];
    $scope.previousState = $rootScope.previousState;
    $scope.previousStateParams = $rootScope.previousStateParams;

    $scope.cancel = function() {
        if ($rootScope.previousState) {
            $state.go($scope.previousState, $scope.previousStateParams);
        } else {
            $state.go("app.admin.teams");
        }
    }

    var nullify = function(field) {
        if (field.bg != null && field.bg != undefined && field.bg.trim() === "")
            field.bg = null;
        if (field.en != null && field.en != undefined && field.en.trim() === "")
            field.en = null;
    }

    $scope.save = function() {

        $scope.alerts = [];

        // Remove the empty props to be able to filter with exists in ES
        nullify($scope.team.title);
        $scope.team.bio = $scope.bio;

        var method = $http.post;
        var url = "/api/teams";
        if ($scope.team.id) {
            method = $http.put;
            url = "/api/teams/" + $scope.team.id;
        }
        ErrorHandling.handle(method(url, $scope.team, EmiAuth.addAuthHeader({})))
            .then(function(data) {
                $scope.team = data;
                $scope.bio = data.bio;
                $scope.alerts.push({ type: 'success', msg: $sce.trustAsHtml("Екипът е записан успешно") });
            })
            .catch(function(err) {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се запише екипът в момента. Моля опитайте отново. " + err });
                console.log(err);
            });
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

    var editor = null;

    // Bio Html options
    var htmlOptions = function(updateProperty) {
        return editorOptions({
                plugins: [
                    'google_tools advlist autolink lists link image charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'template textcolor colorpicker textpattern'
                ],
                toolbar1: 'undo redo | bold italic | alignleft alignjustify | bullist numlist outdent indent | forecolor',
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
            localId: 10,
            email: '',
            image: {
                config: {
                    fill: true,
                    horizontalalign: "center",
                    verticalalign: "center"
                }
            },
            published: false,
            deleted: false
        });
    }
}

controllersModule.controller('AdminTeamCtrl', AdminTeamCtrl);