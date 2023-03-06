const commentsList = document.getElementById('comments-list');
const form = document.getElementById('form');
const nameCommentator = document.getElementById('name');
const comment = document.getElementById('comment');
const date = document.getElementById('date');
const errorComment = document.getElementById('textarea-error');
const errorName = document.getElementById('input-error');

function formatDate() {
    const hour = new Date().getHours()
    const min = new Date().getMinutes()
    let howLong;
    if (date.value) {
        const stampNow = Date.now()
        const stampDate = new Date(date.value).getTime()
        const day = 24 * 3600 * 1000
        const difference = Number(stampNow) - Number(stampDate)
        const dayAgo = Math.floor(difference / day)

        switch (dayAgo) {
            case 0:
                howLong = 'сегодня'
                break;
            case 1:
                howLong = 'вчера'
                break;
            default:
                howLong = `${dayAgo} дней(-я) назад`
                break;
        }

        const yy = new Date(date.value).getFullYear()
        const mm = new Date(date.value).getMonth() + 1
        const dd = new Date(date.value).getDate()

        return `${howLong} ${dd}/${mm}/${yy} в ${hour}:${min}`
    } else {
        const yy = new Date().getFullYear()
        const mm = new Date().getMonth() + 1
        const dd = new Date().getDate()

        return `сегодня ${dd}/${mm}/${yy} в ${hour}:${min}`

    }
}

function createComment() {
    const item = document.createElement('li');
    const itemCommentator = document.createElement('span');
    const itemComment = document.createElement('p');
    const itemDate = document.createElement('span');
    const itemBtn = document.createElement('button')
    const itemLike = document.createElement('span')

    item.classList.add('item');
    itemCommentator.classList.add('commentator');
    itemComment.classList.add('comment');
    itemDate.classList.add('date');
    itemLike.classList.add('like')
    itemBtn.classList.add('btn-reset')

    itemCommentator.textContent = nameCommentator.value;
    itemComment.textContent = comment.value;
    itemDate.textContent = formatDate()
    itemBtn.textContent = 'удалить'
    itemLike.innerHTML = `<svg width="36" height="36" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 31L16.26 29.4174C10.08 23.8185 6 20.1139 6 15.594C6 11.8894 8.904 9 12.6 9C14.688 9 16.692 9.97112 18 11.4937C19.308 9.97112 21.312 9 23.4 9C27.096 9 30 11.8894 30 15.594C30 20.1139 25.92 23.8185 19.74 29.4174L18 31Z"/>
    </svg>`

    item.append(
        itemComment,
        itemCommentator,
        itemDate,
        itemLike,
        itemBtn
    );

    nameCommentator.value = ''
    comment.value = ''
    date.value = ''

    itemLike.addEventListener('click' , () => {
        itemLike.classList.toggle('active')
    })

    itemBtn.addEventListener('click', () => {
        item.remove()
    })

    return item
}


function validation(value) {
    if (value) {
        if (value.length > 1) {
            return true
        } return false

    } return false
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (validation(comment.value) && validation(nameCommentator.value)) {
        const newComment = createComment()
        commentsList.append(newComment);

    } else { 
        if (!validation(comment.value)) {
            errorComment.classList.add('error')
        }
        if (!validation(nameCommentator.value)) {
            errorName.classList.add('error')
        }
 
    }
});

nameCommentator.addEventListener('keydown', () => {
    errorName.classList.remove('error')
})

comment.addEventListener('keydown', () => {
    errorComment.classList.remove('error')
})
