import Ember from 'ember';
import mapBboxRoute from 'mobility-playground/mixins/map-bbox-route';


export default Ember.Route.extend(mapBboxRoute, {
	// queryParams: {
    // bbox: {
    //   replace: true,
    //   refreshModel: true
    // }
  // },
  // setupController: function (controller, model) {
  //   if (controller.get('bbox') !== null){
  //     var coordinateArray = [];
  //     var bboxString = controller.get('bbox');
  //     var tempArray = [];
  //     var boundsArray = [];
  //     coordinateArray = bboxString.split(',');
  //     for (var i = 0; i < coordinateArray.length; i++){
  //       tempArray.push(parseFloat(coordinateArray[i]));
  //     }
  //     var arrayOne = [];
  //     var arrayTwo = [];
  //     arrayOne.push(tempArray[1]);
  //     arrayOne.push(tempArray[0]);
  //     arrayTwo.push(tempArray[3]);
  //     arrayTwo.push(tempArray[2]);
  //     boundsArray.push(arrayOne);
  //     boundsArray.push(arrayTwo);
  //     controller.set('leafletBounds', boundsArray);
  //   }
  //   controller.set('leafletBbox', controller.get('bbox'));
  //   this._super(controller, model);
  // }
	
});
