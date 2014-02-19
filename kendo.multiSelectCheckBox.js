/*
    Author:         James Carpenter
    Date:           02/19/2014
    Description:    Extension to KendoUI's MultiSelect functionality to make it easier for less tech savvy people to use
    Usage:
                    $("#input").kendoMultiSelectCheckBox({OPTIONS});
*/

(function ($) {
    var ui = kendo.ui,
        MultiSelect = ui.MultiSelect;

    var fnRender = MultiSelect.fn._render;
    var fnSelect = MultiSelect.fn._select;
    var fnSelected = MultiSelect.fn._selected;
    var fnNull = function () { return null; };

    var MultiSelectCheckBox = MultiSelect.extend({
        scrollTop: 0,
        init: function (element, options) {
            var that = this;
            options = options || {};
            options.dataTextField = options.dataTextField || "text";
            options.dataValueField = options.dataValueField || "value";

            // preserve the item template if passed, else create our own
            var oTemplate = (options && options.itemTemplate) ? kendo.template('<span class="k-icon k-i-blank"></span> ' + options.itemTemplate) : kendo.template('<span class="k-icon k-i-blank"></span> #:' + kendo.expr(options.dataTextField, 'data') + '#', { useWithBlock: false });

            var oOptions = $.extend({
                    autoClose: false,
                    highlightFirst: false,
                    filter: 'contains'
                },
                options,
                { itemTemplate: oTemplate }
            );

            // init the multiSelect
            MultiSelect.fn.init.call(that, element, oOptions);
            
            // get a handle the base itemTemplate function & overwrite it, forcing no hide
            var fnItemTemplate = that.itemTemplate;
            that.itemTemplate = function (data, idx, hide) {
                return fnItemTemplate.call(that, data, idx, false);
            };
            
            // add  default change event to save scroll position
            that.bind("change", function (e) {
                // preserve scroll position
                $(e.sender.ul).scrollTop(e.sender.scrollTop);
            });
        },
        options: {
            name: 'MultiSelectCheckBox',
        },
        _select: function (li) {
            var that = this,
                values = that._values,
                dataItem, idx, oLi, oCb, iValIndex;

            // get the index, dataItem, Li & checkbox
            idx = (!isNaN(li)) ? li : li.data("idx");
            dataItem = that.dataSource.view()[idx];
            oLi = that.ul[0].children[idx];
            oCb = $('.k-icon', oLi);
            iValIndex = $.inArray(dataItem[that.options.dataValueField], values);

            // handle the visual fake checkbox
            oCb.toggleClass('k-i-blank').toggleClass('k-i-tick');
            // save a handle to scroll position
            that.scrollTop = $(that.ul).scrollTop();

            // if the clicked row is in the data list
            if (iValIndex > -1) {
                that.dataSource.filter({});
                // remove the value from the list and update the data
                values.splice(iValIndex, 1);
                var newVal = $.merge([], values);    // WHY??? is this necessary... can't use 'values' or it fails to work 
                that.value(newVal);
                that.trigger('change');
            }
            else {
                // let the select event happen naturally 
                fnSelect.call(that, li);

                // undo the display non of the LI
                that.ul[0].children[idx].style.display = "block";

                // undo the visible items decrement
                that._visibleItems += 1;
                that.currentTag(null);
                that._placeholder();
                that._height(that._visibleItems);
            }
        },

        // prevent the orig selected event
        _render: function (data) {
            this._selected = fnNull;
            var sRetVal = fnRender.call(this, data);
            this._selected = fnSelected;
            return sRetVal;
        }
    });

    ui.plugin(MultiSelectCheckBox);
})(jQuery);