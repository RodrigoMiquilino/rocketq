import Modal from '/scripts/modal.js'
const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button.confirm')


const checkButtons = document.querySelectorAll('.actions a.check')
const deleteButtons = document.querySelectorAll('.actions a.delete')

checkButtons.forEach(checkButtons => {
    checkButtons.addEventListener('click', (event) => handleClick(event, true))
    })

deleteButtons.forEach(deleteButtons => {
    deleteButtons.addEventListener('click', (event) => handleClick(event, false))
})

function handleClick(event, check = true){
    event.preventDefault()
    const textTitle = check ? 'Marcar como lida' : 'Excluir'
    const textOption = check ? 'marcar':'excluir'
    const color = check ? 'blue':'red'
    const questionId = event.target.dataset.id
    const slug = check ? 'check' : 'delete'
    const roomId = document.querySelector('#room-id').dataset.id

    const form = document.querySelector('.modal form')

    form.setAttribute('action', `/room/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML = `${textTitle} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que você deseja ${textOption} esta pergunta?`
    modalButton.innerHTML = `Sim, ${textOption}`
    modalButton.classList.add(`${color}`)
    modal.open()
}
