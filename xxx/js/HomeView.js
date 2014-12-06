var HomeView = function (service) {

    var queueListView;

    this.initialize = function() {
        this.$el = $('<div/>');
        this.$el.on('keyup', '.search-key', this.findByName);
        queueListView = new QueueListView();
        this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
        $('.content', this.$el).html(queueListView.$el);
        return this;
    };

    this.findByName = function() {
        service.findByName($('.search-key').val()).done(function(queues) {
            queueListView.setQueues(queues);
        });
    };



    this.initialize();
}