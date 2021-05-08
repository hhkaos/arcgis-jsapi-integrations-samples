require([
    'esri/views/SceneView',
    'vue'
], function(SceneView, Vue) {

    const options = {
        props: ['camera'],
        template: `
        <div>
        <h2>Camera details</h2>
        <p><strong>Heading</strong>: {{ camera.heading.toFixed(3) }}</p>
        <p><strong>Tilt</strong>: {{ camera.tilt.toFixed(3) }}</p>
        </div>`
    };

    Vue.component('camera-info', options);

    const view = new SceneView({
        map: {
            basemap: 'satellite',
            ground: 'world-elevation'
        },
        container: 'viewDiv',
        camera:{
            "position": {
                "spatialReference": {
                    "latestWkid": 3857,
                    "wkid": 102100
                },
                "x": -8803881.097431505,
                "y": 5322844.266274789,
                "z": 528.969748112373
            },
            "heading": 53.779563183517645,
            "tilt": 71.47359601850683
        }
    });



    view.when(() => {

        const info = new Vue({
            el: '#info',
            data: {
                camera: view.camera
            }
        });

        const infoOut = new Vue({
            el: '#info-out',
            data: {
                camera: null
            }
        })

        view.watch('camera', function(){
            info.camera = view.camera;
            infoOut.camera = view.camera;
        });



        infoOut.camera = view.camera;

        view.ui.add(info.$el, 'bottom-right');

    });

});
