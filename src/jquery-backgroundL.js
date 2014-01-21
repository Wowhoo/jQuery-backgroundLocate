(function($) {
    
    // main constructor
    var BackgroundLocate = $.backgroundLocate = function(element, options) {
        var metas = {};

        this.element = element;
        this.$element = $(element);

        // alert("1");
        this.options = $.extend({}, BackgroundLocate.defaults, options, this.$element.data(), metas);
        this.namespace = this.options.namespace;
        this.components = $.extend(true, {}, this.components);

        // public properties

        this.classes = {
            // status
            // skin: this.namespace + '_' + this.options.skin,
            disabled: this.namespace + '_disabled',
            current: this.namespace + '-current',
        };


        var value = jQuery.parseJSON(this.$element.val());
        this.value = value;

        var selectName = this.options.select.namespace;
        this.selectName = selectName;
        console.log(selectName);

        this.$wrap = $(this.options.tpl());
        this.$element.after(this.$wrap);

        this.$repeat = this.$wrap.find('.'+this.namespace + '-repeat');
        this.$position = this.$wrap.find('.'+this.namespace + '-position');
        this.$attachment = this.$wrap.find('.'+this.namespace + '-attachment');

        var repeat = null,
            position = null,
            attachment = null,
            value_current = {};
        this.repeat = repeat = this.value.repeat;
        this.position = position = this.value.position;
        this.attachment = attachment = this.value.attachment;
        this.value_current = value_current;

        this.init();
    };

    BackgroundLocate.prototype = {
        constructor: BackgroundLocate,
        components: {},

        init: function() {
            var self = this;

            var repeatValue = ["no-repeat","repeat","repeat_x","repeat_y"],
                positionValue = ["top_left","top_center","top_right","center_left","center_center","center_right","bottom_left","bottom_center","bottom_right"],
                $positionItem = self.$position.find('li'),
                $repeatItem = self.$repeat.find('li');

            //repeat
            // for (var i = 0; i < repeatValue.length; i++) {
            //     self.$repeat.find('li').eq(i).data("repeat",repeatValue[i]);
            //     if (self.repeat === null) {
            //         self.$repeat.find('li').eq(0).addClass(self.classes.current);
            //     } else if (self.repeat === repeatValue[i]) {
            //         self.$repeat.find('li').eq(i).addClass(self.classes.current);
            //     }
            // };
            $.each(repeatValue,function(key,value) {
                $repeatItem.eq(key).data('repeat',value);
                if (!self.repeat) {
                    $repeatItem.eq(0).addClass(self.classes.current);
                } else if (self.repeat === value) {
                    $repeatItem.eq(key).addClass(self.classes.current);
                }
            });

            self.$repeat.on("click", "li", function(event) {
                var bgRepeat = $(this).data("repeat");
                if (self.repeat === bgRepeat) {
                    return false;
                } else {
                    self.repeat = bgRepeat;
                }
                if ($(this).hasClass(self.classes.current)) {
                    return false;
                } else {
                    $repeatItem.removeClass();
                    $(this).addClass(self.classes.current);
                };
                self.generator();
            });

            //position
            $.each(positionValue,function(key,value) {
                $positionItem.eq(key).data('position',value);
                if (!self.position) {
                    $positionItem.eq(0).addClass(self.classes.current);
                } else if (self.position === value) {
                    $positionItem.eq(key).addClass(self.classes.current);
                }
            });

            self.$position.on("click", "li", function(event) {
                var bgPosition = $(this).data("position");
                if (self.position === bgPosition) {
                    return false;
                } else {
                    self.position = bgPosition;
                }
                self.position = bgPosition;
                if ($(this).hasClass(self.classes.current)) {
                    return false;
                } else {
                    self.$position.find('li').removeClass();
                    $(this).addClass(self.classes.current);
                };
                self.generator();
            });

            //attachment
            self.$attachment.on
            // this.initial = true;
            // self.bindEvent();
        },

        // bindEvent: function() {
            
        // },
        generator: function() {
            var self = this;
            self.value_current.repeat = self.repeat;
            self.value_current.position = self.position;
            self.$element.val(JSON.stringify(self.value_current));
        }

        /*
            Public Method
         */
        
        // enable: function() {
        //     this.enabled = true;
        //     this.$element.addClass(this.namespace + 'enabled');
        //     return this;
        // },
        // disable: function() {
        //     this.enabled = false;
        //     this.$element.removeClass(this.namespace + 'enabled');
        //     return this;
        // },
        // destroy: function() {
        //     $.each(this.pointer, function(i, p) {
        //         p.destroy();
        //     });
        // }
    };

    BackgroundLocate.defaults = {
        namespace: 'bgLocate',
        repeat: 'repeat',
        position: 'top_left',
        select: {
            namespace: 'az-selector'
        },

        tpl: function() {
            return '<div class="options ' + this.namespace + '">' + 
                '<div class="option ' + this.namespace + '-repeat">' + 
                    '<span class="option-title">repeat:</span>' + 
                    '<ul class="option-content">'+ 
                        '<li><span>no-repeat</span></li>' + 
                        '<li><span>repeat</span></li>' + 
                        '<li><span>repeat_x</span></li>' + 
                        '<li><span>repeat_y</span></li>' +
                    '</ul>' +
                '</div>' + 
                '<div class="' + this.namespace + '-position">' + 
                    '<span class="option-title">position:</span>' + 
                    '<ul class="option-content">' + 
                        '<li><span>1</span></li>' + 
                        '<li><span>2</span></li>' + 
                        '<li><span>3</span></li>' + 
                        '<li><span>4</span></li>' + 
                        '<li><span>5</span></li>' + 
                        '<li><span>6</span></li>' + 
                        '<li><span>7</span></li>' + 
                        '<li><span>8</span></li>' + 
                        '<li><span>9</span></li>' + 
                    '</ul>' +
                '</div>' + 
                '<div class="' + this.namespace + '-attachment">' + 
                    '<span class="option-title">attach:</span>' + 
                    '<select class="option-content ' + this.selectName + '">' + 
                        '<option value="a">scroll</option>' + 
                        '<option value="b">fixed</option>' + 
                        '<option value="c">inherit</option>' + 
                    '</select>' +
                '</div>'
            '</div>';
        },
        
        onChange: function() {},

        // on mouse up 
        callback: function() {}
    };

    BackgroundLocate.registerComponent = function(component, methods) {
        BackgroundLocate.prototype.components[component] = methods;
    };

    $.fn.backgroundLocate = function(options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

            return this.each(function() {
                var api = $.data(this, 'backgroundLocate');
                if (typeof api[method] === 'function') {
                    api[method].apply(api, method_arguments);
                }
            });
        } else {
            return this.each(function() {
                if (!$.data(this, 'backgroundLocate')) {
                    $.data(this, 'backgroundLocate', new BackgroundLocate(this, options));
                }
            });
        }
    };

}(jQuery));