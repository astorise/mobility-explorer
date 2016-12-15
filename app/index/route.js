import Ember from 'ember';
import setLoading from 'mobility-playground/mixins/set-loading';

export default Ember.Route.extend(setLoading, {
	queryParams: {
    pin: {
			replace: true,
    }
	},
	actions: {
	}
});


  
