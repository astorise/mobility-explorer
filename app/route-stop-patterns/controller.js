import Ember from 'ember';
import setTextboxClosed from 'mobility-playground/mixins/set-textbox-closed';
import sharedActions from 'mobility-playground/mixins/shared-actions';

export default Ember.Controller.extend(setTextboxClosed, sharedActions, {
	queryParams: ['traversed_by', 'pin', 'display_stops'],
	
	traversed_by: null,
	onestop_id: null,
	display_stops: null,
	serves: null,
	hoverStop: null,
	selectedRsp: null,
	bounds: Ember.computed('bbox', function(){
		if (this.get('bbox') === null){
			var defaultBoundsArray = [];
			defaultBoundsArray.push([37.706911598228466, -122.54287719726562]);
			defaultBoundsArray.push([37.84259697150785, -122.29568481445312]);
			return defaultBoundsArray;
		} else {
			var coordinateArray = [];
			var bboxString = this.get('bbox');
			var tempArray = [];
			var boundsArray = [];

			coordinateArray = bboxString.split(',');

			for (var i = 0; i < coordinateArray.length; i++){
				tempArray.push(parseFloat(coordinateArray[i]));
			}
		
			var arrayOne = [];
			var arrayTwo = [];
			arrayOne.push(tempArray[1]);
			arrayOne.push(tempArray[0]);
			arrayTwo.push(tempArray[3]);
			arrayTwo.push(tempArray[2]);
			boundsArray.push(arrayOne);
			boundsArray.push(arrayTwo);
			return boundsArray;
		}
	}),
	mapMoved: false,
	mousedOver: false,
	
	actions: {
		updateLeafletBbox(e) {
			var leafletBounds = e.target.getBounds();
			this.set('leafletBbox', leafletBounds.toBBoxString());
		},
		updatebbox(e) {
			var bounds = this.get('leafletBbox');
			this.set('bbox', bounds);
			this.set('mapMoved', false);
		},
		updateMapMoved(){
			if (this.get('mousedOver') === true){
				this.set('mapMoved', true);
			}
		},
		mouseOver(){
			this.set('mousedOver', true);
		},
		onEachFeature(feature, layer){
			layer.setStyle(feature.properties);	
		},
		setOnestopId(route) {
			var onestopId = route.id;
			this.set('onestop_id', onestopId);
			this.set('selectedRoute', route);
			this.set('serves', null);
			this.set('operated_by', null);
		},
		displayStops: function(){
			if (this.get('display_stops') === "true"){
				this.set('display_stops', null)
			} else if (this.get('display_stops') === null){
				this.set('display_stops', "true")
			} else {
				console.log('else:' + this.get('display_stops'))
				debugger;
			}
			console.log(this.get('display_stops'))
		},
		selectStop(stop){
			this.set('hoverStop', stop);
		},
		unselectStop(stop){
			this.set('hoverStop', null);
		},
		setStopOnestopId(stop) {
			var onestopId = stop.id;
			this.set('serves', null);
			this.set('hoverStop', null);
			this.set('onestop_id', onestopId);
			this.set('display_stops', false);
			this.transitionToRoute('stops', {queryParams: {bbox: this.get('bbox'), onestop_id: this.get('onestop_id')}});
		},
		setRsp: function(rsp){
      var stops, stopsLength, stopId, i;
			if (this.get('selectedRsp')!== null){
				stops = this.get('selectedRsp').get('stop_pattern');
				stopsLength = stops.length;
				for (i = 0; i < stopsLength; i++){
					stopId = stops[i];
					this.store.peekRecord('data/transitland/stop',stopId).set('rsp_stop_pattern_number', null);
				}
			}
			if (this.get('selectedRsp')!== null && this.get('selectedRsp').get('id') === rsp.get('id')){
				this.set('selectedRsp', null);
				rsp.set('is_selected', false);
				rsp.set('default_opacity', 0);
			} else if (this.get('selectedRsp')!== null){
				stops = this.get('selectedRsp').get('stop_pattern');
				stopsLength = stops.length;
				for (i = 0; i < stopsLength; i++){
					stopId = stops[i];
					this.store.peekRecord('data/transitland/stop',stopId).set('rsp_stop_pattern_number', null);
				}
				this.get('selectedRsp').set('default_opacity', 0);
				rsp.set('default_opacity', 1);
				this.get('selectedRsp').set('is_selected', false);
				rsp.set('is_selected', true);
				this.set('selectedRsp', rsp);
				stops = this.selectedRsp.get('stop_pattern');
				stopsLength = stops.length;
				for (i = 0; i < stopsLength; i++){
					stopId = stops[i];
					this.store.peekRecord('data/transitland/stop',stopId).set('rsp_stop_pattern_number', i+1);
				}
			}
			else {
				this.set('selectedRsp', rsp);
				rsp.set('is_selected', true);
				rsp.set('default_opacity', 1);
				stops = this.selectedRsp.get('stop_pattern');
				stopsLength = stops.length;
				for (i = 0; i < stopsLength; i++){
					stopId = stops[i];
					this.store.peekRecord('data/transitland/stop',stopId).set('rsp_stop_pattern_number', i+1);
				}
			}
		}
	}
});