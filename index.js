import Controller from './components/controller.class';

(function start() {
  
  const controller = new Controller(document.querySelector('.content-section'));
  const delay = 500; // delay between calls
  let throttled = false; // are we currently throttled?

  controller.map.map.on('mousemove', function (e, parent = this) {
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['litch-locations-points']
    });
    if (!features.length) {
      features = this.queryRenderedFeatures(e.point, {
        layers: ['litch-locations-maybe-points']
      });
    }
    this.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  controller.map.map.on('click', function (e, parent = this) {
    //console.log(e);
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['litch-locations-points']
    });
    //console.log(e.point);
    if (features.length) {
      //console.log(features[0]);
      controller.updatePanel(features[0], controller);
      controller.map.map.setFilter('litch-maybe-selected', ['==', 'OBJECTID', '']);
      controller.map.map.setFilter('litch-selected', ['==', 'OBJECTID', features[0].properties.OBJECTID]);
      document.querySelector('.data-panel').className = 'data-panel active';
      (document.querySelector('.filters.active') == null) ? 0 : document.querySelector('.filters.active').className = 'filters';
      (document.querySelector('.calculator.active') == null) ? 0 : document.querySelector('.calculator.active').className = 'calculator';
    }else{
      features = this.queryRenderedFeatures(e.point, {
        layers: ['litch-locations-maybe-points']
      });
      if (features.length) {
        //console.log(features[0]);
        controller.updatePanel(features[0], controller);
        controller.map.map.setFilter('litch-selected', ['==', 'OBJECTID', '']);
        controller.map.map.setFilter('litch-maybe-selected', ['==', 'OBJECTID', features[0].properties.OBJECTID]);
        document.querySelector('.data-panel').className = 'data-panel active';
        (document.querySelector('.filters.active') == null) ? 0 : document.querySelector('.filters.active').className = 'filters';
        (document.querySelector('.calculator.active') == null) ? 0 : document.querySelector('.calculator.active').className = 'calculator';
      }else{
        //console.log('no featured');
        controller.map.map.setFilter('litch-selected', ['==', 'OBJECTID', '']);
        controller.map.map.setFilter('litch-maybe-selected', ['==', 'OBJECTID', '']);
        controller.panel.clearPanel();
        (document.querySelector('.data-panel.active') == null) ? 0 : document.querySelector('.data-panel.active').className = 'data-panel';
        (document.querySelector('.filters.active') == null) ? 0 : document.querySelector('.filters.active').className = 'filters';
        (document.querySelector('.calculator.active') == null) ? 0 : document.querySelector('.calculator.active').className = 'calculator';
      }
    }
  });
  // controller.map.geocoder.on('result', function (ev) {
  //   // console.log(ev);
  //   if(controller.geocoderOff){
  //     controller.geocoderOff = false;
  //     controller.geoResults(ev, controller);
  //   }else{
  //     console.log('extra call');
  //   }
  // });
  document.getElementById('population').value = '';
  document.getElementById('zipcode').value = '';
  document.getElementById('rooms').value = '';
  document.getElementById('close-panel-btn').addEventListener('click', function () {
    controller.panel.clearPanel();
    document.querySelector('.data-panel.active').className = 'data-panel';
  });
  document.getElementById('close-filters-btn').addEventListener('click', function () {
    document.querySelector('.filters.active').className = 'filters';
  });
  document.getElementById('calculator-btn').addEventListener('click', function () {
    document.querySelector('.calculator').className = 'calculator active';
  });
  document.getElementById('filters').addEventListener('click', function () {
    document.querySelector('.filters').className = 'filters active';
  });
  // document.getElementById('filter-reset-btn').addEventListener('click', function (ev) {
  //   controller.filterMap(ev, controller);
  // });
  const intFilters = document.querySelectorAll('.interactive-filters');
  intFilters.forEach(function (btn) {
    btn.addEventListener('change', function (ev) {
      controller.filterMap(ev, controller);
    });
  });
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      controller.removeFilter(ev, controller);
    });
  });
  const startingBtns = document.querySelectorAll('#user-type-section button');
  startingBtns.forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      controller.initialForm(ev.target.attributes[2].nodeValue, controller);
    });
  });
  window.addEventListener('resize',()=>{
    if (!throttled) {
      // actual callback action
      controller.map.map.resize();
      // we're throttled!
      throttled = true;
      // set a timeout to un-throttle
      setTimeout(()=>{
        throttled = false;
      }, delay);
    }  
  })
})(window);
