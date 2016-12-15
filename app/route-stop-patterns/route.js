import Ember from 'ember';
import setLoading from 'mobility-playground/mixins/set-loading';

export default Ember.Route.extend(setLoading, {
  queryParams: {
    traversed_by: {
    	refreshModel: true
    },
    pin: {
      replace: true,
    }
  },
  model: function(params){
    this.store.unloadAll('data/transitland/operator');
    this.store.unloadAll('data/transitland/stop');
    this.store.unloadAll('data/transitland/route');
    this.store.unloadAll('data/transitland/route_stop_pattern');
    
    var route_stop_patterns = this.store.query('data/transitland/route_stop_pattern', params);
    var traversedByRoute = this.store.query('data/transitland/route', {onestop_id: params.traversed_by});
    var stopsServedByRoute = this.store.query('data/transitland/stop', {served_by: params.traversed_by});

    return Ember.RSVP.hash({
      route_stop_patterns: route_stop_patterns,
      traversedByRoute: traversedByRoute,
      stopsServedByRoute: stopsServedByRoute
    });
  },
  actions:{
    
  }
});