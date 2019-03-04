//i modelen måste ha bara render function och jquerry in i vyn istället

/*man kan ha en lista också :
let lista = [
    {tab: 0},
    {tab: 1},
    {tab: 2}
];*/

const TabModel = Backbone.Model.extend({
    defaults: {
        tab: 'firstTab'
    }
    /*
    nextTab: function () {
        let tab = this.get('tab');

        if (tab === 'firstTab') {
            this.set({tab: 'secondTab'});
        } else if (tab === 'secondTab') {
            this.set({tab: 'thirdTab'});
        } else if (tab === 'thirdTab') {
            this.set({tab: 'firstTab'});
        }
    }*/
       
});

let tabModel = new TabModel({});

const TabView = Backbone.View.extend({
    el: '#wtf',
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {

        //show tabs

   // tabView: function () {
        let tab = this.model.get('tab');
        //let el = this.$el; //om man loopar behöver man göra det 
        let html = '';


        //här måste fixa så jag renderar tabbar först
        if (tab === 'firstTab') {
            html = `<div id="firstTab"> Tab 1 </div>`;
            
        } else if (tab === 'secondTab') {
            html = `<div id="secondTab"> Tab 2 </div>`;
            
        } else if (tab === 'thirdTab') {
            html = `<div id="thirdTab"> Tab 3 </div>`;
           
        }


        /*let html = `<div class="header">
			            <div id="firstTab"> Tab 1 </div>
			            <div id="secondTab"> Tab 2 </div>
			            <div id="thirdTab"> Tab 3 </div>
                    </div>`;*/
                    
        this.$el.html(html);
        




        //det här renderar innehållet av tabbar
        let pageView;
        if (tab === 'firstTab') {
            pageView = new FirstTabContent({ model: tabModel });
        } else if (tab === 'secondTab') {
            pageView = new SecondTabContent({ model: tabModel });
        } else if (tab === 'thirdTab') {
            pageView = new ThirdTabContent({ model: tabModel });
        }
        pageView.render();

        //skriva ut tabbar här och sen innehållet
        //this.$el.html();

   // }
}

});

const FirstTabContent = Backbone.View.extend({
    render: function() {
        let tab = this.model.get('tab');
        if (tab === 'firstTab') {
            let html = `<div id="firstDiv"> <button id="firstNext">Next</button> <br/> <img src="https://media.giphy.com/media/LY8esM2vNnC0rVt4iA/giphy.gif" alt="pokemon" /> </div>`;
            this.$el.html(html);
        };
    }

});

const SecondTabContent = Backbone.View.extend({
    render: function () {
        let tab = this.model.get('tab');
        if (tab === 'secondTab') {
            let html = `<div id="secondDiv"> <button id="secondPrevious">Previous</button> <button id="secondNext">Next</button> <img src="https://media.giphy.com/media/31QbKCQGrRdCFQgZq0/giphy.gif" alt="pokemon" /></div>`;
            this.$el.html(html);
        };
    }
    
});

const ThirdTabContent = Backbone.View.extend({
    render: function () {
        let tab = this.model.get('tab');
        if (tab === 'thirdTab') {
            let html = `<div id="thirdDiv"> <button id="thirdPrevious">Previous</button> <button id="thirdFirst">To the first</button> <img src="https://media.giphy.com/media/tK9wGsGc72LcznCSeU/giphy.gif" alt="pokemon" /> </div>`;
            this.$el.html(html);
        };
    }
    
});


$(document).ready(function () {
    let tabView = new TabView({ model: tabModel });
    tabView.render();
});