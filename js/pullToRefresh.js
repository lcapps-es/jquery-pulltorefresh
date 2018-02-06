/**************************************************************
 * JavaScript PullToRefresh
 * @version v1.1.0
 *
 * @description
 * The way to use this plugin is as follows:
 * 	1. Creates a div where the image will be previewed
 *	2. Initialize fileUploader plugin: $(div).pullToRefresh();
 * 
 * @see https://github.com/lcapps-es/jquery-pullToRefresh
 * @author LCApps
 * 
 * Copyright (c) 2017 - Licensed MIT
 **************************************************************/

;(function ($) {

    var __PullToRefresh = {
        MAX_HEIGHT: 120,
        UPDATE_HEIGHT: 90,

        load: function( el, options ) {
            var id = $(el).attr('id');
            if( $('.refresh-' + id ).length === 0 ){

                __PullToRefresh.Makers.appendElements( el, options );
                __PullToRefresh.Makers.addClickEvents( el, options );

            }
        },

        Options: {

            processOptions: function( options ) {
                return options;
            }

        },

        Makers: {

            appendElements: function( el, options ) {

                var id = $(el).attr('id');
                var ptrContainer = $('<div class="refresh-' + id + '" style="min-height: 0px; box-shadow: rgba(0, 0, 0, 0.12) 0px -3px 5px inset; pointer-events: none; font-size: 0.85em; font-weight: bold; top: 0px; height: 0px; transition: height 0.3s, min-height 0.3s; width: 100%; overflow: hidden; display: flex; align-items: flex-end; align-content: stretch; text-align: center;"><div style="padding: 20px;flex-basis: 100%;"><i class="fa fa-refresh" style="font-size: 50px;"></i></div></div>');

                $(el).before( ptrContainer );

            },

            addClickEvents: function( el, options ) {
                var id = $(el).attr('id');

                window.addEventListener('touchstart', function( event ){
                    var y = event.touches[0].clientY;
                    $(el).data('posY', y );
                });

                window.addEventListener('touchmove', function( event ){
                    var y = event.touches[0].clientY;

                    var diff = (y - $(el).data('posY') ) / 2;

                    if( diff > 0 && diff < __PullToRefresh.MAX_HEIGHT ){
                        $('.refresh-' + id ).css('min-height', diff );
                    }
                });

                

                window.addEventListener('touchend', function( event ) {
                    var y = event.changedTouches[0].clientY;

                    var diff = (y - $(el).data('posY') ) / 2;

                    if( diff > 0 && diff < __PullToRefresh.UPDATE_HEIGHT ){
                        $('.refresh-' + id ).css('min-height', 0 );
                    }else{
                        $('.refresh-' + id + ' .fa-refresh').addClass( 'fa-spin' );
                        $('.refresh-' + id ).css('min-height', __PullToRefresh.UPDATE_HEIGHT );
                        options.refreshCallback();
                    }
                });
            }

        }

    };

	/**
	 * PullToRefresh Main Method.
	 * 
	 * @param {} options 
	 */
	function pullToRefresh( options ) {

        var options = ( options === undefined ) ? {} : options;

        var __options = __PullToRefresh.Options.processOptions( options );

        this.each(function(){
            __PullToRefresh.load( this, __options );
        });

        this.stop = stop;

        return this;
    }
    
    function stop(){
        var id = $(this).attr('id')

        $('.refresh-' + id ).css('min-height', 0 );
        $('.refresh-' + id + ' .fa-refresh').removeClass( 'fa-spin' );
    }

	// jQuery Extension
	$.fn.pullToRefresh = pullToRefresh;


}(window.jQuery));