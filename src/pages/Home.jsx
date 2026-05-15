import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import FlipClock from '../components/features/FlipClock';
import Popup from '../components/ui/Popup';

export default function Home({ user }) {
  const navigate = useNavigate();
  const [daily, setDaily] = useLocalStorage('daily', []);
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [categories, setCategories] = useLocalStorage('categories', []);
  const [schedules, setSchedules] = useLocalStorage('schedules', []);

  const [popup, setPopup] = useState({ isOpen: false });

  // Daily
  const addDaily = () => setDaily([...daily, { text: '' }]);
  const updateDaily = (idx, text) => {
    const next = [...daily];
    next[idx].text = text;
    setDaily(next);
  };
  const removeDaily = (idx) => setDaily(daily.filter((_, i) => i !== idx));

  // Todos
  const addTodo = () => setTodos([...todos, { text: '', checked: false }]);
  const updateTodo = (idx, text, checked) => {
    const next = [...todos];
    if(text !== undefined) next[idx].text = text;
    if(checked !== undefined) next[idx].checked = checked;
    setTodos(next);
  };
  const removeTodo = (idx) => setTodos(todos.filter((_, i) => i !== idx));

  // Schedule
  const addSchedule = () => setSchedules([...schedules, { title: '', day: '', time1: '', time2: '' }]);
  const updateSchedule = (idx, field, val) => {
    const next = [...schedules];
    next[idx][field] = val;
    setSchedules(next);
  };
  const removeSchedule = (idx) => setSchedules(schedules.filter((_, i) => i !== idx));

  // Category Nav
  const addNav = () => {
    setPopup({
      isOpen: true,
      text: "Enter category name",
      defaultValue: "",
      onSubmit: (name) => {
        if(name) setCategories([...categories, name]);
        setPopup({ isOpen: false });
      },
      onClose: () => setPopup({ isOpen: false })
    });
  };

  const openNavOptions = (e, name, idx) => {
    e.preventDefault();
    setPopup({
      isOpen: true,
      text: "Choose action",
      options: [
        { label: "Open", action: () => { setPopup({isOpen:false}); navigate('/home/' + name); } },
        { label: "Rename", action: () => {
            setPopup({
              isOpen: true,
              text: "New name:",
              defaultValue: name,
              onSubmit: (newName) => {
                if(newName) {
                  const next = [...categories];
                  next[idx] = newName;
                  setCategories(next);
                }
                setPopup({isOpen: false});
              },
              onClose: () => setPopup({ isOpen: false })
            })
        }},
        { label: "Delete", action: () => {
            setCategories(categories.filter((_, i) => i !== idx));
            setPopup({isOpen: false});
        }}
      ],
      onClose: () => setPopup({ isOpen: false })
    })
  };

  return (
    <>
      <div id="home">
        <div className="home-header">
          <div className="header-banner"></div>
          <h2 id="welcomeUser">°❀⋆.ೃ࿔*:･ goodluck, {user}!</h2>
        </div>

        <div className="quote-strip">
          “every small step i take is a promise to the future i'm building.”
        </div>

        <div className="main-layout">
          {/* LEFT */}
          <div className="left-panel">
            <h3>daily routine !!</h3>
            <button onClick={addDaily}>+ add</button>
            <div id="dailyList">
              {daily.map((item, i) => (
                <div className="item" key={i}>
                  <input type="text" placeholder="time + task" value={item.text} onChange={e => updateDaily(i, e.target.value)} />
                  <button onClick={() => removeDaily(i)}>x</button>
                </div>
              ))}
            </div>

            <div className="left-aesthetic">
              <img src="/sideimg.jfif" alt="" />
            </div>

            <FlipClock />
          </div>

          {/* CENTER */}
          <div className="center-panel">
            <div className="gallery">
              <img src="/img1.jfif" alt="" />
              <img src="/img2.jfif" alt="" />
              <img src="/img3.jfif" alt="" />
            </div>

            <h3>navigation</h3>
            <div id="navList">
              {categories.map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => navigate('/home/' + cat)}
                  onContextMenu={(e) => openNavOptions(e, cat, idx)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button onClick={addNav}>+ add category</button>

            <h3>schedule</h3>
            <div id="scheduleList">
              {schedules.map((item, i) => (
                <div className="schedule-item" key={i}>
                  <input type="text" placeholder="Title" value={item.title} onChange={e => updateSchedule(i, 'title', e.target.value)} />
                  <input type="text" placeholder="Day" value={item.day} onChange={e => updateSchedule(i, 'day', e.target.value)} />
                  <input type="time" value={item.time1} onChange={e => updateSchedule(i, 'time1', e.target.value)} />
                  <input type="time" value={item.time2} onChange={e => updateSchedule(i, 'time2', e.target.value)} />
                  <button onClick={() => removeSchedule(i)}>x</button>
                </div>
              ))}
            </div>
            <button onClick={addSchedule}>+ add event</button>
          </div>

          {/* RIGHT */}
          <div className="right-panel">
            <h3>to-do list !!</h3>
            <button onClick={addTodo}>+ add</button>
            <div id="todoList">
              {todos.map((item, i) => (
                <div className="item" key={i}>
                  <input type="checkbox" checked={item.checked} onChange={e => updateTodo(i, undefined, e.target.checked)} />
                  <input type="text" placeholder="task" value={item.text} onChange={e => updateTodo(i, e.target.value, undefined)} />
                  <button onClick={() => removeTodo(i)}>x</button>
                </div>
              ))}
            </div>

            <div className="right-aesthetic">
              <img src="/right1.jfif" alt="" />
              <img src="/right2.jfif" alt="" />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bottom-footer">
          <div className="simplified-lines">
            <div className="line light"></div>
            <div className="line pink"></div>
            <div className="footer-repeat-banner"></div>
          </div>
        </div>
      </div>
      <Popup {...popup} />
    </>
  );
}
