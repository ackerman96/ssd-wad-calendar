import logo from './logo.svg';
import './App.css';
import {fill, map} from 'lodash';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';


function App() {

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [time, setTime] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState({});


  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getDateinMonth = (year, month, date) => new Date(year, month + 1,date).getDate();

  const currentDate = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let year = currentDate.getFullYear();
  let monthName = months[currentDate.getMonth()];
  let month = currentDate.getMonth();
  let dayName = days[currentDate.getDay()];
  let totalDates = getDaysInMonth(year, month);

  // const getDaysInMonth = (year, month) => {
  //   return new Date(year, month + 1, 0).getDate();
  // };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  //  const firstDayOfMonth = new Date(year, month, 1);
  //  const lastDayOfMonth = new Date(year, month + 1, 0);
   const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
   const emptyDaysArray = Array.from({ length: firstDayOfMonth }, () => null);
 
  let objectDay =(dateFormat) => {
    return {
    date: 'test',
    day: 'test',
    events:'test',
    }
  };


  let filledArray = [];

  let datesArray = [];
  for (let i = 1; i <= totalDates; i++) {
    // let objectDate = {
      // date: new Date(year, month, i),
      // day: days[new Date(year, month, i).getDay()],
      // events:[]
    // }
    datesArray.push(new Date(year, month, i));
  }

  let index = 1;
 
  let displayCalendar =[];
  datesArray.map(calendar  => {
    
    displayCalendar.push(
      <div style={{height: 100, width: 100}}>
        <p>{calendar.toDateString()}</p>
      </div>
    )
  })

  const addEvent = (day, index) => () =>{
    // const dayObject = e.target.value;
    setOpen(true);
    setSelectedDate({day, index});
    console.log('ini date', selectedDate, index)

  }
const onSubmit = () => {
  setOpen(false);
  const day = selectedDate.day;
  const dayIndex = selectedDate.index;
  if(datesArray[index].events=== undefined ){
    datesArray[index].events.push({time, email, name});
  }else if(datesArray[index].events.length > 3){

  }else if(datesArray[index].events.length < 3){
    datesArray[index].events.push({time, email, name});
  }
  console.log('disini ya', day, dayIndex);
  console.log('all of them', time, email, name);
  console.log('calendar', datesArray);
}
  return (
    <div className="App">
      <div>{monthName}</div>
      <div>{totalDates}</div>
      <div className="calendar">
      
      <div className="calendar-grid">
        <div className="calendar-day">Sun</div>
        <div className="calendar-day">Mon</div>
        <div className="calendar-day">Tue</div>
        <div className="calendar-day">Wed</div>
        <div className="calendar-day">Thu</div>
        <div className="calendar-day">Fri</div>
        <div className="calendar-day">Sat</div>
        {emptyDaysArray.map((_, index) => <div key={index} className="calendar-day"></div>)}
        {datesArray.map((day, index) => <div onClick={addEvent(day, index)} key={day} className="calendar-day">
        {day.toDateString()}
        {day.events=== undefined? '': day.events.time+ day.events.name+day.events.email}
        </div>)}
      </div>
    </div>
    <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            This is the modal title
          </Typography>
          <Input size="md" placeholder="Name" onChange={event => setName(event.target.value)}/>
          <Input size="md" placeholder="Time"  type={'time'} onChange={event => setTime(event.target.value)}/>
          <Input size="md" placeholder="Events" type={'email'} onChange={event => setEmail(event.target.value)}/>
          <Input size="md" placeholder="Events" type={'submit'} onClick={onSubmit}/>
          
        </Sheet>
      </Modal>
    </div>
  );
}

export default App;
