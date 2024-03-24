class NotesDataItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notesData = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({
      mode: 'open'
    });
    this._style = document.createElement('style');
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  set notesData(value) {
    this._notesData = value;

    // Render ulang
    this.render();
  }

  get notesData() {
    return this._notesData;
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
          display: block;
          border-radius: 8px;
          
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
          overflow: hidden;
          background-color: white;
        }
  
        .notes-data-info {
          padding: 16px 24px;
        }
  
        .notes-data-info__title h2 {
          font-weight: lighter;
          color: red;
        }
  
        .notes-data-info__description p {
          display: -webkit-box;
          margin-top: 10px;
          
          overflow: hidden;
  
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5; /* number of lines to show */
        }
      `;
  }

  render() {
    const createdAtDate = new Date(this._notesData.createdAt);
    const createdAtString = createdAtDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });

    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="card">
          <div class="notes-data-info">
            <div class="notes-data-info__title">
              <h2>${this._notesData.title}</h2>
            </div>
            <div class="notesData-info__description">
              <p>${this._notesData.body}</p>
            </div>
            <div class="notesData-info__description">
              <p>${createdAtString}</p>
            </div>
          </div>
        </div>
      `;
  }
}

customElements.define('notes-data-item', NotesDataItem);