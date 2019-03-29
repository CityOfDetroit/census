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
            <p><strong>% of Internet Subscriptions:</strong> ${data.properties.internet_p}%</p>
            <p><strong>% of No Internet Access:</strong> ${data.properties.no_access_}%</p>
            <p><strong># of No Internet Access:</strong> ${data.properties.no_interne}</p>
            </section>
            <section class="group">
            <span class="header">Population</span>
            <p><strong>Househods:</strong> ${data.properties.households}</p>
            <p><strong>Housing Units:</strong> ${data.properties.housing_un}</p>
            <p><strong>Total Population:</strong> ${data.properties.total_popu}</p>
            <p><strong>Total Population under 5:</strong> ${data.properties.pop_under_}</p>
            </section>
            <section class="group">
            <span class="header">Race and Hispanic Origin</span>
            <p><strong># of Black or African American alone:</strong> ${data.properties.total_blac}</p>
            <p><strong>% of Black or African American alone:</strong> ${data.properties.black_alon}%</p>
            <p><strong>Hispanic Population 2010 census:</strong> ${data.properties.hispanic_c}</p>
            <p><strong>Hispanic Population 2012-2017 ACS 5 year estimate:</strong> ${data.properties.hispanic_a}</p>
            </section>
            <section class="group">
            <span class="header">Location</span>
            <p><strong>Council District:</strong> ${data.properties.council_di}</p>
            <p><strong>Low Response Score:</strong> ${data.properties.low_respon}</p>
            <p><strong>Hardest to Count(Mail Return Rate 2010):</strong> ${data.properties.mrr}</p>
            <p><strong>Neighborhood:</strong> ${data.properties.neighborho}</p>
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