import Ember from 'ember';
import mapBboxController from 'mobility-playground/mixins/map-bbox-controller';
import sharedActions from 'mobility-playground/mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, mapBboxController, {
	attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors | <a href="http://www.mapzen.com">Mapzen</a> | <a href="http://www.transit.land">Transitland</a> | Imagery © <a href="https://carto.com/">CARTO</a>',

	center: Ember.computed('pin', function(){
    if (this.get('pin')){
      return this.get('pinLocation');
    } else {
      return this.get('mapCenter');
    }
  }),
  zoom: 14,
  mapCenter: [43.072963279523,-89.39234018325806],
	pin: null,
  // bbox: null,
  leafletBbox: null,

 
	actions: {
		updatebbox: function(e) {
			var newbox = e.target.getBounds();
			this.set('bbox', newbox.toBBoxString());
		},
    updateLeafletBbox(e) {
      var leafletBounds = e.target.getBounds();     
      this.set('leafletBbox', leafletBounds.toBBoxString());
    },
    // updatebbox(e) {
    //   var bounds = this.get('leafletBbox');
    //   this.set('bbox', bounds);
    //   this.set('mapMoved', false);
    // },
    updateMapMoved(){
      if (this.get('mousedOver') === true){
        this.set('mapMoved', true);
      }
    },
		dropPin: function(e){
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      var coordinates = [];
      coordinates.push(lat);
      coordinates.push(lng);
      this.set('pin', coordinates);
      this.set('mapCenter', coordinates);
      this.set('leafletBbox', this.get('bbox'));
    },
    removePin: function(){
      var pinCoordinateArray = this.get('pin');
      pinCoordinateArray[0] = parseFloat(pinCoordinateArray[0]);
      pinCoordinateArray[1] = parseFloat(pinCoordinateArray[1]);
      this.set('mapCenter', pinCoordinateArray);
      this.set('pin', null);
    },
    searchRepo: function(term) {
      if (Ember.isBlank(term)) { return []; }
      const url = `https://search.mapzen.com/v1/autocomplete?api_key=mapzen-jLrDBSP&text=${term}`;      
      return Ember.$.ajax({ url }).then(json => json.features);
    },
    setPlace: function(selected){
      this.set('pin', null);
      var lng = selected.geometry.coordinates[0];
      var lat = selected.geometry.coordinates[1];
      var coordinates = [];
      coordinates.push(lat);
      coordinates.push(lng);
      this.set('place', selected);
      this.set('pin', coordinates);
      this.set('mapCenter', coordinates);
      this.transitionToRoute('index', {queryParams: {pin: this.get('pin'), bbox: null}});
    },
    clearPlace: function(){
      this.set('place', null);
    },
    mouseOver(){
      this.set('mousedOver', true);
    },
    setOnestopId(operator) {
      var onestopId = operator.id;
      this.set('onestop_id', onestopId);
      this.set('selectedOperator', operator);
    },
    selectOperator(operator){
      this.set('selectedOperator', null);
      operator.set('operator_path_opacity', 1);
      operator.set('operator_path_weight', 3);
      this.set('hoverOperator', operator);
    },
    unselectOperator(operator){
      operator.set('operator_path_opacity', 0.5);
      operator.set('operator_path_weight', 1.5);
      this.set('hoverOperator', null);
    }
	}
});