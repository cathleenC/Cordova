var QueueListView = function () {

    var queues;

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };

    this.setQueues = function(list) {
        queues = list;
        this.render();
    }

    this.render = function() {
        this.$el.html(this.template(queues));
        return this;
    };

    this.initialize();

}