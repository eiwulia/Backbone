//i modelen måste ha bara render function och jquerry in i vyn istället


const TabModel = Backbone.Model.extend({
    defaults: {
        tab: 'firstTab',
        color: 'color'
    },
    tabShow: function () {
        let tabId = this.get('tab');

        $('#firstDiv').hide();
        $('#secondDiv').hide();
        $('#thirdDiv').hide();

        if (tabId === 'firstTab') {
            $('#firstDiv').show();
            $('#firstTab').addClass( "Tabcolor" );
           
        } else if (tabId === 'secondTab') {
            $('#secondDiv').show();
            $('#secondTab').addClass( "Tabcolor" );
            
        } else if (tabId === 'thirdTab') {
            $('#thirdDiv').show();
            $('#thirdTab').addClass( "Tabcolor" );
        
        }
    }  
});

let tabModel = new TabModel({});

const TabView = Backbone.View.extend({
    el: '#tabDiv',
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
        let color = this.model.get('color');
        let html = `<div class="header">
			            <div id="firstTab" class="${color}"> Tab 1 </div>
			            <div id="secondTab"> Tab 2 </div>
			            <div id="thirdTab"> Tab 3 </div>
		            </div>`;
        this.$el.html(html);
    },
    events: {
        "click": 'resetColor',
        "click #firstTab": 'firstTabView',
        "click #secondTab": 'secondTabView',
        "click #thirdTab": 'thirdTabView'
    },
    resetColor: function() {
        this.model.set({color: ''});
    },
    firstTabView: function (event) {
        this.model.set({ tab: 'firstTab'});
        this.model.tabShow();
    },
    secondTabView: function (event) {
        this.model.set({ tab: 'secondTab'});
        this.model.tabShow();
    },
    thirdTabView: function (event) {
        this.model.set({ tab: 'thirdTab'});
        this.model.tabShow();
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
            let html = `<div id="firstDiv"> <button id="firstNext">Next</button> <br/> <img src="https://media.giphy.com/media/LY8esM2vNnC0rVt4iA/giphy.gif" alt="pokemon" /> </div>`;
            this.$el.html(html);
        };
    },
    events: {
        "click #firstNext": 'secondTabView'
    },
    secondTabView: function (event) {
        this.model.set({ tab: 'secondTab' });
        this.model.tabShow();
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
        this.model.tabShow();
    },
    thirdTabView: function (event) {
        this.model.set({ tab: 'thirdTab' });
        this.model.tabShow();
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
        this.model.tabShow();
    },
    secondTabView: function (event) {
        this.model.set({ tab: 'secondTab' });
        this.model.tabShow();
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




