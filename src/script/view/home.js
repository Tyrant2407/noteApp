import Utils from '../utils.js';
import NotesData from '../data/local/notesData.js';

const home = () => {
  const searchFormElement = document.querySelector('search-bar');

  const notesDataListContainerElement = document.querySelector('#notesDataListContainer');
  const notesDataListElement = notesDataListContainerElement.querySelector('notes-data-list');


  const showSportNotesData = (query) => {

    const result = NotesData.searchNotesData(query);
    displayResult(result);

    showNotesDataList();
  };

  const onSearchHandler = (event) => {
    event.preventDefault();

    const { query } = event.detail;
    showSportNotesData(query);
  };

  const displayResult = (notesData) => {
    const notesDataItemElements = notesData.map((notesData) => {
      const notesDataItemElement = document.createElement('notes-data-item');
      notesDataItemElement.notesData = notesData;

      return notesDataItemElement;
    });

    Utils.emptyElement(notesDataListElement);
    notesDataListElement.append(...notesDataItemElements);
  };

  const showNotesDataList = () => {
    Array.from(notesDataListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(notesDataListElement);
  };


  const showQueryWaiting = () => {
    Array.from(notesDataListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
  };

  searchFormElement.addEventListener('search', onSearchHandler);
  showQueryWaiting();
};

export default home;

