/* 
	Persian multidates picker Based on persianDate and jQuery
	Author : Hossein Khalili
	Version : 0.1
*/

window.PMDatesPicker = (function($,persianDate){
		//private variables
		var today=persianDate(),
				calendar={},
					list = [],
						DOM="",
							nameOfMonths = ['فروردین','اردیبهشت','خرداد',
											'تیر','مرداد','شهریور',
											'مهر','آبان','آذر',
											'دی','بهمن','اسفند'];
		
		//private methods 
		function init(calendar,limitMonth){
			if(!limitMonth){
				limitMonth = 12;
			}
			var now = persianDate().startOf('month');
			DOM = calendar;
			window.formatPersian = false;

			var calendarBox = $(calendar);
			var topbar = document.createElement('div');
			topbar.className = "calendarTopbar";

			//create next and previous button
			//define next
			var next = document.createElement('button');
			next.innerHTML = "<i class='fa fa-angle-left'></i>";
			next.onclick = function(){PMDatesPicker.nextMonth(calendarBox);};

			//define previous
			var previous = document.createElement('button');
			previous.innerHTML = "<i class='fa fa-angle-right'></i>";
			previous.onclick = function(){PMDatesPicker.prevMonth(calendarBox);};

			//define name of month
			var name = document.createElement('span');
			name.id = "name";
			name.innerHTML = nameOfMonths[today.month()-1] +" "+ String(today.year()).slice(2,4);

			//append them to topbar 
			topbar.appendChild(next);
			topbar.append(name);
			topbar.appendChild(previous);

			//append top bar to calendar
			calendarBox.append(topbar);

			//create and append months tables into calendar 
			for (var i = 0; i < limitMonth; i++) {
				var table = renderMonth(now.month(),now.year());
				table.className += 'calendarTable';
				calendarBox.append(table);
				if(now.month() <7){
					now = now.add('day',31);
				}else{
					now = now.add('day',30);	
				}
			}
			$('.calendarTable td[data-date='+today.format('YYYY-M-D')+']').addClass('today');
			$('.calendarTable').first().addClass('active');
			$('.calendarTable.active td').filter(function(){return Number(String($(this).data('date')).split('-')[2]) < today.date() }).addClass('disabled');
			return PMDatesPicker;
		}
		
		function selectDay(date){
			list.push(date);	
			$('td[data-date ='+date+']').children(0).toggleClass('selected');
		}
		
		function deselectDay(date){
			list.splice(list.indexOf(date),1);
			$('td[data-date ='+date+']').children(0).toggleClass('selected');
		}
		
		function nextMonth(calendar){
			var currentMonthTable = calendar.children('.active');
			
			
			if(currentMonthTable.next('table').length){
				var current = currentMonthTable.next('table');
				$(DOM+' .calendarTopbar > span').text(nameOfMonths[current.attr('data-month')-1]+String(current.attr('data-year')).slice(2,4));
				currentMonthTable.next('table').addClass('active');
				currentMonthTable.removeClass('active');
			}			
		}
		
		function prevMonth(calendar){
			var currentMonthTable = calendar.children('.active');
			
			if(currentMonthTable.prev('table').length){
				var current = currentMonthTable.prev('table');
				$(DOM+' .calendarTopbar > span').text(nameOfMonths[current.attr('data-month')-1]+String(current.attr('data-year')).slice(2,4));
				currentMonthTable.prev('table').addClass('active');
				currentMonthTable.removeClass('active');
			}	
		}
		
		function renderMonth(month,year){
			var calendarTable = document.createElement('table');
			calendarTable.id = "month_"+month;
			// create title row
			var firstRow = document.createElement('tr');
			firstRow.innerHTML = "<th>ش</th><th>ی</th><th>د</th><th>س</th><th>چ</th><th>پ</th><th>ج</th>";
			calendarTable.appendChild(firstRow);
			calendarTable.dataset.month = month;
			calendarTable.dataset.year = year;
			var printDay = persianDate([year,month,1,8]); 
			if(month <= 6){
				//if in the first 6 month of year
				var row = document.createElement('tr');
				
				//skip days of week to first day
				
				for(var skip=1;skip<printDay.day();skip++){

					var col = document.createElement('td');
					col.innerHTML = "";
					row.appendChild(col);
				}
				//append other days 
				for(var numberOfDay = 1;numberOfDay < 32;numberOfDay++){
					
					if(row.childElementCount == 7){
						calendarTable.appendChild(row);
						row = document.createElement('tr');
						
					}
					var col = document.createElement('td');
					col.innerHTML = "<div class='date'>"+printDay.date()+"</div>";
					col.dataset.date = printDay.year()+'-'+printDay.month()+'-'+printDay.date();
					col.onclick = function(){
						if(!$(this).hasClass('disabled')){
							if($(this).children().hasClass('selected')){
								PMDatesPicker.deselectDay(this.dataset.date);
							}else{
								PMDatesPicker.selectDay(this.dataset.date);
							}
							
						}
						
					};
					row.appendChild(col);
					printDay = printDay.add('h',24);
					

				}
				if(row.childElementCount < 7 && row.childElementCount != 0){
					for(var i=row.childElementCount;i < 7;i++){
						var col = document.createElement('td');
						row.appendChild(col);
					}
				}
				calendarTable.appendChild(row);

			}else{
				//if in the last 6 month of year 
				var row = document.createElement('tr');
				//skip days of week to first day
				
				for(var skip=1;skip<printDay.day();skip++){
					var col = document.createElement('td');
					col.innerHTML = "";
					row.appendChild(col);
					
				}
				//append other days 
				for(var numberOfDay = 1;numberOfDay < 31;numberOfDay++){
					if(row.childElementCount == 7){
						calendarTable.appendChild(row);
						row = document.createElement('tr');
					}
					var col = document.createElement('td');

					col.innerHTML = "<div class='date'>"+printDay.date()+"</div>";
					col.dataset.date = printDay.year()+'-'+printDay.month()+'-'+printDay.date();
					col.onclick = function(){
						if(!$(this).hasClass('disabled')){
							if($(this).children().hasClass('selected')){
								PMDatesPicker.deselectDay(this.dataset.date);
							}else{
								PMDatesPicker.selectDay(this.dataset.date);
							}
							
						}
						
					};
					row.appendChild(col);
					if(printDay.month() == 12 && printDay.date() == 29){
						printDay = printDay.add('h',24);	
						if(printDay.date() == 1){break;}
					}else{
						printDay = printDay.add('h',24);	
					}
					

				}
				if(row.childElementCount < 7 && row.childElementCount != 0){
					for(var i=row.childElementCount;i < 7;i++){
						var col = document.createElement('td');
						row.appendChild(col);
					}
				}
				calendarTable.appendChild(row);
				
			}
			return calendarTable;
		}

		//public methods 
		calendar.calendar = function(target,limit){
			return init(target,limit);
		};
		calendar.now = function(){
			return today;
		};
		calendar.selectDay = function(date){
			selectDay(date);
		};
		calendar.nextMonth=function(calendar){
			nextMonth(calendar);
		};
		calendar.prevMonth=function(calendar){
			prevMonth(calendar);
		};
		calendar.deselectDay = function(date){
			deselectDay(date);
		};
		calendar.getSelectedDays = function(){
			return list;
		};

		return calendar;
})(jQuery,persianDate);
