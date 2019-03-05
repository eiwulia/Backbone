const TabModel = Backbone.Model.extend({
    defaults: {
        tab: 'firstTab',
        color: 'color'
    }
});

let tabModel = new TabModel({});

const TabView = Backbone.View.extend({
    el: '#tabDiv',
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'click', this.render);
    },
    render: function () {
        let color = this.model.get('color');
        let html = `<div class="header">
			            <div id="firstTab" class="${color}"> Tab 1 </div>
			            <div id="secondTab" class="change"> Tab 2 </div>
			            <div id="thirdTab" class="change"> Tab 3 </div>
		            </div>`;
        this.$el.html(html);
    },
    events: {
        "click .change": 'resetColor',
        "click #firstTab": 'firstTabView',
        "click #secondTab": 'secondTabView',
        "click #thirdTab": 'thirdTabView'
    },
    resetColor: function(event) {
        this.model.set({ color: '' });
    },
    firstTabView: function (event) {
        this.model.set({ tab: 'firstTab'});
        $('#firstTab').addClass("color");
        $('#firstDiv').show();
    },
    secondTabView: function (event) {
        this.model.set({ tab: 'secondTab'});
        $('#secondTab').addClass("color");
        $('#secondDiv').show();
    },
    thirdTabView: function (event) {
        this.model.set({ tab: 'thirdTab'});
        $('#thirdTab').addClass("color");
        $('#thirdDiv').show();
    }
});

const FirstTabContent = Backbone.View.extend({
    el: '.content',
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
        let tab = this.model.get('tab');
        if (tab === 'firstTab') {
            let html = `<div id="firstDiv"> <button id="firstNext" class="change">Next</button> <br/> <img src="https://media.giphy.com/media/LY8esM2vNnC0rVt4iA/giphy.gif" alt="pokemon" /> </div>`;
            this.$el.html(html);
        };
    },
    events: {
        "click .change": 'resetColor',
        "click #firstNext": 'secondTabView'
    },
    resetColor: function(event) {
        this.model.set({ color: '' });
    },
    secondTabView: function (event) {
        this.model.set({ tab: 'secondTab' });
        $('#secondTab').addClass("color");
        $('#secondDiv').show();
    }
});

const SecondTabContent = Backbone.View.extend({
    el: '.content',
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
        let tab = this.model.get('tab');
        if (tab === 'secondTab') {
            let html = `<div id="secondDiv"> <button id="secondPrevious">Previous</button> <button id="secondNext">Next</button> <img src="https://media.giphy.com/media/31QbKCQGrRdCFQgZq0/giphy.gif" alt="pokemon" /></div>`;
            this.$el.html(html);
        };
    },
    events: {
        "click #secondPrevious": 'firstTabView',
        "click #secondNext": 'thirdTabView'
    },
    firstTabView: function (event) {
        this.model.set({ tab: 'firstTab' });
        $('#firstTab').addClass("color");
        $('#firstDiv').show();
    },
    thirdTabView: function (event) {
        this.model.set({ tab: 'thirdTab' });
        $('#thirdTab').addClass("color");
        $('#thirdDiv').show();
    }
});

const ThirdTabContent = Backbone.View.extend({
    el: '.content',
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
        let tab = this.model.get('tab');
        if (tab === 'thirdTab') {
            let html = `<div id="thirdDiv"> <button id="thirdPrevious">Previous</button> <button id="thirdFirst">To the first</button> <img src="https://media.giphy.com/media/tK9wGsGc72LcznCSeU/giphy.gif" alt="pokemon" /> </div>`;
            this.$el.html(html);
        };
    },
    events: {
        "click #thirdPrevious": 'secondTabView',
        "click #thirdFirst": 'firstTabView'
    },
    firstTabView: function (event) {
        this.model.set({ tab: 'firstTab' });
        $('#firstTab').addClass("color");
        $('#firstDiv').show();
    },
    secondTabView: function (event) {
        this.model.set({ tab: 'secondTab' });
        $('#secondTab').addClass("color");
        $('#secondDiv').show();
    }
});

$(document).ready(function () {
    let tabView = new TabView({ model: tabModel });
    tabView.render();
    let firstTabContent = new FirstTabContent({ model: tabModel });
    firstTabContent.render();
    let secondTabContent = new SecondTabContent({ model: tabModel });
    secondTabContent.render();
    let thirdTabContent = new ThirdTabContent({ model: tabModel });
    thirdTabContent.render();
});




