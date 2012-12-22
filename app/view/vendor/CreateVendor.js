Ext.define('ImpulseOne.view.vendor.CreateVendor', {
    extend: 'Ext.window.Window',
    alias: 'widget.createvendor',
    layout: 'fit',
    title: 'Create a new Vendor',
    autoShow: true,
    width: 400,
    height: 440,
    modal: true,
    id: 'createvendor',

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            bodyPadding: 10,
            layout: 'anchor',
            autoScroll: true,
            id: 'newvendorform',
            defaults: {
                anchor: '100%',
                labelWidth: 150
            },
            defaultType: 'textfield',
            items: [{
                name: 'vendorName',
                fieldLabel: 'Vendor Name',
                padding: '0 0 7 0',
                allowBlank: false
            }, {
                xtype: 'combobox',
                name: 'entityType',
                store: ["Individual", "Corporation", "Partnership", "Proprietorship"],
                fieldLabel: 'Vendor Type',
                forceSelection: true,
                allowBlank: false,
                editable: false,
                padding: '0 0 7 0',
                value: 'Individual'
            }, {
                name: 'address',
                fieldLabel: 'Address',
                padding: '0 0 7 0',
            }, {
                name: 'state',
                fieldLabel: 'State',
                padding: '0 0 7 0',
            }, {
                name: 'city',
                padding: '0 0 7 0',
                fieldLabel: 'City'
            }, {
                xtype: 'combobox',
                name: 'country',
                padding: '0 0 7 0',
                store: ['India', 'South Africa', 'Kenya', 'UAE', 'Malaysia', 'Indonesia', 'Singapore', 'Hong Kong', 'South Korea', 'Vietnam', 'Thailand', 'Phillipines', 'Japan'],
                fieldLabel: 'Country',
                editable: false,
                value : 'India'
            }, {
                name: 'zip',
                padding: '0 0 7 0',
                fieldLabel: 'Zip'
            }, {
                name: 'phone',
                padding: '0 0 7 0',
                fieldLabel: 'Phone',
                
            }, {
                name: 'ceoName',
                padding: '0 0 7 0',
                fieldLabel: 'CEO Name'
            }, {
                name: 'ceoEmail',
                padding: '0 0 7 0',
                fieldLabel: 'CEO Email',
                vtype: 'email'
            }, {
                name: 'rmName',
                padding: '0 0 7 0',
                fieldLabel: 'Contact Person'
            }, {
                name: 'rmMobile',
                padding: '0 0 7 0',
                fieldLabel: 'Contact Person\'s Mobile'
            }, {
                name: 'rmEmail',
                padding: '0 0 7 0',
                fieldLabel: 'Contact Person\'s EMail',
                vtype: 'email'
            }]
        }];

        this.buttons = [{
            text: 'Save',
            action: 'save'
        }, {
            text: 'Cancel',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }

});