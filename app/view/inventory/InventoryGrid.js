// var exportButton = new Ext.ux.Exporter.Button({ 
//   text     : "Download as .xls" 
// });
requires: ['Ext.ux.grid.FiltersFeature'];
Ext.define('ImpulseOne.view.inventory.InventoryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.inventorygrid',
    id: 'inventoryGrid',
    //columnLines: true,
    loadMask: true,
    verticalScrollerType: 'paginggridscroller',
    invalidateScrollerOnRefresh: false,
    //disableSelection: true,
    remoteSort: true,

    initComponent: function() {
        this.store = 'Inventory';
        var me = this;
        this.tbar = [{
            icon:'/data/icons/filter_data.png',
            text: 'Filters'
        }, '-',
        {
            xtype: 'textfield',
            name: 'domainFilter',
            emptyText: 'Domain',
            id: 'DomainFilter'
        }, {
            xtype: 'combobox',
            name: 'channelFilter',
            style: {
                'font-size': '11px'
            },
            store: ['MobileWeb', 'MobileApp', 'DesktopDisplay', 'DesktopVideo'],
            emptyText: 'Channel',
            editable: false,
            typeAhead: true,
            multiSelect: true,
            id: 'ChannelFilter'
        }, {
            xtype: 'combobox',
            name: 'exchangeFilter',
            itemCls: 'combobox-style',
            store: ['GoogleAdX', 'OpenX', 'Rubicon', 'Pubmatics', 'SpotXchange'],
            emptyText: 'Exchange',
            editable: true,
            delimiter: ' and ',
            typeAhead: true,
            multiSelect: true,
            id: 'ExchangeFilter'
        }, {
            xtype: 'combobox',
            name: 'countryFilter',
            style: {
                'font-size': '11px'
            },
            valueField: 'countryId',
            displayField: 'countryName',
            mode: 'local',
            store: new Ext.data.SimpleStore({
                fields: ['countryId', 'countryName'],
                data: [
                ['IN', 'India'],
                ['SA', 'South Africa'],
                ['KE', 'Kenya'],
                ['AE', 'UAE'],
                ['MY', 'Malaysia'],
                ['ID', 'Indonesia'],
                ['SG', 'Singapore'],
                ['HK', 'Hong Kong'],
                ['SK', 'South Korea'],
                ['VN', 'Vietnam'],
                ['TH', 'Thailand'],
                ['PH', 'Phillipines'],
                ['JP', 'Japan']
                ],
                autoLoad: false
            }),
            listConfig: {
                getInnerTpl: function() {
                    var tpl = '<div>'+
                    '<img src="data/icons/flags/{countryId}.png" align="left">&nbsp;&nbsp;'+
                    '{countryName}</div>';
                    return tpl;
                }
            },
            emptyText: 'Country',
            editable: false,
            id: 'CountryFilter'
        }, {
            xtype: 'combobox',
            width: 220,
            name: 'categoryFilter',
            //pageSize: true,
            emptyText: 'Category',
            editable: true,
            typeAhead: true,
            multiSelect: true,
            valueField: 'catId',
            displayField: 'categoryName',
            id: 'CategoryFilter',
            store: {
                //autoLoad: true,
                fields: ['catId', 'categoryName'],
                mode: 'local',
                triggerAction: 'all',
                pageSize: 10,
                proxy: {
                    type: 'ajax',
                    url: 'https://terminal.impulse01.com/newServer.php?do=get_categories',
                    reader: {
                        type: 'json',
                        root: 'data',
                        successProperty: 'success'
                    }
                }
            }
        }, {
            xtype: 'button',
            text: 'Search',
            icon: 'data/icons/search.png',
            id: 'applySearch',
            // store: 'Inventory'
        },

        '->', '-',
        {
            xtype: 'buttongroup',
            items: [{
                xtype: 'splitbutton',
                text: '  Export as   ',
                icon: 'data/icons/export.png',
                arrowAlign: 'right',
                menu: [{
                    id: 'csv',
                    icon: 'data/icons/csv.png',
                    text: 'CSV file',
                    handler: function() {
                     var channel = Ext.getCmp('ChannelFilter').getValue();
                     var filter = Ext.getCmp('DomainFilter').getValue();
                     var exchange = Ext.getCmp('ExchangeFilter').getValue();
                     var category = Ext.getCmp('CategoryFilter').getValue();
                     var country = Ext.getCmp('CountryFilter').getValue();
                     var url = 'https://terminal.impulse01.com/newServer.php?do=exportInventory&channel='+channel+'&filter='+filter+'&exchange='+exchange+'&category='+category+'&country='+country+'&format=CSV';
                     window.open(url, '_blank');
                 }
             }, {
                text: 'Microsoft Excel',
                id: 'excel',
                icon: 'data/icons/excel.png',
                handler: function() {
                    var channel = Ext.getCmp('ChannelFilter').getValue();
                    var filter = Ext.getCmp('DomainFilter').getValue();
                    var exchange = Ext.getCmp('ExchangeFilter').getValue();
                    var category = Ext.getCmp('CategoryFilter').getValue();
                    var country = Ext.getCmp('CountryFilter').getValue(); 
                    var url = 'https://terminal.impulse01.com/newServer.php?do=exportInventory&channel='+channel+'&filter='+filter+'&exchange='+exchange+'&category='+category+'&country='+country+'&format=MSExcel';
                    window.open(url, '_blank');
                }
            }]
        }]
    }, '-'];
    this.columns = [{
        text: " Id ",
        width: 70,
        dataIndex: 'sourceId',
        sortable: false,

    }, {
        text: " Domain ",
            //style: {'font-weight':'bold','color':'green'},
            tdCls: 'custom-inventory-grid-domain',
            flex: 1.5,
            dataIndex: 'domain',
            // renderer: function(value) {
            //     return '<a href="http://'+value+'">'+value+'</a>';
            // },
            sortable: false,

        }, {
            text: " Category ",
            flex: 1,
            tdCls: 'custom-inventory-grid-category',
            dataIndex: 'category',
            sortable: false,

        }, {
            text: " Verified",
            flex: 0.4,
            dataIndex: 'manuallyVerified',
            renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                switch(value) {
                    case 'Y':
                    metaData.css = 'verified-true';
                    icon = 'data/icons/true.jpg';
                    return '<img src="' + icon + '" />';
                    break;
                    case 'N':
                    metaData.css = 'verified-false';
                    icon = 'data/icons/false.jpg';
                    return '<img src="' + icon + '" />';
                    break;
                }
            }
        }, {
            text: " Channel",
            flex: 0.8,
            dataIndex: 'channel',
            sortable: false,

        }, {
            text: " Exchange",
            flex: 0.8,
            dataIndex: 'exchange',
            sortable: false,

        }, {
            text: " Country",
            flex: 0.5,
            dataIndex: 'country',
            sortable: false,

        }, {
            text: "Today Impressions",
            flex: 0.7,
            dataIndex: 'todayImpressions',
            sortable: true
        }, {
            text: "Avg Daily Impressions",
            flex: 0.8,
            dataIndex: 'averageDailyImpressions'
        }, {
            text: "Avg CPM",
            flex: 0.7,
            dataIndex: 'averageCpm',
            sortable: false,
        }];
        this.viewConfig = {
            forceFit: true,
            trackOver: false,
            singleSelect: true
        };
        this.features = {
            ftype: 'filters',
            updateBuffer: 1000 // trigger load after a 1 second timer
        },

        this.callParent(arguments);
    },
});

// Ext.override(Ext.data.Store, {
//     // Handle prefetch when all the data is there and add purging
//     prefetchPage: function(page, options, forceLoad) {
//         var me = this,
//             pageSize = me.pageSize || 25,
//             start = (page - 1) * me.pageSize,
//             end = start + pageSize;
//         // A good time to remove records greater than cache
//         me.purgeRecords();
//         // No more data to prefetch
//         if(me.getCount() === me.getTotalCount() && !forceLoad) {
//             return;
//         }
//         // Currently not requesting this page and range isn't already satisified
//         if(Ext.Array.indexOf(me.pagesRequested, page) === -1 && !me.rangeSatisfied(start, end)) {
//             me.pagesRequested.push(page);
//             // Copy options into a new object so as not to mutate passed in objects
//             options = Ext.apply({
//                 page: page,
//                 start: start,
//                 limit: pageSize,
//                 callback: me.onWaitForGuarantee,
//                 scope: me
//             }, options);
//             me.prefetch(options);
//         }
//     },
//     // Fixes too big guaranteedEnd and forces load even if all data is there
//     doSort: function() {
//         var me = this;
//         if(me.buffered) {
//             me.prefetchData.clear();
//             me.prefetchPage(1, {
//                 callback: function(records, operation, success) {
//                     if(success) {
//                         guaranteeRange = records.length < 100 ? records.length : 100
//                         me.guaranteedStart = 0;
//                         me.guaranteedEnd = 99; // should be more dynamic
//                         me.loadRecords(Ext.Array.slice(records, 0, guaranteeRange));
//                         me.unmask();
//                     }
//                 }
//             }, true);
//             me.mask();
//         }
//     }
// });
// Ext.override(Ext.ux.grid.FiltersFeature, {
//     onBeforeLoad: Ext.emptyFn,
//     // Appends the filter params, fixes too big guaranteedEnd and forces load even if all data is there
//     reload: function() {
//         var me = this,
//             grid = me.getGridPanel(),
//             filters = grid.filters.getFilterData(),
//             store = me.view.getStore(),
//             proxy = store.getProxy();
//         store.prefetchData.clear();
//         proxy.extraParams = this.buildQuery(filters);
//         store.prefetchPage(1, {
//             callback: function(records, operation, success) {
//                 if(success) {
//                     guaranteeRange = records.length < 100 ? records.length : 100;
//                     store.guaranteedStart = 0;
//                     store.guaranteedEnd = 99; // should be more dynamic
//                     store.loadRecords(Ext.Array.slice(records, 0, guaranteeRange));
//                     store.unmask();
//                 }
//             }
//         }, true);
//         store.mask();
//     }
// });