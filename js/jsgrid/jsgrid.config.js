$(function() {

    $("#jsGrid").jsGrid({
            height: "70%",
            width: "100%",
            autoload: true,
            filtering: true,
            editing: true,
            inserting: true,
            sorting: true,
            paging: true,
            autoload: true,
            pageSize: 15,
            confirmDeleting: false,
            pageButtonCount: 5,
             controller: {
                loadData: function() {
                    return db.clients;
                }
            },
            onItemDeleting: function (args) {
              console.log(args)
                if (!args.item.deleteConfirmed) { // custom property for confirmation
                  args.cancel = true; // cancel deleting
                  swal({
                     title: "Are you sure?",
                     text: "You will not be able to recover this imaginary file!",
                     icon: "warning",
                     buttons: [
                       'No, cancel it!',
                       'Yes, I am sure!'
                     ],
                     dangerMode: true,
                    }).then(function(isConfirm) {
                         if (isConfirm) {
                           swal({
                             title: 'Deleted!',
                             text: '',
                             icon: 'success'
                           }).then(function() {
                             args.item.deleteConfirmed = true;
                             $("#jsGrid").jsGrid("deleteItem", args.item);
                           });
                         } else {
                           swal({
                           title: "Cancelled",
                           text: "",
                           icon: "error"});
                           args.cancel = true; // cancel deleting
                         }
                      })
                }
            },
        fields: [
                {
               headerTemplate: function() {
                   return $("<input>").attr("type", "button")
                                       .attr("class", "jsgrid-button jsgrid-delete-button")
                                       .attr("title", "Delete")
                           .on("click", function () {
                               deleteSelectedItems();
                           });
               },
               itemTemplate: function(val, item) {
                    return $("<input>")
                        .attr("type", "checkbox")
                        .on("change", function() {
                            if($(this).is(":checked")) {
                                selectedItems.push(item);
                            } else {
                                selectedItems = $.grep(selectedItems, function(i) {
                                     return i !== item;
                                });
                            }
                        });
                },
               align: "center",
               width: 50,
               sorting: false,
               editing: false,
               inserting: false
           },
            { name: "Name", type: "text", width: 150,  validate: "required" },
            { name: "Age", type: "number", width: 50 , validate: "required" },
            { name: "Address", type: "text", width: 200 , validate: "required" },
            { name: "Country", type: "select", items: db.countries, valueField: "Id", textField: "Name" },
            { name: "Married", type: "checkbox", title: "Is Married", sorting: true },
            { type: "control" }
        ]
    });


    var selectedItems = [];

    var selectItem = function(item) {
        selectedItems.push(item);
    };

    var unselectItem = function(item) {
        selectedItems = $.grep(selectedItems, function(i) {
            return i !== item;
        });
    };

    var deleteSelectedItems = function() {
                  swal({
                     title: "Are you sure?",
                     text: "You will not be able to recover this imaginary file!",
                     icon: "warning",
                     buttons: [
                       'No, cancel it!',
                       'Yes, I am sure!'
                     ],
                     dangerMode: true,
                    }).then(function(isConfirm) {
                         if (selectedItems.length || isConfirm) {
                           deleteClientsFromDb(selectedItems);

                           var $grid = $("#jsGrid");
                           $grid.jsGrid("option", "pageIndex", 1);
                           $grid.jsGrid("loadData");

                           selectedItems = [];
                           swal({
                             title: 'Deleted!',
                             text: '',
                             icon: 'success'
                           })
                         } else {
                           swal({
                           title: "Cancelled",
                           text: "",
                           icon: "error"});
                           return
                         }
                      })
    };

    var deleteClientsFromDb = function(deletingClients) {
        db.clients = $.map(db.clients, function(client) {
            return ($.inArray(client, deletingClients) > -1) ? null : client;
        });
    };

});



// $(function() {
//
// $("#jsGrid").jsGrid({
//       height: "70%",
//       width: "100%",
//       autoload: true,
//       filtering: true,
//       editing: true,
//       inserting: true,
//       sorting: true,
//       paging: true,
//       autoload: true,
//       pageSize: 15,
//       confirmDeleting: false,
//       pageButtonCount: 5,
//       controller: db,
//       onItemDeleting: function (args) {
//         console.log(args)
//           if (!args.item.deleteConfirmed) { // custom property for confirmation
//             args.cancel = true; // cancel deleting
//             swal({
//                title: "Are you sure?",
//                text: "You will not be able to recover this imaginary file!",
//                icon: "warning",
//                buttons: [
//                  'No, cancel it!',
//                  'Yes, I am sure!'
//                ],
//                dangerMode: true,
//               }).then(function(isConfirm) {
//                    if (isConfirm) {
//                      swal({
//                        title: 'Deleted!',
//                        text: '',
//                        icon: 'success'
//                      }).then(function() {
//                        args.item.deleteConfirmed = true;
//                        $("#jsGrid").jsGrid("deleteItem", args.item);
//                      });
//                    } else {
//                      swal({
//                      title: "Cancelled",
//                      text: "",
//                      icon: "error"});
//                      args.cancel = true; // cancel deleting
//                    }
//                 })
//           }
//       },
//       fields: [
//               {
//              headerTemplate: function() {
//                  return $("<input>").attr("type", "button")
//                                      .attr("class", "jsgrid-button jsgrid-delete-button")
//                                      .attr("title", "Delete")
//                          .on("click", function () {
//                              deleteSelectedItems();
//                          });
//              },
//              itemTemplate: function(val, item) {
//                   return $("<input>")
//                       .attr("type", "checkbox")
//                       .on("change", function() {
//                           if($(this).is(":checked")) {
//                               selectedItems.push(item);
//                           } else {
//                               selectedItems = $.grep(selectedItems, function(i) {
//                                    return i !== item;
//                               });
//                           }
//                       });
//               },
//              align: "center",
//              width: 50,
//              sorting: false,
//              editing: false,
//              inserting: false
//          },
//           { name: "Name", type: "text", width: 150,  validate: "required" },
//           { name: "Age", type: "number", width: 50 , validate: "required" },
//           { name: "Address", type: "text", width: 200 , validate: "required" },
//           { name: "Country", type: "select", items: db.countries, valueField: "Id", textField: "Name" },
//           { name: "Married", type: "checkbox", title: "Is Married", sorting: true },
//           { type: "control" }
//       ]
//   });
//
//   var selectedItems = [];
//
//   var selectItem = function(item) {
//       selectedItems.push(item);
//   };
//
//   var unselectItem = function(item) {
//       selectedItems = $.grep(selectedItems, function(i) {
//           return i !== item;
//       });
//   };
//
//   var selectedItems = [];
//               var selectItem = function(item) {
//                   selectedItems.push(item);
//               };
//               var unselectItem = function(item) {
//                   selectedItems = $.grep(selectedItems, function(i) {
//                       return i !== item;
//                   });
//               };
//               var deleteSelectedItems = function() {
//                 if (!selectedItems.length) {
//                   swal({
//                     title: "Select an item first!",
//                     icon: "error",
//                     dangerMode: true,
//                   });
//                   return;
//                 }
//
//
//                 swal({
//                    title: "Are you sure?",
//                    text: "You will not be able to recover this imaginary file!",
//                    icon: "warning",
//                    buttons: [
//                      'No, cancel it!',
//                      'Yes, I am sure!'
//                    ],
//                    dangerMode: true,
//                   }).then(function(isConfirm) {
//                        if (isConfirm) {
//                          swal({
//                            title: 'Deleted!',
//                            text: '',
//                            icon: 'success'
//                          }).then(function() {
//                            deleteClientsFromDb(selectedItems);
//                            var $grid = $("#jsGrid");
//                            $grid.jsGrid("option", "pageIndex", 1);
//                            $grid.jsGrid("loadData");
//                            selectedItems = [];
//                          });
//                        } else {
//                          swal({
//                          title: "Cancelled",
//                          text: "",
//                          icon: "error"});
//                          swal("Cancelled", "error");
//                        }
//                     })
//
//               };
//
//               var deleteClientsFromDb = function(deletingClients) {
//                   db.clients = $.map(db.clients, function(client) {
//                       return ($.inArray(client, deletingClients) > -1) ? null : client;
//                   });
//               };
//
//
//   // var deleteSelectedItems = function() {
//   //   if (selectedItems.length <= 0 ) {
//   //     swal({
//   //       title: "Select an item first!",
//   //       icon: "error",
//   //       dangerMode: true,
//   //     });
//   //     return;
//   //   }
//   //
//   //     // if(!selectedItems.length || !confirm("Are you sure?"))
//   //     //     return;
//   //     //
//   //
//   // };
//
// });
