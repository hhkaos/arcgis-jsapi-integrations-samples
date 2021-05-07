let app;

require([
  'esri/views/SceneView',
  'dojo/query',

  // Bootstrap
  'bootstrap/Collapse',
  'bootstrap/Dropdown',
  'bootstrap/Tab',

  // Calcite-maps
  'calcite-maps/calcitemaps-v0.6',
  'dojo/domReady!'
], function(SceneView, query) {

  // App
  app = {
    camera: {
      "position": {
        "spatialReference": {
          "latestWkid": 3857,
          "wkid": 102100
        },
        "x": -12460058.090604857,
        "y": 4305096.434264079,
        "z": 1638.2098195236176
      },
      "heading": 308.0200455097806,
      "tilt": 79.43567276425631
    },
    initialExtent: null,
    basemap: 'satellite',
    viewPadding: {
      top: 50, bottom: 0
    },
    uiPadding: {
      top: 15, bottom: 15
    },
    mapView: null,
    searchWidgetNav: null
  };

  const view = new SceneView({
    container: 'mapViewDiv',
    map: {
        basemap: app.basemap,
        ground: 'world-elevation'
      },
    camera: app.camera,
    padding: app.viewPadding,
    ui: {
      components: ['zoom', 'compass', 'attribution'],
      padding: app.uiPadding
    }
  });



  view.when(function() {
    app.initialExtent = view.extent;
  });

  // Popup and Panel Events

  // Views - Listen to view size changes to show/hide panels
  view.watch('size', viewSizeChange);

  function viewSizeChange(screenSize) {
    if (app.screenWidth !== screenSize[0]) {
      app.screenWidth = screenSize[0];
      setPanelVisibility();
    }
  }

  // Popups - Listen to popup changes to show/hide panels
  view.popup.watch(['visible', 'currentDockPosition'], setPanelVisibility);

  // Panels - Show/hide the panel when popup is docked
  function setPanelVisibility() {
    const isMobileScreen = view.widthBreakpoint === 'xsmall' || view.widthBreakpoint === 'small';
    const isDockedVisible = view.popup.visible && view.popup.currentDockPosition;
    const isDockedBottom = view.popup.currentDockPosition && view.popup.currentDockPosition.indexOf('bottom') > -1;
    // Mobile (xsmall/small)
    if (isMobileScreen) {
      if (isDockedVisible && isDockedBottom) {
        query('.calcite-panels').addClass('invisible');
      } else {
        query('.calcite-panels').removeClass('invisible');
      }
    } else { // Desktop (medium+)
      if (isDockedVisible) {
        query('.calcite-panels').addClass('invisible');
      } else {
        query('.calcite-panels').removeClass('invisible');
      }
    }
  }

  // Panels - Dock popup when panels show (desktop or mobile)
  query('.calcite-panels .panel').on('show.bs.collapse', function(e) {
    if (view.popup.currentDockPosition || view.widthBreakpoint === 'xsmall') {
      view.popup.dockEnabled = false;
    }
  });

  // Panels - Undock popup when panels hide (mobile only)
  query('.calcite-panels .panel').on('hide.bs.collapse', function(e) {
    if (view.widthBreakpoint === 'xsmall') {
      view.popup.dockEnabled = true;
    }
  });


  // Basemap events
  query('#selectBasemapPanel').on('change', function(e){
    view.map.basemap = e.target.options[e.target.selectedIndex].dataset.vector;
  });

  // Collapsible popup (optional)
  query('.esri-popup .esri-title').on('click', function(e){
    query('.esri-popup .esri-container').toggleClass('esri-popup-collapsed');
    view.popup.reposition();
  });

  // Toggle nav
  function closeMenu() {
    if (query('.calcite-dropdown.open')[0]) {
      query('.calcite-dropdown, .calcite-dropdown-toggle').removeClass('open');
    }
  }
  // Listen for clicks away from menu
  view.on('click', function(e) {
    closeMenu();
  });


});
