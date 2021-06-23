// using this for initializations of the app 
// such that the Controller has only the functions for the view and not whole app

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
        metadata: {
            manifest : "json"
        },

        //initializing resources in Init function
        init: function () {
            //call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            //set data models
            var oData = {
                recipient: {
                    firstName: "Venice",
                    lastName: "Varshney"
                }
            };
            // setting our model
            //var oModel = new JSONModel(oData);
            var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/walkthrough/Utterences.json"));
            this.setModel(oModel);

        }
    })
})
