const pokemons = [
	{ name: 'Pikachu', type: 'electric' },
	{ name: 'Charmander', type: 'fire' },
	{ name: 'Squirtle', type: 'water' },
	{ name: 'Dratini', type: 'dragon' }
];

const PokemonModel = Backbone.Model.extend({
	defaults: {
		name: null,
		type: null,
		edit: false,
		formName: null,
		formType: null
	},
	editMode: function () {
		this.set({
			edit: true,
			formName: this.get('name'),
			formType: this.get('type')
		});
	},
	saveEdits: function () {
		this.set({
			edit: false,
			name: this.get('formName'),
			type: this.get('formType')
		});
	}
});

const PokemonCollection = Backbone.Collection.extend({ model: PokemonModel });

let pokemonCollection = new PokemonCollection(pokemons);

const PokemonView = Backbone.View.extend({
	tag: 'li',
	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
	},
	render: function () {
		let formName = this.model.get('formName');
		let formType = this.model.get('formType');
		let edit = `<span class="edit">✍️</span>`;
		let remove = `<span class="remove">❌</span>`;
		let content;
		if (this.model.get('edit')) {
			let name = `<input class="editName" value="${formName}" />`;
			let type = `<input class="editType" value="${formType}" />`;
			let saveBox = `<span class="save">✔️</span>`;
			content = `${name} ${type} ${saveBox} ${remove}`;
		} else {
			let name = this.model.get('name');
			let type = this.model.get('type');
			content = `${name} is ${type} type pokemon - ${edit} ${remove}`;
		}
		this.$el.html(content);
	},
	events: {
		"click .remove": 'remove',
		"click .edit": 'editMode',
		"click .save": 'saveChanges',
		"change .editName": 'editName',
		"change .editType": 'editType'
	},
	remove: function (event) {
		pokemonCollection.remove(this.model);
	},
	editMode: function (event) {
		this.model.editMode();
	},
	saveChanges: function (event) {
		this.model.saveEdits();
	},
	editName: function (event) {
		this.model.set({ formName: event.target.value });
	},
	editType: function (event) {
		this.model.set({ formType: event.target.value });
	}
});

const PokemonListView = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.collection, 'update', this.render);
		this.listenTo(this.collection, 'change', this.render);
	},
	render: function () {
		let el = this.$el;
		let ul = $('<ul></ul>')
		this.collection.forEach(function (pokemon) {
			let pokemonView = new PokemonView({
				model: pokemon
			});
			pokemonView.render();
			ul.append(pokemonView.$el);
		});
		el.html('');
		el.append(ul);
		let addForm = `<p>Add another pokemon!</p> <input type="text" id="inputName"  placeholder="Pokemon name">
		<input type="text" id="inputType" placeholder="Pokemon type">
		<button id="addPokemonButton">Add pokemon</button>`;
		el.append(addForm);
	},
	events: {
		"click #addPokemonButton": 'onAddPokemonButtonClick',
		"change #inputName": 'onNameChange',
		"change #inputType": 'onTypeChange'
	},
	onAddPokemonButtonClick: function (event) {
		let model = new PokemonModel({
			name: this.form.name,
			type: this.form.type
		});
		this.collection.add(model);
	},
	form: {
		name: '',
		type: ''
	},
	onNameChange: function (event) {
		this.form.name = event.target.value;
	},
	onTypeChange: function (event) {
		this.form.type = event.target.value;
	}
});


$(document).ready(function () {
	let pokemonListView = new PokemonListView({
		collection: pokemonCollection,
		el: '#pokemonCollection'
	});
	pokemonListView.render();
	console.log('document ready');
});