/*global define */

define(['jquery', 'translate'], function ($, translate) {
    'use strict';

    var auctionDecoration;

    auctionDecoration = {
        init : function() {
            this.oTable();
        },

        oTable : function() {
            return $('#decorationTable').dataTable({
                'bProcessing': true,
                'bJQueryUI': true,
                'bStateSave': false,
                'bDestroy': true,
                'oSearch': { 'sSearch': '' },
                //'sPaginationType': 'full_numbers',
                'bServerSide': true,
                'sAjaxSource': 'fill/auction/bydecoration',
                'oLanguage': {
                    'sProcessing': translate.sProcessing,
                    'sLengthMenu': translate.sLengthMenu,
                    'sZeroRecords': translate.sZeroRecords,
                    'sInfo': translate.sInfo,
                    'sInfoEmpty': translate.sInfoEmpty,
                    'sInfoFiltered': translate.sInfoFiltered,
                    'sSearch': translate.sSearch,
                    'sInfoPostFix': '',
                    'sUrl': '',
                    'oPaginate': {
                        'sFirst': translate.sFirst,
                        'sPrevious': translate.sPrevious,
                        'sNext': translate.sNext,
                        'sLast': translate.sLast
                    }
                },
                'fnServerData': function ( sSource, aoData, fnCallback ) {
                    $.ajax( {
                        'dataType': 'json',
                        'type': 'GET',
                        'url': sSource,
                        'data': aoData,
                        'success': fnCallback,
                        'timeout': 15000,
                        'error': this.handleAjaxError
                    } );
                }
            });
        },

        handleAjaxError: function ( xhr, textStatus) {
            if ( textStatus === 'timeout' ) {
                console.log( 'The server took too long to send the data.' );
            }
            else {
                console.log( 'An error occurred on the server. Please try again in a minute.' );
            }
            this.oTable.fnProcessingIndicator( false );
        },

        translateUI : function () {
            var prop;
            var patt;
            for (prop in translate) {
                patt = new RegExp(prop, 'g');
                $('#mainTable8').html($('#mainTable').html().replace(patt, translate[prop]));
            }
        }
    };

    return auctionDecoration;

});
