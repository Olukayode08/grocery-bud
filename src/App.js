import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import imageOne from './images/one.jpg'
import imageTwo from './images/two.jpg';
import imageThree from './images/three.avif';
import imageFive from './images/four.avif';
import imageFour from './images/five.avif';
import imageSix from './images/seven.avif';
import imageSeven from './images/six.avif';
import imageEight from './images/eight.png';



const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'Please Input a grocery item');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name};
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Grocery changed');
    } else {
      showAlert(true, 'success', 'Grocery added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  const clearList =  () => {
    showAlert(true, 'danger', 'Empty shopping list');
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'Grocery removed');
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]); 
  return (
    <>
      <h1> Want to go Shopping?</h1>
      <div className='shopping'>
        <div className='left'>
          <section className='section-center'>
            <form className='grocery-form' onSubmit={handleSubmit}>
              {alert.show && (
                <Alert {...alert} removeAlert={showAlert} list={list} />
              )}
              <h3>Create your Shopping List</h3>
              <div className='form-control'>
                <input
                  type='text'
                  className='grocery'
                  placeholder='e.g. apple'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button type='submit' className='submit-btn'>
                  {isEditing ? 'Edit' : 'Submit'}
                </button>
              </div>
            </form>
          </section>
          {list.length > 0 && (
            <div className='grocery-container'>
              <List items={list} removeItem={removeItem} editItem={editItem} />
              <button className='btn' onClick={clearList}>
                Clear list
              </button>
            </div>
          )}
        </div>
        <div className='right'>
          <h1 className='preview'>Preview our store</h1>
          <div className='right-images'>
            <img src={imageTwo} alt='Shopping' />
            <img src={imageOne} alt='Shopping' />
            <img src={imageSeven} alt='Shopping' />
            <img src={imageEight} alt='Shopping' />
            <img src={imageThree} alt='Shopping' />
            <img src={imageFour} alt='Shopping' />
            <img src={imageFive} alt='Shopping' />
            <img src={imageSix} alt='Shopping' />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


