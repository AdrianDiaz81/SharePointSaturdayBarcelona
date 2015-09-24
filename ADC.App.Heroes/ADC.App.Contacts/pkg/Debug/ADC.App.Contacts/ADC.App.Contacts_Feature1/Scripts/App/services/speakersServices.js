(function () {
    'use strict';
    angular
      .module('speakersServices', ['ngResource'])
     .factory('Speaker',['$resource', function ($resource) {
         var service = {
             getSpeaker: getSpeaker,
             getSpeakerById: getSpeakerById,
             editSpeaker: editSpeaker,
             deleteSpeaker: deleteSpeaker,
             addSpeaker: addSpeaker,

         };
         return service;
     }]);
    ////Speakers.$inject = ['$resource'];
    //function Speakers($resource) {
        
    //}
        function getSpeaker() {
            var deferred = $.Deferred();
            var context = new SP.ClientContext();            
            var web = context.get_web();
            context.load(web);
            var list = web.get_lists().getByTitle('Speakers');
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml('<View><RowLimit>20</RowLimit></View>');
            var collListItem = list.getItems(camlQuery);
            context.load(collListItem);
            context.executeQueryAsync(
               Function.createDelegate(this, function (sender, args) {
                   var listItemEnumerator = collListItem.getEnumerator();
                   var result = [];
                   while (listItemEnumerator.moveNext()) {
                       var listItem = listItemEnumerator.get_current();
                       var superheroes = {
                           Id: listItem.get_id(),
                           Titulo: listItem.get_item("Title"),
                           Apellidos: listItem.get_item("Apellidos"),
                           Foto: listItem.get_item("Foto"),
                           PuestoTrabajo: listItem.get_item("PuestoTrabajo")
                       };
                       result.push(superheroes);
                   }
                
                   deferred.resolve(result);
               }),
               Function.createDelegate(this, function (sender, args) {
                   deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
               })
           );
            return deferred.promise();
        }

        function getSpeakerById(id) {
            var deferred = $.Deferred();
            var context = new SP.ClientContext();
            var web = context.get_web();
            context.load(web);
            var list = web.get_lists().getByTitle('Speakers');
            var listItem = list.getItemById(id);
            context.load(listItem);
            context.executeQueryAsync(
               Function.createDelegate(this, function (sender, args) {
                   var superheroes = {
                       Id: listItem.get_id(),
                       Titulo: listItem.get_item("Title"),
                       Apellidos: listItem.get_item("Apellidos"),
                       Foto: listItem.get_item("Foto"),
                       PuestoTrabajo: listItem.get_item("PuestoTrabajo")
                   };

                   deferred.resolve(superheroes);
               }),
               Function.createDelegate(this, function (sender, args) {
                   deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
               })
           );
            return deferred.promise();

        }

        function editSpeaker(scope) {
            var deferred = $.Deferred();
            var context = new SP.ClientContext();
            var web = context.get_web();
            context.load(web);
            var list = web.get_lists().getByTitle('Speakers');
            var listItem = list.getItemById(scope.Id);
            listItem.set_item('Title', scope.Titulo);
            listItem.set_item('Apellidos', scope.Apellidos);
            listItem.set_item('Foto', scope.Foto);
            listItem.set_item('PuestoTrabajo', scope.PuestoTrabajo);
            listItem.update();

            context.executeQueryAsync(
                Function.createDelegate(this, function (sender, args) {
                    deferred.resolve(true);
                }),
                Function.createDelegate(this, function (sender, args) {
                    deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                })
            );
            return deferred.promise;
        }

        function deleteSpeaker (id) {
            var deferred = $.Deferred();

            var context = new SP.ClientContext();

            var web = context.get_web();
            context.load(web);
            var list = web.get_lists().getByTitle('Speakers');

            var listItem = list.getItemById(id);
            listItem.deleteObject();
            context.executeQueryAsync(
                    Function.createDelegate(this, function () {
                        deferred.resolve(true);
                    }),
                    Function.createDelegate(this, function () {
                        deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                    })
                );
            return deferred.promise;
        }

        function addSpeaker  (speaker) {
            var deferred = $.Deferred();

            var context = new SP.ClientContext();
           
            var web = context.get_web();
            context.load(web);
            var list = web.get_lists().getByTitle('Speakers');

            // create the ListItemInformational object
            var listItemInfo = new SP.ListItemCreationInformation();
            var listItem = list.addItem(listItemInfo);
            listItem.set_item('Title', speaker.Titulo);
            listItem.set_item('Apellidos', speaker.Apellidos);
            listItem.set_item('Foto', speaker.Foto);
            listItem.set_item('PuestoTrabajo', speaker.PuestoTrabajo);
            listItem.update();

            context.executeQueryAsync(
                function () {
                    var id = listItem.get_id();
                    deferred.resolve(id);
                },
                function (sender, args) {
                    deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                }
            );

            return deferred;
        };


})()