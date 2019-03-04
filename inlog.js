const ToggleModel = Backbone.Model.extend({
    defaults: {
        state: 'logged in',
        button: 'Sign out'
    },

    toggle: function () {
        let state = this.get('state');
        let logButton = this.get('button');

        if (state === 'logged in' && logButton === 'Sign out') {
            this.set({
                state: 'logged out',
                button: 'Sign in'
            });
        } else {
            this.set({
                state: 'logged in',
                button: 'Sign out'
            });
        }
    }
});

    let toggleModel = new ToggleModel({});

    const ToggleView = Backbone.View.extend({
        el: '#logIn',
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            let status = this.model.get('state');
            let logButton = this.model.get('button');

            let html = `<div id="inlog"> You are ${status}
            <button id="toggleButton">${logButton}</button> </div>`;

            this.$el.html(html);
        },
        events: {
            "click #toggleButton": 'logButton'
        },
        logButton: function (event) {
            this.model.toggle();
        }
    });
    
    $(document).ready(function () {

        let toggleView = new ToggleView({
            model: toggleModel
        });
        toggleView.render();

    });