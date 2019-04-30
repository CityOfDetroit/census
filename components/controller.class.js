'use strict';
import Map from './map.class.js';
import Panel from './panel.class.js';
const turf = require('@turf/turf');
const arcGIS = require('terraformer-arcgis-parser');
export default class Controller {
  constructor(container) {
    this.filters = {
      'hardest': null,
      'lowResponse': null,
      'population': null,
      'noInternet': null
    };
    this.zipcodes = {};
    this.map = new Map({
      styleURL: 'mapbox://styles/mapbox',
      mapContainer: 'map',
      geocoder: false,
      zoomControls: true,
      baseLayers: {
        street: 'light-v10',
        satellite: 'cj774gftq3bwr2so2y6nqzvz4'
      },
      center: [-83.10, 42.36],
      zoom: 11,
      boundaries: {
        sw: [-83.3437,42.2102],
        ne: [-82.8754,42.5197]
      },
      sources: [
        {
          id: "census",
          type: "vector",
          url: "mapbox://slusarskiddetroitmi.8yj6law7"
        },
        {
          id: "single-point",
          type: "geojson",
          data: {
              "type": "FeatureCollection",
              "features": []
          }
        },
        {
          id: "city",
          type: "geojson",
          data: `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/City_of_Detroit_Boundaries/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=geojson&token=`
        }
      ],
      layers: [
        {
          "id": "census-fill",
          "type": "fill",
          "source": "census",
          "source-layer": "census-diqtrn",
          "layout": {},
          "paint": {
            "fill-color": '#9FD5B3',
            "fill-opacity": .2
          }
        },
        {
          "id": "census-borders",
          "type": "line",
          "source": "census",
          "source-layer": "census-diqtrn",
          "layout": {},
          "paint": {
            "line-color": "#004544",
            "line-width": 3
          }
        },
        {
          "id": "census-hover",
          "type": "fill",
          "source": "census",
          "source-layer": "census-diqtrn",
          "layout": {},
          "paint": {
            "fill-color": '#004544',
            "fill-opacity": .4
          },
          "filter": ["==", "geoid", ""]
        },
        {
          "id": "census-featured",
          "type": "fill",
          "source": "census",
          "source-layer": "census-diqtrn",
          "layout": {},
          "paint": {
            "fill-color": '#004544',
            "fill-opacity": .6
          },
          "filter": ["==", "geoid", ""]
        },
        {
          id: "point",
          "source": "single-point",
          "type": "circle",
          "paint": {
              "circle-radius": 10,
              "circle-color": "#007cbf"
          }
        },
        {
          "id": "city",
          "type": "line",
          "source": "city",
          "layout": {},
          "paint": {
            "line-color": "#004544",
            "line-width": 3
          }
        }
      ]
    });
    this.panel = new Panel(container);
  }
  
  initialForm(ev,_controller){
    switch (ev) {
      case 'v-sign-up':
        document.querySelector('#user-type-section').className = 'hidden';
        document.querySelector('section.application').className = 'application';
        _controller.map.map.resize();
        break;
      default:

    }
  }

  updatePanel(ev, _controller){
    this.panel.buildPanel(ev);
  }

  removeFilter(ev, _controller){
    //console.log(ev);
    document.getElementById('initial-loader-overlay').className = 'active';
    switch (ev.target.id) {
      case 'hardest-filter-btn':
        _controller.filters.hardest = null;
        document.getElementById('hardest').value = null;
        document.getElementById('hardest-filter-btn').className = 'filter-btn';
        break;

      case 'low-response-filter-btn':
        _controller.filters.lowResponse = null;
        document.getElementById('low-response').value = null;
        document.getElementById('low-response-filter-btn').className = 'filter-btn';
        break;
      
      case 'population-filter-btn':
        _controller.filters.population = null;
        document.getElementById('population').value = null;
        document.getElementById('population-filter-btn').className = 'filter-btn';
        break;

      case 'no-internet-filter-btn':
        _controller.filters.noInternet = null;
        document.getElementById('no-internet').value = null;
        document.getElementById('no-internet-filter-btn').className = 'filter-btn';
        break;
    
      default:
        break;
    }
    _controller.updateMap(_controller);
  }

  updateMap(_controller){
    let filter = ['all'];
    console.log(_controller.filters);
    switch(_controller.filters.hardest){
      case null:
        break;

      case '73-100':
        filter.push([">=", "mrr", 73]);
        break;

      case '70-73':
        filter.push([">=", "mrr", 70]);
        filter.push(["<", "mrr", 73]);
        break;
        
      case '65-70':
        filter.push([">=", "mrr", 65]);
        filter.push(["<", "mrr", 70]);
        break;

      case '60-65':
        filter.push([">=", "mrr", 60]);
        filter.push(["<", "mrr", 65]);
        break;

      default:
        filter.push([">=", "mrr", 20]);
        filter.push(["<", "mrr", 60]);
        break;
    }
    switch(_controller.filters.lowResponse){
      case null:
        break;

      case '28+':
        filter.push([">=", "low_respon", 28]);
        break;

      case '28-':
        filter.push(["<", "low_respon", 28]);
        break; 
        
      default:
        // filter.push(["<", "low_respon", 24]);
      break;
    }
    switch(_controller.filters.population){
      case null:
        break;

      case '1500':
        filter.push([">=", "total_pop_", 1500]);
        break;

      case '2000':
        filter.push(["<", "total_pop_", 2000]);
        break; 
        
      default:
        // filter.push(["<", "low_respon", 24]);
      break;
    }
    switch (_controller.filters.noInternet) {
      case null:
        break;
      
      case '86+':
        filter.push([">", "no_access_", 86]);
        break;

      case '60-86':
        filter.push([">=", "no_access_", 60]);
        filter.push(["<", "no_access_", 86]);
        break;

      case '40-60':
        filter.push([">=", "no_access_", 40]);
        filter.push(["<", "no_access_", 60]);
        break;

      case '20-40':
        filter.push([">=", "no_access_", 20]);
        filter.push(["<", "no_access_", 40]);
        break;
    
      default:
        filter.push([">=", "no_access_", 0]);
        filter.push(["<", "no_access_", 20]);
        break;
    }
    _controller.map.map.setFilter('census-fill', filter);
    _controller.map.map.setFilter('census-borders', filter);
    document.getElementById('initial-loader-overlay').className = '';
  }

  filterMap(ev, _controller){
    //console.log(ev);
    document.getElementById('initial-loader-overlay').className = 'active';
    switch (ev.target.id) {
      case 'hardest':
        if(ev.target.value != 'null'){
          document.getElementById('hardest-filter-btn').className = 'filter-btn active';
          _controller.filters.hardest = ev.target.value; 
        }else{
          _controller.filters.hardest = null;
        }
        break;

      case 'low-response':
        if(ev.target.value != ''){
          document.getElementById('low-response-filter-btn').className = 'filter-btn active';
          _controller.filters.lowResponse = ev.target.value
        }else{
          _controller.filters.lowResponse = null;
        }
        break;

      case 'population':
        if(ev.target.value != ''){
          document.getElementById('population-filter-btn').className = 'filter-btn active';
          _controller.filters.population = ev.target.value
        }else{
          _controller.filters.population = null;
        }
        break;

      case 'no-internet':
        if(ev.target.value != 'null'){
          document.getElementById('no-internet-filter-btn').className = 'filter-btn active';
          _controller.filters.noInternet = ev.target.value;
        }else{
          _controller.filters.bedrooms = null;
        } 
        break;
    
      default:
        _controller.filters.hardest = null;
        _controller.filters.lowResponse = null;
        _controller.filters.noInternet = null;
        document.getElementById('hardest').value = null;
        document.getElementById('low-response').value = null;
        document.getElementById('population').value = null;
        document.getElementById('no-internet').value = null;
        let activeFilters = document.querySelectorAll('.filter-btn.active');
        activeFilters.forEach((btn)=>{
          btn.className = 'filter-btn';
        });
        break;
    }
    _controller.updateMap(_controller);
  }

  geoResults(ev, _controller){
    _controller.map.geocoder.setInput('');
    _controller.map.map.getSource('single-point').setData(ev.result.geometry);
    _controller.map.map.flyTo({
      center: ev.result.center,
      zoom: 12,
      speed: 1,
      curve: 1,
      easing(t) {
        return t;
      }
    });
    const url = `http://gis.detroitmi.gov/arcgis/rest/services/DoIT/LITCH/MapServer/0/query?where=&text=&objectIds=&time=&geometry=${ev.result.center[0]}%2C+${ev.result.center[1]}&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=fid%2C+name&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json`;
    fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      //console.log(data);
      if (data.features.length) {
        const patrol = data.features[0].properties.name.split(' ').join('+');
        document.getElementById('sheet-link').href = `https://app.smartsheet.com/b/form/f004f42fcd4345b89a35049a29ff408a?Patrol+ID=${data.features[0].properties.FID}&Patrol+Name=${patrol}`;
        document.querySelector('.patrol-info').innerHTML = `<h3>Radio Patrol ${data.features[0].properties.name}</h3><p>Interested in becoming part of your local radio patrol? Follow the link to start the process.</p><p><small>The Radio Patrol application process is managed by the Detroit Police Department. Once you complete the sign up, someone will contact you regarding the application process. Residents who complete the online form will be contacted after October 31 to start the application process.</small></p>`;
        document.querySelector('.data-panel').className = 'data-panel active';
        _controller.geocoderOff = true;
      } else {
        const patrol = 'NEED+NAME';
        document.getElementById('sheet-link').href = `https://app.smartsheet.com/b/form/0c25bae787bc40ef9707c95b2d9684e8`;
        document.querySelector('.patrol-info').innerHTML = `<h3>NO RADIO PATROL FOUND</h3><p>Interested starting your new local radio patrlo? Follow the link to start the process.</p><p><small>The Radio Patrol application process is managed by the Detroit Police Department. Once you complete the sign up, someone will contact you regarding the application process. Residents who complete the online form will be contacted after October 31 to start the application process.</small></p>`;
        document.querySelector('.data-panel').className = 'data-panel active';
        _controller.geocoderOff = true;
      }
    });
  }
}
