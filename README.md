# PMDatesPicker
see live demo here : https://hossein-khalili.github.io/PMDatesPicker/
## Description
PMDatesPicker is a Jalali multidates picker calendar based on persianDate library and jQuery.
> to find out more about persianDate see here : http://babakhani.github.io/PersianWebToolkit/doc/persiandate/0.1.8/

## How To Use
lets see how to use it 
### Installation
first you should add jQuery and persianDate to your project.
to do that you just need to add these line of code to your html file.

```
<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script src="http://rawgithub.com/babakhani/PersianDate/master/dist/0.1.8/persian-date-0.1.8.min.js"></script>
```
add fontawesome stylesheets
```
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
```
and also you should load PMDatesPicker's `.js` and `.css` file 
```
<link rel="stylesheet" type="text/css" href="PMDatesPicker.css">
<script src="PMDatesPicker.js"></script>
```

now you should create a div and add `.calendar` class and an id to it 

`<div class="calendar" id="yourFavoriteId" ></div>`

after these steps you should initialize your calendar 
add a script tag to your html and call init function like below 
```
<script>
  var myCalendar = PMDatesPicker.calendar("#yourFavoriteId"); // you can use any selector but i recommend to use ids
</script>
```

### Methods

```
  var myCalendar = PMDatesPicker.calendar( selector , limit /*optional*/ );
```
this method create your calendar inside of the element that you selected with the selector.
you can also set limits, it's an optional parameter to set number of months from now that user can pick dates from them.
limit's default value is 12 months from now.

```
  myCalendar.now();
```
returns this moment's persianDate object 

```
  myCalendar.selectDays([date1,date2,...]);
  myCalendar.deselectDays([date1,date2,...]);
```

select and deselect a special day in calendar, give a list of dates as an argument. dates' format should be like "YYYY-M-D"

```
  myCalendar.nextMonth($("#yourFavoriteId"));
  myCalendar.prevMonth($("#yourFavoriteId"));
```
go to next or previous month on calendar 

```
  myCalendar.getSelectedDays();
```

returns a list of selected days.

