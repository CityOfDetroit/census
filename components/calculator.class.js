'use strict';
export default class Calculator {
  constructor(container, controller) {
    this.form = null;
    this.controller = controller;
    this.init(document.getElementById(container), this);
  }
  
  init(container, _calculator){
    _calculator.form = document.createElement('form');
    // Create salary-hourly section elemets
    let salaryHourly = document.createElement('fieldset');
    let salaryHourlyLegend = document.createElement('legend');
    let salaryHourlyOptions = document.createElement('ul');
    let salaryHourlyOption1 = document.createElement('li');
    let salaryHourlyOption2 = document.createElement('li');
    let salaryHourlySalary = document.createElement('input');
    let salaryHourlySalaryLabel = document.createElement('label');
    let salaryHourlyHourly = document.createElement('input');
    let salaryHourlyHourlyLabel = document.createElement('label');
    // Add attributes to elements
    salaryHourlyLegend.innerText = 'Are you hourly or salary?';
    salaryHourlySalary.type = 'radio';
    salaryHourlySalary.setAttribute('id', 'salary');
    salaryHourlySalary.setAttribute('name','salary-hourly');
    salaryHourlySalary.value = 'salary';
    salaryHourlySalary.checked = true;
    salaryHourlySalaryLabel.setAttribute('for', 'salary'); 
    salaryHourlySalaryLabel.innerText = 'Salary'; 
    salaryHourlyHourly.type = 'radio';
    salaryHourlyHourly.setAttribute('id', 'hourly');
    salaryHourlyHourly.setAttribute('name','salary-hourly');
    salaryHourlyHourly.value = 'hourly';
    salaryHourlyHourlyLabel.setAttribute('for', 'hourly'); 
    salaryHourlyHourlyLabel.innerText = 'Hourly'; 
    salaryHourlySalaryLabel.addEventListener('click', (ev)=>{
        this.updateForm('hourly-salary', ev, _calculator);
    });
    salaryHourlySalary.addEventListener('click', (ev)=>{
        this.updateForm('hourly-salary', ev, _calculator);
    });
    salaryHourlyHourlyLabel.addEventListener('click', (ev)=>{
        this.updateForm('hourly-salary', ev, _calculator);
    });
    salaryHourlyHourly.addEventListener('click', (ev)=>{
        this.updateForm('hourly-salary', ev, _calculator);
    });
    // Build DOM for salary-hourly section
    salaryHourlyOption1.appendChild(salaryHourlySalary);
    salaryHourlyOption1.appendChild(salaryHourlySalaryLabel);
    salaryHourlyOption2.appendChild(salaryHourlyHourly);
    salaryHourlyOption2.appendChild(salaryHourlyHourlyLabel);
    salaryHourlyOptions.appendChild(salaryHourlyOption1);
    salaryHourlyOptions.appendChild(salaryHourlyOption2);
    salaryHourly.appendChild(salaryHourlyLegend);
    salaryHourly.appendChild(salaryHourlyOptions);
    
    // Create Salary section elemets
    let salary = document.createElement('section');
    let annualSalary = document.createElement('input');
    let annualSalaryLabel = document.createElement('label');
    // Add attributes to elements
    salary.className = 'logic-section salary active';
    annualSalary.type = 'number';
    annualSalary.setAttribute('id', 'annual-salary');
    annualSalary.setAttribute('min', 0);
    annualSalary.value = 0;
    annualSalaryLabel.setAttribute('for', 'annual-salary'); 
    annualSalaryLabel.innerText = 'Annual household salary:'; 
    // Build DOM for salary section
    salary.appendChild(annualSalaryLabel);
    salary.appendChild(annualSalary);

    // Create hourly section elemets
    let hourly = document.createElement('section');
    let hourlyWageBox = document.createElement('article');
    let hourlyWage = document.createElement('input');
    let hourlyWageLabel = document.createElement('label');
    let hoursPerWeekBox = document.createElement('article');
    let hoursPerWeek = document.createElement('input');
    let hoursPerWeekLabel = document.createElement('label');
    // Add attributes to elements
    hourly.className = 'logic-section hourly';
    hourlyWage.type = 'number';
    hourlyWage.setAttribute('min', 0);
    hourlyWage.setAttribute('id', 'hourly-wage');
    hourlyWage.setAttribute('step', '.01');
    hourlyWage.value = 0;
    hourlyWageLabel.setAttribute('for', 'hourly-wage'); 
    hourlyWageLabel.innerText = 'Hourly Wage:'; 
    hoursPerWeek.type = 'number';
    hoursPerWeek.setAttribute('min', 0);
    hoursPerWeek.setAttribute('id', 'hours-per-week');
    hoursPerWeek.value = 0;
    hoursPerWeekLabel.setAttribute('for', 'hours-per-week'); 
    hoursPerWeekLabel.innerText = 'Hours Worked per week:'; 
    // Build DOM for hourly section
    hourlyWageBox.appendChild(hourlyWageLabel);
    hourlyWageBox.appendChild(hourlyWage);
    hoursPerWeekBox.appendChild(hoursPerWeekLabel);
    hoursPerWeekBox.appendChild(hoursPerWeek);
    hourly.appendChild(hourlyWageBox);
    hourly.appendChild(hoursPerWeekBox);
    
    // Create add-income section elemets
    let addIncome = document.createElement('section');
    let addIncomeValue = document.createElement('input');
    let addIncomeLabel = document.createElement('label');
    let addIncomeDescription = document.createElement('p');
    // Add attributes to elements
    addIncomeValue.type = 'number';
    addIncomeValue.setAttribute('id', 'add-income');
    addIncomeValue.setAttribute('aria-describedby', 'add-income-description');
    addIncomeValue.value = 0;
    addIncomeValue.setAttribute('min', 0);
    addIncomeLabel.setAttribute('for', 'add-income'); 
    addIncomeLabel.innerText = 'Additional Monthly Income:'; 
    addIncomeDescription.innerText = '(Include Social Security, retirement or pension, disability / unemployment, food assistance, child support, and any other source of income per month)';
    addIncomeDescription.setAttribute('id', 'add-income-description');
    // Build DOM for add-income section
    addIncome.appendChild(addIncomeLabel);
    addIncome.appendChild(addIncomeValue);

    // Create dependents section elemets
    let dependents = document.createElement('section');
    let dependentsValue = document.createElement('input');
    let dependentsLabel = document.createElement('label');
    // Add attributes to elements
    dependentsValue.type = 'number';
    dependentsValue.setAttribute('min', 0);
    dependentsValue.setAttribute('id', 'dependents');
    dependentsValue.value = 0;
    dependentsLabel.setAttribute('for', 'dependents'); 
    dependentsLabel.innerText = 'Number of Dependents:'; 
    // Build DOM for dependents section
    dependents.appendChild(dependentsLabel);
    dependents.appendChild(dependentsValue);

    // Create household section elemets
    let household = document.createElement('fieldset');
    let householdLegend = document.createElement('legend');
    let householdOptions = document.createElement('ul');
    let householdOption1 = document.createElement('li');
    let householdOption2 = document.createElement('li');
    let senior = document.createElement('input');
    let seniorLabel = document.createElement('label');
    let notSenior = document.createElement('input');
    let notSeniorLabel = document.createElement('label');
    // Add attributes to elements
    householdLegend.innerText = 'Is the head of household 62 year or older?';
    senior.type = 'radio';
    senior.setAttribute('id', 'senior');
    senior.setAttribute('name','senior-deduction');
    senior.value = 'senior';
    seniorLabel.setAttribute('for', 'senior'); 
    seniorLabel.innerText = 'Yes'; 
    notSenior.type = 'radio';
    notSenior.setAttribute('id', 'not-senior');
    notSenior.setAttribute('name','senior-deduction');
    notSenior.value = 'not-senior';
    notSenior.checked = true;
    notSeniorLabel.setAttribute('for', 'not-senior'); 
    notSeniorLabel.innerText = 'No'; 
    // Build DOM for household section
    householdOption1.appendChild(senior);
    householdOption1.appendChild(seniorLabel);
    householdOption2.appendChild(notSenior);
    householdOption2.appendChild(notSeniorLabel);
    householdOptions.appendChild(householdOption2);
    householdOptions.appendChild(householdOption1);
    household.appendChild(householdLegend);
    household.appendChild(householdOptions);

    // Create child-exp section elemets
    let childExp = document.createElement('section');
    let childExpValue = document.createElement('input');
    let childExpLabel = document.createElement('label');
    // Add attributes to elements
    childExpValue.type = 'number';
    childExpValue.setAttribute('min', 0);
    childExpValue.setAttribute('id', 'child-exp');
    childExpValue.value = 0;
    childExpLabel.setAttribute('for', 'child-exp'); 
    childExpLabel.innerText = 'Childcare expenses per year:'; 
    // Build DOM for child-exp section
    childExp.appendChild(childExpLabel);
    childExp.appendChild(childExpValue);

    // Create medical-exp section elemets
    let medicalExp = document.createElement('section');
    let medicalExpValue = document.createElement('input');
    let medicalExpLabel = document.createElement('label');
    // Add attributes to elements
    medicalExpValue.type = 'number';
    medicalExpValue.setAttribute('min', 0);
    medicalExpValue.setAttribute('id', 'medical-exp');
    medicalExpValue.value = 0;
    medicalExpLabel.setAttribute('for', 'medical-exp'); 
    medicalExpLabel.innerText = 'Medical expenses per year:'; 
    // Build DOM for medical-exp section
    medicalExp.appendChild(medicalExpLabel);
    medicalExp.appendChild(medicalExpValue);

    // Create people-household section elemets
    let peopleHousehold = document.createElement('section');
    let peopleHouseholdValue = document.createElement('input');
    let peopleHouseholdLabel = document.createElement('label');
    // Add attributes to elements
    peopleHouseholdValue.type = 'number';
    peopleHouseholdValue.setAttribute('min', 0);
    peopleHouseholdValue.setAttribute('id', 'people-household');
    peopleHouseholdValue.value = 0;
    peopleHouseholdLabel.setAttribute('for', 'people-household'); 
    peopleHouseholdLabel.innerText = 'How many people are in your household?'; 
    peopleHouseholdValue.addEventListener('change', (ev)=>{
        this.updateForm('household', ev, _calculator);
    });
    // Build DOM for people-household section
    peopleHousehold.appendChild(peopleHouseholdLabel);
    peopleHousehold.appendChild(peopleHouseholdValue);

    // Create bedrooms section elemets
    let bedrooms = document.createElement('section');
    let bedroomsValue = document.createElement('select');
    let bedroomsLabel = document.createElement('label');

    // Add attributes to elements
    bedroomsValue.setAttribute('id', 'bedrooms');
    bedroomsLabel.setAttribute('for', 'bedrooms'); 
    bedroomsLabel.innerText = 'Number of bedrooms:'; 
    // Build DOM for bedrooms section
    bedrooms.appendChild(bedroomsLabel);
    bedrooms.appendChild(bedroomsValue);

    let buttonGroup = document.createElement('article');
    let submit = document.createElement('button');
    submit.innerText = 'CALCULATE';
    submit.setAttribute('id', 'submit-btn');
    let cancel = document.createElement('button');
    cancel.innerText = 'CANCEL';
    cancel.setAttribute('id', 'cancel-btn');
    cancel.addEventListener('click', (ev)=>{
        this.buttonListener(ev, this);
    });
    submit.addEventListener('click', (ev)=>{
        this.buttonListener(ev, this);
    });
    buttonGroup.appendChild(submit);
    buttonGroup.appendChild(cancel);
    

    _calculator.form.appendChild(salaryHourly);
    _calculator.form.appendChild(salary);
    _calculator.form.appendChild(hourly);
    _calculator.form.appendChild(addIncome);
    _calculator.form.appendChild(addIncomeDescription);
    _calculator.form.appendChild(dependents);
    _calculator.form.appendChild(household);
    _calculator.form.appendChild(childExp);
    _calculator.form.appendChild(medicalExp);
    _calculator.form.appendChild(peopleHousehold);
    _calculator.form.appendChild(bedrooms);
    _calculator.form.appendChild(buttonGroup);
    _calculator.form.addEventListener('submit', (ev) => {
        this.submit(ev);
    });
    container.appendChild(_calculator.form);
  }

  buttonListener(ev, _calculator){
    document.getElementById('initial-loader-overlay').className = 'active';
    (ev.target.id == 'cancel-btn') ? _calculator.cancelIncomeFilter(_calculator) : _calculator.computeIncomeRange(_calculator);
  }

  submit(ev){
    ev.preventDefault();
  }

  updateForm(type, value, _calculator){
    _calculator.form[14].length = 0;
    let bedroom0 = document.createElement('option');
    let bedroom1 = document.createElement('option');
    let bedroom2 = document.createElement('option');
    let bedroom3 = document.createElement('option');
    let bedroom4 = document.createElement('option');
    let bedroom5 = document.createElement('option');
    bedroom0.value = 'F0BR';
    bedroom0.text = 'Studio';
    bedroom1.value = 'F1BR';
    bedroom1.text = '1 - bedroom';
    bedroom2.value = 'F2BR';
    bedroom2.text = '2 - bedroom';
    bedroom3.value = 'F3BR';
    bedroom3.text = '3 - bedroom';
    bedroom4.value = 'F4BR';
    bedroom4.text = '4 - bedroom';
    bedroom5.value = 'F5BR';
    bedroom5.text = '5 - bedroom';
    switch(type){
        case 'household':
            if((value.target.value >= 0 && value.target.value <= 2) || value.target.value == null){
                _calculator.form[14].add(bedroom0, null);
                _calculator.form[14].add(bedroom1, null);
            }
            (value.target.value >= 2 && value.target.value <= 4)  ? _calculator.form[14].add(bedroom2, null) : 0;
            (value.target.value >= 3 && value.target.value <= 6)  ? _calculator.form[14].add(bedroom3, null) : 0;
            (value.target.value >= 4 && value.target.value <= 8)  ? _calculator.form[14].add(bedroom4, null) : 0;
            (value.target.value >= 5 && value.target.value <= 10) ? _calculator.form[14].add(bedroom5, null) : 0;
        break;

        default:
            if(value.target.tagName == 'LABEL'){
                if(value.target.htmlFor == 'salary'){
                    document.querySelector('.logic-section.salary').className = 'logic-section salary active';
                    document.querySelector('.logic-section.hourly').className = 'logic-section hourly';
                }else{
                    document.querySelector('.logic-section.hourly').className = 'logic-section hourly active';
                    document.querySelector('.logic-section.salary').className = 'logic-section salary';
                }
            }else{
                if(value.target.id == 'salary'){
                    document.querySelector('.logic-section.salary').className = 'logic-section salary active';
                    document.querySelector('.logic-section.hourly').className = 'logic-section hourly';
                }else{  
                    document.querySelector('.logic-section.hourly').className = 'logic-section hourly active';
                    document.querySelector('.logic-section.salary').className = 'logic-section salary';
                }
            }
        break;
    }
  }

  cancelIncomeFilter(_calculator){
    //console.log('cancel');
    _calculator.controller.filters.incomeBucket = null;
    _calculator.controller.filters.bedrooms = null;
    _calculator.form[14].length = 0;
    _calculator.form[6].value = 0;
    _calculator.form[7].value = 0;
    _calculator.form[11].value = 0;
    _calculator.form[12].value = 0;
    _calculator.form[13].value = 0;
    _calculator.form[3].value = 0;
    _calculator.form[4].value = 0;
    _calculator.form[5].value = 0;
    _calculator.controller.updateMap(_calculator.controller);
    document.getElementById('rooms').value = 'null';
    (document.querySelector('.legend.active') == null) ? 0 : document.querySelector('.legend.active').className = 'legend';
    (document.querySelector('.calculator.active') == null) ? 0 : document.querySelector('.calculator.active').className = 'calculator';
    document.querySelector('#calculator-btn').className = 'off';
    document.getElementById('income-filter-btn').className = 'filter-btn';
    document.getElementById('by-income-description').innerText = '';
  }

  computeIncomeRange(_calculator){
    //console.log(_calculator.controller);
    let AMI = 0;
    let income = 0;
    let addIncome = _calculator.form[6].valueAsNumber;
    let dependents = _calculator.form[7].valueAsNumber;
    let seniorDeduction = 0;
    let childcare = _calculator.form[11].valueAsNumber;
    let medical = _calculator.form[12].valueAsNumber;
    let householdSize = _calculator.form[13].valueAsNumber;
    let bedrooms = _calculator.form[14].value;
    if(_calculator.form[1].checked){
        income = _calculator.form[3].valueAsNumber;
    }else{
        let rate = _calculator.form[4].valueAsNumber;
        let hours = _calculator.form[5].valueAsNumber;
        income = rate * hours * 52;
    }
    (_calculator.form[9].checked) ? seniorDeduction = 0 : seniorDeduction = 400;
    let annualAdjustedGrossIncome = (income + (12 * addIncome) - (480 * dependents) - seniorDeduction - childcare - medical);
    let monthlyAdjustedGrossIncome = (income - (480 * dependents) - seniorDeduction - childcare - medical)/12 + addIncome;
    //console.log(isNaN(income));
    switch (bedrooms) {
        case 'F0BR':
            switch (true) {
                case annualAdjustedGrossIncome >= 0 && annualAdjustedGrossIncome <= 9940:
                    AMI = 20;
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;
        
                case annualAdjustedGrossIncome > 9940  && annualAdjustedGrossIncome <= 12425:
                    AMI = 25
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 12425  && annualAdjustedGrossIncome <= 14910:
                    AMI = 30
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 14910  && annualAdjustedGrossIncome <= 17395:
                    AMI = 35
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 17395  && annualAdjustedGrossIncome <= 19880:
                    AMI = 40
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 19880  && annualAdjustedGrossIncome <= 22365:
                    AMI = 45
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 22365  && annualAdjustedGrossIncome <= 24850:
                    AMI = 50
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 24850  && annualAdjustedGrossIncome <= 27335:
                    AMI = 55
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 27335  && annualAdjustedGrossIncome <= 29820:
                    AMI = 60
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 29820  && annualAdjustedGrossIncome <= 40953:
                    AMI = 80
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_80_Pct_AMI';
                    break;
                    
                case annualAdjustedGrossIncome > 39760  && annualAdjustedGrossIncome <= 49700:
                    AMI = 100
                    _calculator.controller.filters.incomeBucket = 'Too_High';
                    break;
            
                default:
                    if(!isNaN(income)){
                        AMI = 120;
                        _calculator.controller.filters.incomeBucket = 'Too_High';
                    }
                    break;
            }
            break;

        case 'F1BR':
            switch (true) {
                case annualAdjustedGrossIncome >= 0 && annualAdjustedGrossIncome <= 10650:
                    AMI = 20;
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;
        
                case annualAdjustedGrossIncome > 10650  && annualAdjustedGrossIncome <= 13313:
                    AMI = 25
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 13313  && annualAdjustedGrossIncome <= 15975:
                    AMI = 30
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 15975  && annualAdjustedGrossIncome <= 18638:
                    AMI = 35
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 18638  && annualAdjustedGrossIncome <= 21300:
                    AMI = 40
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 21300  && annualAdjustedGrossIncome <= 23963:
                    AMI = 45
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 23963  && annualAdjustedGrossIncome <= 26625:
                    AMI = 50
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 26625  && annualAdjustedGrossIncome <= 29288:
                    AMI = 55
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 29288  && annualAdjustedGrossIncome <= 31950:
                    AMI = 60
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 31950  && annualAdjustedGrossIncome <= 42600:
                    AMI = 80
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_80_Pct_AMI';
                    break;
                    
                case annualAdjustedGrossIncome > 42600  && annualAdjustedGrossIncome <= 53250:
                    AMI = 100
                    _calculator.controller.filters.incomeBucket = 'Too_High';
                    break;
            
                default:
                    if(!isNaN(income)){
                        AMI = 120;
                        _calculator.controller.filters.incomeBucket = 'Too_High';
                    }
                    break;
            }
        break;

        case 'F2BR':
            switch (true) {
                case annualAdjustedGrossIncome >= 0 && annualAdjustedGrossIncome <= 12780:
                    AMI = 20;
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;
        
                case annualAdjustedGrossIncome > 12780  && annualAdjustedGrossIncome <= 15975:
                    AMI = 25
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 15975  && annualAdjustedGrossIncome <= 19170:
                    AMI = 30
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 19170  && annualAdjustedGrossIncome <= 22365:
                    AMI = 35
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 22365  && annualAdjustedGrossIncome <= 25560:
                    AMI = 40
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 25560  && annualAdjustedGrossIncome <= 28755:
                    AMI = 45
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 28755  && annualAdjustedGrossIncome <= 31950:
                    AMI = 50
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 31950  && annualAdjustedGrossIncome <= 35145:
                    AMI = 55
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 35145  && annualAdjustedGrossIncome <= 38340:
                    AMI = 60
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 38340  && annualAdjustedGrossIncome <= 51120:
                    AMI = 80
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_80_Pct_AMI';
                    break;
                    
                case annualAdjustedGrossIncome > 51120  && annualAdjustedGrossIncome <= 63900:
                    AMI = 100
                    _calculator.controller.filters.incomeBucket = 'Too_High';
                    break;
            
                default:
                    if(!isNaN(income)){
                        AMI = 120;
                        _calculator.controller.filters.incomeBucket = 'Too_High';
                    }
                    break;
            }
        break;

        case 'F3BR':
            switch (true) {
                case annualAdjustedGrossIncome >= 0 && annualAdjustedGrossIncome <= 14750:
                    AMI = 20;
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;
        
                case annualAdjustedGrossIncome > 14750  && annualAdjustedGrossIncome <= 18438:
                    AMI = 25
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 18438  && annualAdjustedGrossIncome <= 22125:
                    AMI = 30
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 22125  && annualAdjustedGrossIncome <= 25813:
                    AMI = 35
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 25813  && annualAdjustedGrossIncome <= 29500:
                    AMI = 40
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 29500  && annualAdjustedGrossIncome <= 33188:
                    AMI = 45
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 33188  && annualAdjustedGrossIncome <= 36875:
                    AMI = 50
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 36875  && annualAdjustedGrossIncome <= 40563:
                    AMI = 55
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 40563  && annualAdjustedGrossIncome <= 44250:
                    AMI = 60
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 44250  && annualAdjustedGrossIncome <= 59000:
                    AMI = 80
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_80_Pct_AMI';
                    break;
                    
                case annualAdjustedGrossIncome > 59000  && annualAdjustedGrossIncome <= 73800:
                    AMI = 100
                    _calculator.controller.filters.incomeBucket = 'Too_High';
                    break;
            
                default:
                    if(!isNaN(income)){
                        AMI = 120;
                        _calculator.controller.filters.incomeBucket = 'Too_High';
                    }
                    break;
            }
        break;

        case 'F4BR':
            switch (true) {
                case annualAdjustedGrossIncome >= 0 && annualAdjustedGrossIncome <= 16460:
                    AMI = 20;
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;
        
                case annualAdjustedGrossIncome > 16460  && annualAdjustedGrossIncome <= 20575:
                    AMI = 25
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 20575  && annualAdjustedGrossIncome <= 24690:
                    AMI = 30
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 24690  && annualAdjustedGrossIncome <= 28805:
                    AMI = 35
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 28805  && annualAdjustedGrossIncome <= 32920:
                    AMI = 40
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 32920  && annualAdjustedGrossIncome <= 37035:
                    AMI = 45
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 37035  && annualAdjustedGrossIncome <= 41150:
                    AMI = 50
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 41150  && annualAdjustedGrossIncome <= 45265:
                    AMI = 55
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 45265  && annualAdjustedGrossIncome <= 49380:
                    AMI = 60
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 49380  && annualAdjustedGrossIncome <= 65840:
                    AMI = 80
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_80_Pct_AMI';
                    break;
                    
                case annualAdjustedGrossIncome > 65840  && annualAdjustedGrossIncome <= 82300:
                    AMI = 100
                    _calculator.controller.filters.incomeBucket = 'Too_High';
                    break;
            
                default:
                    if(!isNaN(income)){
                        AMI = 120;
                        _calculator.controller.filters.incomeBucket = 'Too_High';
                    }
                    break;
            }
        break;

        case 'F5BR':
            switch (true) {
                case annualAdjustedGrossIncome >= 0 && annualAdjustedGrossIncome <= 18160:
                    AMI = 20;
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;
        
                case annualAdjustedGrossIncome > 18160  && annualAdjustedGrossIncome <= 22700:
                    AMI = 25
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 22700  && annualAdjustedGrossIncome <= 26740:
                    AMI = 30
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_30_pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 26740  && annualAdjustedGrossIncome <= 31780:
                    AMI = 35
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 31780  && annualAdjustedGrossIncome <= 36320:
                    AMI = 40
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 36320  && annualAdjustedGrossIncome <= 40860:
                    AMI = 45
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 40860  && annualAdjustedGrossIncome <= 45400:
                    AMI = 50
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_50_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 45400  && annualAdjustedGrossIncome <= 49940:
                    AMI = 55
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 49940  && annualAdjustedGrossIncome <= 54480:
                    AMI = 60
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_60_Pct_AMI';
                    break;

                case annualAdjustedGrossIncome > 54480  && annualAdjustedGrossIncome <= 72640:
                    AMI = 80
                    _calculator.controller.filters.incomeBucket = 'Affordable_at_80_Pct_AMI';
                    break;
                    
                case annualAdjustedGrossIncome > 72640  && annualAdjustedGrossIncome <= 90800:
                    AMI = 100
                    _calculator.controller.filters.incomeBucket = 'Too_High';
                    break;
            
                default:
                    if(!isNaN(income)){
                        AMI = 120;
                        _calculator.controller.filters.incomeBucket = 'Too_High';
                    }
                    break;
            }
        break;
    
        default:
            console.log('Error: Incorrect number of bedrooms selected');
            break;
    }
    //console.log(bedrooms);
    //console.log(income);
    if(bedrooms == ''){
        _calculator.controller.filters.bedrooms = null;
        document.getElementById('rooms').value = '';
    }else{
        _calculator.controller.filters.bedrooms = bedrooms;
        let rooms = '';
        switch (bedrooms) {
            case 'F0BR':
                rooms = 'Studio';
                break;

                case 'F1BR':
                rooms = '1 - Bedroom';
                break;

                case 'F2BR':
                rooms = '2 - Bedrooms';
                break;

                case 'F3BR':
                rooms = '3 - Bedrooms';
                break;

                case 'F4BR':
                rooms = '4 - Bedrooms';
                break;

                case 'F5BR':
                rooms = '5 - Bedrooms';
                break;
        
            default:
                break;
        }
        document.getElementById('rooms').value = rooms;
    }
    if(isNaN(income) && bedrooms == ''){
        _calculator.controller.updateMap(_calculator.controller);
        document.querySelector('.calculator.active').className = 'calculator';
        document.querySelector('#calculator-btn').className = 'off';
        document.querySelector('.legend.active').className = 'legend';
        document.getElementById('income-filter-btn').className = 'filter-btn';
        document.getElementById('by-income-description').innerText = '';
    }else{
        _calculator.controller.updateMap(_calculator.controller);
        document.querySelector('.calculator.active').className = 'calculator';
        document.querySelector('#calculator-btn').className = 'on';
        document.getElementById('rooms').value = bedrooms;
        document.querySelector('.legend').className = 'legend active';
        (_calculator.controller.filters.incomeBucket == 'Too_High') ? document.getElementById('by-income-description').innerText = 'Income is too high.' : document.getElementById('by-income-description').innerText = '';
        document.getElementById('income-filter-btn').className = 'filter-btn active';
    }
    // document.getElementById('results').innerHTML = `
    // <p><strong>Annual Adjusted Gross Income:</strong> ${annualAdjustedGrossIncome}</p>
    // <p><strong>Monthly Adjusted Gross Income:</strong> ${monthlyAdjustedGrossIncome}</p>
    // <p><strong>%AMI:</strong> ${AMI}</p>
    // `;
    
  }
}
