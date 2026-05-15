import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function EntryPage() {
  const { catName, entryName } = useParams();
  const navigate = useNavigate();

  const [pages, setPages] = useLocalStorage(`pages_${catName}_${entryName}`, []);
  const [todos, setTodos] = useLocalStorage(`entryTodos_${catName}_${entryName}`, []);

  const format = (cmd) => {
    document.execCommand(cmd, false, null);
  };

  const addPage = () => {
    setPages([...pages, '']);
  };

  const removePage = (idx) => {
    setPages(pages.filter((_, i) => i !== idx));
  };

  const updatePage = (idx, html) => {
    const next = [...pages];
    next[idx] = html;
    setPages(next);
  };

  // Todos
  const addTodo = () => setTodos([...todos, { text: '', checked: false }]);
  const updateTodo = (idx, text, checked) => {
    const next = [...todos];
    if(text !== undefined) next[idx].text = text;
    if(checked !== undefined) next[idx].checked = checked;
    setTodos(next);
  };
  const removeTodo = (idx) => setTodos(todos.filter((_, i) => i !== idx));

  return (
    <div id="entryPage">
      <div className="entry-container">
        <button onClick={() => navigate(`/home/${catName}`)} className="back-btn">← back</button>

        <div className="entry-header">
          <h2 id="entryCategoryTitle">{catName}</h2>
          <h3 id="entryTitle">{entryName}</h3>

          <div className="entry-divider" contentEditable="true" suppressContentEditableWarning>
            write your thoughts here...
          </div>
        </div>

        <div className="entry-layout">
          {/* NOTES */}
          <div className="notes-section">
            <button className="add-page-btn" onClick={addPage}>+ add page</button>
            <div id="pagesContainer">
              {pages.map((html, idx) => (
                <Page 
                  key={idx} 
                  initialHtml={html} 
                  onRemove={() => removePage(idx)}
                  onChange={(newHtml) => updatePage(idx, newHtml)}
                  onFormat={format}
                />
              ))}
            </div>
          </div>

          {/* TODO */}
          <div className="entry-todo">
            <h3>to-do</h3>
            <button onClick={addTodo}>+ add</button>
            <div id="entryTodoList">
              {todos.map((item, i) => (
                <div className="item" key={i}>
                  <input type="checkbox" checked={item.checked} onChange={e => updateTodo(i, undefined, e.target.checked)} />
                  <input type="text" placeholder="task" value={item.text} onChange={e => updateTodo(i, e.target.value, undefined)} />
                  <button onClick={() => removeTodo(i)}>x</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Page({ initialHtml, onRemove, onChange, onFormat }) {
  const contentEditableRef = useRef(null);

  const handleBlur = () => {
    if (contentEditableRef.current) {
      onChange(contentEditableRef.current.innerHTML);
    }
  };

  return (
    <div className="page">
      <div className="editor-toolbar">
        <button onClick={(e) => { e.preventDefault(); onFormat('bold'); }}>B</button>
        <button onClick={(e) => { e.preventDefault(); onFormat('italic'); }}>I</button>
        <button onClick={(e) => { e.preventDefault(); onFormat('underline'); }}>U</button>
      </div>

      <div 
        className="editor" 
        contentEditable="true" 
        suppressContentEditableWarning
        ref={contentEditableRef}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: initialHtml }}
      ></div>

      <button onClick={onRemove}>x</button>
    </div>
  );
}
