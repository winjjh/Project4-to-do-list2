const addInput = document.getElementById('addTodo');
const addButton = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todos');
const mainSelect = document.getElementById("mainSelect");
const inputDate = document.getElementById('datepicker');
const nowDate = document.getElementById('nowDate')
const datepicker = new Datepicker('#datepicker');


const getListItems = () => document.querySelectorAll('#todos > li')

const todoTitle = text => {
	const title = document.createElement('span')
	title.classList.add("inner-text")
  title.innerText = text
  
  return title
}

const todoInput = () => {
	const editInput = document.createElement('input')
	editInput.classList.add('editInput')

	return editInput
}

const dateP = date => {
	const dateP = document.createElement('p');
	dateP.classList.add('date-p');
	dateP.innerText = date;
	
	return dateP;
}

const setColor = (color, el) => {
	el.style.boxShadow = "inset 10px 0px 0px 0px " + color;
}

const todoWrapper = () => {
	const wrapper = document.createElement('li');
	wrapper.classList.add('list')

	function styleVisibility() {
		wrapper.style.opacity = "1"
	}
	
	setTimeout(styleVisibility, 1);

  return wrapper
}

const todoCheckbox = checked => {
	const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
	checkbox.checked = checked
  
  checkbox.addEventListener('click', () => {

		saveData()

  })
  
  return checkbox
}

const todoCheckLabel = () => {
	const checkLabel = document.createElement('label')
	const checkSpan = document.createElement('span')
	checkLabel.classList.add('check-container')
	checkSpan.classList.add('checkmark')
	checkLabel.appendChild(checkSpan)

	return checkLabel
}

const todoItem = ({ text, checked, color, date }) => {
	const wrapper = todoWrapper();
	const labelContainer = todoCheckLabel();
  const checkbox = todoCheckbox(checked);
	const title = todoTitle(text);
	const edInput = todoInput();
	const btnDiv = buttonsDiv();
	const setDate = dateP(date);

	const remBtn = rBtn();
	const edBtn = eBtn();
	const okBtn = oBtn();

	wrapper.appendChild(labelContainer)
  labelContainer.insertBefore(checkbox, labelContainer.children[0]);
	wrapper.appendChild(title)
	wrapper.appendChild(setDate)
	wrapper.appendChild(btnDiv)

	btnDiv.appendChild(remBtn);
	btnDiv.appendChild(edBtn);
	
	remBtn.addEventListener('click', () => {
		localStorage.removeItem("todo")
		todoList.removeChild(wrapper);
		saveData()
	});

	edBtn.addEventListener('click', () => {
		edInput.value = title.innerHTML
		wrapper.removeChild(title);
		wrapper.insertBefore(edInput, wrapper.children[1]);
		edInput.focus();
		btnDiv.removeChild(edBtn);
		btnDiv.appendChild(okBtn);
	});

	okBtn.addEventListener('click', () => {
		title.innerHTML = edInput.value
		wrapper.removeChild(edInput);
		wrapper.insertBefore(title, wrapper.children[1]);
		btnDiv.removeChild(okBtn);
		btnDiv.appendChild(edBtn);
	})

	const textStyle = () => {
		if(checkbox.checked) {
			title.style.textDecoration = "line-through"
			title.style.color = "#adb5bd"
		} else {
			title.style.textDecoration = "none"
			title.style.color = "#343a40"
		}
	}

	checkbox.addEventListener('click', () => {
		textStyle()
	})

	textStyle()

	const valueColor = {
		no:() => {
			return wrapper;
		},
		low:() => {
			setColor('#fdf99e', wrapper);
		},
		middle:() => {
			setColor('#def29e', wrapper);
		},
		high:() => {
			setColor('#a7ea67', wrapper);
		}
	}
	
	valueColor[color]();

	wrapper.dataset.priority = color

  return wrapper
}

const addTodo = data => {
  const todo = todoItem(data)
  todoList.appendChild(todo)
}

const buttonsDiv = () => {
	const btnsDiv = document.createElement('div');
	btnsDiv.classList.add('btnsDiv');
	
	return btnsDiv;
}

const rBtn = () => {
	const removeBtn = document.createElement('button');
	removeBtn.classList.add('removeBtn');
	removeBtn.classList.add('square-btn');
	removeBtn.id = 'removeBtn'

	const removeIcon = document.createElement('i');
	removeIcon.classList.add( "circle-icon", "far", "fa-trash-alt" );
	removeBtn.appendChild(removeIcon);

	return removeBtn
}

const eBtn = () => {
	const editBtn = document.createElement('button');
	editBtn.classList.add('editBtn');
	editBtn.classList.add('square-btn');
	editBtn.id = 'editBtn';

	const editIcon = document.createElement('i');
	editIcon.classList.add( "circle-icon", "fas", "fa-pen" );
	editBtn.appendChild(editIcon);

	return editBtn;
}

const oBtn = () => {
	const okBtn = document.createElement('button');
	okBtn.classList.add('okBtn');
	okBtn.classList.add('square-btn');
	okBtn.id = 'okBtn';

	const okIcon = document.createElement('i');
	okIcon.classList.add( "circle-icon", "far", "fa-check-square" );
	okBtn.appendChild(okIcon);

	return okBtn;
}

const clear = anyInput => {
	anyInput.value = "";
}

const parseListItem = item => {
  const text = item.querySelector('span.inner-text')
	const checkbox = item.querySelector('input[type="checkbox"]')
	const dateText = item.querySelector('p.date-p')

  return {
    text: text.innerText,
		checked: checkbox.checked,
		color: item.dataset.priority,
		date: dateText.innerText
	}
}

const parseList = list => {
  return list.map(parseListItem)
}

const saveData = () => {
  const data = parseList([ ...getListItems() ])
  localStorage.setItem('todos', JSON.stringify(data))
}

const loadData = () => {
  const data = localStorage.todos
  
  if (data) {
    const parsedData = JSON.parse(data)
    parsedData.forEach(addTodo)
  }
}

addButton.addEventListener('click', () => {
	
	if(!addInput.value.trim()) {
		return false;
	}

  const data = {
    text: addInput.value,
		checked: false,
		color: mainSelect.options[mainSelect.selectedIndex].value,
		date: inputDate.value
  }

  addTodo(data)
	saveData()
	clear(addInput)
})

loadData()

const getDate = () => {
	var months=new Array(13);
			months[1]="January";
			months[2]="February";
			months[3]="March";
			months[4]="April";
			months[5]="May";
			months[6]="June";
			months[7]="July";
			months[8]="August";
			months[9]="September";
			months[10]="October";
			months[11]="November";
			months[12]="December";

	var time=new Date();
	var thismonth=months[time.getMonth() + 1];
	var date=time.getDate();
	var thisyear=time.getFullYear();
	var day=time.getDay() + 1;

	if (thisyear < 2000)
	thisyear = thisyear + 1900;
	if(day==1) DayofWeek = "Sunday";
	if(day==2) DayofWeek = "Monday";
	if(day==3) DayofWeek = "Tuesday";
	if(day==4) DayofWeek = "Wednesday";
	if(day==5) DayofWeek = "Thursday";
	if(day==6) DayofWeek = "Friday";
	if(day==7) DayofWeek = "Saturday";

	nowDate.innerHTML = "<span>" + DayofWeek + " " + date + "</span>" + "<br>" + thismonth;
}

getDate()