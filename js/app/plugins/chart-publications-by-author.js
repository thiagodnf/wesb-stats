define([
    'jquery',
    'sortBy',
    'find',
    'returnJust',
    'insertUpdate',
    'modalView',
    'plotHorizontalColumns',
], function($, sortBy, find, returnJust,insertUpdate, modalViewData) {

    (function( $ ) {

        $.fn.publicationsByAuthor = function(entries) {

            return this.each (function() {

                var array = [];

                $.each(entries, function(key, entry){
                    $.each(entry.author, function(key, a){
                        array = insertUpdate(array, a.last);
                    });
                });

                array = sortBy("value", array, "asc");

                $(this).plotHorizontalColumns({
                    title: "Number of Publications by Author",
                    categories: returnJust("key", array).slice(0, 15),
                    exportingOnclick: function(){
                        modalViewData("Number of Publications by Author", "Author", array);
                    },
                    series: [{
                        name: 'Number of Papers',
                        color: "#90ed7d",
                        data: returnJust("value", array).slice(0, 15)
                    }]
                });

                return $(this);
            });
        };

    }( jQuery ));
});
