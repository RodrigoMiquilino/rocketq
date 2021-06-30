export default function Modal() {
    
    const modalWrapper = document.querySelector('.modal-wrapper')

    const cancelButton = document.querySelector('.button.cancel').addEventListener('click', close)
    const modalButton = document.querySelector('.modal button.confirm')


    function open(){
        //funcionalidade de atribuir a classe active da modal
        modalWrapper.classList.add('active')

    }function close(){
        //funcionalidade de remover a classe active da modal
        modalWrapper.classList.remove('active')
        if(modalButton.classList.contains('red')||modalButton.classList.contains('blue')){
            modalButton.classList.remove('red')||modalButton.classList.remove('blue')
        }
        document.querySelector('input#password').value = ''
    }
    return {
        open,
        close
    }
}
