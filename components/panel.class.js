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
            </section>
            <section class="group">
            <span class="header">Population</span>
            <p><strong>Total Population:</strong> ${data.properties.total_pop_}</p>
            <p><strong>Total Black:</strong> ${data.properties.total_blac}</p>
            </section>
            <section class="group">
            <span class="header">Learn more</span>
            <article class="sub-group">
                <a class="btn resource" href="/taxonomy/term/5441" target="_blank">Get Involved</a>
            </article>
            </section>
            <p><small>Properties may or may not have units available, and rents may vary. Property management contact information is continuously updated, as management may change. If you discover any information is not up to date, please submit a note using our <a href="https://app.smartsheet.com/b/form/1cc29c45f4694a7a97315dde550db40c" target="_blank">online form.</a></small></p>
        `;
        
        return html;
    }
}