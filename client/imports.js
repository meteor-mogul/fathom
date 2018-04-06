// Meteor packages
import { Meteor } from 'meteor/meteor';

// Import Vue-related symbols from packages.
import { Vue } from 'meteor/meteormogul:vue-dist';
import { Vuetify } from 'meteor/meteormogul:vuetify-dist';
import VueMeteorTracker from 'vue-meteor-tracker';

// Use Vue with packages
// Use VueMeteorTracker to give Vue access to Meteor reactivity
Vue.use(VueMeteorTracker);
// Use Vuetify for style and UI widgets.
Vue.use(Vuetify);

export { Meteor, Vue };
