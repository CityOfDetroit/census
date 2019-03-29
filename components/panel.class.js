'use strict';
export default class Panel {
    constructor(container){
        this.container = container;
    }

    buildPanel(data){
        this.container.innerHTML = this.buildMarkUp(data);
    }

    clearPanel(){
        this.container.innerHTML = '';
    }

    buildMarkUp(data){
        let html = `
            <h5>${data.properties.namelsad}</h5>
            <section class="group">
            <span class="header">Internet</span>
            <p><strong>Internet P:</strong> ${data.properties.internet_p}</p>
            <p><strong>Internet S:</strong> ${data.properties.internet_s}</p>
            <p><strong>broadband_:</strong> ${data.properties.broadband_}</p>
            <p><strong>no_access:</strong> ${data.properties.no_access}</p>
            <p><strong>no_access_:</strong> ${data.properties.no_access_}</p>
            <p><strong>no_interne:</strong> ${data.properties.no_interne}</p>
            </section>
            <section class="group">
            <span class="header">Population</span>
            <p><strong>Total Population:</strong> ${data.properties.total_pop_}</p>
            <p><strong>Total Black:</strong> ${data.properties.total_blac}</p>
            <p><strong>black_alon:</strong> ${data.properties.black_alon}</p>
            <p><strong>hispanic_a:</strong> ${data.properties.hispanic_a}</p>
            <p><strong>hispanic_c:</strong> ${data.properties.hispanic_c}</p>
            <p><strong>households:</strong> ${data.properties.households}</p>
            <p><strong>housing_un:</strong> ${data.properties.housing_un}</p>
            <p><strong>pop_under_:</strong> ${data.properties.pop_under_}</p>
            <p><strong>statefp:</strong> ${data.properties.statefp}</p>
            <p><strong>total_popu:</strong> ${data.properties.total_popu}</p>
            </section>
            <section class="group">
            <span class="header">Location</span>
            <p><strong>aland:</strong> ${data.properties.aland}</p>
            <p><strong>awater:</strong> ${data.properties.awater}</p>
            <p><strong>census_mai:</strong> ${data.properties.census_mai}</p>
            <p><strong>council_di:</strong> ${data.properties.council_di}</p>
            <p><strong>countyfp:</strong> ${data.properties.countyfp}</p>
            <p><strong>funcstat:</strong> ${data.properties.funcstat}</p>
            <p><strong>geoid:</strong> ${data.properties.geoid}</p>
            <p><strong>gid:</strong> ${data.properties.gid}</p>
            <p><strong>low_respon:</strong> ${data.properties.low_respon}</p>
            <p><strong>mrr:</strong> ${data.properties.mrr}</p>
            <p><strong>mtfcc:</strong> ${data.properties.mtfcc}</p>
            <p><strong>Neighborhood:</strong> ${data.properties.neighborho}</p>
            <p><strong>valid_mail:</strong> ${data.properties.valid_mail}</p>
            <p><strong>Zip Codes:</strong> ${data.properties.zipcodes}</p>
            </section>
            <section class="group">
            <span class="header">Learn more</span>
            <article class="sub-group">
                <a class="btn resource" href="/taxonomy/term/5441" target="_blank">Get Involved</a>
            </article>
            </section>
            <p><small>Some small print and disclaimer.</small></p>
        `;
        
        return html;
    }
}