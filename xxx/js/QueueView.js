var QueueView = function(queue) {

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        this.$el.html(this.template(queue));
        return this;
    };

    this.initialize();

}
