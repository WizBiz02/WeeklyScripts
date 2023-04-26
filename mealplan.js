function MealPlan() {
  
  //Opening the document
  var doc=SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/YOURSPREADSHEET').getSheetByName('Meal Plan');
  var values = doc.getDataRange().getValues();
  
// Get the name of the document to use as an email subject line.
  var dated= new Date().getDate();
  dated=dated+7;
  var datem= new Date().getMonth()+1;
  var subject = ""

  //defining the variables
  var body = ''//'Your meal plan for '+ datem+'/'+dated+' is: \n';
  
  // Things to Purchase
  var Ingredient_List=[]
  var Ingredient_List_Special=[]

  //Arrays
  const Index_B=[]
  const Index_L=[]
  const Index_D=[]

  //For loop over each row
  for (var row = 1; row < values.length; row++) {
      if (values[row][0]=="Breakfast"){
        Index_B.push(row)
      }
      if (values[row][0]=="Lunch"){
        Index_L.push(row)
      }
      if (values[row][0]=="Dinner"){
        Index_D.push(row)
      }
    }


  //day of the motherfucking week makeer thing for Haley
  var DaysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday"]
  var monthshift=0
  var dayshift=0

  for (var day= 0; day < 7; day++){
      var datenew= dated+day
      if(datem===2){
        if(datenew>28){monthshift=1;dayshift=1}
        datenew=datenew%29+dayshift
        }
      else if (datem===4||datem===6||datem===9||datem===11){
        if(datenew>30){monthshift=1;dayshift=1}
        datenew=datenew%31+dayshift
        }
      else {
        if(datenew>31){monthshift=1;dayshift=1}
        datenew=datenew%32+dayshift
        }
      var shown_month=datem+monthshift
      if(subject==="")
      {
      subject="Meal Plan "+ shown_month+'/'+datenew;
      }

      let rand_B=Index_B[Math.floor(Math.random()*Index_B.length)]
      let rand_L=Index_L[Math.floor(Math.random()*Index_L.length)]
      let rand_D=Index_D[Math.floor(Math.random()*Index_D.length)]

      
      body+="<p style=';font-size:18px'>"

      body +='<b>'+DaysOfTheWeek[day] +": " + shown_month +"/" + datenew +"</b><br>"


      body += "Breakfast: " + values[rand_B][1] +"<br>"
      Ingredient_List.push.apply(Ingredient_List,values[rand_B][2].split(' '));
      Ingredient_List_Special.push.apply(Ingredient_List_Special,values[rand_B][3].split(' '));
      var event = CalendarApp.getCalendarById('CALENDARID@group.calendar.google.com').createEvent(values[rand_B][1],
      new Date(shown_month+" "+ datenew + ' 2023 09:00:00 UTC'),
      new Date(shown_month+" "+ datenew + ' 2023 10:00:00 UTC'))
      Logger.log('Event ID: ' + event.getId());

      body += "Lunch: " + values[rand_L][1] +"<br>"
      Ingredient_List.push.apply(Ingredient_List,values[rand_L][2].split(' '));
      Ingredient_List_Special.push.apply(Ingredient_List_Special,values[rand_L][3].split(' '));
      var event =CalendarApp.getCalendarById('CALENDARID@group.calendar.google.com').createEvent(values[rand_L][1],
      new Date(shown_month+" "+ datenew + ' 2023 14:00:00 UTC'),
      new Date(shown_month+" "+ datenew + ' 2023 15:00:00 UTC'))
      Logger.log('Event ID: ' + event.getId());

      body += "Dinner: " + values[rand_D][1] +"<br>"
      Ingredient_List.push.apply(Ingredient_List,values[rand_D][2].split(' '));
      Ingredient_List_Special.push.apply(Ingredient_List_Special,values[rand_D][3].split(' '));
      var event =CalendarApp.getCalendarById('CALENDARID@group.calendar.google.com').createEvent(values[rand_D][1],
      new Date(shown_month+" "+ datenew + ' 2023 20:00:00 UTC'),
      new Date(shown_month+" "+ datenew + ' 2023 21:00:00 UTC'))
      Logger.log('Event ID: ' + event.getId());

      body+="</p>"
   

  }

  const count = {};
  Ingredient_List.forEach(element => {  count[element] = (count[element] || 0) + 1;});

  Ingredient_List=[...new Set(Ingredient_List.sort())]
  Ingredient_List_Special=[...new Set(Ingredient_List_Special.sort())]

  body +="<p style=';font-size:18px'> <b>Ingredients:</b><br>"
  for (var row = 0; row < Ingredient_List.length; row++) {
    body+="- "+Ingredient_List[row].replace("_", " ").link("www.walmart.com/search?q="+Ingredient_List[row])+"<br>"
  }
  body+="</p>"

  body +="<p style=';font-size:18px'><b>Special Ingredients:</b><br>"
  for (var row = 0; row < Ingredient_List_Special.length; row++) {
    if (Ingredient_List.indexOf(Ingredient_List_Special[row])==-1){
    body+="- "+Ingredient_List_Special[row].replace("_", " ").link("www.walmart.com/search?q="+Ingredient_List_Special[row])+"<br>"
    }  
  }
  body+="</p>"


  GmailApp.sendEmail('MYEMAIL@gmail.com', subject, body,{htmlBody:body}); 
  GmailApp.sendEmail('OTHEREMAIL@gmail.com', subject, body,{htmlBody:body}); 
}

