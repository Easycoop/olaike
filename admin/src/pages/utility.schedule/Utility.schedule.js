import * as React from 'react';
import './Admin.utility.css';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';

import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  MonthAgenda,
  TimelineViews,
  TimelineMonth,
  Inject,
} from '@syncfusion/ej2-react-schedule';

import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/react/style.css';

// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-ru-RU'; // you can import any other locale

// // Import bootstrap(v3 or v4) dependencies
// import 'bootstrap/js/modal';
// import 'bootstrap/js/dropdown';
// import 'bootstrap/js/tooltip';
// import 'bootstrap/dist/css/bootstrap.css';
function UtilitySchedule() {
  const editor = useCreateBlockNote();

  const onChange = (content) => {
    console.log('onChange', content);
  };

  const [select, setSelect] = React.useState({
    select1: true,
    select2: false,
  });

  // const locales = {
  //   'en-US': enUS,
  // };

  // const localizer = dateFnsLocalizer({
  //   format,
  //   parse,
  //   startOfWeek,
  //   getDay,
  //   locales,
  // });

  const data = [
    {
      Id: 2,
      Subject: 'Meeting',
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 12, 30),
      IsAllDay: false,
      Status: 'Completed',
      Priority: 'High',
    },
  ];
  const fieldsData = {
    id: 'Id',
    subject: { name: 'Subject' },
    isAllDay: { name: 'IsAllDay' },
    startTime: { name: 'StartTime' },
    endTime: { name: 'EndTime' },
  };
  const eventSettings = { dataSource: data, fields: fieldsData };

  return (
    <div className="admin__utility">
      <section className="account__notifications__section__two">
        <div className="account__notifications__select__div">
          <button
            className={select.select1 ? 'account__notifications__select selected' : 'account__notifications__select'}
            onClick={() =>
              setSelect((prevState) => ({
                ...prevState,
                select1: true,
                select2: false,
                select3: false,
              }))
            }
          >
            Note pad
          </button>
          <button
            className={select.select2 ? 'account__notifications__select selected' : 'account__notifications__select'}
            onClick={() =>
              setSelect((prevState) => ({
                ...prevState,
                select1: false,
                select2: true,
                select3: false,
              }))
            }
          >
            Schedule
          </button>
        </div>
      </section>

      {select.select1 ? (
        <div className="admin__settings__section__two__theme">
          <h1>Note pad</h1>
          {/* <ReactSummernote
            value="Default value"
            options={{
              lang: 'ru-RU',
              height: 350,
              dialogsInBody: true,
              toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'clear']],
                ['fontname', ['fontname']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview']],
              ],
            }}
            onChange={onChange}
          /> */}
          <BlockNoteView editor={editor} />
        </div>
      ) : (
        <></>
      )}
      {select.select2 ? (
        <div className="admin__settings__section__two__theme">
          <h1>Scheduler</h1>
          <ScheduleComponent height="100vh" selectedDate={new Date(2018, 1, 15)} eventSettings={eventSettings}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth]} />
          </ScheduleComponent>
        </div>
      ) : (
        <></>
      )}

      {/* <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      /> */}
    </div>
  );
}

export default UtilitySchedule;
