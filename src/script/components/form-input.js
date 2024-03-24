class FormInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupFormSubmission();
    }

    _Style() {
        const style = document.createElement('style');
        style.textContent = `
            #error-alert {
                margin-top: 10px;
                font-size: 14px;
            }
            form {
                max-width: 750px;
                margin: 20px auto;
                padding: 30px;
                background-color: #EEEEEE;
                border-radius: 10px;
                box-shadow: 0 5px 5px gray;
                display: flex;
                flex-direction: column;
                
            }
            h1 {
                margin-bottom: 20px; /* Atur jarak antara judul dan formulir */
                text-align: center; /* Pusatkan teks */
            }
            
            label {
                display: block;
                margin-bottom: 5px;
                font-size: 16px;
                color: black;
            }
            
            input[type="text"],
            textarea {
                width: calc(100% - 20px);
                padding: 10px;
                margin-bottom: 25px;
                border-shadow: 7px;
                border-radius: 6px;
                background-color: #fff;
                color: #333;
                font-size: 16px;
                box-sizing: border-box;
            }
            
            textarea {
                resize: vertical;
                min-height: 100px;
            }
            
            button[type="submit"] {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                background-color: #5356FF;
                color: #fff;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            button[type="submit"]:hover {
                background-color: #007F73;
            }
            
            @media screen and (max-width: 768px) {
                form {
                    max-width: 90%;
                }
                
                input[type="text"],
                textarea {
                    width: calc(100% - 20px); 
                }
                
                button[type="submit"] {
                    font-size: 14px;
                    padding: 8px 16px; 
                }
            }
            
            @media screen and (max-width: 480px) {
                input[type="text"],
                textarea {
                    font-size: 14px; 
                }
                
                button[type="submit"] {
                    font-size: 12px; 
                    padding: 6px 12px; 
                }
            }            
            
        `;
        this.shadowRoot.appendChild(style);
    }

    render() {
        this._Style();
        const form = document.createElement('form');
        form.innerHTML = `
            <h1>Tambahkan Catatan Anda</h1>
            <label for="title">Judul</label><br>
            <input type="text" id="title" name="title" required minlength="1"><br><br>
            <label for="body">Keterangan</label><br>
            <textarea id="body" name="body" rows="4" required minlength="1"></textarea><br><br>
            <button type="submit">Tambah Catatan</button>
            <div id="error-alert" style="color: red;"></div>
        `;
        this.shadowRoot.appendChild(form);
    }

    setupFormSubmission() {
        const form = this.shadowRoot.querySelector('form');
        const error = this.shadowRoot.getElementById('error-alert');
        const titleInput = form.querySelector('#title');
        const bodyInput = form.querySelector('#body');

        form.addEventListener('submit', event => {
            event.preventDefault();
            if (form.checkValidity()) {
                const formData = new FormData(form);
                const title = formData.get('title');
                const body = formData.get('body');
                const addNotes = new CustomEvent('addNotes', { detail: { title, body } });
                document.dispatchEvent(addNotes);
                form.reset();
                error.textContent = '';

                Swal.fire({
                    icon: 'success',
                    title: 'Note added successfully!',
                    showConfirmButton: true,
                    timer: 2000
                });
            } else {
                error.textContent = 'Diharapkan untuk mengisi dengan benar.';
            }
        });

        titleInput.addEventListener('input', () => {
            if (!titleInput.validity.valid) {
                titleInput.setCustomValidity('Judul harus tdi isi.');
            } else {
                titleInput.setCustomValidity('');
            }
        });

        bodyInput.addEventListener('input', () => {
            if (!bodyInput.validity.valid) {
                bodyInput.setCustomValidity('Keterangan harus di isi.');
            } else {
                bodyInput.setCustomValidity('');
            }
        });
    }
}
customElements.define('form-input', FormInput);
