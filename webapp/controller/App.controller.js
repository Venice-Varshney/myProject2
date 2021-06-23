sap.ui.define([
    //calling the library which stores resources of the controller
    "sap/ui/core/mvc/Controller", //call controller from library
    "sap/m/MessageToast", 
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    //calling the contructor and pass all that we will use
], function (Controller, MessageToast, JSONModel, ResourceModel, Fragment, Filter, FilterOperator) {
    "use strict"; //running in strict mode
    //this constructor will return as below
    return Controller.extend("sap.ui.demo.walkthrough", {
 
        //creating a function button click 
        onButtonClick: function () {
            //read message from i18n and show toast
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/firstName");
            var sMsg = oBundle.getText("showDetailsText", [sRecipient]);

            MessageToast.show(sMsg);
        },

        onOpenDialog: function (){
            var oView = this.getView();
            if(!this.byId("saveDialog")){
                //ie if the dialog does not exist create it and load it
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view.SaveDialog",
                    controller: this
                }).then( function (oDialog){
                    //connect dialog to the root view of this component
                    oView.addDependent(oDialog);
                    oDialog.open();
                })
            } else {
                this.byId("saveDialog").open();
            }
        },

        onCloseDialog: function (){
            this.byId("saveDialog").close();
        },

        onSearchUtterences : function (oEvent) {
            // build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("UtterenceName", FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oList = this.byId("utterenceList");
            //get what is binded to the list ie our model
            var oBinding = oList.getBinding("items");
            //and add our filter
            oBinding.filter(aFilter);
        },

        onDelete: function (){
            var oList = this.byId("utterenceList");
            var oModel = oList.getModel();
            var aRows = oModel.getData().Utterences;
            var aContexts = oList.getSelectedContexts();


            // Selected Row
            var oThisObj = aContexts[0].getObject();
            var count = 0;   
            var index = $.map(aRows, function(obj) {
                console.log(obj.UtterenceName);
                if (obj.UtterenceName == oThisObj.UtterenceName) {
                    return count;
                }
                count = count + 1;
            });
            var tempCount = index [0];
            aRows.splice(tempCount, 1);

            this.getView().getModel().setData(aRows);
            oModel.refresh(true);
            oList.removeSelections(true);
            MessageToast.show("Utterence has been deleted");
        },

        onAdd: function (){
            MessageToast.show("Utterence has been added" + aInput );
        }
    });
});