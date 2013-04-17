/*global define */

define(['jquery'], function ($) {
    'use strict';

    for (var prop in langIndex) {
        var patt = new RegExp(prop, "g");
        $('#mainTable8').html($('#mainTable8').html().replace(patt, langIndex[prop]));
    }
    oTable8 = $('#mainTable8').dataTable({
        "bProcessing": true,
        "bJQueryUI": true,
        "bStateSave": false,
        "bDestroy": true,
        "oSearch": { "sSearch": "" },
        "sPaginationType": "full_numbers",
        "bServerSide": true,
        "sAjaxSource": "fill/auction/bydecoration",
        "oLanguage": {
            "sProcessing": jsIndex['sProcessing'],
            "sLengthMenu": jsIndex['sLengthMenu'],
            "sZeroRecords": jsIndex['sZeroRecords'],
            "sInfo": jsIndex['sInfo'],
            "sInfoEmpty": jsIndex['sInfoEmpty'],
            "sInfoFiltered": jsIndex['sInfoFiltered'],
            "sSearch": jsIndex['sSearch'],
            "sInfoPostFix": "",
            "sUrl": "",
            "oPaginate": {
                "sFirst": jsIndex['sFirst'],
                "sPrevious": jsIndex['sPrevious'],
                "sNext": jsIndex['sNext'],
                "sLast": jsIndex['sLast']
            }
        },
        "fnServerData": function ( sSource, aoData, fnCallback ) {
            $.ajax( {
                "dataType": 'json',
                "type": "GET",
                "url": sSource,
                "data": aoData,
                "success": fnCallback,
                "timeout": 15000,  
                "error": handleAjaxError 
            } );
        }
    });
        
    function handleAjaxError( xhr, textStatus, error ) {
        if ( textStatus === 'timeout' ) {
            alert( 'The server took too long to send the data.' );
        }
        else {
            alert( 'An error occurred on the server. Please try again in a minute.' );
        }
        oTable.fnProcessingIndicator( false );
    }
};